import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <Text style={styles.subtitle}>Tu carrito está vacío</Text>
      <Text style={styles.placeholder}>Implementación en Phase 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 16 },
  placeholder: { fontSize: 14, color: '#999', fontStyle: 'italic' },
});
