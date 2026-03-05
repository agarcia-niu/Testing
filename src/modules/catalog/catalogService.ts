import { Product } from '../../core/types/entities';
import { Result } from '../../core/types/api';
import { HttpClient } from '../../infra/http/httpClient';
import { ProductRepository } from '../../infra/storage/repositories/productRepository';
import { WooCommerceProduct, mapWooProductToLocal } from './types';

export const CatalogService = {
  async syncProducts(): Promise<Result<number>> {
    const lastSync = await ProductRepository.getLastSyncAt();

    let path = '/products';
    if (lastSync) {
      path += `?modified_after=${encodeURIComponent(lastSync)}`;
    }

    const result = await HttpClient.get<WooCommerceProduct[]>(path);

    if (!result.ok) {
      return { ok: false, error: result.error };
    }

    const products = result.data.map(mapWooProductToLocal);

    if (products.length > 0) {
      await ProductRepository.upsertBatch(products);
    }

    await ProductRepository.setLastSyncAt(new Date().toISOString());

    return { ok: true, data: products.length };
  },

  async getProducts(): Promise<Product[]> {
    return ProductRepository.findAll();
  },

  async getProductById(id: string): Promise<Product | null> {
    return ProductRepository.findById(id);
  },
};
