import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide all headers for modern design
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
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="history" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
