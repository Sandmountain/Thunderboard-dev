import React, { useState } from 'react';

import './App.css';
import { SettingsContext } from './Context/SettingsContext';

import MainDashboard from './Components/Layout/MainDashboard';
import { LoadSettings } from './LoadSettings/LoadSettings';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3a3a3a' },
    secondary: { main: '#dc3545' },
    warning: { main: '#ffc107' },
    error: { main: '#dc3545' },
    success: { main: '#28a745' },
  },
});

function App() {
  const loadSettings = LoadSettings();
  const [settings, setSettings] = useState(loadSettings);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <SettingsContext.Provider value={{ settings, setSettings }}>
          <MainDashboard />
        </SettingsContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
