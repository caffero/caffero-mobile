import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ExceptionProvider } from './src/contexts/ExceptionContext';
import { Navigation } from './src/navigation/Navigation';

const App = () => {
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