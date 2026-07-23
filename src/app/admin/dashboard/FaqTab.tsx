'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, Edit, Trash2, HelpCircle } from 'lucide-react';
import { getFaqs, createFaq, updateFaq, deleteFaq } from '../actions';

export default function FaqTab({ isFounder }: { isFounder: boolean }) {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    question: '',
    answer: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setIsLoading(true);
    const res = await getFaqs();
    if (res.success) {
      setFaqs(res.faqs || []);
    }
    setIsLoading(false);
  };

  const handleOpenModal = (faq?: any) => {
    if (faq) {
      setFormData({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      setFormData({
        id: '',
        question: '',
        answer: '',
      });
    }
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFounder) return;
    
    setIsSubmitting(true);
    setError('');

    const dataToSave = {
      question: formData.question,
      answer: formData.answer,
    };

    let res;
    if (formData.id) {
      res = await updateFaq(formData.id, dataToSave);
    } else {
      res = await createFaq(dataToSave);
    }

    if (res.success) {
      setIsModalOpen(false);
      fetchFaqs();
    } else {
      setError(res.error || 'Failed to save FAQ');
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!isFounder) return;
    if (confirm('Are you sure you want to delete this FAQ?')) {
      const res = await deleteFaq(id);
      if (res.success) {
        fetchFaqs();
      } else {
        alert(res.error || 'Failed to delete FAQ');
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="text-neutral-400 mt-1">Manage FAQs displayed on the home page</p>
        </div>
        
        {isFounder && (
          <button 
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            Add FAQ
          </button>
        )}
      </div>

      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-900/80 border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-semibold text-neutral-300">Question</th>
                <th className="px-6 py-4 font-semibold text-neutral-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-neutral-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading FAQs...
                  </td>
                </tr>
              ) : faqs.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-neutral-500">
                    No FAQs found.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-neutral-800 p-2 rounded-lg">
                          <HelpCircle className="w-5 h-5 text-neutral-400" />
                        </div>
                        <span className="font-medium">{faq.question}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isFounder && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(faq)}
                            className="text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10 p-2 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq.id)}
                            className="text-neutral-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative"
            >
              <h2 className="text-2xl font-bold mb-6">{formData.id ? 'Edit FAQ' : 'Add New FAQ'}</h2>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Question</label>
                  <input
                    type="text"
                    required
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Answer</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.answer}
                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center gap-3 pt-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white py-2.5 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save FAQ'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
