import HomeClient from './HomeClient';
import { getProducts, getFaqs } from '@/app/admin/actions';
import { getFeaturedProducts as getStaticFeaturedProducts } from '../data/products';
import { faqItems as staticFaqItems } from '../data/faq';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [productsRes, faqsRes] = await Promise.all([
    getProducts(),
    getFaqs()
  ]);

  const featuredProducts = productsRes?.success && productsRes?.products
    ? productsRes.products.slice(0, 3)
    : getStaticFeaturedProducts();

  const faqs = faqsRes?.success && faqsRes?.faqs
    ? faqsRes.faqs
    : staticFaqItems;

  return <HomeClient initialProducts={featuredProducts} initialFaqs={faqs} />;
}
