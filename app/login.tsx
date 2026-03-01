import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { OfflineBanner } from '../src/ui/components/OfflineBanner';

export default function LoginScreen() {
  const handleLogin = () => {
    // Stub: In Phase 1, implement real auth
    router.replace('/(tabs)/catalog');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OfflineBanner />
      <View style={styles.container}>
        <Text style={styles.title}>WooCommerce App</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  button: {
    backgroundColor: '#007AFF', paddingHorizontal: 32, paddingVertical: 14,
    borderRadius: 10, minWidth: 200, minHeight: 48, alignItems: 'center', justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
