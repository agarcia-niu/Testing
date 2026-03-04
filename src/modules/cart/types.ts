import { CartItem } from '../../core/types/entities';

export interface CartItemWithProduct extends CartItem {
  productName: string;
  productImageUrl: string;
  productStockQuantity: number;
}
