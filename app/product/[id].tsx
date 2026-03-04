import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Product } from '../../src/core/types/entities';
import { CatalogService } from '../../src/modules/catalog/catalogService';
import { CartService } from '../../src/modules/cart/cartService';
import { Loading } from '../../src/ui/components/Loading';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const p = await CatalogService.getProductById(id);
      setProduct(p);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || adding) return;
    setAdding(true);
    try {
      await CartService.addToCart(product.id, 1);
      Alert.alert('Agregado', `${product.name} se agregó al carrito`, [
        { text: 'Seguir comprando' },
        { text: 'Ir al carrito', onPress: () => router.push('/(tabs)/cart') },
      ]);
    } catch {
      Alert.alert('Error', 'No se pudo agregar al carrito');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <Loading message="Cargando producto..." />;
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Producto no encontrado</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const inStock = product.stockQuantity > 0;
  const description = getPlainDescription(product.dataJson);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {product.imageUrl ? (
          <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.imagePlaceholderText}>Sin imagen</Text>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          {product.category ? <Text style={styles.category}>{product.category}</Text> : null}
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={[styles.stockBadge, inStock ? styles.stockIn : styles.stockOut]}>
            <Text style={[styles.stockText, inStock ? styles.stockTextIn : styles.stockTextOut]}>
              {inStock ? `${product.stockQuantity} disponibles` : 'Sin stock'}
            </Text>
          </View>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.addButton, !inStock && styles.addButtonDisabled]}
          onPress={handleAddToCart}
          disabled={!inStock || adding}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>
            {adding ? 'Agregando...' : inStock ? 'Agregar al carrito' : 'Sin stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getPlainDescription(dataJson: string): string {
  try {
    const data = JSON.parse(dataJson);
    const html: string = data.short_description || data.description || '';
    return html.replace(/<[^>]*>/g, '').trim();
  } catch {
    return '';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingBottom: 100 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  notFound: { fontSize: 18, color: '#666', marginBottom: 16 },
  backButton: {
    backgroundColor: '#007AFF', paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 8, minHeight: 44, justifyContent: 'center', alignItems: 'center',
  },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  image: { width: '100%', height: 300 },
  imagePlaceholder: { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  imagePlaceholderText: { fontSize: 14, color: '#999' },
  content: { padding: 20 },
  name: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 4 },
  category: { fontSize: 14, color: '#888', marginBottom: 8 },
  price: { fontSize: 26, fontWeight: '700', color: '#007AFF', marginBottom: 12 },
  stockBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12, marginBottom: 16 },
  stockIn: { backgroundColor: '#E8F5E9' },
  stockOut: { backgroundColor: '#FFEBEE' },
  stockText: { fontSize: 13, fontWeight: '600' },
  stockTextIn: { color: '#2E7D32' },
  stockTextOut: { color: '#C62828' },
  description: { fontSize: 15, color: '#555', lineHeight: 22 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee',
    padding: 16, paddingBottom: 32,
  },
  addButton: {
    backgroundColor: '#007AFF', paddingVertical: 16,
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    minHeight: 52,
  },
  addButtonDisabled: { backgroundColor: '#ccc' },
  addButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
