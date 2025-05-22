import { Stack } from "expo-router"
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#1a1a1a',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="form" 
        options={{
          title: 'Новое измерение',
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="history" 
        options={{
          title: 'История',
        }}
      />
    </Stack>
  );
}