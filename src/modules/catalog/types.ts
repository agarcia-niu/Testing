import { Product } from '../../core/types/entities';

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number | null;
  stock_status: string;
  categories: WooCommerceCategory[];
  images: WooCommerceImage[];
  date_modified: string;
}

interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
}

interface WooCommerceImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export function mapWooProductToLocal(wooProduct: WooCommerceProduct): Product {
  return {
    id: wooProduct.id.toString(),
    name: wooProduct.name,
    price: parseFloat(wooProduct.price) || 0,
    stockQuantity: wooProduct.stock_quantity ?? 0,
    category: wooProduct.categories[0]?.name ?? '',
    imageUrl: wooProduct.images[0]?.src ?? '',
    dataJson: JSON.stringify(wooProduct),
    updatedAt: wooProduct.date_modified ?? new Date().toISOString(),
    lastSyncAt: null,
    statusLocal: 'synced',
  };
}
