import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Salad, Moon, Flower2, Activity, PenLine, Sprout, Leaf, TreePine, Trash2 } from 'lucide-react';
import Statistiques from './Statistiques';

const PILIERS_INFO = {
  Nutrition: { Icon: Salad, conseil: 'Pense à mieux manger et t\'hydrater aujourd\'hui.' },
  Sommeil:   { Icon: Moon, conseil: 'Ton sommeil mérite plus d\'attention en ce moment.' },
  Stress:    { Icon: Flower2, conseil: 'Prends un moment pour souffler et décompresser.' },
  Mouvement: { Icon: Activity, conseil: 'Ton corps a besoin de bouger un peu plus !' },
};

const ROUTINES_PAR_PILIER = {
  Quotidien:    { Nutrition: 4, Sommeil: 3, Stress: 2, Mouvement: 2 },
  Hebdomadaire: { Nutrition: 2, Sommeil: 1, Stress: 1, Mouvement: 1 },
};

function getPilierLeMoinsCoche(frequence, periodKey) {
  try {
    const hist = JSON.parse(localStorage.getItem(`historique_pilier_${frequence}`) || '{}');
    const data = hist[periodKey] || {};
    const totaux = ROUTINES_PAR_PILIER[frequence];
    let minPct = Infinity;
    let pilierMin = null;
    Object.entries(totaux).forEach(([pilier, total]) => {
      if (total === 0) return;
      const coches = data[pilier] || 0;
      const pct = coches / total;
      if (pct < minPct) { minPct = pct; pilierMin = pilier; }
    });
    return minPct < 1 ? pilierMin : null;
  } catch { return null; }
}

