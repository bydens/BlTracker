import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F0F2F5', // Новый цвет фона заголовка
        },
        headerTintColor: '#1F2937', // Новый цвет текста заголовка
        headerTitleStyle: {
          fontWeight: 'bold', // Сделаем шрифт заголовка жирным
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false, // Скрываем заголовок для приветственного экрана
        }}
      />
      <Stack.Screen 
        name="form" 
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
