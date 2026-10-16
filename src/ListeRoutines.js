import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAudioCtx, debloqueurAudio } from './audio';
import { useRoutineStorage, sauvegarderPiliers } from './useStorage';
import { AppContext } from './App';
import { CheckCircle2, Smile } from 'lucide-react';

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

const HUMEURS = [
  { valeur: 'tres-bien', emoji: '😊', label: 'Très bien' },
  { valeur: 'bien', emoji: '🙂', label: 'Bien' },
  { valeur: 'neutre', emoji: '😐', label: 'Neutre' },
  { valeur: 'bof', emoji: '😕', label: 'Bof' },
  { valeur: 'pas-bien', emoji: '😔', label: 'Pas très bien' },
];


const MESSAGES_FELICITATIONS = {
  "Quotidien": { emoji: "🎉", texte: "Journée complète ! Toutes tes routines du jour sont faites." },
  "Hebdomadaire": { emoji: "🥳", texte: "Semaine complète ! Tu as réalisé toutes tes routines de la semaine." },
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

const THEMES_ROUTINES = {
  Tous: { fond: '#e8eff4', couleur: '#526f84' },
  Nutrition: { fond: '#eaf3de', couleur: '#52734a' },
  Sommeil: { fond: '#e6f1fb', couleur: '#526f84' },
  Stress: { fond: '#faeeda', couleur: '#987440' },
  Mouvement: { fond: '#f2e8f1', couleur: '#927094' },
};

const STYLE_ROUTINES = `
.routines-modernisees .routines-frequences { display: flex; gap: 4px; padding: 6px; margin-bottom: 18px; background: #faf6ee; border: 1px solid #e8dece; border-radius: 18px; }
.routines-modernisees .routines-frequences button { flex: 1; min-width: 0; min-height: 44px; padding: 9px 4px; border: none; border-radius: 13px; background: transparent; color: #786b5e; font: inherit; font-size: 12px; line-height: 1.5; cursor: pointer; }
.routines-modernisees .routines-frequences button[aria-pressed="true"] { background: #5c3d2e; color: #fffaf3; font-weight: 500; }
.routines-modernisees .routines-progression, .routines-modernisees .routines-humeur { padding: 20px; margin-bottom: 18px; background: #faf6ee; border: 1px solid #e8dece; border-radius: 22px; }
.routines-modernisees .routines-progression-entete, .routines-modernisees .routines-humeur-entete { display: flex; align-items: center; gap: 12px; }
.routines-modernisees .routines-progression-entete > div, .routines-modernisees .routines-humeur-entete > div { flex: 1; min-width: 0; }
.routines-modernisees .routines-pastille { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 42px; height: 42px; border-radius: 50%; background: #e8eff4; color: #526f84; }
.routines-modernisees .routines-progression h3, .routines-modernisees .routines-humeur h3 { margin: 0; color: #5c3d2e; font-size: 15px; font-weight: 600; line-height: 1.5; }
.routines-modernisees .routines-progression p, .routines-modernisees .routines-humeur p { margin: 5px 0 0; color: #786b5e; font-size: 12px; line-height: 1.7; }
.routines-modernisees .routines-progression strong { flex-shrink: 0; color: #5c3d2e; font-size: 24px; font-weight: 600; }
.routines-modernisees .routines-progression small { font-size: 12px; }
.routines-modernisees .routines-jauge { height: 8px; margin-top: 18px; background: #e8dece; border-radius: 10px; overflow: hidden; }
.routines-modernisees .routines-jauge > div { height: 100%; background: #78916c; border-radius: 10px; transition: width .3s ease; }
.routines-modernisees .routines-filtres { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px; margin-bottom: 12px; background: #faf6ee; border: 1px solid #e8dece; border-radius: 18px; }
.routines-modernisees .routines-filtres button { flex: 1 1 auto; min-height: 38px; padding: 8px 10px; border: 1px solid transparent; border-radius: 12px; font: inherit; font-size: 12px; cursor: pointer; }
.routines-modernisees .routines-filtres button[aria-pressed="true"] { border-color: currentColor; font-weight: 600; }
.routines-modernisees .routines-indication { margin: 12px 0 14px; color: #304c60; font-size: 12px; font-style: italic; text-align: center; line-height: 1.7; }
.routines-modernisees .routines-cartes { display: grid; gap: 10px; }
.routines-modernisees .routine-carte { display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: #faf6ee; border: 1px solid #e8dece; border-radius: 20px; }
.routines-modernisees .routine-carte.est-cochee { background: #edf3e8; border-color: #c9d8c3; }
.routines-modernisees .routine-carte input { flex-shrink: 0; width: 22px; height: 22px; margin: 10px 0 0; accent-color: #52734a; cursor: pointer; }
.routines-modernisees .routine-ouvrir { display: flex; flex-direction: column; align-items: stretch; gap: 8px; flex: 1; min-width: 0; min-height: 44px; padding: 0; border: none; background: transparent; font: inherit; text-align: left; cursor: pointer; }
.routines-modernisees .routine-carte-nom { color: #5c3d2e; font-size: 14px; font-weight: 600; line-height: 1.6; }
.routines-modernisees .routine-carte-description {
  display: block;
  color: #786b5e;
  font-family: inherit;
  font-size: 13px;
  font-weight: 400;
  font-style: normal;
  line-height: 1.8;
  text-align: left;
}
.routines-modernisees .routine-carte-bas { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.routines-modernisees .routine-carte-badge { padding: 3px 9px; border-radius: 20px; font-size: 10px; line-height: 1.5; }
.routines-modernisees .routine-carte-fleche { margin-left: auto; color: #92765b; }
.routines-modernisees .routines-felicitations { padding: 18px; margin-bottom: 18px; background: #edf3e8; border: 1px solid #c9d8c3; border-radius: 20px; text-align: center; color: #426246; }
.routines-modernisees .routines-felicitations > span { font-size: 24px; }
.routines-modernisees .routines-felicitations p { margin: 8px 0 0; font-size: 13px; line-height: 1.7; }
.routines-modernisees .routines-humeur { margin-top: 24px; }
.routines-modernisees .routines-humeur-choix { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.routines-modernisees .routines-humeur-choix button { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; flex: 1 1 52px; min-height: 78px; padding: 10px 4px; border: 1px solid #e8dece; border-radius: 14px; background: #fffdf9; color: #786b5e; font: inherit; font-size: 10px; line-height: 1.5; cursor: pointer; }
.routines-modernisees .routines-humeur-choix button[aria-pressed="true"] { background: #e8eff4; border-color: #526f84; color: #405b6c; font-weight: 600; }
.routines-modernisees .routines-humeur-choix button > span:first-child { font-size: 24px; }
.routines-modernisees button:focus-visible, .routines-modernisees input:focus-visible { outline: 3px solid #526f84; outline-offset: 3px; }
@media (max-width: 380px) { .routines-modernisees .routines-progression, .routines-modernisees .routines-humeur { padding: 16px; } .routines-modernisees .routines-progression-entete { flex-wrap: wrap; } .routines-modernisees .routines-frequences button { font-size: 11px; } }
@media (prefers-reduced-motion: reduce) { .routines-modernisees .routines-jauge > div { transition: none; } }
`;

const jouerSonCoche = () => {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(594, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
};

function RoutineCarte({ nom, description, pilier, cochee, onToggle, onOuvrirFiche, afficherPilier }) {
  const theme = THEMES_ROUTINES[pilier] || THEMES_ROUTINES.Tous;
  const handleToggle = () => {
    try { debloqueurAudio(); } catch (e) {}
    if (!cochee) jouerSonCoche();
    onToggle();
  };
  return (
    <div className={`routine-carte ${cochee ? 'est-cochee' : ''}`}>
      <input type="checkbox" aria-label={`Marquer comme réalisée : ${nom}`} checked={cochee} onChange={handleToggle} />
      <button type="button" className="routine-ouvrir" onClick={onOuvrirFiche}>
        <span className="routine-carte-nom">{nom}</span>
        <span className="routine-carte-description">{description}</span>
        <span className="routine-carte-bas">
          {afficherPilier && <span className="routine-carte-badge" style={{ background: theme.fond, color: theme.couleur }}>{pilier}</span>}
          <span className="routine-carte-fleche" aria-hidden="true">→</span>
        </span>
      </button>
    </div>
  );
}

function ListeRoutines() {
  const { setRoutineId } = useContext(AppContext);
  const navigate = useNavigate();
  const [pilierActif, setPilierActif] = useState(() => {
  const valeur = localStorage.getItem('routines_dernier_pilier');
  return PILIERS.includes(valeur) ? valeur : 'Tous';
});

const [frequenceActive, setFrequenceActive] = useState(() => {
  const valeur = localStorage.getItem('routines_derniere_frequence');
  return FREQUENCES.includes(valeur) ? valeur : 'Quotidien';
});

useEffect(() => {
  localStorage.setItem('routines_dernier_pilier', pilierActif);
}, [pilierActif]);

useEffect(() => {
  localStorage.setItem('routines_derniere_frequence', frequenceActive);
}, [frequenceActive]);
  const [confettisActifs, setConfettisActifs] = useState(false);
  const etaitCompleteRef = useRef(false);
  const [humeur, setHumeur] = useState(() => {
  const aujourdHui = new Date().toISOString().split('T')[0];
  const historique = JSON.parse(localStorage.getItem('serenitine_humeurs') || '{}');
  return historique[aujourdHui] || null;
});

const choisirHumeur = (valeur) => {
  const aujourdHui = new Date().toISOString().split('T')[0];
  const historique = JSON.parse(localStorage.getItem('serenitine_humeurs') || '{}');

  historique[aujourdHui] = valeur;

  localStorage.setItem('serenitine_humeurs', JSON.stringify(historique));
  setHumeur(valeur);
};
  

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

  const frequencePrecedenteRef = useRef(frequenceActive);
  const suiviInitialiseRef = useRef(false);
  const confettisTimeoutRef = useRef(null);

  useEffect(() => {
    const memeFrequence = frequencePrecedenteRef.current === frequenceActive;
    if (suiviInitialiseRef.current && memeFrequence && estComplete && !etaitCompleteRef.current) {
      setConfettisActifs(true);
      clearTimeout(confettisTimeoutRef.current);
      confettisTimeoutRef.current = setTimeout(() => setConfettisActifs(false), 3500);
    }
    if (!memeFrequence) {
      clearTimeout(confettisTimeoutRef.current);
      setConfettisActifs(false);
    }
    suiviInitialiseRef.current = true;
    frequencePrecedenteRef.current = frequenceActive;
    etaitCompleteRef.current = estComplete;
  }, [estComplete, frequenceActive]);

  useEffect(() => () => clearTimeout(confettisTimeoutRef.current), []);

  const felicitations = MESSAGES_FELICITATIONS[frequenceActive];

  return (
    <div className="liste-routines routines-modernisees">
      <style>{STYLE_ROUTINES}</style>
      <Confettis actif={confettisActifs} />
      <div className="entete-onglet">
        <h2 className="entete-onglet__titre"><CheckCircle2 size={21} /> Mes routines</h2>
        <p className="entete-onglet__description">Tes habitudes à cocher, avec leurs explications</p>
      </div>

      <div className="routines-frequences" role="group" aria-label="Fréquence des routines">
        {FREQUENCES.map(f => (
          <button key={f} type="button" aria-pressed={frequenceActive === f}
            onClick={() => { setFrequenceActive(f); if (f === 'Annuel') setPilierActif('Tous'); }}>
            {LABELS_FREQUENCES[f]}
          </button>
        ))}
      </div>

      {estComplete && (
        <div className="routines-felicitations" role="status">
          <span aria-hidden="true">{felicitations.emoji}</span>
          <p>{felicitations.texte}</p>
        </div>
      )}

      <section className="routines-progression">
        <div className="routines-progression-entete">
          <span className="routines-pastille"><CheckCircle2 size={21} strokeWidth={1.6} /></span>
          <div><h3>Chaque geste compte</h3><p>{completees} / {total} routines complétées{pilierActif !== 'Tous' && frequenceActive !== 'Annuel' ? ` · ${pilierActif}` : ''}</p></div>
          <strong>{progression}<small> %</small></strong>
        </div>
        <div className="routines-jauge" role="progressbar" aria-label="Routines complétées dans la sélection" aria-valuenow={progression} aria-valuemin={0} aria-valuemax={100}>
          <div style={{ width: `${progression}%` }} />
        </div>
      </section>

      {frequenceActive !== 'Annuel' && (
        <div className="routines-filtres" role="group" aria-label="Filtrer par pilier">
          {PILIERS.map(p => {
            const theme = THEMES_ROUTINES[p];
            return (
              <button key={p} type="button" aria-pressed={pilierActif === p}
                style={{ background: pilierActif === p ? theme.fond : 'transparent', color: pilierActif === p ? theme.couleur : '#786b5e' }}
                onClick={() => setPilierActif(p)}>{p}</button>
            );
          })}
        </div>
      )}
      <p className="routines-indication">Coche tes habitudes et ouvre leur titre pour en savoir plus.</p>
      <div className="routines-cartes">
        {routinesFiltrees.map(r => (
          <RoutineCarte key={r.id} nom={r.nom} description={r.description} pilier={r.pilier}
            cochee={cochees.includes(r.id)} onToggle={() => toggleRoutine(r.id)}
            onOuvrirFiche={() => ouvrirFiche(r.id)} afficherPilier={frequenceActive !== 'Annuel'} />
        ))}
      </div>

      {frequenceActive === 'Quotidien' && (
        <section className="routines-humeur">
          <div className="routines-humeur-entete">
            <span className="routines-pastille"><Smile size={21} strokeWidth={1.6} /></span>
            <div><h3>Comment je me sens aujourd’hui ?</h3><p>Une petite pause pour faire le point sur ton humeur</p></div>
          </div>
          <div className="routines-humeur-choix" role="group" aria-label="Humeur du jour">
            {HUMEURS.map(h => (
              <button key={h.valeur} type="button" aria-pressed={humeur === h.valeur} onClick={() => choisirHumeur(h.valeur)}>
                <span aria-hidden="true">{h.emoji}</span><span>{h.label}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ListeRoutines;
