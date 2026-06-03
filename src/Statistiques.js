import React, { useState } from 'react';
import { getHistorique, getHistoriquePilier } from './useStorage';

const TOTAUX = {
  Quotidien: 11,
  Hebdomadaire: 5,
  Annuel: 4,
};

const ROUTINES_PAR_PILIER = {
  Quotidien: { Nutrition: 4, Sommeil: 3, Stress: 2, Mouvement: 2 },
  Hebdomadaire: { Nutrition: 2, Sommeil: 1, Stress: 1, Mouvement: 1 },
  Annuel: { Nutrition: 2, Sommeil: 0, Stress: 0, Mouvement: 2 },
};

const PILIERS = [
  { nom: 'Nutrition', emoji: '🥗', couleur: '#3B6D11', bg: '#EAF3DE' },
  { nom: 'Sommeil', emoji: '😴', couleur: '#185FA5', bg: '#E6F1FB' },
  { nom: 'Stress', emoji: '🧘', couleur: '#854F0B', bg: '#FAEEDA' },
  { nom: 'Mouvement', emoji: '🏃', couleur: '#761d99', bg: '#FAECE7' },
];

// Génère la clé pour un offset donné (0 = période en cours, 1 = précédente, etc.)
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
  if (frequence === 'Annuel') {
    return `${new Date().getFullYear() - offset}`;
  }
};

const formatDay = (key) => {
  const d = new Date(key + 'T12:00:00');
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

const formatWeek = (key) => {
  const d = new Date(key + 'T12:00:00');
  const end = new Date(d);
  end.setDate(d.getDate() + 6);
  return `${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
};

const formatYear = (key) => `Année ${key}`;

function DetailPeriode({ periodeKey, frequence, histGlobal, histPilier, isToday }) {
  const total = TOTAUX[frequence];
  const valeur = histGlobal[periodeKey] || 0;
  const pct = total > 0 ? Math.round((valeur / total) * 100) : 0;
  const pilierData = histPilier[periodeKey] || { Nutrition: 0, Sommeil: 0, Stress: 0, Mouvement: 0 };
  const repartition = ROUTINES_PAR_PILIER[frequence];

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      border: isToday ? '1.5px solid #51c3d4' : '0.5px solid var(--color-border-tertiary)',
      borderRadius: 'var(--border-radius-lg)',
      padding: '1rem',
      marginBottom: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: 32, fontWeight: 500, color: '#51d3e2', lineHeight: 1 }}>{pct}</div>
          <div style={{ fontSize: 10, color: 'white' }}>%</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'white', marginBottom: 4 }}>
            <span>{valeur} routines complétées</span>
            <span>/ {total}</span>
          </div>
          <div style={{ height: 6, background: '#4e7580', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ height: 6, background: '#60d3e5', width: `${pct}%`, borderRadius: 10, transition: 'width 0.3s' }} />
          </div>
          {isToday && <div style={{ fontSize: 11, color: '#68c4e0', marginTop: 4 }}>Période en cours</div>}
        </div>
      </div>

      {frequence !== 'Annuel' && PILIERS.map(p => {
        const totalPilier = repartition[p.nom] || 0;
        if (totalPilier === 0) return null;
        const cocheesPilier = pilierData[p.nom] || 0;
        const pctPilier = Math.round((cocheesPilier / totalPilier) * 100);
        return (
          <div key={p.nom} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: p.couleur, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'white', flex: 1 }}>{p.emoji} {p.nom}</span>
            <div style={{ width: 80, height: 6, background: p.bg, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: 6, background: p.couleur, width: `${pctPilier}%`, borderRadius: 10 }} />
            </div>
            <span style={{ fontSize: 12, color: 'white', minWidth: 32, textAlign: 'right' }}>{cocheesPilier}/{totalPilier}</span>
          </div>
        );
      })}
    </div>
  );
}

function Statistiques() {
  const [onglet, setOnglet] = useState('jour');
  const [offset, setOffset] = useState(0);

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
  const formater = formaterMap[onglet];

  const changerOnglet = (nouvelOnglet) => {
    setOnglet(nouvelOnglet);
    setOffset(0);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '4px', textAlign: 'center' }}>
        Suivi 📊
      </h2>
      <p style={{ fontSize: 13, color: 'white', textAlign: 'center', marginBottom: '1.2rem', opacity: 0.9 }}>
        Ton historique dans les trois fréquences de routines
      </p>

      {/* Onglets */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        {[['jour', 'Jour'], ['semaine', 'Semaine'], ['annee', 'Année']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => changerOnglet(key)}
            style={{
              flex: 1, padding: '8px 4px', borderRadius: 20,
              border: onglet === key ? 'none' : '0.5px solid var(--color-border-secondary)',
              background: onglet === key ? '#c5bfb5' : 'white',
              color: onglet === key ? '#f4f1ef' : 'var(--color-text-secondary)',
              fontSize: 13, cursor: 'pointer', fontWeight: onglet === key ? 500 : 400
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Navigation par flèches */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button
          onClick={() => setOffset(o => o + 1)}
          style={{
            background: 'none', border: '0.5px solid rgba(255,255,255,0.3)',
            borderRadius: 8, color: 'white', fontSize: 18,
            width: 36, height: 36, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          ◀
        </button>

        <div style={{ textAlign: 'center', flex: 1, padding: '0 8px' }}>
          <div style={{ fontSize: 13, color: 'white', fontWeight: 500, textTransform: 'capitalize' }}>
            {formater(periodeKey)}
          </div>
          {isToday && (
            <div style={{ fontSize: 11, color: '#72d5e0', marginTop: 2 }}>● période en cours</div>
          )}
        </div>

        <button
          onClick={() => setOffset(o => o - 1)}
          disabled={offset === 0}
          style={{
            background: 'none', border: '0.5px solid rgba(255,255,255,0.3)',
            borderRadius: 8, color: offset === 0 ? 'rgba(255,255,255,0.2)' : 'white', fontSize: 18,
            width: 36, height: 36, cursor: offset === 0 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          ▶
        </button>
      </div>

      {/* Détail de la période */}
      <DetailPeriode
        periodeKey={periodeKey}
        frequence={frequence}
        histGlobal={histGlobalMap[onglet]}
        histPilier={histPilierMap[onglet]}
        isToday={isToday}
      />
    </div>
  );
}

export default Statistiques;