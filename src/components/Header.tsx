import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

const Header: React.FC<HeaderProps> = memo(({ 
  title, 
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF' 
}) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </View>
  );
});

Header.displayName = 'Header';

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Header;