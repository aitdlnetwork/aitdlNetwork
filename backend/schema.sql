-- AITDL Network © 2026 | Vikram Samvat 2083
-- Designed & Architected by JRM

-- PHASE 4: BACKEND SETUP (Supabase PostgreSQL)

-- 1. Create Roles Enum
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'client');

-- 2. Create PROFILES Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role user_role DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger to create a profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_name TEXT;
  new_role user_role;
BEGIN
  new_name := COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1));
  new_role := COALESCE((new.raw_user_meta_data->>'role')::user_role, 'client');

  -- 1. Create Profile
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (new.id, new.email, new_name, new_role);

  -- 2. Node Claiming: Link existing student record if email matches
  UPDATE public.students
  SET profile_id = new.id
  WHERE email = new.email AND profile_id IS NULL;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. Create STUDENTS Table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Link for login access
  course_name TEXT,
  batch_timings TEXT,
  admission_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'graduated'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 4. Create PRODUCTS Table (For POS / Software Subscriptions)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  sku TEXT UNIQUE,
  category TEXT, -- 'lms', 'pos', 'service'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 5. Create INVOICES Table
CREATE TYPE invoice_status AS ENUM ('draft', 'due', 'paid', 'cancelled');

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number SERIAL UNIQUE,
  student_id UUID REFERENCES public.students(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL, -- for item buys
  amount DECIMAL(12, 2) NOT NULL,
  tax DECIMAL(12, 2) DEFAULT 0,
  discount DECIMAL(12, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) GENERATED ALWAYS AS (amount + tax - discount) STORED,
  due_date DATE NOT NULL,
  status invoice_status DEFAULT 'due',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 6. Create FEES Table (Extends invoices for subscription-like structures)
CREATE TABLE IF NOT EXISTS public.fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
  term_name TEXT, -- 'Jan 2026', 'Semester 1'
  amount_due DECIMAL(12, 2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 7. Create TRANSACTIONS Table
CREATE TYPE payment_method AS ENUM ('upi', 'card', 'cash', 'net_banking');

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE RESTRICT,
  amount_paid DECIMAL(12, 2) NOT NULL,
  method payment_method NOT NULL,
  reference_id TEXT, -- Bank ref, UPI transaction ID
  sender_name TEXT,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  remarks TEXT
);

-- RLS (Row Level Security) Configuration for scalable architecture

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- EXAMPLE RLS POLICIES (Admin controls all, Staff reads, Client reads subset)

-- Profiles
CREATE POLICY "Public profiles are viewable by authenticated users."
  ON public.profiles FOR SELECT USING ( auth.role() = 'authenticated' );

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE USING ( auth.uid() = id );

-- Products
CREATE POLICY "Anyone can view active products."
  ON public.products FOR SELECT USING ( is_active = true );

-- Invoices
CREATE POLICY "Clients can view own invoices."
  ON public.invoices FOR SELECT USING (
    student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())
  );
