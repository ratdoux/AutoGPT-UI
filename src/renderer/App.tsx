import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import Homepage from './components/pages/Homepage';
import AgentsView from './components/pages/AgentsView';

import './App.css';

export default function App() {
  return (
    <GeistProvider>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/agents" element={<AgentsView />} />
        </Routes>
      </Router>
    </GeistProvider>
  );
}
