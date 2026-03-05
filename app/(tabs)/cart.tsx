import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useCart } from '../../src/ui/hooks/useCart';
import { Loading } from '../../src/ui/components/Loading';
import { CartItemWithProduct } from '../../src/modules/cart/types';

export default function CartScreen() {
  const { items, subtotal, loading, removeFromCart, updateQuantity } = useCart();

  if (loading) {
    return <Loading message="Cargando carrito..." />;
  }

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Tu carrito esta vacio</Text>
        <Text style={styles.emptySubtitle}>Agrega productos desde el catalogo</Text>
        <TouchableOpacity style={styles.browseButton} onPress={() => router.push('/(tabs)/catalog')}>
          <Text style={styles.browseButtonText}>Ir al catalogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CartItemWithProduct }) => (
    <View style={styles.card}>
      {item.productImageUrl ? (
        <Image source={{ uri: item.productImageUrl }} style={styles.itemImage} resizeMode="cover" />
      ) : (
        <View style={[styles.itemImage, styles.imagePlaceholder]} />
      )}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>{item.productName}</Text>
        <Text style={styles.itemPrice}>${item.priceSnapshot.toFixed(2)} c/u</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
            <Text style={styles.removeButtonText}>Quitar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.itemTotal}>${(item.priceSnapshot * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push('/checkout')}>
          <Text style={styles.checkoutButtonText}>Ir a pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  list: { paddingVertical: 8 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyTitle: { fontSize: 20, fontWeight: '600', color: '#666', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#999', marginBottom: 24 },
  browseButton: {
    backgroundColor: '#007AFF', paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 10, minHeight: 44, justifyContent: 'center', alignItems: 'center',
  },
  browseButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  card: {
    backgroundColor: '#fff', marginHorizontal: 16, marginVertical: 6,
    borderRadius: 12, flexDirection: 'row', padding: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3,
  },
  itemImage: { width: 70, height: 70, borderRadius: 8 },
  imagePlaceholder: { backgroundColor: '#f0f0f0' },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 14, fontWeight: '600', color: '#333' },
  itemPrice: { fontSize: 12, color: '#888', marginTop: 2 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantityButton: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center',
  },
  quantityButtonText: { fontSize: 18, fontWeight: '600', color: '#333' },
  quantity: { fontSize: 16, fontWeight: '600', marginHorizontal: 12, color: '#333' },
  removeButton: { marginLeft: 'auto' },
  removeButtonText: { fontSize: 13, color: '#FF3B30', fontWeight: '500' },
  itemTotal: { fontSize: 15, fontWeight: '700', color: '#007AFF', alignSelf: 'center' },
  footer: {
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee',
    padding: 16, paddingBottom: 32,
  },
  subtotalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  subtotalLabel: { fontSize: 16, color: '#666' },
  subtotalValue: { fontSize: 20, fontWeight: '700', color: '#333' },
  checkoutButton: {
    backgroundColor: '#007AFF', paddingVertical: 16,
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    minHeight: 52,
  },
  checkoutButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
