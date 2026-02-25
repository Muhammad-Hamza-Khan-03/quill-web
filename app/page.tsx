import HomePageClient from './HomePageClient';
import { Product } from '@/types';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/products?skip=0&limit=8`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  
  return <HomePageClient initialProducts={products} />;
}
