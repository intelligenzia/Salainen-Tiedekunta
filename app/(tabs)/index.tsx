import { Redirect } from 'expo-router';

// Redirect the index route to the home tab
export default function TabsIndex() {
  return <Redirect href="/(tabs)/home" />;
}
