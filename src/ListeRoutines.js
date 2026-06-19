import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Routine from './Routine';
import { useRoutineStorage, sauvegarderPiliers } from './useStorage';
import { AppContext } from './App';

const routines = [
  { id: 1, nom: "Boire 1,5 à 2L d'eau", description: "Répartis sur la journée", pilier: "Nutrition", frequence: "Quotidien" },
  { id: 2, nom: "Respecter des horaires de repas", description: "Manger à heure régulière", pilier: "Nutrition", frequence: "Quotidien" },
  { id: 3, nom: "Consommer des fruits et légumes", description: "Au moins 5 portions par jour", pilier: "Nutrition", frequence: "Quotidien" },
  { id: 4, nom: "Limiter les produits ultra-transformés", description: "Privilégier le fait maison ou peu transformé", pilier: "Nutrition", frequence: "Quotidien" },
  { id: 5, nom: "Se coucher et se lever à heure régulière", description: "Même le week-end, pour stabiliser l'horloge biologique", pilier: "Sommeil", frequence: "Quotidien" },
  { id: 6, nom: "Zone de décompression 2h avant le coucher", description: "Éviter sport intense, jeux vidéo, contenus stimulants", pilier: "Sommeil", frequence: "Quotidien" },
  { id: 7, nom: "Dormir 7 à 9 heures", description: "Durée recommandée pour un adulte, > prendre en compte la nuit passée", pilier: "Sommeil", frequence: "Quotidien" },
  { id: 8, nom: "Cohérence cardiaque si besoin", description: "5 min, 1 à 3 fois par jour", pilier: "Stress", frequence: "Quotidien" },
  { id: 9, nom: "Prendre l'air au moins 20 min", description: "Lumière naturelle et air frais", pilier: "Stress", frequence: "Quotidien" },
  { id: 10, nom: "30 min d'activité modérée (marche, vélo...)", description: "Activité minimale recommandée par jour", pilier: "Mouvement", frequence: "Quotidien" },
  { id: 11, nom: "Éviter la sédentarité prolongée", description: "Se lever et bouger toutes les heures", pilier: "Mouvement", frequence: "Quotidien" },
  { id: 12, nom: "Manger des légumineuses au moins 2 fois", description: "Lentilles, pois chiches, haricots…", pilier: "Nutrition", frequence: "Hebdomadaire" },
  { id: 13, nom: "Consommer des petits poissons gras 1 à 2 fois", description: "Sardines, maquereau, hareng, riches en oméga-3", pilier: "Nutrition", frequence: "Hebdomadaire" },
  { id: 14, nom: "Évaluer la qualité de son sommeil", description: "Réveils nocturnes, fatigue au réveil, endormissement", pilier: "Sommeil", frequence: "Hebdomadaire" },
  { id: 15, nom: "Bilan du stress de la semaine", description: "Identifier les sources principales et ajuster", pilier: "Stress", frequence: "Hebdomadaire" },
  { id: 16, nom: "Faire 2 séances de sport", description: "30 min d'activité modérée/jour + 2 sessions intenses", pilier: "Mouvement", frequence: "Hebdomadaire" },
  { id: 17, nom: "Bilan sanguin complet", description: "Glycémie, vitamine D, TSH, B12, fer…", pilier: "Nutrition", frequence: "Annuel" },
  { id: 18, nom: "Consultation médecin généraliste", description: "Bilan de santé global, vaccins", pilier: "Nutrition", frequence: "Annuel" },
  { id: 19, nom: "Consultation dentaire", description: "Détartrage et vérification annuelle", pilier: "Mouvement", frequence: "Annuel" },
  { id: 20, nom: "Consultation gynécologique ou urologique", description: "Frottis, dépistage selon âge et profil", pilier: "Mouvement", frequence: "Annuel" },
];

const PILIERS = ["Tous", "Nutrition", "Sommeil", "Stress", "Mouvement"];
const FREQUENCES = ["Quotidien", "Hebdomadaire", "Annuel"];
const LABELS_FREQUENCES = {
  "Quotidien": "Aujourd'hui",
  "Hebdomadaire": "Cette semaine",
  "Annuel": "Cette année"
};

const MESSAGES_FELICITATIONS = {
  "Quotidien": { emoji: "☀️", texte: "Journée complète ! Toutes tes routines du jour sont faites." },
  "Hebdomadaire": { emoji: "🏆", texte: "Semaine complète ! Tu as réalisé toutes tes routines de la semaine." },
  "Annuel": { emoji: "✓", texte: "Année complète ! Tous tes rendez-vous annuels sont à jour." },
};

const COULEURS_CONFETTIS = ['#60d3e5', '#a8e6cf', '#ffd3a5', '#fd9853', '#c3a6e8', '#f9c4d2', '#fff'];

function Confettis({ actif }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particulesRef = useRef([]);

  useEffect(() => {
    if (!actif) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Créer les particules
    particulesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: -10,
      taille: Math.random() * 8 + 4,
      couleur: COULEURS_CONFETTIS[Math.floor(Math.random() * COULEURS_CONFETTIS.length)],
      vitesseX: (Math.random() - 0.5) * 4,
      vitesseY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      vitesseRotation: (Math.random() - 0.5) * 6,
      forme: Math.random() > 0.5 ? 'rect' : 'cercle',
    }));

    const animer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let encore = false;

      particulesRef.current.forEach(p => {
        p.x += p.vitesseX;
        p.y += p.vitesseY;
        p.rotation += p.vitesseRotation;

        if (p.y < canvas.height + 20) encore = true;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.couleur;

        if (p.forme === 'rect') {
          ctx.fillRect(-p.taille / 2, -p.taille / 2, p.taille, p.taille * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.taille / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (encore) {
        animRef.current = requestAnimationFrame(animer);
      }
    };

    animRef.current = requestAnimationFrame(animer);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [actif]);

  if (!actif) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 9999,
      }}
    />
  );
}

