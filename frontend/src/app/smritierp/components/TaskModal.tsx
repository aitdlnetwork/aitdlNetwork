/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
*/

"use client";

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { X, Calendar, Flag, Tag, AlignLeft, Save } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  editingTask?: any;
}

const priorities = ['low', 'medium', 'high', 'urgent'] as const;
const categories = ['general', 'sales', 'purchase', 'personal'] as const;

export default function TaskModal({ isOpen, onClose, onSave, editingTask }: TaskModalProps) {
  const { t } = useI18n();
  const [form, setForm] = useState({
    content: '',
    description: '',
    priority: 'low',
    due_date: '',
    category: 'general'
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        content: editingTask.content || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'low',
        due_date: editingTask.due_date || '',
        category: editingTask.category || 'general'
      });
    } else {
      setForm({
        content: '',
        description: '',
        priority: 'low',
        due_date: '',
        category: 'general'
      });
    }
  }, [editingTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  const priorityColors: Record<string, string> = {
    low: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    high: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    urgent: 'bg-red-500/20 text-red-500 border-red-500/40'
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-[#12122a] border border-white/10 w-full max-w-lg rounded-sm overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/3">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary/10 rounded-sm flex items-center justify-center text-primary">
              <Flag size={18} />
            </div>
            <h3 className="text-lg font-display font-black text-white uppercase tracking-widest">
              {editingTask ? t('erp_task_modal_edit') : t('erp_task_modal_title')}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-sm transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mb-2">{t('erp_task_content')}</label>
            <input 
              required 
              autoFocus
              value={form.content} 
              onChange={e => setForm({...form, content: e.target.value})} 
              placeholder={t('erp_notes_placeholder')}
              className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-3 text-sm text-white outline-none focus:border-primary/50 transition-all placeholder:text-slate-600" 
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-2">
              <AlignLeft size={12} /> {t('erp_task_description')}
            </label>
            <textarea 
              rows={3}
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
              className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-3 text-sm text-white outline-none focus:border-primary/50 transition-all resize-none placeholder:text-slate-600" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Priority */}
            <div>
              <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-2">
                <Flag size={12} /> {t('erp_task_priority')}
              </label>
              <div className="flex flex-wrap gap-2">
                {priorities.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm({...form, priority: p})}
                    className={`px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest border transition-all ${
                      form.priority === p 
                        ? priorityColors[p] 
                        : 'bg-white/5 text-slate-500 border-transparent hover:bg-white/10'
                    }`}
                  >
                    {t(('erp_priority_' + p) as any)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-2">
                <Tag size={12} /> {t('erp_task_category')}
              </label>
              <select 
                value={form.category} 
                onChange={e => setForm({...form, category: e.target.value})}
                className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c} value={c} className="bg-[#12122a]">{t(('erp_category_' + c) as any)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-2">
              <Calendar size={12} /> {t('erp_task_due_date')}
            </label>
            <input 
              type="date"
              value={form.due_date} 
              onChange={e => setForm({...form, due_date: e.target.value})} 
              className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white outline-none focus:border-primary/50 transition-all [color-scheme:dark]" 
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white/10 transition-all"
            >
              {t('cta_cancel')}
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-3 bg-primary border border-primary/20 text-background-dark text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              <Save size={14} />
              {t('erp_task_save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
