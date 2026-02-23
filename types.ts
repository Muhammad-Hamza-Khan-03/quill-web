export interface Variation {
  color: string;
  image_url: string;
  public_id?: string;
}

export interface Review {
  _id: string;
  product_id: string;
  user_name: string;
  rating: number;
  text: string;
  helpful_votes?: number;
  created_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductPrice {
  amount: number;
  currency: string;
}

export interface ProductRating {
  average: number;
  count: number;
}

export interface Product {
  _id: string;
  id?: string; // For compatibility
  name: string;
  slug: string;
  description: string;
  price: ProductPrice | number; // Support both for transition
  gender: 'male' | 'female' | 'unisex' | 'Men' | 'Unisex';
  type: string;
  category: ProductCategory;
  item_number: number | string;
  material?: string;
  weight?: string;
  sizing?: string;
  dimensions?: string; // For compatibility
  status: string;
  rating: ProductRating;
  variations: Variation[];
  is_deleted?: boolean;
}

export interface Category {
  _id: string;
  id?: string; // For compatibility
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface ScrapedProduct {
  scraped_id: string;
  name: string;
  price: ProductPrice;
  description: string;
  variations: Variation[];
  gender: string;
  category: ProductCategory;
  type: string;
  item_number: number;
  material: string;
  sizing: string;
  weight: string;
  status: string;
  origin: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedImage?: string;
}

// These will be populated by the store now
export const PRODUCTS: Product[] = [];
export const CATEGORIES: Category[] = [];
export const SCRAPED_PRODUCTS: ScrapedProduct[] = [];
