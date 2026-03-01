import React from 'react';
import { Tabs } from 'expo-router';
import { OfflineBanner } from '../../src/ui/components/OfflineBanner';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <OfflineBanner />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          headerShown: true,
        }}
      >
        <Tabs.Screen
          name="catalog"
          options={{ title: 'Catálogo', tabBarLabel: 'Catálogo' }}
        />
        <Tabs.Screen
          name="cart"
          options={{ title: 'Carrito', tabBarLabel: 'Carrito' }}
        />
        <Tabs.Screen
          name="orders"
          options={{ title: 'Pedidos', tabBarLabel: 'Pedidos' }}
        />
      </Tabs>
    </View>
  );
}
