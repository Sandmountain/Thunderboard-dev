import React, { useState } from 'react';

import './App.css';
import { SettingsContext } from './Context/SettingsContext';

import MainDashboard from './Components/Layout/MainDashboard';
import { LoadSettings } from './LoadSettings/LoadSettings';

function App() {
  const loadSettings = LoadSettings();
  const [settings, setSettings] = useState(loadSettings);

  return (
    <div>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <MainDashboard />
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