function Profil() {
  const navigate = useNavigate();

  const histQuotidien = JSON.parse(localStorage.getItem('historique_Quotidien') || '{}');
  const histHebdo = JSON.parse(localStorage.getItem('historique_Hebdomadaire') || '{}');
  const histAnnuel = JSON.parse(localStorage.getItem('historique_Annuel') || '{}');

  const toutesLesDates = [
    ...Object.keys(histQuotidien),
  ].filter(Boolean).sort();

  const dateDebut = toutesLesDates.length > 0 ? toutesLesDates[0] : null;
  const debutFormate = dateDebut
    ? new Date(dateDebut + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const [prenom, setPrenom] = useState(localStorage.getItem('prenom') || '');
  const [edition, setEdition] = useState(false);
  const [input, setInput] = useState(prenom);

  const sauvegarder = () => {
    localStorage.setItem('prenom', input);
    setPrenom(input);
    setEdition(false);
  };

  const totalQuotidien = 11;
  const totalHebdo = 5;
  const totalAnnuel = 4;

  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const getWeekKey = () => {
    const now = new Date();
    const monday = new Date(now);
    const day = monday.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    monday.setDate(monday.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    const year = monday.getFullYear();
    const month = String(monday.getMonth() + 1).padStart(2, '0');
    const date = String(monday.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  const weekKey = getWeekKey();
  const yearKey = `${now.getFullYear()}`;

  const cocheeAujourdhui = histQuotidien[today] || 0;
  const cocheeCetteSemaine = histHebdo[weekKey] || 0;
  const cocheeAnnuel = histAnnuel[yearKey] || 0;

  const pctJour = Math.round((cocheeAujourdhui / totalQuotidien) * 100);
  const pctSemaine = Math.round((cocheeCetteSemaine / totalHebdo) * 100);
  const pctAnnee = Math.round((cocheeAnnuel / totalAnnuel) * 100);

  const pilierFaible = getPilierLeMoinsCoche('Quotidien', today);
  const infoFaible = pilierFaible ? PILIERS_INFO[pilierFaible] : null;

  return (
    <div className="profil-wrap">

      <div className="profil-hero" style={{ position: 'relative', overflow: 'hidden' }}>

        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 100, pointerEvents: 'none' }}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 Q45 5 50 20 Q28 22 0 0 Z" fill="rgba(168,205,216,0.5)"/>
          <path d="M0 0 Q48 15 52 32 Q28 32 0 0 Z" fill="rgba(168,205,216,0.45)"/>
          <path d="M0 0 Q42 25 44 42 Q22 40 0 0 Z" fill="rgba(168,205,216,0.4)"/>
          <path d="M0 0 Q30 38 26 52 Q12 46 0 0 Z" fill="rgba(168,205,216,0.45)"/>
          <path d="M0 0 Q16 42 10 55 Q3 45 0 0 Z" fill="rgba(168,205,216,0.35)"/>
          <path d="M0 0 Q5 44 0 56 Q-3 44 0 0 Z" fill="rgba(168,205,216,0.3)"/>
          <line x1="0" y1="0" x2="38" y2="16" stroke="rgba(168,205,216,0.4)" strokeWidth="1.5"/>
          <line x1="0" y1="0" x2="26" y2="38" stroke="rgba(168,205,216,0.35)" strokeWidth="1.5"/>
          <line x1="0" y1="0" x2="8" y2="48" stroke="rgba(168,205,216,0.3)" strokeWidth="1.5"/>
        </svg>

        <svg
          style={{ position: 'absolute', bottom: 0, right: 0, width: 100, height: 100, pointerEvents: 'none', transform: 'rotate(180deg)' }}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 Q45 5 50 20 Q28 22 0 0 Z" fill="rgba(255,255,255,0.25)"/>
          <path d="M0 0 Q48 15 52 32 Q28 32 0 0 Z" fill="rgba(255,255,255,0.2)"/>
          <path d="M0 0 Q42 25 44 42 Q22 40 0 0 Z" fill="rgba(255,255,255,0.18)"/>
          <path d="M0 0 Q30 38 26 52 Q12 46 0 0 Z" fill="rgba(255,255,255,0.22)"/>
          <path d="M0 0 Q16 42 10 55 Q3 45 0 0 Z" fill="rgba(255,255,255,0.17)"/>
          <path d="M0 0 Q5 44 0 56 Q-3 44 0 0 Z" fill="rgba(255,255,255,0.14)"/>
          <line x1="0" y1="0" x2="38" y2="16" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
          <line x1="0" y1="0" x2="26" y2="38" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
          <line x1="0" y1="0" x2="8" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        </svg>

        <div className="profil-avatar">
          <img src="/profilbleu.png" alt="Logo Sérénitine" />
        </div>
        {edition ? (
          <div className="profil-edition">
            <input
              className="profil-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Votre prénom"
              autoFocus
            />
            <button className="profil-btn-save" onClick={sauvegarder}>
              Sauvegarder
            </button>
          </div>
        ) : (
          <div className="profil-nom-wrap">
            <h2 className="profil-nom">{prenom || 'Ajouter votre prénom'}</h2>
            <button className="profil-btn-edit" onClick={() => setEdition(true)} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <PenLine size={14} /> Modifier
            </button>
          </div>
        )}
        <div className="profil-badge">Plan Gratuit</div>
        {debutFormate && (
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>
            Avec Sérénitine depuis le {debutFormate}
          </div>
        )}
      </div>

      {infoFaible && (
        <div style={{
          background: 'rgba(255,255,255,0.1)', borderRadius: 12,
          padding: '0.8rem 1rem', marginBottom: '1.2rem',
          border: '0.5px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <infoFaible.Icon size={22} color="white" />
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>
              Pilier à renforcer — {pilierFaible}
            </div>
            <div style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>
              {infoFaible.conseil}
            </div>
          </div>
        </div>
      )}

      


<Statistiques />

      <div className="profil-section-titre" style={{ marginTop: '1.5rem' }}>À propos de l'app</div>

      <div className="profil-infos" style={{ marginBottom: '1.5rem' }}>
        <div className="profil-info-row" onClick={() => navigate('/presentation')} style={{ cursor: 'pointer', color: '#1c1c1a' }}>
          <span>Qui suis-je ?</span>
          <span>→</span>
        </div>
      </div>

      <div className="profil-infos">
        <div className="profil-info-row" onClick={() => navigate('/legal')} style={{ cursor: 'pointer', color: '#111212' }}>
          <span>Informations légales</span>
          <span>→</span>
        </div>
      </div>

      <button className="profil-btn-reset" onClick={() => {
        if (window.confirm('Effacer toutes les données ?')) {
          localStorage.clear();
          window.location.reload();
        }
      }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Trash2 size={16} /> Réinitialiser mes données
      </button>
    </div>
  );
}

export default Profil;