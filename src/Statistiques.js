import React, { useState } from 'react';
import { getHistorique, getHistoriquePilier } from './useStorage';
import {
  BarChart3,
  Salad,
  Moon,
  Flower2,
  Activity,
} from 'lucide-react';

const HUMEURS = [
  { valeur: 'tres-bien', emoji: '😊', label: 'Très bien' },
  { valeur: 'bien', emoji: '🙂', label: 'Bien' },
  { valeur: 'neutre', emoji: '😐', label: 'Neutre' },
  { valeur: 'bof', emoji: '😕', label: 'Bof' },
  { valeur: 'pas-bien', emoji: '😔', label: 'Pas très bien' },
];

const TOTAUX = {
  Quotidien: 11,
  Hebdomadaire: 5,
  Annuel: 4,
};

const ROUTINES_PAR_PILIER = {
  Quotidien: {
    Nutrition: 4,
    Sommeil: 3,
    Stress: 2,
    Mouvement: 2,
  },
  Hebdomadaire: {
    Nutrition: 2,
    Sommeil: 1,
    Stress: 1,
    Mouvement: 1,
  },
  Annuel: {
    Nutrition: 2,
    Sommeil: 0,
    Stress: 0,
    Mouvement: 2,
  },
};

const PILIERS = [
  {
    nom: 'Nutrition',
    Icon: Salad,
    couleur: '#52734a',
    bg: '#eaf3de',
  },
  {
    nom: 'Sommeil',
    Icon: Moon,
    couleur: '#526f84',
    bg: '#e6f1fb',
  },
  {
    nom: 'Stress',
    Icon: Flower2,
    couleur: '#987440',
    bg: '#faeeda',
  },
  {
    nom: 'Mouvement',
    Icon: Activity,
    couleur: '#927094',
    bg: '#f2e8f1',
  },
];

const COULEURS = {
  titre: '#5c3d2e',
  texte: '#5c5045',
  secondaire: '#786b5e',
  bordure: '#e8dece',
  carte: '#fffdf9',
  bleuClair: '#e8eff4',
  bleu: '#526f84',
};

const COULEURS_CALENDRIER = [
  {
    bg: 'transparent',
    border: '#d9cebf',
    label: '0 %',
    texte: '#786b5e',
  },
  {
    bg: '#e8b49c',
    border: '#e8b49c',
    label: '1–33 %',
    texte: '#5c3d2e',
  },
  {
    bg: '#ead59a',
    border: '#ead59a',
    label: '34–66 %',
    texte: '#5c5034',
  },
  {
    bg: '#aec9a7',
    border: '#aec9a7',
    label: '67–99 %',
    texte: '#304b33',
  },
  {
    bg: '#52734a',
    border: '#52734a',
    label: '100 %',
    texte: '#ffffff',
  },
];

const styleCarte = {
  background: COULEURS.carte,
  border: `1px solid ${COULEURS.bordure}`,
  borderRadius: 16,
  padding: '1rem',
};

const styleFleche = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 36,
  height: 36,
  border: `1px solid ${COULEURS.bordure}`,
  borderRadius: 12,
  background: COULEURS.carte,
  color: COULEURS.texte,
  fontSize: 14,
  cursor: 'pointer',
};

const getKeyByOffset = (frequence, offset) => {
  if (frequence === 'Quotidien') {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    return d.toISOString().split('T')[0];
  }

  if (frequence === 'Hebdomadaire') {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    const monday = new Date(now);
    monday.setDate(now.getDate() + diff - offset * 7);
    monday.setHours(0, 0, 0, 0);

    const year = monday.getFullYear();
    const month = String(monday.getMonth() + 1).padStart(2, '0');
    const date = String(monday.getDate()).padStart(2, '0');

    return `${year}-${month}-${date}`;
  }

  return `${new Date().getFullYear() - offset}`;
};

const formatDay = (key) => {
  const d = new Date(key + 'T12:00:00');

  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatWeek = (key) => {
  const d = new Date(key + 'T12:00:00');
  const end = new Date(d);
  end.setDate(d.getDate() + 6);

  const debut = d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });

  const fin = end.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return `${debut} – ${fin}`;
};

const formatYear = (key) => `Année ${key}`;

const getCouleurCercle = (pct, isFutur) => {
  if (isFutur) {
    return {
      bg: 'transparent',
      border: '#eee7dd',
      texte: '#b8afa3',
    };
  }

  if (pct === null || pct === 0) {
    return COULEURS_CALENDRIER[0];
  }

  if (pct >= 100) return COULEURS_CALENDRIER[4];
  if (pct >= 67) return COULEURS_CALENDRIER[3];
  if (pct >= 34) return COULEURS_CALENDRIER[2];

  return COULEURS_CALENDRIER[1];
};

