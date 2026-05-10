import { useState, useEffect } from 'react';

const getDateKey = () => new Date().toISOString().split('T')[0];

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

const getYearKey = () => `${new Date().getFullYear()}`;

export const getKey = (frequence) => {
  if (frequence === 'Quotidien') return getDateKey();
  if (frequence === 'Hebdomadaire') return getWeekKey();
  return getYearKey();
};

export const useRoutineStorage = (frequence) => {
  const periodKey = getKey(frequence);
  const storageKey = `routines_${frequence}_${periodKey}`;
  const historyKey = `historique_${frequence}`;

  const [cochees, setCocheesState] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const setCochees = (nouvellesCochees) => {
    setCocheesState(nouvellesCochees);
  };

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cochees));
      const hist = JSON.parse(localStorage.getItem(historyKey) || '{}');
      hist[periodKey] = cochees.length;
      localStorage.setItem(historyKey, JSON.stringify(hist));
    } catch {}
  }, [cochees, storageKey, historyKey, periodKey]);

  return [cochees, setCochees];
};

export const sauvegarderPiliers = (frequence, cochees, routines) => {
  try {
    const periodKey = getKey(frequence);
    const pilierHistoryKey = `historique_pilier_${frequence}`;
    const hist = JSON.parse(localStorage.getItem(pilierHistoryKey) || '{}');
    const parPilier = { Nutrition: 0, Sommeil: 0, Stress: 0, Mouvement: 0 };
    cochees.forEach(id => {
      const routine = routines.find(r => r.id === id);
      if (routine && parPilier[routine.pilier] !== undefined) {
        parPilier[routine.pilier]++;
      }
    });
    hist[periodKey] = parPilier;
    localStorage.setItem(pilierHistoryKey, JSON.stringify(hist));
  } catch {}
};

export const getHistorique = (frequence) => {
  try {
    return JSON.parse(localStorage.getItem(`historique_${frequence}`) || '{}');
  } catch { return {}; }
};

export const getHistoriquePilier = (frequence) => {
  try {
    return JSON.parse(localStorage.getItem(`historique_pilier_${frequence}`) || '{}');
  } catch { return {}; }
};

