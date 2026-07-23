'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserPlus, Trash2, Shield, ShieldAlert,
  LogOut, Plus, Loader2, KeyRound, Settings, Link as LinkIcon, Save, CheckCircle, Box, HelpCircle, Edit
} from 'lucide-react';
import { getAdmins, createAdmin, deleteAdmin, getConfig, updateConfig, updateAdmin } from '../actions';
import ProductsTab from './ProductsTab';
import FaqTab from './FaqTab';

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ username: string, role: string } | null>(null);

  const [activeTab, setActiveTab] = useState<'admins' | 'config' | 'products' | 'faq'>('admins');

  // Admins state
  const [admins, setAdmins] = useState<any[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);

  // Config state
  const [config, setConfig] = useState({ discord: '', mail: '', documentation: '', github: '', website: '', youtube: '' });
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSuccessMsg, setConfigSuccessMsg] = useState('');

  // Add/Edit Admin state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('admin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    const username = localStorage.getItem('adminUsername');
    const role = localStorage.getItem('adminRole');

    if (!isLoggedIn) {
      router.push('/admin');
    } else {
      setCurrentUser({ username: username || '', role: role || 'admin' });
      fetchAdmins();
      fetchConfig();
    }
  }, [router]);

  const fetchAdmins = async () => {
    setIsLoadingAdmins(true);
    const res = await getAdmins();
    if (res.success) {
      setAdmins(res.admins || []);
    }
    setIsLoadingAdmins(false);
  };

  const fetchConfig = async () => {
    setIsLoadingConfig(true);
    const res = await getConfig();
    if (res.success && res.config) {
      setConfig({
        discord: res.config.discord || '',
        mail: res.config.mail || '',
        documentation: res.config.documentation || '',
        github: res.config.github || '',
        website: res.config.website || '',
        youtube: res.config.youtube || ''
      });
    }
    setIsLoadingConfig(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    router.push('/admin');
  };

  const handleOpenAddModal = () => {
    setEditingAdminId(null);
    setNewUsername('');
    setNewPassword('');
    setNewRole('admin');
    setIsAddModalOpen(true);
    setError('');
  };

  const handleEditAdmin = (admin: any) => {
    setEditingAdminId(admin.id);
    setNewUsername(admin.username);
    setNewPassword(''); // leave blank if they don't want to change it
    setNewRole(admin.role);
    setIsAddModalOpen(true);
    setError('');
  };

  const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername) return;
    if (!editingAdminId && !newPassword) return; // password required for new admin

    setIsSubmitting(true);
    setError('');

    let res;
    if (editingAdminId) {
      res = await updateAdmin(editingAdminId, newUsername, newPassword, newRole);
    } else {
      res = await createAdmin(newUsername, newPassword, newRole);
    }

    if (res.success) {
      setIsAddModalOpen(false);
      setNewUsername('');
      setNewPassword('');
      setNewRole('admin');
      setEditingAdminId(null);
      fetchAdmins();
    } else {
      setError(res.error || `Failed to ${editingAdminId ? 'update' : 'create'} admin`);
    }

    setIsSubmitting(false);
  };

  const handleDeleteAdmin = async (id: string, role: string) => {
    if (role === 'founder' && currentUser?.role !== 'founder') {
      alert("Only a founder can remove another founder.");
      return;
    }

    if (confirm("Are you sure you want to remove this admin?")) {
      const res = await deleteAdmin(id);
      if (res.success) {
        fetchAdmins();
      } else {
        alert(res.error || "Failed to delete admin");
      }
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setConfigSuccessMsg('');
    const res = await updateConfig(config);
    if (res.success) {
      setConfigSuccessMsg('Configuration saved successfully!');
      setTimeout(() => setConfigSuccessMsg(''), 3000);
    } else {
      alert(res.error || "Failed to save configuration");
    }
    setIsSavingConfig(false);
  };

  if (!currentUser) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>;

  const isFounder = currentUser.role === 'founder';

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">PDZ ADMIN</h2>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('admins')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'admins' ? 'bg-blue-600/10 text-blue-400' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Admins</span>
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'config' ? 'bg-blue-600/10 text-blue-400' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configuration</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'products' ? 'bg-blue-600/10 text-blue-400' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            <Box className="w-5 h-5" />
            <span className="font-medium">Products</span>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'faq' ? 'bg-blue-600/10 text-blue-400' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">FAQ</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-neutral-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="bg-neutral-800 rounded-full p-2">
              <UserPlus className="w-4 h-4 text-neutral-400" />
            </div>
            <div>
              <p className="text-sm font-medium">{currentUser.username}</p>
              <p className="text-xs text-neutral-500 capitalize">{currentUser.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {activeTab === 'admins' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Admin Management</h1>
                  <p className="text-neutral-400 mt-1">Manage portal access and roles</p>
                </div>

                {isFounder && (
                  <button
                    onClick={handleOpenAddModal}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Plus className="w-5 h-5" />
                    Add Admin
                  </button>
                )}
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-900/80 border-b border-neutral-800">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-neutral-300">User</th>
                        <th className="px-6 py-4 font-semibold text-neutral-300">Role</th>
                        <th className="px-6 py-4 font-semibold text-neutral-300">Added Date</th>
                        <th className="px-6 py-4 font-semibold text-neutral-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {isLoadingAdmins ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                            Loading admins...
                          </td>
                        </tr>
                      ) : admins.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                            No admins found.
                          </td>
                        </tr>
                      ) : (
                        admins.map((admin) => (
                          <tr key={admin.id} className="hover:bg-neutral-800/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="bg-neutral-800 p-2 rounded-full">
                                  <KeyRound className="w-4 h-4 text-neutral-400" />
                                </div>
                                <span className="font-medium">{admin.username}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                ${admin.role === 'founder' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                  admin.role === 'support' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}
                              >
                                {admin.role === 'founder' && <ShieldAlert className="w-3 h-3 mr-1" />}
                                {admin.role || 'admin'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-neutral-400 text-sm">
                              {new Date(admin.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {isFounder && admin.username !== currentUser.username && (
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleEditAdmin(admin)}
                                    className="text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10 p-2 rounded-lg transition-colors"
                                    title="Edit Admin"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAdmin(admin.id, admin.role)}
                                    className="text-neutral-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                                    title="Remove Admin"
                                  >
                                    <Trash2 className="w-5 h-5" />
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
            </motion.div>
          )}

          {activeTab === 'config' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Configuration</h1>
                <p className="text-neutral-400 mt-1">Manage global website links and settings</p>
              </div>

              {isLoadingConfig ? (
                <div className="py-12 flex justify-center text-neutral-500">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <form onSubmit={handleSaveConfig} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300 ml-1 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-blue-400" /> Discord Link
                      </label>
                      <input
                        type="url"
                        value={config.discord}
                        onChange={(e) => setConfig({ ...config, discord: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-neutral-600"
                        placeholder="https://discord.gg/your-invite"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300 ml-1 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-blue-400" /> Email Support
                      </label>
                      <input
                        type="email"
                        value={config.mail}
                        onChange={(e) => setConfig({ ...config, mail: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-neutral-600"
                        placeholder="contact@pdzextra.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300 ml-1 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-blue-400" /> Documentation Link
                      </label>
                      <input
                        type="url"
                        value={config.documentation}
                        onChange={(e) => setConfig({ ...config, documentation: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-neutral-600"
                        placeholder="https://docs.pdzextra.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300 ml-1 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-blue-400" /> GitHub Link
                      </label>
                      <input
                        type="url"
                        value={config.github}
                        onChange={(e) => setConfig({ ...config, github: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-neutral-600"
                        placeholder="https://github.com/pdzextra"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300 ml-1 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-blue-400" /> Website Link
                      </label>
                      <input
                        type="url"
                        value={config.website}
                        onChange={(e) => setConfig({ ...config, website: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-neutral-600"
                        placeholder="https://pdzextra.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300 ml-1 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-blue-400" /> YouTube Link
                      </label>
                      <input
                        type="url"
                        value={config.youtube}
                        onChange={(e) => setConfig({ ...config, youtube: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-neutral-600"
                        placeholder="https://youtube.com/@pdzextra"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSavingConfig}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70"
                    >
                      {isSavingConfig ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                      Save Configuration
                    </button>
                    {configSuccessMsg && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-400 text-sm font-medium">
                        <CheckCircle className="w-5 h-5" /> {configSuccessMsg}
                      </motion.span>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {activeTab === 'products' && (
            <ProductsTab isFounder={isFounder} />
          )}

          {activeTab === 'faq' && (
            <FaqTab isFounder={isFounder} />
          )}

        </div>
      </div>

      {/* Add Admin Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6">{editingAdminId ? 'Edit Admin' : 'Add New Admin'}</h2>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Admin username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Password {editingAdminId ? '(Leave blank to keep current)' : ''}</label>
                  <input
                    type="password"
                    required={!editingAdminId}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={editingAdminId ? "Enter new password" : "Secure password"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="founder">Founder (Full Access)</option>
                    <option value="admin">Admin (Manage Content)</option>
                    <option value="support">Support (View Only/Tickets)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white py-2.5 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingAdminId ? 'Save Changes' : 'Add Account')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
