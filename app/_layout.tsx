import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Добавить измерение',
        }}
      />
      <Stack.Screen 
        name="history" 
        options={{
          title: 'История измерений',
        }}
      />
    </Stack>
  );
}
