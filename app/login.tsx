import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { SecureStorage } from '../src/infra/security/secureStorage';
import { HttpClient } from '../src/infra/http/httpClient';
import { OfflineBanner } from '../src/ui/components/OfflineBanner';
import { Loading } from '../src/ui/components/Loading';

export default function LoginScreen() {
  const [consumerKey, setConsumerKey] = useState('');
  const [consumerSecret, setConsumerSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    async function checkExistingKeys() {
      const hasKeys = await SecureStorage.hasConsumerKeys();
      if (hasKeys) {
        router.replace('/(tabs)/catalog');
      } else {
        setLoading(false);
      }
    }
    checkExistingKeys();
  }, []);

  const handleConnect = async () => {
    const key = consumerKey.trim();
    const secret = consumerSecret.trim();

    if (!key || !secret) {
      Alert.alert('Error', 'Ingresa ambas claves (Consumer Key y Consumer Secret)');
      return;
    }

    if (!key.startsWith('ck_') || !secret.startsWith('cs_')) {
      Alert.alert('Error', 'Las claves deben comenzar con ck_ y cs_ respectivamente');
      return;
    }

    setConnecting(true);

    await SecureStorage.saveConsumerKey(key);
    await SecureStorage.saveConsumerSecret(secret);

    const result = await HttpClient.get('/products?per_page=1');

    if (result.ok) {
      router.replace('/(tabs)/catalog');
    } else {
      await SecureStorage.clearAll();
      Alert.alert(
        'Error de conexion',
        'No se pudo conectar con WooCommerce. Verifica que las claves sean correctas.',
      );
    }

    setConnecting(false);
  };

  if (loading) {
    return <Loading message="Verificando configuracion..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <OfflineBanner />
      <View style={styles.container}>
        <Text style={styles.title}>WooCommerce App</Text>
        <Text style={styles.subtitle}>Configura tus credenciales API</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Consumer Key</Text>
          <TextInput
            style={styles.input}
            value={consumerKey}
            onChangeText={setConsumerKey}
            placeholder="ck_..."
            autoCapitalize="none"
            autoCorrect={false}
            editable={!connecting}
          />

          <Text style={styles.label}>Consumer Secret</Text>
          <TextInput
            style={styles.input}
            value={consumerSecret}
            onChangeText={setConsumerSecret}
            placeholder="cs_..."
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            editable={!connecting}
          />

          <TouchableOpacity
            style={[styles.button, connecting && styles.buttonDisabled]}
            onPress={handleConnect}
            disabled={connecting}
          >
            <Text style={styles.buttonText}>
              {connecting ? 'Conectando...' : 'Conectar'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>
          Las claves se almacenan de forma segura en tu dispositivo y nunca se comparten.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 32 },
  form: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 12, fontSize: 15,
    backgroundColor: '#FAFAFA', color: '#333',
  },
  button: {
    backgroundColor: '#007AFF', paddingVertical: 16,
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    marginTop: 24, minHeight: 52,
  },
  buttonDisabled: { backgroundColor: '#99CCFF' },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  hint: { fontSize: 12, color: '#999', textAlign: 'center', lineHeight: 18 },
});
