import { CartItem } from '../../core/types/entities';
import { CartRepository } from '../../infra/storage/repositories/cartRepository';
import { ProductRepository } from '../../infra/storage/repositories/productRepository';
import { CartItemWithProduct } from './types';

export const CartService = {
  async addToCart(productId: string, quantity: number): Promise<CartItem> {
    const product = await ProductRepository.findById(productId);
    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }

    const existingItems = await CartRepository.getItems();
    const existing = existingItems.find(item => item.productId === productId);

    if (existing) {
      const newQuantity = existing.quantity + quantity;
      await CartRepository.updateQuantity(existing.id, newQuantity);
      return { ...existing, quantity: newQuantity };
    }

    return CartRepository.addItem(productId, quantity, product.price);
  },

  async removeFromCart(itemId: string): Promise<void> {
    await CartRepository.removeItem(itemId);
  },

  async updateQuantity(itemId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await CartRepository.removeItem(itemId);
      return;
    }
    await CartRepository.updateQuantity(itemId, quantity);
  },

  async getCartWithProducts(): Promise<CartItemWithProduct[]> {
    const items = await CartRepository.getItems();
    const enriched: CartItemWithProduct[] = [];

    for (const item of items) {
      const product = await ProductRepository.findById(item.productId);
      enriched.push({
        ...item,
        productName: product?.name ?? 'Producto no disponible',
        productImageUrl: product?.imageUrl ?? '',
        productStockQuantity: product?.stockQuantity ?? 0,
      });
    }

    return enriched;
  },

  async getSubtotal(): Promise<number> {
    const items = await CartRepository.getItems();
    return items.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0);
  },

  async getItemCount(): Promise<number> {
    const items = await CartRepository.getItems();
    return items.reduce((count, item) => count + item.quantity, 0);
  },

  async clearCart(): Promise<void> {
    await CartRepository.clear();
  },
};
