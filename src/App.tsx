/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Production } from './pages/Production';
import { Machines } from './pages/Machines';
import { Arrets } from './pages/Arrets';
import { Qualite } from './pages/Qualite';
import { Maintenance } from './pages/Maintenance';
import { Historique } from './pages/Historique';
import { Rapports } from './pages/Rapports';
import { Utilisateurs } from './pages/Utilisateurs';
import { Parametres } from './pages/Parametres';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="production" element={<Production />} />
          <Route path="machines" element={<Machines />} />
          <Route path="arrets" element={<Arrets />} />
          <Route path="qualite" element={<Qualite />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="historique" element={<Historique />} />
          <Route path="rapports" element={<Rapports />} />
          <Route path="utilisateurs" element={<Utilisateurs />} />
          <Route path="parametres" element={<Parametres />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
