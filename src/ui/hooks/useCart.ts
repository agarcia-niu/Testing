import { useState, useEffect, useCallback } from 'react';
import { CartService } from '../../modules/cart/cartService';
import { CartItemWithProduct } from '../../modules/cart/types';

export function useCart() {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const [cartItems, total, count] = await Promise.all([
      CartService.getCartWithProducts(),
      CartService.getSubtotal(),
      CartService.getItemCount(),
    ]);
    setItems(cartItems);
    setSubtotal(total);
    setItemCount(count);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function init() {
      setLoading(true);
      await reload();
      if (mounted) setLoading(false);
    }
    init();
    return () => { mounted = false; };
  }, [reload]);

  const addToCart = useCallback(async (productId: string, quantity: number) => {
    await CartService.addToCart(productId, quantity);
    await reload();
  }, [reload]);

  const removeFromCart = useCallback(async (itemId: string) => {
    await CartService.removeFromCart(itemId);
    await reload();
  }, [reload]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    await CartService.updateQuantity(itemId, quantity);
    await reload();
  }, [reload]);

  const clearCart = useCallback(async () => {
    await CartService.clearCart();
    await reload();
  }, [reload]);

  return { items, subtotal, itemCount, loading, addToCart, removeFromCart, updateQuantity, clearCart, reload };
}
