'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { products as staticProducts, type Framework, type Category } from '../../data/products';
import { getProducts } from '@/app/admin/actions';
import { Loader2 } from 'lucide-react';

const frameworks: Framework[] = ['OWL', 'Social', 'Original', 'Standalone'];
const categories: Category[] = ['HUD', 'Job', 'Vehicle', 'Inventory', 'Admin', 'Misc'];
const sortOptions = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [search, setSearch] = useState('');
  const [selectedFrameworks, setSelectedFrameworks] = useState<Framework[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [sort, setSort] = useState('name-asc');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const products = initialProducts;
  const isLoading = false;

  const toggleFramework = (fw: Framework) => {
    setSelectedFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((f) => f !== fw) : [...prev, fw]
    );
  };

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedFrameworks([]);
    setSelectedCategories([]);
    setSort('name-asc');
  };

  const hasFilters = search || selectedFrameworks.length > 0 || selectedCategories.length > 0;

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedFrameworks.length > 0) {
      result = result.filter((p) =>
        selectedFrameworks.some((fw) => p.frameworks.includes(fw))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    const [field, direction] = sort.split('-');
    result.sort((a, b) => {
      if (field === 'name') {
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return direction === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return result;
  }, [products, search, selectedFrameworks, selectedCategories, sort]);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              All Products
            </h1>
            <p className="text-muted text-lg max-w-2xl">
              Browse our full collection of premium MTA:SA scripts. Filter by framework,
              category, or search by name.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search scripts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-card-border bg-card-bg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-card-border bg-card-bg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Filter Toggle (mobile) */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-card-border bg-card-bg text-foreground text-sm hover:border-accent/30 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && (
                <span className="w-2 h-2 rounded-full bg-accent" />
              )}
            </button>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`${filtersOpen ? 'block' : 'hidden'
                } md:block w-full md:w-56 flex-shrink-0 space-y-6`}
            >
              {/* Framework Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Framework</h3>
                <div className="space-y-2">
                  {frameworks.map((fw) => (
                    <label
                      key={fw}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFrameworks.includes(fw)}
                        onChange={() => toggleFramework(fw)}
                        className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent/50 bg-card-bg"
                      />
                      <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                        {fw}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent/50 bg-card-bg"
                      />
                      <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear all filters
                </button>
              )}
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="py-20 flex justify-center text-neutral-500">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted text-lg mb-2">No products found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 text-accent hover:text-accent-hover text-sm font-medium transition-colors"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted mb-6">
                    Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((product, index) => (
                      <ProductCard key={product.slug} product={product} index={index} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
