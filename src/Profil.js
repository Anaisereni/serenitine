import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Profil() {
    const navigate = useNavigate();
  const [prenom, setPrenom] = useState(
    localStorage.getItem('prenom') || ''
  );
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

  const histQuotidien = JSON.parse(localStorage.getItem('historique_Quotidien') || '{}');
  const histHebdo = JSON.parse(localStorage.getItem('historique_Hebdomadaire') || '{}');
  const histAnnuel = JSON.parse(localStorage.getItem('historique_Annuel') || '{}');

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

  return (
    <div className="profil-wrap">

      <div className="profil-hero">
        <div className="profil-avatar">
 <img src="/profilnew.png" alt="Logo Sérénitine" />
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
            <button className="profil-btn-edit" onClick={() => setEdition(true)}>
              ✏️ Modifier
            </button>
          </div>
        )}
        <div className="profil-badge">Plan Gratuit</div>
      </div>

      <div className="profil-section-titre">Résumé du moment</div>

      <div className="profil-stats">
        <div className="profil-stat-card">
          <div className="profil-stat-icon">📅</div>
          <div className="profil-stat-label">Aujourd'hui</div>
          <div className="profil-stat-valeur">{cocheeAujourdhui}/{totalQuotidien}</div>
          <div className="profil-stat-barre-bg">
            <div className="profil-stat-barre-fill" style={{ width: `${pctJour}%`, background: '#56b4d1' }} />
          </div>
          <div className="profil-stat-pct">{pctJour}%</div>
        </div>

        <div className="profil-stat-card">
          <div className="profil-stat-icon">📆</div>
          <div className="profil-stat-label">Cette semaine</div>
          <div className="profil-stat-valeur">{cocheeCetteSemaine}/{totalHebdo}</div>
          <div className="profil-stat-barre-bg">
            <div className="profil-stat-barre-fill" style={{ width: `${pctSemaine}%`, background: '#56b4d1' }} />
          </div>
          <div className="profil-stat-pct">{pctSemaine}%</div>
        </div>

        <div className="profil-stat-card">
          <div className="profil-stat-icon">🗓️</div>
          <div className="profil-stat-label">Cette année</div>
          <div className="profil-stat-valeur">{cocheeAnnuel}/{totalAnnuel}</div>
          <div className="profil-stat-barre-bg">
            <div className="profil-stat-barre-fill" style={{ width: `${pctAnnee}%`, background: '#56b4d1' }} />
          </div>
          <div className="profil-stat-pct">{pctAnnee}%</div>
        </div>
      </div>

     
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
      }}>
        🗑️ Réinitialiser mes données
      </button>
    </div>
  );
}
export default Profil;