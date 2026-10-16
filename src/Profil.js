import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PenLine,
  Trash2,
  User,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import Statistiques from './Statistiques';





function calculerStreak(histQuotidien) {
  const TOTAL = 11;
  const SEUIL = 0.67;
  let streak = 0;
  const today = new Date();
  let i = 0;

  while (true) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const valeur = histQuotidien[key] || 0;
    const pct = valeur / TOTAL;
    if (pct >= SEUIL) {
      streak++;
      i++;
    } else {
      break;
    }
  }
  return streak;
}

function Profil() {
  const navigate = useNavigate();

  const histQuotidien = JSON.parse(localStorage.getItem('historique_Quotidien') || '{}');

  const streak = calculerStreak(histQuotidien);

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



 

  return (
    
    <div className="profil-wrap">
<div className="entete-onglet">
  <h2 className="entete-onglet__titre">
    <User size={21} />
    Mon profil
  </h2>
  <p className="entete-onglet__description">
    Retrouve ton évolution et les informations à propos de Sérénitine
  </p>
</div>
     <div
  className="profil-hero"
  style={{ position: 'relative', overflow: 'hidden' }}
>
  {[false, true].map((basDroite) => (
    <svg
      key={String(basDroite)}
      aria-hidden="true"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: basDroite ? 'auto' : 0,
        left: basDroite ? 'auto' : 0,
        bottom: basDroite ? 0 : 'auto',
        right: basDroite ? 0 : 'auto',
        width: 100,
        height: 100,
        pointerEvents: 'none',
        transform: basDroite ? 'rotate(180deg)' : 'none',
      }}
    >
      <path d="M0 0 Q45 5 50 20 Q28 22 0 0 Z" fill="rgba(130,165,190,0.30)" />
      <path d="M0 0 Q48 15 52 32 Q28 32 0 0 Z" fill="rgba(130,165,190,0.25)" />
      <path d="M0 0 Q42 25 44 42 Q22 40 0 0 Z" fill="rgba(130,165,190,0.22)" />
      <path d="M0 0 Q30 38 26 52 Q12 46 0 0 Z" fill="rgba(130,165,190,0.26)" />
      <path d="M0 0 Q16 42 10 55 Q3 45 0 0 Z" fill="rgba(130,165,190,0.22)" />
      <path d="M0 0 Q5 44 0 56 Q-3 44 0 0 Z" fill="rgba(130,165,190,0.18)" />

      <line x1="0" y1="0" x2="38" y2="16" stroke="rgba(130,165,190,0.25)" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="26" y2="38" stroke="rgba(130,165,190,0.22)" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="8" y2="48" stroke="rgba(130,165,190,0.20)" strokeWidth="1.5" />
    </svg>
  ))}
  <div className="profil-avatar">
    <img src="/profilbleu.png" alt="Logo Sérénitine" />
  </div>

  {edition ? (
    <div className="profil-edition">
      <label htmlFor="profil-prenom" className="profil-petit-texte">
        Ton prénom
      </label>

      <input
        id="profil-prenom"
        className="profil-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ton prénom"
        autoFocus
      />

      <button
        type="button"
        className="profil-btn-save"
        onClick={sauvegarder}
      >
        Sauvegarder
      </button>
    </div>
  ) : (
    <div className="profil-nom-wrap">
      <h2 className="profil-nom">
        {prenom || 'Bienvenue dans ton espace'}
      </h2>

      <button
        type="button"
        className="profil-btn-edit"
        onClick={() => setEdition(true)}
      >
        <PenLine size={14} />
        {prenom ? 'Modifier mon prénom' : 'Ajouter mon prénom'}
      </button>
    </div>
  )}

  {debutFormate && (
    <p className="profil-petit-texte">
      Avec Sérénitine depuis le {debutFormate}
    </p>
  )}
</div>

      
   <section className="profil-suivi">
  <Statistiques />

  {streak > 0 && (
    <div className="profil-serie">
      <span className="profil-serie-icone" aria-hidden="true">
        <CheckCircle2 size={22} strokeWidth={1.6} />
      </span>

      <div>
        <strong>
          {streak} jour{streak > 1 ? 's' : ''} de régularité
        </strong>
        <p>
          Au moins 67 % de tes routines quotidiennes réalisées
          chaque jour de cette série.
        </p>
      </div>
    </div>
  )}
</section>

    

     <section className="profil-a-propos">
  <h3>À propos de Sérénitine</h3>

  <button
    type="button"
    className="profil-lien"
    onClick={() => navigate('/presentation')}
  >
    <span className="profil-lien-icone">
      <User size={20} strokeWidth={1.6} />
    </span>

    <span className="profil-lien-texte">
      <strong>Qui suis-je ?</strong>
      <span>Découvre la créatrice de Sérénitine</span>
    </span>

    <span aria-hidden="true">→</span>
  </button>

  <button
    type="button"
    className="profil-lien"
    onClick={() => navigate('/legal')}
  >
    <span className="profil-lien-icone">
      <ShieldCheck size={20} strokeWidth={1.6} />
    </span>

    <span className="profil-lien-texte">
      <strong>Informations légales</strong>
      <span>Confidentialité et conditions d’utilisation</span>
    </span>

    <span aria-hidden="true">→</span>
  </button>
</section>

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