'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import type { Product } from '../data/products';
import { supabase } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="glow-card rounded-xl border border-card-border bg-card-bg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-accent-glow/10 group-hover:border-accent/30">
          {/* Image */}
          <div className="relative aspect-video bg-surface-2 overflow-hidden">
            {product.gallery && product.gallery.length > 0 ? (
              <img 
                src={product.gallery[0].startsWith('/') || product.gallery[0].startsWith('http') ? product.gallery[0] : supabase.storage.from('products').getPublicUrl(product.gallery[0]).data.publicUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : product.image ? (
              <img 
                src={product.image.startsWith('/') || product.image.startsWith('http') ? product.image : supabase.storage.from('products').getPublicUrl(product.image).data.publicUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
                    <span className="text-2xl font-bold text-accent">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs text-muted font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.frameworks.map((fw) => (
                <Badge key={fw} framework={fw} />
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-accent font-medium group-hover:translate-x-1 transition-transform">
                View details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
