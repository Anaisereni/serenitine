import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Routine from './Routine';
import { useRoutineStorage, sauvegarderPiliers } from './useStorage';
import { AppContext } from './App';

const routines = [
  { id: 1, nom: "Boire 1,5 à 2L d'eau", description: "Répartis sur la journée, hors effort physique", pilier: "Nutrition", frequence: "Quotidien" },
  { id: 2, nom: "Respecter des horaires de repas", description: "Manger à heure régulière", pilier: "Nutrition", frequence: "Quotidien" },
  { id: 3, nom: "Consommer des fruits et légumes", description: "Au moins 5 portions par jour", pilier: "Nutrition", frequence: "Quotidien" },
  { id: 4, nom: "Limiter les produits ultra-transformés", description: "Privilégier le fait maison ou peu transformé", pilier: "Nutrition", frequence: "Quotidien" },
  { id: 5, nom: "Se coucher et se lever à heure régulière", description: "Même le week-end, pour stabiliser l'horloge biologique", pilier: "Sommeil", frequence: "Quotidien" },
  { id: 6, nom: "Zone de décompression 2h avant le coucher", description: "Éviter sport intense, jeux vidéo, contenus stimulants", pilier: "Sommeil", frequence: "Quotidien" },
  { id: 7, nom: "Dormir 7 à 9 heures", description: "Durée recommandée pour un adulte, > prendre en compte la nuit passée", pilier: "Sommeil", frequence: "Quotidien" },
  { id: 8, nom: "Cohérence cardiaque si besoin", description: "5 min, 3 fois par jour", pilier: "Stress", frequence: "Quotidien" },
  { id: 9, nom: "Prendre l'air au moins 20 min", description: "Lumière naturelle et marche bénéfiques pour le système nerveux", pilier: "Stress", frequence: "Quotidien" },
  { id: 10, nom: "Marcher au moins 30 min", description: "Activité minimale recommandée par l'OMS", pilier: "Mouvement", frequence: "Quotidien" },
  { id: 11, nom: "Éviter la sédentarité prolongée", description: "Se lever et bouger toutes les heures", pilier: "Mouvement", frequence: "Quotidien" },
  { id: 12, nom: "Manger des légumineuses au moins 2 fois", description: "Lentilles, pois chiches, haricots…", pilier: "Nutrition", frequence: "Hebdomadaire" },
  { id: 13, nom: "Consommer des petits poissons gras 1 à 2 fois", description: "Sardines, maquereau, hareng — riches en oméga-3", pilier: "Nutrition", frequence: "Hebdomadaire" },
  { id: 14, nom: "Évaluer la qualité de son sommeil", description: "Réveils nocturnes, fatigue au réveil, endormissement", pilier: "Sommeil", frequence: "Hebdomadaire" },
  { id: 15, nom: "Bilan de stress de la semaine", description: "Identifier les sources principales et ajuster", pilier: "Stress", frequence: "Hebdomadaire" },
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

function ListeRoutines() {
  const { setRoutineId } = useContext(AppContext);
  const navigate = useNavigate();
  const [pilierActif, setPilierActif] = useState("Tous");
  const [frequenceActive, setFrequenceActive] = useState("Quotidien");
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
    const pilierOk = pilierActif === "Tous" || r.pilier === pilierActif;
    const frequenceOk = r.frequence === frequenceActive;
    return pilierOk && frequenceOk;
  });
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

  return (
    <div className="liste-routines">

      <div className="frequences">
        {FREQUENCES.map(f => (
  <button
    key={f}
    className={`freq-btn ${frequenceActive === f ? 'actif' : ''}`}
    onClick={() => setFrequenceActive(f)}
  >
    {LABELS_FREQUENCES[f]}
  </button>
))}
      </div>

      <div className="progression-wrap">
        <div className="progression-texte">
          <span key={completees}>{completees} / {total} complétées</span>
          <span key={`pct-${completees}`}>{progression}%</span>
        </div>
        <div className="progression-bar">
          <div className="progression-fill" style={{ width: `${progression}%` }} />
        </div>
      </div>

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
          />
        ))}
      </div>

    </div>
  );
}

export default ListeRoutines;