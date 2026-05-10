import React, { useState } from 'react';
import { getHistorique, getKey, getHistoriquePilier } from './useStorage';

const TOTAUX = {
  Quotidien: 11,
  Hebdomadaire: 5,
  Annuel: 4,
};

const PILIERS = [
  { nom: "Nutrition", couleur: "#3B6D11", bg: "#EAF3DE" },
  { nom: "Sommeil", couleur: "#185FA5", bg: "#E6F1FB" },
  { nom: "Stress", couleur: "#854F0B", bg: "#FAEEDA" },
  { nom: "Mouvement", couleur: "#701d99", bg: "#FAECE7" },
];

const ROUTINES_PAR_PILIER = {
  Quotidien: { Nutrition: 4, Sommeil: 3, Stress: 2, Mouvement: 2 },
  Hebdomadaire: { Nutrition: 2, Sommeil: 1, Stress: 1, Mouvement: 1 },
  Annuel: { Nutrition: 2, Sommeil: 0, Stress: 0, Mouvement: 2 },
};

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
};

const getLast4Weeks = () => {
  const weeks = [];
  const now = new Date();

  for (let i = 3; i >= 0; i--) {
    const d = new Date(now);

    // Lundi de la semaine actuelle
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    d.setDate(d.getDate() + diff - i * 7);

    // IMPORTANT : format local au lieu de toISOString()
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');

    weeks.push(`${year}-${month}-${date}`);
  }

  return weeks;
};

const getLast3Years = () => {
  const year = new Date().getFullYear();
  return [`${year - 2}`, `${year - 1}`, `${year}`];
};

const formatDay = (key) => {
  const d = new Date(key + 'T12:00:00');
  return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
};

const formatWeek = (key) => {
  const d = new Date(key);

  const date = new Date(Date.UTC(
    d.getFullYear(),
    d.getMonth(),
    d.getDate()
  ));

  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);

  return `S${weekNo}`;
};

const formatYear = (key) => key;

function BarreVerticale({ label, valeur, total, isToday, frequence, pilierData }) {
  const pct = total > 0 ? Math.round((valeur / total) * 100) : 0;
  const repartition = ROUTINES_PAR_PILIER[frequence] || { Nutrition: 0, Sommeil: 0, Stress: 0, Mouvement: 0 };

  const pctPilier = (pilier) => {
    const totalPilier = repartition[pilier];
    if (totalPilier === 0) return 0;
    return Math.round(((pilierData[pilier] || 0) / totalPilier) * 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
      <div style={{ fontSize: 12, color: isToday ? '#eff6f4' : 'var(--color-text-secondary)', fontWeight: isToday ? 500 : 400 }}>
        {pct}%
      </div>
      <div style={{
        width: '100%', height: 100,
        borderRadius: 6, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        border: isToday ? '1.5px solid #ecf3f1' : '1px solid var(--color-border-secondary)'
      }}>
        <div style={{ flex: repartition.Nutrition || 0.01, background: repartition.Nutrition > 0 ? '#EAF3DE' : 'transparent', borderBottom: repartition.Nutrition > 0 ? '0.5px solid white' : 'none', position: 'relative' }}>
          {pilierData.Nutrition > 0 && <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${pctPilier('Nutrition')}%`, background: '#3B6D11' }} />}
        </div>
        <div style={{ flex: repartition.Sommeil || 0.01, background: repartition.Sommeil > 0 ? '#E6F1FB' : 'transparent', borderBottom: repartition.Sommeil > 0 ? '0.5px solid white' : 'none', position: 'relative' }}>
          {pilierData.Sommeil > 0 && <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${pctPilier('Sommeil')}%`, background: '#185FA5' }} />}
        </div>
        <div style={{ flex: repartition.Stress || 0.01, background: repartition.Stress > 0 ? '#FAEEDA' : 'transparent', borderBottom: repartition.Stress > 0 ? '0.5px solid white' : 'none', position: 'relative' }}>
          {pilierData.Stress > 0 && <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${pctPilier('Stress')}%`, background: '#854F0B' }} />}
        </div>
        <div style={{ flex: repartition.Mouvement || 0.01, background: repartition.Mouvement > 0 ? '#FAECE7' : 'transparent', position: 'relative' }}>
          {pilierData.Mouvement > 0 && <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${pctPilier('Mouvement')}%`, background: '#741d99' }} />}
        </div>
      </div>
      <div style={{ fontSize: 10, color: isToday ? '#eff7f5' : 'var(--color-text-tertiary)', textAlign: 'center', lineHeight: 1.3 }}>
        {label}
      </div>
      <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>
        {valeur}/{total}
      </div>
    </div>
  );
}

function Statistiques() {
  const [onglet, setOnglet] = useState('jour');

  const histQuotidien = getHistorique('Quotidien');
  const histHebdo = getHistorique('Hebdomadaire');
  const histAnnuel = getHistorique('Annuel');

  const histPilierQuotidien = getHistoriquePilier('Quotidien');
  const histPilierHebdo = getHistoriquePilier('Hebdomadaire');
  const histPilierAnnuel = getHistoriquePilier('Annuel');

  const todayKey = getKey('Quotidien');
  const weekKey = getKey('Hebdomadaire');
  const yearKey = getKey('Annuel');

  const configs = {
    jour: {
      keys: getLast7Days(),
      historique: histQuotidien,
      histPilier: histPilierQuotidien,
      total: TOTAUX.Quotidien,
      formater: formatDay,
      currentKey: todayKey,
    },
    semaine: {
      keys: getLast4Weeks(),
      historique: histHebdo,
      histPilier: histPilierHebdo,
      total: TOTAUX.Hebdomadaire,
      formater: formatWeek,
      currentKey: weekKey,
    },
    annee: {
      keys: getLast3Years(),
      historique: histAnnuel,
      histPilier: histPilierAnnuel,
      total: TOTAUX.Annuel,
      formater: formatYear,
      currentKey: yearKey,
    },
  };

  const config = configs[onglet];

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f3f1ec', marginBottom: '1.2rem', textAlign: 'center' }}>
        Progression 📊
      </h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        {[['jour', '7 jours'], ['semaine', '4 semaines'], ['annee', '3 ans']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setOnglet(key)}
            style={{
              flex: 1, padding: '8px 4px', borderRadius: 20,
              border: onglet === key ? '#f8f8f1' : '0.5px solid var(--color-border-secondary)',
              background: onglet === key ? '#c1c2b8' : 'transparent',
              color: onglet === key ? 'white' : 'var(--color-text-secondary)',
              fontSize: 13, cursor: 'pointer', fontWeight: onglet === key ? 500 : 400
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '1rem',
        marginBottom: 12
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          {config.keys.map(k => (
            <BarreVerticale
              key={k}
              label={config.formater(k)}
              valeur={config.historique[k] || 0}
              total={config.total}
              isToday={k === config.currentKey}
              frequence={onglet === 'jour' ? 'Quotidien' : onglet === 'semaine' ? 'Hebdomadaire' : 'Annuel'}
              pilierData={config.histPilier[k] || { Nutrition: 0, Sommeil: 0, Stress: 0, Mouvement: 0 }}
            />
          ))}
        </div>
      </div>

      <div style={{
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '1rem',
      }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)', marginBottom: 10 }}>
          Légende des piliers
        </div>
        {PILIERS.map(p => (
          <div key={p.nom} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: p.couleur, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'var(--color-text-primary)', flex: 1 }}>{p.nom}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistiques;