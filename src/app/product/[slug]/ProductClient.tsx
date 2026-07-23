'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Check,
  Package,
  History,
  FileText,
  Star,
} from 'lucide-react';
import { Badge } from '../../../components/Badge';
import ProductCard from '../../../components/ProductCard';
import { getProductBySlug as getStaticProductBySlug, getRelatedProducts as getStaticRelatedProducts } from '../../../data/products';
import { getProducts } from '@/app/admin/actions';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import PaddleCheckoutButton from '../../../components/PaddleCheckoutButton';
const tabs = [
  { id: 'description', label: 'Description', icon: FileText },
  { id: 'features', label: 'Features', icon: Star },
  { id: 'requirements', label: 'Requirements', icon: Package },
  { id: 'changelog', label: 'Changelog', icon: History },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function ProductClient({ initialProduct, initialRelated }: { initialProduct: any, initialRelated: any[] }) {
  const params = useParams();
  const slug = params.slug as string;

  const product = initialProduct;
  const relatedProducts = initialRelated;
  const isLoading = false;
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex justify-center text-neutral-500">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
        <p className="text-muted mb-6">The product you're looking for doesn't exist.</p>
        <Link href="/products" className="text-accent hover:text-accent-hover font-medium">
          ← Back to Products
        </Link>
      </div>
    );
  }


  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Products
          </Link>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-video rounded-xl border border-card-border bg-card-bg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {product.gallery && product.gallery.length > 0 ? (
                    <img
                      key={selectedImageIndex}
                      src={product.gallery[selectedImageIndex]?.startsWith('/') || product.gallery[selectedImageIndex]?.startsWith('http') ? product.gallery[selectedImageIndex] : supabase.storage.from('products').getPublicUrl(product.gallery[selectedImageIndex]).data.publicUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-opacity duration-300 animate-in fade-in"
                    />
                  ) : product.image ? (
                    <img
                      src={product.image.startsWith('/') || product.image.startsWith('http') ? product.image : supabase.storage.from('products').getPublicUrl(product.image).data.publicUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center w-full h-full bg-gradient-to-br from-accent/20 via-transparent to-purple-500/20 flex flex-col items-center justify-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30">
                        <span className="text-4xl font-bold text-accent">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-muted font-medium uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3 mt-4">
                {product.gallery && product.gallery.length > 0 ? product.gallery.map((fileId: string, i: number) => (
                  <div
                    key={fileId}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`flex-1 aspect-video rounded-lg border bg-card-bg overflow-hidden cursor-pointer transition-all ${i === selectedImageIndex
                      ? 'border-accent ring-2 ring-accent/30 opacity-100'
                      : 'border-card-border hover:border-accent/30 opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={fileId.startsWith('/') || fileId.startsWith('http') ? fileId : supabase.storage.from('products').getPublicUrl(fileId).data.publicUrl}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )) : null}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.frameworks.map((fw: string) => (
                  <Badge key={fw} framework={fw as any} />
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <p className="text-muted text-lg leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted">one-time payment</span>
              </div>

              <div className="space-y-3 mb-8">
                {product.productLink && product.productLink.startsWith('pri_') ? (
                  <PaddleCheckoutButton
                    productId={product.productLink}
                    className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:shadow-lg hover:shadow-accent/25 w-full"
                  >
                    Buy Now
                    <ExternalLink className="w-4 h-4" />
                  </PaddleCheckoutButton>
                ) : (
                  <a
                    href={product.productLink || '#'}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:shadow-lg hover:shadow-accent/25 w-full"
                  >
                    Buy Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <p className="text-xs text-muted text-center">
                  Secure checkout via Paddle • Instant delivery • Lifetime updates
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Category', value: product.category },
                  { label: 'Version', value: product.changelog?.[0]?.version || '1.0.0' },
                  { label: 'Updated', value: product.changelog?.[0]?.date || 'N/A' },
                  { label: 'License', value: product.license || 'Per-server' },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="p-3 rounded-lg border border-card-border bg-card-bg"
                  >
                    <div className="text-xs text-muted mb-0.5">{info.label}</div>
                    <div className="text-sm font-medium text-foreground">{info.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-1 border-b border-card-border mb-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted hover:text-foreground'
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="max-w-3xl">
              {activeTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="prose-sm"
                >
                  <p className="text-muted leading-relaxed">{product.description}</p>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-3">
                    {product.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'requirements' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-3">
                    {product.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Package className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted">{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'changelog' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {product.changelog ? product.changelog.map((entry: any, index: number) => (
                    <div key={index} className="relative pl-6 border-l-2 border-card-border">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-accent" />
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          v{entry.version || '1.0.0'}
                        </span>
                        <span className="text-xs text-muted">{entry.date || ''}</span>
                      </div>
                      <ul className="space-y-1">
                        {entry.changes && entry.changes.map((change: string, i: number) => (
                          <li key={i} className="text-sm text-muted">
                            • {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )) : (
                    <p className="text-muted">No changelog available.</p>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-16 border-t border-card-border">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product.slug} product={product} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
