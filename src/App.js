import React, { useState, useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Home, CheckCircle2, BookOpen, Wrench, User } from 'lucide-react';
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
import Outils from './Outils';

export const AppContext = React.createContext(null);

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  

 return (
  <nav className="nav-bar">
    <button
      className={`nav-item ${
        location.pathname === '/accueil' ||
        location.pathname === '/'
          ? 'actif'
          : ''
      }`}
      onClick={() => navigate('/accueil')}
    >
      <span className="nav-icon"><Home size={20} /></span>
      <span>Accueil</span>
    </button>

    <button
      className={`nav-item ${
        location.pathname === '/routines' ||
        location.pathname === '/fiche'
          ? 'actif'
          : ''
      }`}
      onClick={() => navigate('/routines')}
    >
      <span className="nav-icon"><CheckCircle2 size={20} /></span>
      <span>Routines</span>
    </button>

    <button
      className={`nav-item ${
        location.pathname === '/ressources' ||
        location.pathname.startsWith('/ressources/')
          ? 'actif'
          : ''
      }`}
      onClick={() => navigate('/ressources')}
    >
      <span className="nav-icon"><BookOpen size={20} /></span>
      <span>Articles</span>
    </button>

    <button
      className={`nav-item ${
        location.pathname === '/outils' ? 'actif' : ''
      }`}
      onClick={() => navigate('/outils')}
    >
      <span className="nav-icon"><Wrench size={20} /></span>
      <span>Outils</span>
    </button>

    <button
     className={`nav-item ${
  ['/profil', '/presentation', '/legal', '/apropos', '/statistiques']
    .includes(location.pathname)
    ? 'actif'
    : ''
}`}
      onClick={() => navigate('/profil')}
    >
      <span className="nav-icon"><User size={20} /></span>
      <span>Profil</span>
    </button>
  </nav>
);
}

function ContenuApp() {
  const [routineId, setRoutineId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cheminPrecedent = useRef(location.pathname);

useLayoutEffect(() => {
  const chemin = location.pathname;
  const precedent = cheminPrecedent.current;

  cheminPrecedent.current = chemin;

  if (chemin === '/ressources') {
    // Conserve la position uniquement lorsqu'on revient d'un article.
    if (!precedent.startsWith('/ressources/')) {
      sessionStorage.setItem('ressources_position', '0');
    }

    // Ressources gère déjà le défilement de sa liste.
    return;
  }

  // Ressources gère déjà l'ouverture des articles en haut.
  if (chemin.startsWith('/ressources/')) {
    return;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
}, [location.pathname]);

  const ouvrirFiche = (id) => {
    setRoutineId(id);
    navigate('/fiche');
  };

  return (
    <AppContext.Provider value={{ routineId, setRoutineId }}>
      <div className="app">
        {(location.pathname === '/accueil' || location.pathname === '/') && (
          <header className="app-header accueil-marque">
  <div className="accueil-marque-nom">
    <h1>Sérénitine</h1>

    <svg
      className="accueil-marque-feuilles"
      viewBox="0 0 60 70"
      aria-hidden="true"
    >
      <path
        d="M12 62 Q27 38 43 12"
        fill="none"
        stroke="#87a7bf"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 39 C24 19 35 6 53 4 C51 23 43 35 28 39Z"
        fill="#87a7bf"
      />
      <path
        d="M23 48 C6 43 4 28 8 16 C23 23 29 35 23 48Z"
        fill="#a6bfd0"
      />
      <path
        d="M28 39 Q39 23 48 12"
        fill="none"
        stroke="#f9f5ec"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  </div>

  <p className="accueil-marque-signature">
    Bien-être &amp; hygiène de vie
  </p>
</header>
        )}
        <main className="app-main">
          <Routes>
           <Route path="/" element={<Navigate to="/accueil" replace />} />
<Route path="/accueil" element={<Accueil />} />
            <Route path="/routines" element={<ListeRoutines onOuvrirFiche={ouvrirFiche} />} />
            <Route path="/fiche" element={<FichePourquoi />} />
            <Route path="/statistiques" element={<Statistiques />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/ressources/:articleId" element={<Ressources />} />
            <Route path="/outils" element={<Outils />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/apropos" element={<APropos />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="*" element={<div style={{padding:'1rem'}}>Route non trouvée</div>} />
          </Routes>
        </main>
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
                Tes saisies personnelles restent sur cet appareil.
Sérénitine utilise Cloudflare pour son hébergement
et une mesure d’audience sans cookies.
Retrouve les détails dans Profil → Informations légales.
              </p>
              <button
                style={{
                  marginTop: '1rem', width: '100%', padding: 14,
                  background: '#2b427b', color: 'white', border: 'none',
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
    </BrowserRouter>
  );
}

export default App;