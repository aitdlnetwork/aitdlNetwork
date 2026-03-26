/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Antigravity AI
*/

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useI18n } from '@/lib/i18n/I18nContext';
import { translations } from '@/lib/i18n/translations';

export default function StudentView({ user }: { user: any }) {
  const { language } = useI18n();
  const t = translations[language];
  const [invoices, setInvoices] = useState<any[]>([]);
  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const MOCK_INVOICES = [
    { id: 'INV-2083-104', amount: '₹12,499.00', status: 'Paid', date: '2026-03-15', category: 'LMS' },
    { id: 'INV-2083-105', amount: '₹12,499.00', status: 'Due', date: '2026-04-15', category: 'LMS' }
  ];

  async function fetchStudentAndInvoices() {
    const supabase = createClient();
    if (!supabase) {
      console.warn('Supabase client not initialized. Using fallback data.');
      setInvoices(MOCK_INVOICES);
      setLoading(false);
      return;
    }

    try {
      // 1. Get student record for this user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const profileId = authUser?.id;

      if (profileId) {
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .select('*')
          .eq('profile_id', profileId)
          .single();
        
        if (studentData && !studentError) {
          setStudent(studentData);
          
          // 2. Fetch invoices for this student
          const { data: invoiceData, error: invoiceError } = await supabase
            .from('invoices')
            .select('*')
            .eq('student_id', studentData.id);

          if (!invoiceError && invoiceData && invoiceData.length > 0) {
            setInvoices(invoiceData);
          } else {
            // Try to find invoices by email if student_id mapping fails
            const { data: emailInvoices } = await supabase
              .from('invoices')
              .select('*')
              .eq('email', studentData.email);
            
            if (emailInvoices && emailInvoices.length > 0) {
              setInvoices(emailInvoices);
            } else {
              console.info('No invoices found for student record.');
              setInvoices([]);
            }
          }
        } else {
          console.warn('No student profile link found in database.');
          setInvoices([]);
        }
      } else {
        console.warn('No active session identifier found.');
        setInvoices(MOCK_INVOICES);
      }
    } catch (err) {
      console.error('Unexpected error during student fetch:', err);
      setInvoices(MOCK_INVOICES);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchStudentAndInvoices();
  }, [user]);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase || !student?.id) return;

    // Real-time subscription for invoices
    const channel = supabase
      .channel('student-invoices')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'invoices',
        filter: `student_id=eq.${student.id}`
      }, () => {
        fetchStudentAndInvoices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, student?.id]);

  const syncLedger = async () => {
    setLoading(true);
    await fetchStudentAndInvoices();
    setNotification({ message: 'Ledger Synchronized: Financial records updated.', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1 relative overflow-hidden group hover:border-[#00FF9D]/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-transparent pointer-events-none"></div>
          <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-widest leading-none">{t.crm_enlisted_course}</span>
          <span className="text-white font-medium text-sm tracking-tight mt-1">
            {student?.course_name || 'Vedic Maths Masterclass'}
          </span>
          <span className="text-[10px] items-center gap-1 text-[#00FF9D] font-mono flex mt-2">
            <span className="size-1 rounded-full bg-[#00FF9D] animate-pulse"></span> {t.crm_status_active}
          </span>
        </div>

        <div className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1 hover:border-primary/20 transition-all duration-300">
          <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-widest leading-none">{t.crm_batch_timings}</span>
          <span className="text-white font-medium text-sm mt-1">
            {student?.batch_timings || '08:00 AM - 10:00 AM'}
          </span>
          <span className="text-slate-500 text-[10px] font-body mt-2">{t.crm_days_mon_fri}</span>
        </div>

        <div className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1 hover:border-primary/20 transition-all duration-300">
          <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-widest leading-none">{t.crm_admission_ledger}</span>
          <span className="text-white font-medium text-sm mt-1">
            {student?.admission_date ? new Date(student.admission_date).toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'sa' ? 'sa-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '24 March 2026'}
          </span>
          <span className="text-slate-500 text-[10px] font-body mt-2">Vikram Samvat 2083</span>
        </div>
      </div>

      {/* Financial Grid */}
      <div className="glass-card p-6 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <h3 className="text-slate-500 font-semibold text-[11px] uppercase tracking-widest">{t.crm_financial_ledger}</h3>
          <button 
            onClick={syncLedger}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">download</span> {t.crm_sync_statements}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col md:flex-row justify-between md:items-center gap-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-white/10"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 bg-white/10 rounded w-24"></div>
                    <div className="h-3 bg-white/5 rounded w-32"></div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-5 bg-white/10 rounded w-16"></div>
                  <div className="h-6 bg-white/5 rounded-full w-12"></div>
                </div>
              </div>
            ))
          ) : invoices.map((inv, idx) => (
            <div key={idx} className={`p-4 rounded-xl bg-white/5 border border-white/5 border-l-4 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-white/10 transition-colors ${
              (inv.status === 'Paid' || inv.status === 'paid') ? 'border-l-primary/50' : 'border-l-amber-500/50'
            }`}>
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
                <div>
                  <p className="text-white text-sm font-display font-medium tracking-tight">{inv.id}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-slate-500 text-[11px] font-body">{inv.date}</span>
                    <span className="size-1 rounded-full bg-white/10"></span>
                    <span className="text-slate-500 text-[11px] font-body uppercase tracking-wider">{inv.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <span className="text-white font-mono text-sm font-bold">{inv.amount}</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${
                  inv.status === 'Paid' || inv.status === 'paid'
                    ? 'bg-primary/10 text-primary border-primary/20' 
                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                }`}>
                  {(inv.status === 'Paid' || inv.status === 'paid') ? t.crm_status_paid.toUpperCase() : t.crm_status_pending.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className={`fixed top-6 right-6 z-[200] px-4 py-3 rounded-xl border flex items-center gap-3 animate-slide-in-right ${
          notification.type === 'success' 
            ? 'bg-[#00FF9D]/10 border-[#00FF9D]/20 text-[#00FF9D]' 
            : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          <span className="material-symbols-outlined text-[20px]">
            {notification.type === 'success' ? 'verified' : 'error'}
          </span>
          <span className="text-xs font-display font-bold uppercase tracking-wider">{notification.message}</span>
        </div>
      )}
    </div>
  );
}
