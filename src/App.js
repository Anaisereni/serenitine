import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import Accueil from './Accueil';
import ListeRoutines from './ListeRoutines';
import FichePourquoi from './FichePourquoi';
import Statistiques from './Statistiques';
import Profil from './Profil';
import Ressources from './Ressources';
import Legal from './Legal';
import APropos from './APropos';
import Presentation from './Presentation';

export const AppContext = React.createContext(null);

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <button
        className={`nav-item ${location.pathname === '/accueil' ? 'actif' : ''}`}
        onClick={() => navigate('/accueil')}
      >
        <span className="nav-icon">🏠</span>
        <span>Accueil</span>
      </button>
      <button
        className={`nav-item ${location.pathname === '/' ? 'actif' : ''}`}
        onClick={() => navigate('/')}
      >
        <span className="nav-icon">✅</span>
        <span>Routines</span>
      </button>
      <button
  className={`nav-item ${location.pathname === '/ressources' ? 'actif' : ''}`}
  onClick={() => navigate('/ressources')}
>
  <span className="nav-icon">📖</span>
  <span>Ressources</span>
</button>
<button
  className={`nav-item ${location.pathname === '/statistiques' ? 'actif' : ''}`}
  onClick={() => navigate('/statistiques')}
>
  <span className="nav-icon">📊</span>
  <span>Statistiques</span>
</button>
      <button
        className={`nav-item ${location.pathname === '/profil' ? 'actif' : ''}`}
        onClick={() => navigate('/profil')}
      >
        <span className="nav-icon">👤</span>
        <span>Profil</span>
      </button>
    </nav>
  );
}

function ContenuApp() {
  const [routineId, setRoutineId] = useState(null);
  const navigate = useNavigate();

  const ouvrirFiche = (id) => {
    setRoutineId(id);
    navigate('/fiche');
  };

  return (
    <AppContext.Provider value={{ routineId, setRoutineId }}>
      <div className="app">
        <header className="app-header">
          <img src="/sereniti.png" alt="Logo Routines" className="header-logo" />
          <p>✹ Tes routines bien-être pour une vie plus sereine ✹</p>
        </header>
        <main className="app-main">
          <Routes>
  <Route path="/accueil" element={<Accueil />} />
  <Route path="/" element={<ListeRoutines onOuvrirFiche={ouvrirFiche} />} />
  <Route path="/fiche" element={<FichePourquoi />} />
  <Route path="/statistiques" element={<Statistiques />} />
  <Route path="/ressources" element={<Ressources />} />
  <Route path="/profil" element={<Profil />} />
  <Route path="/legal" element={<Legal />} />
  <Route path="/apropos" element={<APropos />} />
  <Route path="/presentation" element={<Presentation />} />
  <Route path="*" element={<div style={{padding:'1rem'}}>Route non trouvée</div>} />
</Routes>
        </main>
        <NavBar />
<NavBar />
{!localStorage.getItem('consentement_accepted') && (
  <div style={{
    position: 'fixed', bottom: 0, left: 0, right: 0, top: 0,
    background: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'flex-end', zIndex: 1000
  }}>
    <div style={{
      background: 'white', borderRadius: '20px 20px 0 0',
      padding: '1.5rem', width: '100%', textAlign: 'center'
    }}>
      <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
        Cette app ne collecte aucune donnée personnelle. Vos données restent sur votre appareil.
      </p>
      <button
        style={{
          marginTop: '1rem', width: '100%', padding: 14,
          background: '#1D9E75', color: 'white', border: 'none',
          borderRadius: 12, fontSize: 15, cursor: 'pointer'
        }}
        onClick={() => {
          localStorage.setItem('consentement_accepted', 'true');
          window.location.reload();
        }}
      >
        J'ai compris ✓
      </button>
    </div>
  </div>
)}
      </div>
    </AppContext.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ContenuApp />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;