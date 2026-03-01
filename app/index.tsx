import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to login by default. In Phase 1, check auth status.
  return <Redirect href="/login" />;
}
