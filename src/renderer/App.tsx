import React, { useState, useEffect, ChangeEvent } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { GeistProvider, CssBaseline, Themes } from '@geist-ui/core';
import Homepage from './components/pages/Homepage';
import AgentsView from './components/pages/AgentsView';
import Settings from './components/pages/Settings';
import WebFont from 'webfontloader';
import ChatView from './components/pages/ChatView';

import './App.css';

export default function App() {
  const [customTheme, setCustomTheme] = useState(
    Themes.createFromLight({
      type: 'custom',
      font: {
        sans: 'Arial, sans-serif',
      },
    })
  );
  const [settings, setSettings] = useState<string[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('load-settings', [])
      .then((loadedSettings: unknown[]) => {
        setSettings(loadedSettings as string[]);
      });
  }, []);

  const handleSaveSettings = (settings:Array<string>) => {
    window.electron.ipcRenderer.sendMessage('save-settings', settings);
  };

  const handleInputChange = (string: string, settingType: string): void => {
    const previousSettings = [...settings];
    //if previousSettings is empty, add the new setting
    if (previousSettings.length === 0) {
      const newSetting = [`${settingType}=${string}`];
      handleSaveSettings(newSetting);
      setSettings(newSetting);
      return;
    } else if (previousSettings.some((setting) => setting.includes(settingType))) {
      const newSetting = previousSettings.map((setting) => {
        if (setting.includes(settingType)) {
          return `${settingType}=${string}`;
        }
        return setting;
      });
      handleSaveSettings(newSetting);
      setSettings(newSetting);
    } else {
      const newSetting = [...previousSettings, `${settingType}=${string}`];
      handleSaveSettings(newSetting);
      setSettings(newSetting);
    }
  };

  useEffect(() => {
    const font = settings.find((setting) => setting.includes('font'));
    const fontLink = font?.split('font=')[1];
    changeFont(fontLink ?? 'https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
  }, [settings]);


  const handleChangeFont = (fontLink: string) => {
    handleInputChange(fontLink, 'font');
    changeFont(fontLink);
  };

  const changeFont = (fontLink: string) => {
    let fontName:string;
    try {
      fontName = fontLink.split('family=')[1].split('&')[0].replace('+', ' ');
    } catch (error) {
      fontName = 'Roboto Slab';
    }
    WebFont.load({
      google: {
        families: [fontName],
      },
      fontactive: (familyName) => {
        if (familyName === fontName) {
          const newCustomTheme = Themes.createFromLight({
            type: 'custom',
            font: {
              sans: `'${familyName}', sans-serif`,
            },
          });
          setCustomTheme(newCustomTheme);
        }
      },
    });
  };

  return (
    <GeistProvider themes={[customTheme]} themeType="custom">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<ChatView />} />
          <Route path="/agents" element={<AgentsView />} />
          <Route path="/settings" element={
            <Settings
              changeFont={handleChangeFont}
              handleSaveSettings={handleSaveSettings}
              handleInputChange={handleInputChange}
              settings={settings}
            />
          } />
        </Routes>
      </Router>
    </GeistProvider>
  );
}
