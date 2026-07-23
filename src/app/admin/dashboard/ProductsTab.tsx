'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, Edit, Trash2, Box, Image as ImageIcon, X, UploadCloud } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadProductImage, deleteProductImage } from '../actions';
import { supabase } from '@/lib/supabase';

const FRAMEWORKS = ['OWL', 'Social', 'Original', 'Standalone'];
const CATEGORIES = ['HUD', 'Job', 'Vehicle', 'Inventory', 'Admin', 'Misc'];

export default function ProductsTab({ isFounder }: { isFounder: boolean }) {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    name: '',
    description: '',
    price: 0,
    category: 'Misc',
    frameworks: [] as string[],
    features: '',
    requirements: '',
    license: '',
    productLink: '',
    gallery: [] as string[],
    version: '1.0.0',
    changelogText: '',
  });

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const res = await getProducts();
    if (res.success) {
      setProducts(res.products || []);
    }
    setIsLoading(false);
  };

  const handleOpenModal = (product?: any) => {
    if (product) {
      let parsedVersion = '1.0.0';
      let parsedChangelogText = '';
      if (product.changelog) {
        try {
          const parsedArray = typeof product.changelog === 'string' ? JSON.parse(product.changelog) : product.changelog;
          if (Array.isArray(parsedArray) && parsedArray.length > 0) {
            parsedVersion = parsedArray[0].version || '1.0.0';
            parsedChangelogText = (parsedArray[0].changes || []).join('\n');
          }
        } catch(e) {}
      }

      setFormData({
        id: product.id,
        slug: product.slug,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        frameworks: product.frameworks || [],
        features: (product.features || []).join('\n'),
        requirements: (product.requirements || []).join('\n'),
        license: product.license || '',
        productLink: product.productLink || '',
        gallery: product.gallery || [],
        version: parsedVersion,
        changelogText: parsedChangelogText,
      });
    } else {
      setFormData({
        id: '',
        slug: '',
        name: '',
        description: '',
        price: 0,
        category: 'Misc',
        frameworks: [],
        features: '',
        requirements: '',
        license: '',
        productLink: '',
        gallery: [],
        version: '1.0.0',
        changelogText: '',
      });
    }
    setError('');
    setIsModalOpen(true);
  };

  const handleFrameworkToggle = (fw: string) => {
    setFormData(prev => ({
      ...prev,
      frameworks: prev.frameworks.includes(fw)
        ? prev.frameworks.filter(f => f !== fw)
        : [...prev.frameworks, fw]
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploadingImage(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadData = new FormData();
      uploadData.append('file', file);
      
      const res = await uploadProductImage(uploadData);
      if (res.success && res.fileId) {
        const newGallery = [...formData.gallery, res.fileId];
        setFormData(prev => ({
          ...prev,
          gallery: newGallery
        }));

        if (formData.id) {
          try {
            await updateProduct(formData.id, { gallery: newGallery });
            fetchProducts();
          } catch(e) {}
        }
      } else {
        alert(res.error || 'Failed to upload image');
      }
    }
    setIsUploadingImage(false);
    if (e.target) e.target.value = '';
  };

  const handleRemoveImage = async (fileId: string) => {
    if (confirm("Remove this image?")) {
      const res = await deleteProductImage(fileId);
      if (res.success) {
        const newGallery = formData.gallery.filter(id => id !== fileId);
        
        setFormData(prev => ({
          ...prev,
          gallery: newGallery
        }));

        // Automatically update the product in the database if it already exists
        if (formData.id) {
          try {
            // We only need to import updateProduct, which is already used below
            const updateRes = await updateProduct(formData.id, { gallery: newGallery });
            if (updateRes.success) {
              fetchProducts(); // Refresh the list to reflect changes
            }
          } catch(e) {}
        }
      } else {
        alert(res.error || 'Failed to delete image');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFounder) return;
    
    setIsSubmitting(true);
    setError('');

    const dataToSave = {
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      shortDescription: formData.description.slice(0, 150) + (formData.description.length > 150 ? '...' : ''),
      description: formData.description,
      price: parseFloat(formData.price.toString()),
      category: formData.category,
      frameworks: formData.frameworks,
      features: formData.features.split('\n').filter(f => f.trim() !== ''),
      requirements: formData.requirements.split('\n').filter(r => r.trim() !== ''),
      license: formData.license,
      productLink: formData.productLink,
      gallery: formData.gallery,
      changelog: JSON.stringify([{
        version: formData.version,
        date: new Date().toISOString().split('T')[0],
        changes: formData.changelogText.split('\n').filter(c => c.trim() !== '')
      }]),
    };

    let res;
    if (formData.id) {
      res = await updateProduct(formData.id, dataToSave);
    } else {
      res = await createProduct(dataToSave);
    }

    if (res.success) {
      setIsModalOpen(false);
      fetchProducts();
    } else {
      setError(res.error || 'Failed to save product');
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!isFounder) return;
    if (confirm('Are you sure you want to delete this product?')) {
      const res = await deleteProduct(id);
      if (res.success) {
        fetchProducts();
      } else {
        alert(res.error || 'Failed to delete product');
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-neutral-400 mt-1">Manage store products and scripts</p>
        </div>
        
        {isFounder && (
          <button 
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        )}
      </div>

      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-900/80 border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-semibold text-neutral-300">Name</th>
                <th className="px-6 py-4 font-semibold text-neutral-300">Category</th>
                <th className="px-6 py-4 font-semibold text-neutral-300">Price</th>
                <th className="px-6 py-4 font-semibold text-neutral-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-neutral-800 p-2 rounded-lg">
                          <Box className="w-5 h-5 text-neutral-400" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-green-400 font-medium">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isFounder && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10 p-2 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
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

      {/* Product Modal */}
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
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl my-8 relative"
            >
              <h2 className="text-2xl font-bold mb-6">{formData.id ? 'Edit Product' : 'Add New Product'}</h2>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Frameworks</label>
                  <div className="flex flex-wrap gap-3">
                    {FRAMEWORKS.map(fw => (
                      <label key={fw} className="flex items-center gap-2 cursor-pointer bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-lg hover:border-neutral-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.frameworks.includes(fw)}
                          onChange={() => handleFrameworkToggle(fw)}
                          className="rounded border-neutral-700 text-blue-500 focus:ring-blue-500/20 bg-neutral-900"
                        />
                        <span className="text-sm font-medium">{fw}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Features (One per line)</label>
                  <textarea
                    rows={4}
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Version</label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) => setFormData({...formData, version: e.target.value})}
                      placeholder="e.g. 1.0.0"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Change Logs (One per line)</label>
                  <textarea
                    rows={3}
                    value={formData.changelogText}
                    onChange={(e) => setFormData({...formData, changelogText: e.target.value})}
                    placeholder="e.g. Added new feature"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Requirements (One per line)</label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">License</label>
                  <input
                    type="text"
                    value={formData.license}
                    onChange={(e) => setFormData({...formData, license: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Paddle Price ID</label>
                  <input
                    type="text"
                    placeholder="e.g., pri_01hg2..."
                    value={formData.productLink}
                    onChange={(e) => setFormData({...formData, productLink: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Paste the Paddle Price ID from your Paddle dashboard.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Product Images</label>
                  
                  {formData.gallery.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                      {formData.gallery.map(fileId => (
                        <div key={fileId} className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 group">
                          <img 
                            src={fileId.startsWith('/') || fileId.startsWith('http') ? fileId : supabase.storage.from('products').getPublicUrl(fileId).data.publicUrl} 
                            alt="Product" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(fileId)}
                            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <label className="flex items-center justify-center w-full aspect-[4/1] sm:aspect-[6/1] bg-neutral-950 border border-dashed border-neutral-700 hover:border-blue-500 rounded-xl cursor-pointer transition-colors group">
                    <div className="flex flex-col items-center justify-center text-neutral-500 group-hover:text-blue-500">
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin mb-2" />
                          <span className="text-sm font-medium">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-6 h-6 mb-2" />
                          <span className="text-sm font-medium">Click to upload images</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>
                
                {/* Submit Buttons */}
                <div className="flex items-center gap-3 pt-4 sticky bottom-0 bg-neutral-900 border-t border-neutral-800 py-4 mt-6">
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
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Product'}
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
