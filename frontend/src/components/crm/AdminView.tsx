/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Antigravity AI
*/

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useI18n } from '@/lib/i18n/I18nContext';
import { translations } from '@/lib/i18n/translations';
import RevenueChart from './RevenueChart';

export default function AdminView({ user }: { user: any }) {
  const { language } = useI18n();
  const t = translations[language];
  const [students, setStudents] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'nodes' | 'leads'>('nodes');
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [reviewingStudent, setReviewingStudent] = useState<any | null>(null);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newNodeForm, setNewNodeForm] = useState({ name: '', email: '', course_name: 'Vedic Maths Masterclass', status: 'active' });
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalRevenue: '₹0.00',
    activeNodes: 0,
    overdueInvoices: 0
  });

  const filteredStudents = students.filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const MOCK_STUDENTS = [
    { id: '1', name: 'Pushpa Devi', email: 'pushpa@aitdl.com', course_name: 'Vedic Maths Masterclass', status: 'active' },
    { id: '2', name: 'Jawahar R Mallah', email: 'jawahar@aitdl.com', course_name: 'Infrastructure Node Ops', status: 'active' },
    { id: '3', name: 'Rahul Sharma', email: 'rahul@example.com', course_name: 'Vedic Maths Masterclass', status: 'inactive' }
  ];

  const fetchStudents = async () => {
    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setStudents(MOCK_STUDENTS);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setStudents(data);
      const activeCount = data.filter(s => s.status === 'active').length;
      
      // Calculate revenue trends from invoices if available
      try {
        const { data: invoices } = await supabase.from('invoices').select('total_amount, status');
        if (invoices) {
          const revenue = invoices
            .filter(inv => inv.status === 'paid')
            .reduce((sum, inv) => sum + Number(inv.total_amount), 0);
          const overdue = invoices.filter(inv => inv.status === 'due' || inv.status === 'overdue').length;
          
          setDashboardMetrics({
            totalRevenue: `₹${revenue.toLocaleString('en-IN')}`,
            activeNodes: activeCount,
            overdueInvoices: overdue
          });
        }
      } catch (e) {
        setDashboardMetrics(prev => ({ ...prev, activeNodes: activeCount }));
      }
    } else {
      setStudents(MOCK_STUDENTS);
    }
    setLoading(false);
  };

  const fetchLeads = async () => {
    const supabase = createClient();
    if (!supabase) return;
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setLeads(data);
  };

  useEffect(() => {
    fetchStudents();
    fetchLeads();
    
    const supabase = createClient();
    if (!supabase) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => fetchStudents())
      .subscribe();

    const leadsChannel = supabase.channel('public:leads')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, (payload) => {
        setLeads(current => [payload.new, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(leadsChannel);
    };
  }, []);

  const generateInvoice = async (studentId: string, amount: number) => {
    const supabase = createClient();
    if (!supabase) return;
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);

    const { error } = await supabase.from('invoices').insert([{
      student_id: studentId,
      amount: amount,
      due_date: dueDate.toISOString().split('T')[0],
      status: 'due'
    }]);

    if (!error) {
      setNotification({ message: t.crm_admin_msg_provisioned, type: 'success' });
      fetchStudents();
    }
  };

  const markAsPaid = async (studentId: string) => {
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.from('invoices')
      .update({ status: 'paid' })
      .eq('student_id', studentId)
      .eq('status', 'due');
    if (!error) {
      setNotification({ message: t.crm_admin_msg_revenue_confirmed, type: 'success' });
      fetchStudents();
    }
  };

  const addNode = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.from('students').insert([newNodeForm]);
    if (!error) {
      setNotification({ message: t.crm_admin_msg_provisioned, type: 'success' });
      setIsAddingNode(false);
      fetchStudents();
    }
  };

  const deleteNode = async (id: string) => {
    if (!confirm('Decommission this node?')) return;
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (!error) {
      setNotification({ message: t.crm_admin_msg_decommissioned, type: 'success' });
      fetchStudents();
    }
  };

  const metrics = [
    { name: t.crm_admin_revenue, value: dashboardMetrics.totalRevenue || '₹0.00', icon: 'payments', trend: '+12% month' },
    { name: t.crm_admin_students, value: dashboardMetrics.activeNodes.toString(), icon: 'group', trend: 'Optimal allocation' },
    { name: t.crm_admin_uptime, value: dashboardMetrics.overdueInvoices.toString(), icon: 'warning_amber', trend: 'Requires attention' }
  ];

  const revenueData = [
    { month: 'Oct', amount: 84000 },
    { month: 'Nov', amount: 112000 },
    { month: 'Dec', amount: 98000 },
    { month: 'Jan', amount: 145000 },
    { month: 'Feb', amount: 168000 },
    { month: 'Mar', amount: 215000 },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col gap-2 relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary text-2xl">{metric.icon}</span>
              <span className="text-primary text-[10px] font-display font-bold px-2 py-0.5 rounded bg-primary/10 tracking-widest">{metric.trend}</span>
            </div>
            <p className="text-slate-500 font-display font-medium text-xs mt-2 uppercase tracking-widest">{metric.name}</p>
            <h3 className="text-white text-2xl font-display font-bold tracking-tight">{metric.value}</h3>
          </div>
        ))}
      </div>

      {/* Analytics Visualization */}
      <div className="glass-card p-8 rounded-2xl border border-white/5 bg-background-dark/20 h-[300px]">
        <RevenueChart data={revenueData} />
      </div>

      {/* Database Switcher */}
      <div className="flex gap-4 border-b border-white/5">
        <button 
          onClick={() => setActiveSubTab('nodes')}
          className={`pb-3 text-xs font-display font-bold uppercase tracking-widest transition-all px-2 ${activeSubTab === 'nodes' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          {t.crm_admin_title}
        </button>
        <button 
          onClick={() => setActiveSubTab('leads')}
          className={`pb-3 text-xs font-display font-bold uppercase tracking-widest transition-all px-2 ${activeSubTab === 'leads' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          {t.crm_admin_leads}
        </button>
      </div>

      {activeSubTab === 'nodes' ? (
        <div className="glass-card p-6 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/5 pb-4 gap-4">
            <h3 className="text-white font-display font-bold text-lg">{t.crm_admin_title}</h3>
            <div className="flex items-center gap-2">
              <input 
                type="text" placeholder={t.crm_admin_filter_placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 outline-none"
              />
              <button 
                onClick={() => setIsAddingNode(true)}
                className="bg-primary hover:bg-primary-light text-background-dark font-display font-medium text-xs px-3 py-1.5 rounded-lg transition-all"
              >
                + Node
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 font-display">
                  <th className="pb-3 pt-1 font-medium uppercase tracking-widest text-[10px]">{t.crm_admin_table_id}</th>
                  <th className="pb-3 pt-1 font-medium uppercase tracking-widest text-[10px]">{t.crm_admin_table_clearance}</th>
                  <th className="pb-3 pt-1 font-medium uppercase tracking-widest text-[10px]">{t.crm_admin_table_status}</th>
                  <th className="pb-3 pt-1 font-medium uppercase tracking-widest text-[10px] text-right">{t.crm_admin_table_action}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="py-8 text-center text-slate-500 animate-pulse font-mono tracking-tighter uppercase text-[10px]">{t.ui_loading_nodes}</td></tr>
                ) : filteredStudents.length === 0 ? (
                  <tr><td colSpan={4} className="py-8 text-center text-slate-500 italic">{t.ui_no_matches}</td></tr>
                ) : filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 flex flex-col gap-0.5">
                      <span className="text-white font-medium">{student.name}</span>
                      <span className="text-slate-500 text-[10px]">{student.email}</span>
                    </td>
                    <td className="py-3 text-slate-400">{student.course_name || t.ui_unassigned_node}</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${student.status === 'active' ? 'bg-[#00FF9D]/10 text-[#00FF9D] border-[#00FF9D]/20' : 'bg-slate-500/10 text-slate-500 border-white/10'}`}>
                        {(student.status || 'unknown').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-3 text-[10px] font-bold tracking-widest">
                        <button onClick={() => setReviewingStudent(student)} className="text-primary hover:underline">{t.ui_btn_review}</button>
                        <button onClick={() => deleteNode(student.id)} className="text-red-500/70 hover:text-red-400">{t.ui_btn_delete}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-card p-6 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/5 pb-4 gap-4">
            <h3 className="text-white font-display font-bold text-lg">{t.crm_admin_inquiries}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 font-display">
                  <th className="pb-3 pt-1 font-medium uppercase tracking-widest text-[10px]">{t.crm_admin_leads_org}</th>
                  <th className="pb-3 pt-1 font-medium uppercase tracking-widest text-[10px]">{t.crm_admin_leads_contact}</th>
                  <th className="pb-3 pt-1 font-medium uppercase tracking-widest text-[10px]">{t.crm_admin_leads_tier}</th>
                  <th className="pb-3 pt-1 font-medium uppercase tracking-widest text-[10px] text-right">{t.crm_admin_table_action}</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan={4} className="py-8 text-center text-slate-500 italic">{t.ui_no_leads}</td></tr>
                ) : leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3">
                      <p className="text-white font-medium">{lead.organization || t.ui_individual}</p>
                      <p className="text-slate-500 text-[10px]">{lead.name}</p>
                    </td>
                    <td className="py-3 text-[11px] text-slate-400 font-mono">{lead.email}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] uppercase font-bold text-primary">{lead.type}</span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-slate-400 hover:text-white font-bold text-[10px] tracking-widest">{t.crm_admin_respond}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals & Notifications */}
      {isAddingNode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-white/10 bg-background-dark flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-white font-display font-bold text-xl">{t.crm_admin_modal_provision}</h3>
              <button onClick={() => setIsAddingNode(false)} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={addNode} className="flex flex-col gap-4">
              <input 
                type="text" placeholder={t.crm_admin_modal_name} required 
                value={newNodeForm.name} onChange={(e) => setNewNodeForm({...newNodeForm, name: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50"
              />
              <input 
                type="email" placeholder={t.crm_admin_modal_email} required 
                value={newNodeForm.email} onChange={(e) => setNewNodeForm({...newNodeForm, email: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50"
              />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsAddingNode(false)} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-300 text-sm font-bold uppercase tracking-widest">{t.cta_cancel}</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-primary text-background-dark font-display font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,157,0.3)]">{t.crm_admin_modal_deploy}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reviewingStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-2xl p-8 rounded-3xl border border-white/10 bg-background-dark flex flex-col gap-8 relative">
            <button onClick={() => setReviewingStudent(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><span className="material-symbols-outlined text-[32px]">close</span></button>
            <div className="flex items-center gap-6">
              <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold border border-primary/20">{reviewingStudent.name.charAt(0)}</div>
              <div><h2 className="text-3xl text-white font-display font-bold">{reviewingStudent.name}</h2><p className="text-slate-400 text-sm font-mono mt-1">{reviewingStudent.email}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => generateInvoice(reviewingStudent.id, 12499)} className="py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary/20 transition-all">{t.crm_admin_invoice_btn} (₹12,499)</button>
              <button onClick={() => markAsPaid(reviewingStudent.id)} className="py-4 rounded-xl bg-[#00FF9D]/10 border border-[#00FF9D]/20 text-[#00FF9D] text-xs font-bold uppercase tracking-widest hover:bg-[#00FF9D]/20 transition-all">{t.crm_admin_paid_btn}</button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className={`fixed top-6 right-6 z-[200] px-4 py-3 rounded-xl border flex items-center gap-3 animate-slide-in-right ${notification.type === 'success' ? 'bg-[#00FF9D]/10 border-[#00FF9D]/20 text-[#00FF9D]' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
          <span className="material-symbols-outlined text-[20px]">{notification.type === 'success' ? 'verified' : 'error'}</span>
          <span className="text-xs font-display font-bold uppercase tracking-wider">{notification.message}</span>
        </div>
      )}
    </div>
  );
}
