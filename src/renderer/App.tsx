import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.svg';
import { GeistProvider, CssBaseline, Themes } from '@geist-ui/core';
import Homepage from './components/pages/Homepage';
import AgentsView from './components/pages/AgentsView';
import Settings from './components/pages/Settings';
import WebFont from 'webfontloader';

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

  const changeFont = (fontLink: string) => {
    console.log(fontLink, customTheme);
    const fontName = fontLink.split('family=')[1].split('&')[0].replace('+', ' ');

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
          <Route path="/agents" element={<AgentsView />} />
          <Route path="/settings" element={<Settings changeFont={changeFont} />} />
        </Routes>
      </Router>
    </GeistProvider>
  );
}
