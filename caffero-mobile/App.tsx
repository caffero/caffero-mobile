import React, { useState, useEffect } from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ExceptionProvider } from './src/contexts/ExceptionContext';
import { Navigation } from './src/navigation/Navigation';
import { SplashScreen } from './src/components/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate some initialization time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show splash screen for 2 seconds
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <ExceptionProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ExceptionProvider>
  );
};

export default App;