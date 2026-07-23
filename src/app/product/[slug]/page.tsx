import ProductClient from './ProductClient';
import { getProducts } from '@/app/admin/actions';
import { getProductBySlug as getStaticProductBySlug, getRelatedProducts as getStaticRelatedProducts } from '../../../data/products';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProductPage({ params }: any) {
  const slug = params?.slug; // In Next.js App Router, params is an object, or a promise in very new versions.
  // if params is a promise:
  const resolvedSlug = slug || (await params)?.slug;

  const res = await getProducts();
  let foundProduct: any;
  let related: any[] = [];

  if (res?.success && res?.products) {
    foundProduct = res.products.find((p: any) => p.slug === resolvedSlug);
    if (foundProduct) {
      if (foundProduct.changelog) {
        try {
          foundProduct.changelog = typeof foundProduct.changelog === 'string'
            ? JSON.parse(foundProduct.changelog)
            : foundProduct.changelog;

          if (!Array.isArray(foundProduct.changelog)) {
            foundProduct.changelog = [];
          }
        } catch (e) {
          foundProduct.changelog = [];
        }
      }
      related = res.products
        .filter((p: any) => p.category === foundProduct.category && p.slug !== resolvedSlug)
        .slice(0, 3);
    }
  }

  if (!foundProduct) {
    // Fallback to static data
    foundProduct = getStaticProductBySlug(resolvedSlug);
    if (foundProduct) {
      related = getStaticRelatedProducts(resolvedSlug);
    }
  }

  return <ProductClient initialProduct={foundProduct} initialRelated={related} />;
}
