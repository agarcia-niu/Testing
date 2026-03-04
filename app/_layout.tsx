import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SessionManager } from '../src/infra/telemetry/sessionManager';
import { TelemetryService } from '../src/infra/telemetry/telemetryService';
import { JobRunner } from '../src/infra/sync/jobRunner';

export default function RootLayout() {
  useEffect(() => {
    // Initialize session and telemetry on app boot
    SessionManager.initSession();
    TelemetryService.track('app_boot');
    TelemetryService.startAutoFlush();
    JobRunner.start();

    return () => {
      TelemetryService.stopAutoFlush();
      JobRunner.stop();
    };
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="login" options={{ title: 'Iniciar Sesión', headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Detalle del Producto' }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout', presentation: 'modal' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
