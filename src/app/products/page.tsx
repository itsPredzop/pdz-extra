import ProductsClient from './ProductsClient';
import { getProducts } from '@/app/admin/actions';
import { products as staticProducts } from '../../data/products';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProductsPage() {
  const res = await getProducts();
  const initialProducts = res?.success && res?.products ? res.products : staticProducts;

  return <ProductsClient initialProducts={initialProducts} />;
}
