import React, { useState, useEffect } from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ExceptionProvider } from './src/contexts/ExceptionContext';
import { Navigation } from './src/navigation/Navigation';
import { SplashScreen } from './src/components/SplashScreen';
import { languageService } from './src/api/services/languageService';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate some initialization time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show splash screen for 2 seconds
  }, []);

  // Test getLanguages method
  useEffect(() => {
    const testLanguageService = async () => {
      try {
        console.log('Fetching languages...');
        const languages = await languageService.getLanguages();
        console.log('Languages fetched successfully:', languages);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    testLanguageService();
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