function ListeRoutines() {
  const { setRoutineId } = useContext(AppContext);
  const navigate = useNavigate();
  const [pilierActif, setPilierActif] = useState("Tous");
  const [frequenceActive, setFrequenceActive] = useState("Quotidien");
  const [confettisActifs, setConfettisActifs] = useState(false);
  const etaitCompleteRef = useRef(false);

  const [cocheeQuotidien, setCocheeQuotidien] = useRoutineStorage('Quotidien');
  const [cocheeHebdo, setCocheeHebdo] = useRoutineStorage('Hebdomadaire');
  const [cocheeAnnuel, setCocheeAnnuel] = useRoutineStorage('Annuel');

  const cochees = frequenceActive === 'Quotidien' ? cocheeQuotidien :
                  frequenceActive === 'Hebdomadaire' ? cocheeHebdo : cocheeAnnuel;

  const setCochees = frequenceActive === 'Quotidien' ? setCocheeQuotidien :
                     frequenceActive === 'Hebdomadaire' ? setCocheeHebdo : setCocheeAnnuel;

  const ouvrirFiche = (id) => {
    setRoutineId(id);
    navigate('/fiche');
  };

  const routinesFiltrees = routines.filter(r => {
    const pilierOk = frequenceActive === "Annuel" || pilierActif === "Tous" || r.pilier === pilierActif;
    const frequenceOk = r.frequence === frequenceActive;
    return pilierOk && frequenceOk;
  });

  const totalFrequence = routines.filter(r => r.frequence === frequenceActive).length;
  const completeesFréquence = cochees.filter(id =>
    routines.find(r => r.id === id && r.frequence === frequenceActive)
  ).length;
  const estComplete = completeesFréquence >= totalFrequence;

  const total = routinesFiltrees.length;
  const idsActifs = routinesFiltrees.map(r => r.id);
  const completees = cochees.filter(id => idsActifs.includes(id)).length;
  const progression = total > 0 ? Math.round((completees / total) * 100) : 0;

  const toggleRoutine = (id) => {
    const nouvellesCochees = cochees.includes(id)
      ? cochees.filter(i => i !== id)
      : [...cochees, id];
    setCochees(nouvellesCochees);
    sauvegarderPiliers(frequenceActive, nouvellesCochees, routines);
  };

  // Déclencher les confettis uniquement au moment où on passe à 100%
  useEffect(() => {
    if (estComplete && !etaitCompleteRef.current) {
      setConfettisActifs(true);
      setTimeout(() => setConfettisActifs(false), 3500);
    }
    etaitCompleteRef.current = estComplete;
  }, [estComplete]);

  // Réinitialiser la ref quand on change de fréquence
  useEffect(() => {
  etaitCompleteRef.current = estComplete;
}, [frequenceActive, estComplete]);

  const felicitations = MESSAGES_FELICITATIONS[frequenceActive];

  return (
    <div className="liste-routines">

      <Confettis actif={confettisActifs} />

      <div className="frequences">
        {FREQUENCES.map(f => (
          <button
            key={f}
            className={`freq-btn ${frequenceActive === f ? 'actif' : ''}`}
            onClick={() => {
              setFrequenceActive(f);
              if (f === "Annuel") setPilierActif("Tous");
            }}
          >
            {LABELS_FREQUENCES[f]}
          </button>
        ))}
      </div>

      {estComplete && (
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          border: '0.5px solid rgba(255,255,255,0.4)',
          borderRadius: 12,
          padding: '0.8rem 1rem',
          marginBottom: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>{felicitations.emoji}</div>
          <div style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{felicitations.texte}</div>
        </div>
      )}

      <div className="progression-wrap">
        <div className="progression-texte">
          <span key={completees}>{completees} / {total} complétées</span>
          <span key={`pct-${completees}`}>{progression}%</span>
        </div>
        <div className="progression-bar">
          <div className="progression-fill" style={{ width: `${progression}%` }} />
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'white', textAlign: 'center', marginBottom: 8, fontStyle: 'italic' }}>
        Clique sur chaque routine pour + d'infos
      </p>

      {frequenceActive !== "Annuel" && (
        <div className="piliers-filtres">
          {PILIERS.map(p => (
            <button
              key={p}
              className={`pilier-btn ${p.toLowerCase()} ${pilierActif === p ? 'actif' : ''}`}
              onClick={() => setPilierActif(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="routines-liste">
        {routinesFiltrees.map(r => (
          <Routine
            key={r.id}
            nom={r.nom}
            description={r.description}
            pilier={r.pilier}
            cochee={cochees.includes(r.id)}
            onToggle={() => toggleRoutine(r.id)}
            onOuvrirFiche={() => ouvrirFiche(r.id)}
            afficherPilier={frequenceActive !== "Annuel"}
          />
        ))}
      </div>

    </div>
  );
}

export default ListeRoutines;