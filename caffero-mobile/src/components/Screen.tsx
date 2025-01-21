import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import ErrorBoundary from './ErrorBoundary';
import { Text } from 'react-native';

type ScreenProps = {
  children: ReactNode;
};

const ErrorFallback = () => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>Something went wrong.</Text>
    <Text style={styles.errorSubText}>Please try again later.</Text>
  </View>
);

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <View style={styles.container}>
        {children}
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Screen; 