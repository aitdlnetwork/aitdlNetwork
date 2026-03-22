/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden pt-[72px] bg-background-dark text-text-primary">
        {/* Ambient Space Glow - Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] hidden md:block"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[100px] hidden md:block"></div>
          <div className="absolute hidden md:block inset-0 bg-hero-glow"></div>
        </div>
        
        <Header />
        
        <main className="flex-1 w-full z-10 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
