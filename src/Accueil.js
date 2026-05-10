import React from 'react';
import { useNavigate } from 'react-router-dom';

function Accueil() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="accueil-wrap">

      <div className="accueil-date">{today}</div>

      <div className="accueil-hero">

  <h2 className="accueil-hero-titre">Bonjour 🩵</h2>
<p className="accueil-hero-message">Sérénitine t'accompagne chaque jour pour retrouver un rythme qui te fait du bien. Avec des routines d'hygiène de vie simples à réaliser, tu progresses à ton rythme sans pression, un pas après l'autre. L'objectif n'est pas d'être parfait dès le début, mais d'avancer progressivement afin d'optimiser ton bien-être et ta santé. L'onglet Resssources t'aide à mieux comprendre les routines et à devenir un expert en hygiène de vie !</p>
</div>

      <div className="accueil-section-titre">Les 4 piliers</div>

      <div className="accueil-piliers">
        <div className="accueil-pilier nutrition" onClick={() => navigate('/')}>
          <span className="accueil-pilier-icon">🥗</span>
          <span className="accueil-pilier-nom">Nutrition</span>
        </div>
        <div className="accueil-pilier sommeil" onClick={() => navigate('/')}>
          <span className="accueil-pilier-icon">😴</span>
          <span className="accueil-pilier-nom">Sommeil</span>
        </div>
        <div className="accueil-pilier stress" onClick={() => navigate('/')}>
          <span className="accueil-pilier-icon">🧘</span>
          <span className="accueil-pilier-nom">Stress</span>
        </div>
        <div className="accueil-pilier mouvement" onClick={() => navigate('/')}>
          <span className="accueil-pilier-icon">🏃</span>
          <span className="accueil-pilier-nom">Mouvement</span>
        </div>
      </div>

      <div className="accueil-section-titre">Par où commencer ?</div>

      <div className="accueil-cards">
        <div className="accueil-card" onClick={() => navigate('/')}>
          <span className="accueil-card-icon">✅</span>
          <div>
            <div className="accueil-card-titre">Routines du jour</div>
            <div className="accueil-card-sub">Cochez vos habitudes quotidiennes</div>
          </div>
          <span className="accueil-card-arrow">→</span>
        </div>
        <div className="accueil-card" onClick={() => navigate('/ressources')}>
          <span className="accueil-card-icon">📖</span>
          <div>
            <div className="accueil-card-titre">Ressources</div>
            <div className="accueil-card-sub">Comprendre pourquoi c'est important</div>
          </div>
          <span className="accueil-card-arrow">→</span>
        </div>
        <div className="accueil-card" onClick={() => navigate('/statistiques')}>
          <span className="accueil-card-icon">📊</span>
          <div>
            <div className="accueil-card-titre">Statistiques</div>
            <div className="accueil-card-sub">Suivre votre progression</div>
          </div>
          <span className="accueil-card-arrow">→</span>
        </div>
      </div>

    </div>
  );
}

export default Accueil;