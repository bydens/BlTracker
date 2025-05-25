import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { memo } from 'react';

const RootLayout: React.FC = memo(() => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#F8F9FA" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
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
    </>
  );
});

RootLayout.displayName = 'RootLayout';

export default RootLayout;
