import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { Navigation } from './src/navigation/Navigation';

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;