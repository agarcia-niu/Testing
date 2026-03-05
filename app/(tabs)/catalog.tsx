import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Product } from '../../src/core/types/entities';
import { useCatalog } from '../../src/ui/hooks/useCatalog';
import { ProductCard } from '../../src/ui/components/ProductCard';
import { Loading } from '../../src/ui/components/Loading';
import { ErrorView } from '../../src/ui/components/ErrorView';

export default function CatalogScreen() {
  const { products, loading, refreshing, error, refresh } = useCatalog();

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  if (loading && products.length === 0) {
    return <Loading message="Cargando catálogo..." />;
  }

  if (error && products.length === 0) {
    return <ErrorView error={error} onRetry={refresh} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        contentContainerStyle={styles.list}
        onRefresh={refresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Sin productos</Text>
            <Text style={styles.emptySubtitle}>Tira hacia abajo para sincronizar</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    paddingVertical: 8,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
  },
});
