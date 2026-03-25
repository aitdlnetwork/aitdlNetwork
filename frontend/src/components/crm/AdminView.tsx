/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Antigravity AI
*/

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminView({ user }: { user: any }) {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  async function fetchStudents() {
    const supabase = createClient();
    if (!supabase) {
      console.warn('Supabase client not initialized. Using fallback data.');
      setStudents(MOCK_STUDENTS);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        setStudents(MOCK_STUDENTS);
      } else if (data && data.length > 0) {
        setStudents(data);
        const activeCount = data.filter(s => s.status === 'active').length;
        
        try {
          const { data: invoices, error: invError } = await supabase.from('invoices').select('amount, status');
          let revenue = 0;
          let overdue = 0;
          
          if (invoices && !invError) {
            invoices.forEach(inv => {
              if (inv.status === 'Paid' || inv.status === 'paid') {
                const val = parseFloat(inv.amount?.toString().replace(/[₹,]/g, '') || '0');
                revenue += val;
              } else if (inv.status === 'Due' || inv.status === 'due' || inv.status === 'Overdue' || inv.status === 'overdue') {
                overdue++;
              }
            });
          }

          setDashboardMetrics({
            totalRevenue: `₹${revenue.toLocaleString('en-IN')}`,
            activeNodes: activeCount,
            overdueInvoices: overdue
          });
        } catch (mErr) {
          console.warn('Metrics calculation error:', mErr);
          setDashboardMetrics(prev => ({ ...prev, activeNodes: activeCount }));
        }
      } else {
        console.info('No students found in database.');
        setStudents([]);
      }
    } catch (err) {
      console.error('Unexpected error during fetch:', err);
      setStudents(MOCK_STUDENTS);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchStudents();

    const supabase = createClient();
    if (!supabase) return;

    // Real-time subscription for student metrics
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
        fetchStudents();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
        fetchStudents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const generateInvoice = async (studentId: string, amount: number) => {
    const supabase = createClient();
    if (!supabase) return;

    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);

    try {
      const { error } = await supabase
        .from('invoices')
        .insert([{
          student_id: studentId,
          amount: amount,
          due_date: dueDate.toISOString().split('T')[0],
          status: 'due'
        }]);

      if (error) {
        setNotification({ message: 'Error generating invoice.', type: 'error' });
      } else {
        setNotification({ message: 'New invoice generated successfully.', type: 'success' });
        fetchStudents();
      }
    } catch (err) {
      setNotification({ message: 'Unexpected error generating invoice.', type: 'error' });
    }
  };

  const markAsPaid = async (studentId: string) => {
    const supabase = createClient();
    if (!supabase) return;

    try {
      const { data: invoices } = await supabase
        .from('invoices')
        .select('*')
        .eq('student_id', studentId)
        .or('status.eq.due,status.eq.overdue')
        .order('created_at', { ascending: false })
        .limit(1);

      if (invoices && invoices.length > 0) {
        const { error } = await supabase
          .from('invoices')
          .update({ status: 'paid' })
          .eq('id', invoices[0].id);

        if (error) throw error;
        setNotification({ message: 'Invoice marked as PAID.', type: 'success' });
        fetchStudents();
      } else {
        setNotification({ message: 'No pending invoices found.', type: 'error' });
      }
    } catch (err) {
      setNotification({ message: 'System error marking payment.', type: 'error' });
    }
  };

  const addNode = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    if (!supabase) {
      console.info('Supabase fallback: Simulating node addition.');
      const mockNewNode = { ...newNodeForm, id: Date.now().toString(), created_at: new Date().toISOString() };
      setStudents([mockNewNode, ...students]);
      setIsAddingNode(false);
      setNewNodeForm({ name: '', email: '', course_name: 'Vedic Maths Masterclass', status: 'active' });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('students')
        .insert([newNodeForm])
        .select();

      if (error) {
        console.error('Error adding node:', error);
        setNotification({ message: 'Authorization Failure: Node creation rejected.', type: 'error' });
      } else if (data) {
        setStudents([...data, ...students]);
        setNotification({ message: 'Secure Node Provisioned: Asset registered successfully.', type: 'success' });
        setIsAddingNode(false);
        setNewNodeForm({ name: '', email: '', course_name: 'Vedic Maths Masterclass', status: 'active' });
      }
    } catch (err) {
      console.error('Unexpected error adding node:', err);
      setNotification({ message: 'System Exception during node provisioning.', type: 'error' });
    }
  };

  const updateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const supabase = createClient();
    if (!supabase) {
      setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
      setEditingStudent(null);
      return;
    }

    try {
      const { error } = await supabase
        .from('students')
        .update({
          name: editingStudent.name,
          email: editingStudent.email,
          course_name: editingStudent.course_name,
          status: editingStudent.status
        })
        .eq('id', editingStudent.id);

      if (error) {
        console.error('Error updating node:', error);
        setNotification({ message: 'Protocol Error: Node update failed.', type: 'error' });
      } else {
        setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
        setEditingStudent(null);
        setNotification({ message: 'Encryption Validated: Node details synchronized.', type: 'success' });
      }
    } catch (err) {
      console.error('Unexpected error updating node:', err);
      setNotification({ message: 'Link Error: Connection failed during synchronization.', type: 'error' });
    }
  };

  const deleteNode = async (id: string) => {
    if (!confirm('Are you sure you want to decommission this node?')) return;
    
    const supabase = createClient();
    if (!supabase) {
      setStudents(students.filter(s => s.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting node:', error);
        setNotification({ message: 'Security Override: Failed to decommission node.', type: 'error' });
      } else {
        setStudents(students.filter(s => s.id !== id));
        setNotification({ message: 'Node Decommissioned: Asset neutralized successfully.', type: 'success' });
      }
    } catch (err) {
      console.error('Unexpected error deleting node:', err);
      setNotification({ message: 'System Critical: Decommissioning sequence failed.', type: 'error' });
    }
  };

  const metrics = [
    { name: 'Total Revenue Node', value: dashboardMetrics.totalRevenue || '₹0.00', icon: 'payments', trend: '+12% month' },
    { name: 'Active Student Nodes', value: dashboardMetrics.activeNodes.toString(), icon: 'group', trend: 'Optimal allocation' },
    { name: 'Overdue Invoices', value: dashboardMetrics.overdueInvoices.toString(), icon: 'warning_amber', trend: 'Requires attention' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Management Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((item, idx) => (
          <div key={idx} className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1 hover:border-primary/20 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="text-slate-400 text-xs font-body">{item.name}</span>
              <span className="material-symbols-outlined text-primary text-[20px] opacity-75">{item.icon}</span>
            </div>
            <span className="text-white font-display text-2xl font-bold tracking-tight mt-1">{item.value}</span>
            <span className={`text-[10px] font-mono mt-2 flex items-center gap-1 ${
              item.name.includes('Overdue') ? 'text-red-400' : 'text-[#00FF9D]'
            }`}>
               {item.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Student Database Lookup */}
      <div className="glass-card p-6 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/5 pb-4 gap-4">
          <h3 className="text-white font-display font-bold text-lg">Sovereign Asset Node Database</h3>
          <div className="flex items-center gap-2">
            <input 
              type="text" placeholder="Filter student identifier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary/50"
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
          <table className="w-full text-left text-xs font-body text-slate-300">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 font-display">
                <th className="pb-3 pt-1 font-medium">Identifier</th>
                <th className="pb-3 pt-1 font-medium">Clearance</th>
                <th className="pb-3 pt-1 font-medium">Node Status</th>
                <th className="pb-3 pt-1 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-white/5 animate-pulse">
                    <td className="py-4">
                      <div className="h-4 bg-white/10 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-white/5 rounded w-24"></div>
                    </td>
                    <td className="py-4"><div className="h-4 bg-white/10 rounded w-40"></div></td>
                    <td className="py-4"><div className="h-4 bg-white/5 rounded w-16"></div></td>
                    <td className="py-4 text-right"><div className="h-4 bg-white/5 rounded w-12 ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-mono text-xs italic">
                    No sovereign asset nodes match your query.
                  </td>
                </tr>
              ) : filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 flex flex-col gap-0.5">
                    <span className="text-white font-medium">{student.name}</span>
                    <span className="text-slate-500 text-[10px]">{student.email}</span>
                  </td>
                  <td className="py-3">{student.course_name || 'Unassigned'}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      student.status === 'active'
                        ? 'bg-[#00FF9D]/10 text-[#00FF9D] border-[#00FF9D]/20' 
                        : 'bg-slate-500/10 text-slate-500 border-white/10'
                    }`}>
                      {(student.status || 'unknown').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-3 text-[11px] font-bold">
                      <button 
                        onClick={() => setReviewingStudent(student)}
                        className="text-primary hover:underline"
                      >
                        REVIEW
                      </button>
                      <button 
                        onClick={() => setEditingStudent(student)}
                        className="text-slate-400 hover:text-white"
                      >
                        EDIT
                      </button>
                      <button 
                        onClick={() => deleteNode(student.id)}
                        className="text-red-500/70 hover:text-red-400"
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddingNode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-white/10 bg-background-dark shadow-2xl flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-white font-display font-bold text-xl">Provision New Node</h3>
              <button 
                onClick={() => setIsAddingNode(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={addNode} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Identifier Name</label>
                <input 
                  type="text" 
                  placeholder="Pushpa Devi"
                  value={newNodeForm.name}
                  onChange={(e) => setNewNodeForm({...newNodeForm, name: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-body"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Comm Network (Email)</label>
                <input 
                  type="email" 
                  placeholder="node@aitdl.com"
                  value={newNodeForm.email}
                  onChange={(e) => setNewNodeForm({...newNodeForm, email: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-body"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Classification</label>
                  <select 
                    value={newNodeForm.status}
                    onChange={(e) => setNewNodeForm({...newNodeForm, status: e.target.value})}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all appearance-none font-body"
                  >
                    <option value="active">ACTIVE</option>
                    <option value="inactive">INACTIVE</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Sector (Course)</label>
                  <input 
                    type="text" 
                    placeholder="Vedic Maths"
                    value={newNodeForm.course_name}
                    onChange={(e) => setNewNodeForm({...newNodeForm, course_name: e.target.value})}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-body"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddingNode(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 font-display font-medium text-sm hover:bg-white/5 transition-all"
                >
                  Terminate
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-background-dark font-display font-bold text-sm hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                >
                  Provision Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-white/10 bg-background-dark shadow-2xl flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-white font-display font-bold text-xl">Edit Sovereign Node</h3>
              <button 
                onClick={() => setEditingStudent(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={updateNode} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Identifier Name</label>
                <input 
                  type="text" 
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Comm Network (Email)</label>
                <input 
                  type="email" 
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Classification</label>
                  <select 
                    value={editingStudent.status}
                    onChange={(e) => setEditingStudent({...editingStudent, status: e.target.value})}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all appearance-none"
                  >
                    <option value="active">ACTIVE</option>
                    <option value="inactive">INACTIVE</option>
                    <option value="graduated">GRADUATED</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Sector (Course)</label>
                  <input 
                    type="text" 
                    value={editingStudent.course_name}
                    onChange={(e) => setEditingStudent({...editingStudent, course_name: e.target.value})}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 font-display font-medium text-sm hover:bg-white/5 transition-all"
                >
                  Abort
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-background-dark font-display font-bold text-sm hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                >
                  Authorize Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

      {/* Review Student Modal */}
      {reviewingStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-2xl p-8 rounded-3xl border border-white/10 bg-background-dark shadow-2xl flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <button 
                onClick={() => setReviewingStudent(null)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[32px]">close</span>
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 text-3xl font-display font-bold">
                {reviewingStudent.name.charAt(0)}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl text-white font-display font-bold">{reviewingStudent.name}</h2>
                <p className="text-slate-400 font-body text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">mail</span> {reviewingStudent.email}
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-tighter">
                    {reviewingStudent.status} node
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5 uppercase tracking-tighter">
                    {reviewingStudent.course_name || 'Inquiry Only'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/5 flex flex-col gap-4">
                <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase opacity-50">Node Metadata</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-body font-medium">Creation Date</span>
                    <span className="text-slate-200 font-mono italic">
                      {new Date(reviewingStudent.created_at || Date.now()).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-body font-medium">Clearance Level</span>
                    <span className="text-primary font-mono font-bold">L-04 Admin Approved</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-body font-medium">System ID</span>
                    <span className="text-slate-500 font-mono text-[10px]">{reviewingStudent.id}</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/5 flex flex-col gap-4">
                <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase opacity-50">Financial Actions</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => generateInvoice(reviewingStudent.id, 12499)}
                    className="w-full py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-display font-bold text-[10px] hover:bg-primary/20 transition-all uppercase tracking-widest"
                  >
                    Provision Invoice (₹12,499)
                  </button>
                  <button 
                    onClick={() => markAsPaid(reviewingStudent.id)}
                    className="w-full py-2 rounded-lg bg-[#00FF9D]/10 border border-[#00FF9D]/20 text-[#00FF9D] font-display font-bold text-[10px] hover:bg-[#00FF9D]/20 transition-all uppercase tracking-widest"
                  >
                    Mark Most Recent Paid
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <button 
                onClick={() => {
                  setEditingStudent(reviewingStudent);
                  setReviewingStudent(null);
                }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-bold text-xs px-6 py-3 rounded-xl transition-all"
              >
                MODIFY PERMISSIONS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