function CalendrierMois({ annee, mois, histQuotidien }) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const premierJour = new Date(annee, mois, 1);
  const nbJours = new Date(annee, mois + 1, 0).getDate();

  let debutSemaine = premierJour.getDay();
  debutSemaine = debutSemaine === 0 ? 6 : debutSemaine - 1;

  const jours = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  const cellules = [
    ...Array(debutSemaine).fill(null),
    ...Array.from({ length: nbJours }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gap: 2,
          marginBottom: 8,
        }}
      >
        {jours.map((jour) => (
          <div
            key={jour}
            style={{
              color: COULEURS.secondaire,
              fontSize: 10,
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            {jour}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gap: '8px 2px',
        }}
      >
        {cellules.map((jour, i) => {
          if (!jour) return <div key={`empty-${i}`} />;

          const dateStr =
            `${annee}-` +
            `${String(mois + 1).padStart(2, '0')}-` +
            `${String(jour).padStart(2, '0')}`;

          const isFutur = dateStr > todayStr;
          const isToday = dateStr === todayStr;
          const valeur = histQuotidien[dateStr];

          const pct = valeur !== undefined
            ? Math.round((valeur / TOTAUX.Quotidien) * 100)
            : null;

          const couleur = getCouleurCercle(pct, isFutur);

          return (
            <div
              key={dateStr}
              title={
                isFutur
                  ? `${dateStr} : à venir`
                  : `${dateStr} : ${
                      pct === null ? 'aucune donnée' : `${pct} %`
                    }`
              }
              aria-current={isToday ? 'date' : undefined}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifySelf: 'center',
                width: '100%',
                maxWidth: 28,
                aspectRatio: '1',
                borderRadius: '50%',
                background: couleur.bg,
                border: isToday
                  ? `2px solid ${COULEURS.titre}`
                  : `1.5px solid ${couleur.border}`,
                color: couleur.texte,
                fontSize: 10,
                fontWeight: isToday ? 700 : 400,
              }}
            >
              {jour}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendrierAnnuel({ histQuotidien }) {
  const [moisOffset, setMoisOffset] = useState(0);

  const today = new Date();
  const dateAffichee = new Date(
    today.getFullYear(),
    today.getMonth() - moisOffset,
    1
  );

  const annee = dateAffichee.getFullYear();
  const mois = dateAffichee.getMonth();

  const nomMois = dateAffichee.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section style={{ ...styleCarte, marginTop: 12 }}>
      <h3
        style={{
          margin: '0 0 16px',
          color: COULEURS.titre,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Ma régularité
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <button
          type="button"
          aria-label="Mois précédent"
          onClick={() => setMoisOffset(o => o + 1)}
          style={styleFleche}
        >
          ‹
        </button>

        <div
          style={{
            color: COULEURS.texte,
            fontSize: 13,
            fontWeight: 500,
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
        >
          {nomMois}
        </div>

        <button
          type="button"
          aria-label="Mois suivant"
          onClick={() => setMoisOffset(o => Math.max(0, o - 1))}
          disabled={moisOffset === 0}
          style={{
            ...styleFleche,
            opacity: moisOffset === 0 ? 0.35 : 1,
            cursor: moisOffset === 0 ? 'default' : 'pointer',
          }}
        >
          ›
        </button>
      </div>

      <CalendrierMois
        annee={annee}
        mois={mois}
        histQuotidien={histQuotidien}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px 12px',
          marginTop: 18,
        }}
      >
        {COULEURS_CALENDRIER.map(({ bg, border, label }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                boxSizing: 'border-box',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: bg,
                border: `1px solid ${border}`,
              }}
            />
            <span
              style={{
                color: COULEURS.secondaire,
                fontSize: 10,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          margin: '12px 0 0',
          color: COULEURS.secondaire,
          fontSize: 10,
          lineHeight: 1.6,
          textAlign: 'center',
        }}
      >
        Le jour actuel est entouré. Les jours sans donnée
        restent vides.
      </p>
    </section>
  );
}

const ROUTINES_DETAIL = {
  Quotidien: [
    { id: 1, nom: 'Hydratation', pilier: 'Nutrition' },
    { id: 2, nom: 'Horaires des repas', pilier: 'Nutrition' },
    { id: 3, nom: 'Fruits et légumes', pilier: 'Nutrition' },
    { id: 4, nom: 'Limiter les ultra-transformés', pilier: 'Nutrition' },
    { id: 5, nom: 'Horaires de sommeil', pilier: 'Sommeil' },
    { id: 6, nom: 'Décompression du soir', pilier: 'Sommeil' },
    { id: 7, nom: 'Sommeil : 7 à 9 h', pilier: 'Sommeil' },
    { id: 8, nom: 'Cohérence cardiaque', pilier: 'Stress' },
    { id: 9, nom: 'Prendre l’air', pilier: 'Stress' },
    { id: 10, nom: 'Activité : 30 min', pilier: 'Mouvement' },
    { id: 11, nom: 'Pauses actives', pilier: 'Mouvement' },
  ],
  Hebdomadaire: [
    { id: 12, nom: 'Légumineuses', pilier: 'Nutrition' },
    { id: 13, nom: 'Poissons gras', pilier: 'Nutrition' },
    { id: 14, nom: 'Bilan sommeil', pilier: 'Sommeil' },
    { id: 15, nom: 'Bilan stress', pilier: 'Stress' },
    { id: 16, nom: 'Deux séances de sport', pilier: 'Mouvement' },
  ],
  Annuel: [
    { id: 17, nom: 'Bilan sanguin' },
    { id: 18, nom: 'Médecin généraliste' },
    { id: 19, nom: 'Dentiste' },
    { id: 20, nom: 'Suivi gynéco / uro' },
  ],
};

// null = détail absent ou illisible ; [] = détail présent, aucune case cochée.
function lireCasesPeriode(storage, frequence, periodeKey) {
  try {
    const brut = storage.getItem(`routines_${frequence}_${periodeKey}`);
    if (brut === null) return null;
    const ids = JSON.parse(brut);
    const autorises = ROUTINES_DETAIL[frequence].map(r => r.id);
    if (!Array.isArray(ids) || !ids.every(id => Number.isInteger(id) && autorises.includes(id))) return null;
    return [...new Set(ids)];
  } catch { return null; }
}

function comptePilier(cases, liste, valeurHistorique) {
  return cases === null ? valeurHistorique : liste.filter(r => cases.includes(r.id)).length;
}

const STYLE_DETAIL_STATS = `
.stats-detail-pilier { border-top: 1px solid #e8dece; }
.stats-detail-pilier > summary { display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 9px 0; cursor: pointer; list-style: none; color: #5c5045; font-size: 12px; }
.stats-detail-pilier > summary::-webkit-details-marker { display: none; }
.stats-detail-pilier > summary::marker { content: ''; }
.stats-detail-icone { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 28px; height: 28px; border-radius: 9px; }
.stats-detail-nom { flex: 1; min-width: 0; }
.stats-detail-jauge { flex-shrink: 1; width: 54px; min-width: 15px; height: 6px; border-radius: 10px; overflow: hidden; }
.stats-detail-compte { flex-shrink: 0; min-width: 25px; color: #786b5e; font-size: 11px; text-align: right; }
.stats-detail-chevron { flex-shrink: 0; color: #92765b; font-size: 14px; transition: transform .15s; }
.stats-detail-pilier[open] .stats-detail-chevron { transform: rotate(180deg); }
.stats-detail-liste { list-style: none; padding: 0; margin: 0 0 12px; background: #faf6ee; border-radius: 12px; }
.stats-detail-liste li { display: flex; align-items: center; gap: 9px; padding: 10px 12px; color: #786b5e; font-size: 12px; line-height: 1.6; }
.stats-detail-liste li + li { border-top: 1px solid #eee7dd; }
.stats-detail-etat { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; background: #e8eff4; color: #526f84; font-size: 12px; }
.stats-detail-liste li[data-realisee="true"] { color: #426246; }
.stats-detail-liste li[data-realisee="true"] .stats-detail-etat { background: #e2ecd9; color: #426246; }
.stats-detail-indisponible { padding: 12px; margin: 0 0 12px; border-radius: 12px; background: #faf6ee; color: #786b5e; font-size: 12px; line-height: 1.7; }
.stats-detail-indication { margin: 0 0 10px; color: #786b5e; font-size: 11px; line-height: 1.6; }
.stats-detail-pilier > summary:focus-visible { outline: 3px solid #526f84; outline-offset: 3px; border-radius: 8px; }
@media (prefers-reduced-motion: reduce) { .stats-detail-chevron { transition: none; } }
`;

function ListeCases({ routines, cases }) {
  if (cases === null) {
    return <p className="stats-detail-indisponible">Détail indisponible pour cette période : les cases exactes n’ont pas été conservées ou ne peuvent pas être lues. Les totaux disponibles restent affichés.</p>;
  }
  return (
    <ul className="stats-detail-liste">
      {routines.map(r => {
        const realisee = cases.includes(r.id);
        return (
          <li key={r.id} data-realisee={realisee ? 'true' : 'false'}>
            <span className="stats-detail-etat" aria-hidden="true">{realisee ? '✓' : '○'}</span>
            <span>{r.nom}<span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>{realisee ? ' : cochée' : ' : non cochée'}</span></span>
          </li>
        );
      })}
    </ul>
  );
}

function DetailPeriode({
  periodeKey,
  frequence,
  histGlobal,
  histPilier,
  isToday,
}) {
  const total = TOTAUX[frequence];
  const cases = lireCasesPeriode(localStorage, frequence, periodeKey);
  const valeur = cases === null ? histGlobal[periodeKey] || 0 : cases.length;
  const pct = total > 0 ? Math.round((valeur / total) * 100) : 0;

  const pilierData = histPilier[periodeKey] || {
    Nutrition: 0,
    Sommeil: 0,
    Stress: 0,
    Mouvement: 0,
  };

  const repartition = ROUTINES_PAR_PILIER[frequence];

  return (
    <div
      style={{
        ...styleCarte,
        marginBottom: 12,
        borderColor: isToday ? '#c9b596' : COULEURS.bordure,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 2,
            flexShrink: 0,
            color: COULEURS.titre,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {pct}
          </span>
          <span style={{ fontSize: 13 }}>%</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 4,
              marginBottom: 8,
              color: COULEURS.secondaire,
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            <span>Routines complétées</span>
            <strong style={{ color: COULEURS.titre }}>
              {valeur}/{total}
            </strong>
          </div>

          <div
            style={{
              height: 7,
              background: '#eee7dd',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, Math.max(0, pct))}%`,
                background: '#92765b',
                borderRadius: 10,
              }}
            />
          </div>
        </div>
      </div>

      <style>{STYLE_DETAIL_STATS}</style>
      <p className="stats-detail-indication">
        {frequence === 'Annuel' ? 'Ouvre le détail des routines annuelles.' : 'Clique sur un pilier pour voir les routines.'}
        {' '}✓ Cochée · ○ Non cochée
      </p>
      {frequence === 'Annuel' ? (
        <details className="stats-detail-pilier" key={`annuel-${periodeKey}`}>
          <summary>
            <span className="stats-detail-nom">Routines annuelles</span>
            <span className="stats-detail-compte">{valeur}/{total}</span>
            <span className="stats-detail-chevron" aria-hidden="true">⌄</span>
          </summary>
          <ListeCases routines={ROUTINES_DETAIL.Annuel} cases={cases} />
        </details>
      ) : PILIERS.map(p => {
        const totalPilier = repartition[p.nom] || 0;
        if (totalPilier === 0) return null;
        const liste = ROUTINES_DETAIL[frequence].filter(r => r.pilier === p.nom);
        const cocheesPilier = comptePilier(cases, liste, pilierData[p.nom] || 0);
        const pctPilier = Math.round((cocheesPilier / totalPilier) * 100);
        return (
          <details className="stats-detail-pilier" key={`${frequence}-${periodeKey}-${p.nom}`}>
            <summary>
              <span className="stats-detail-icone" style={{ background: p.bg, color: p.couleur }} aria-hidden="true"><p.Icon size={15} strokeWidth={1.6} /></span>
              <span className="stats-detail-nom">{p.nom}</span>
              <span className="stats-detail-jauge" style={{ background: p.bg }} aria-hidden="true">
                <span style={{ display: 'block', height: '100%', background: p.couleur, width: `${Math.min(100, Math.max(0, pctPilier))}%`, borderRadius: 10 }} />
              </span>
              <span className="stats-detail-compte">{cocheesPilier}/{totalPilier}</span>
              <span className="stats-detail-chevron" aria-hidden="true">⌄</span>
            </summary>
            <ListeCases routines={liste} cases={cases} />
          </details>
        );
      })}
    </div>
  );
}

function Statistiques() {
  const [onglet, setOnglet] = useState('jour');
  const [offset, setOffset] = useState(0);

  const [humeurs] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('serenitine_humeurs') || '{}'
      ) || {};
    } catch {
      return {};
    }
  });

  const frequenceMap = {
    jour: 'Quotidien',
    semaine: 'Hebdomadaire',
    annee: 'Annuel',
  };

  const formaterMap = {
    jour: formatDay,
    semaine: formatWeek,
    annee: formatYear,
  };

  const histQuotidien = getHistorique('Quotidien');
  const histHebdo = getHistorique('Hebdomadaire');
  const histAnnuel = getHistorique('Annuel');

  const histPilierQuotidien = getHistoriquePilier('Quotidien');
  const histPilierHebdo = getHistoriquePilier('Hebdomadaire');
  const histPilierAnnuel = getHistoriquePilier('Annuel');

  const histGlobalMap = {
    jour: histQuotidien,
    semaine: histHebdo,
    annee: histAnnuel,
  };

  const histPilierMap = {
    jour: histPilierQuotidien,
    semaine: histPilierHebdo,
    annee: histPilierAnnuel,
  };

  const frequence = frequenceMap[onglet];
  const periodeKey = getKeyByOffset(frequence, offset);
  const isToday = offset === 0;

  const humeurJour = onglet === 'jour'
    ? humeurs[periodeKey]
    : null;

  const humeurSelectionnee = HUMEURS.find(
    h => h.valeur === humeurJour
  );

  const changerOnglet = (nouvelOnglet) => {
    setOnglet(nouvelOnglet);
    setOffset(0);
  };

  return (
    <div style={{ padding: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: COULEURS.bleuClair,
            color: COULEURS.bleu,
          }}
        >
          <BarChart3 size={22} strokeWidth={1.6} />
        </span>

        <div>
          <h2
            style={{
              margin: 0,
              color: COULEURS.titre,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Mon suivi
          </h2>

          <p
            style={{
              margin: '5px 0 0',
              color: COULEURS.secondaire,
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            Tes habitudes au fil du temps
          </p>
        </div>
      </div>

      <div
        role="group"
        aria-label="Fréquence du suivi"
        style={{
          display: 'flex',
          gap: 4,
          padding: 4,
          marginBottom: 20,
          borderRadius: 14,
          background: '#eee7dd',
        }}
      >
        {[
          ['jour', 'Jour'],
          ['semaine', 'Semaine'],
          ['annee', 'Année'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={onglet === key}
            onClick={() => changerOnglet(key)}
            style={{
              flex: 1,
              minWidth: 0,
              minHeight: 40,
              padding: '8px 4px',
              border: 'none',
              borderRadius: 11,
              background: onglet === key
                ? COULEURS.titre
                : 'transparent',
              color: onglet === key
                ? '#fffaf3'
                : COULEURS.secondaire,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6,
          marginBottom: 16,
        }}
      >
        <button
          type="button"
          aria-label="Période précédente"
          onClick={() => setOffset(o => o + 1)}
          style={styleFleche}
        >
          ‹
        </button>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '0 4px',
            textAlign: 'center',
          }}
        >
          <div
            aria-live="polite"
            style={{
              color: COULEURS.texte,
              fontSize: 12,
              fontWeight: 500,
              lineHeight: 1.6,
              textTransform: 'capitalize',
            }}
          >
            {formaterMap[onglet](periodeKey)}
          </div>

          {isToday && (
            <div
              style={{
                marginTop: 3,
                color: COULEURS.bleu,
                fontSize: 10,
              }}
            >
              Période en cours
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="Période suivante"
          onClick={() => setOffset(o => Math.max(0, o - 1))}
          disabled={offset === 0}
          style={{
            ...styleFleche,
            opacity: offset === 0 ? 0.35 : 1,
            cursor: offset === 0 ? 'default' : 'pointer',
          }}
        >
          ›
        </button>
      </div>

      <DetailPeriode
        periodeKey={periodeKey}
        frequence={frequence}
        histGlobal={histGlobalMap[onglet]}
        histPilier={histPilierMap[onglet]}
        isToday={isToday}
      />

      {onglet === 'jour' && (
        <>
          <div
            style={{
              ...styleCarte,
              padding: '12px',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 6,
                color: COULEURS.secondaire,
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              <span>Humeur du jour :</span>

              {humeurSelectionnee ? (
                <>
                  <span style={{ fontSize: 20 }}>
                    {humeurSelectionnee.emoji}
                  </span>
                  <span style={{ color: COULEURS.texte }}>
                    {humeurSelectionnee.label}
                  </span>
                </>
              ) : (
                <span>non renseignée</span>
              )}
            </div>
          </div>

          <CalendrierAnnuel histQuotidien={histQuotidien} />
        </>
      )}
    </div>
  );
}

export default Statistiques;
