import React, { useRef, useState } from 'react';
import { Download, Upload, FolderHeart } from 'lucide-react';

const FREQUENCES_SAUVEGARDE = ['Quotidien', 'Hebdomadaire', 'Annuel'];
const TOTAUX_SAUVEGARDE = { Quotidien: 11, Hebdomadaire: 5, Annuel: 4 };
const PILIERS_SAUVEGARDE = ['Nutrition', 'Sommeil', 'Stress', 'Mouvement'];
const JOURS_SAUVEGARDE = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const HUMEURS_SAUVEGARDE = ['tres-bien', 'bien', 'neutre', 'bof', 'pas-bien'];
const TEXTES_SAUVEGARDE = ['prenom', 'sommeil_pensees', 'sommeil_programme', 'stress_pensees', 'stress_actions', 'mouvement_programme'];
const PREFERENCES_SAUVEGARDE = {
  outils_dernier_onglet: ['Nutrition', 'Sommeil', 'Stress', 'Mouvement', 'Produits'],
  ressources_dernier_pilier: ['Tous', ...PILIERS_SAUVEGARDE, 'Environnement'],
  routines_dernier_pilier: ['Tous', ...PILIERS_SAUVEGARDE],
  routines_derniere_frequence: FREQUENCES_SAUVEGARDE,
};
const LIMITE_FICHIER = 5 * 1024 * 1024;
const estObjet = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const possede = (v, cle) => Object.prototype.hasOwnProperty.call(v, cle);
const estDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v + 'T12:00:00Z')) && new Date(v + 'T12:00:00Z').toISOString().slice(0, 10) === v;
const estPeriode = (cle, f) => f === 'Annuel' ? /^\d{4}$/.test(cle) : estDate(cle);
const estCompte = (v, max) => Number.isInteger(v) && v >= 0 && v <= max;
const idsValides = (v, min, max) => Array.isArray(v) && new Set(v).size === v.length && v.every(id => Number.isInteger(id) && id >= min && id <= max);

function cleSauvegardable(cle) {
  if (TEXTES_SAUVEGARDE.includes(cle) || possede(PREFERENCES_SAUVEGARDE, cle)) return true;
  if (['courses_cochees', 'sommeil_journal', 'mouvement_activites', 'serenitine_humeurs'].includes(cle)) return true;
  if (/^historique_(pilier_)?(Quotidien|Hebdomadaire|Annuel)$/.test(cle)) return true;
  const m = /^routines_(Quotidien|Hebdomadaire|Annuel)_(.+)$/.exec(cle);
  return Boolean(m && estPeriode(m[2], m[1]));
}

function valeurValide(cle, brute) {
  if (typeof brute !== 'string') return false;
  if (TEXTES_SAUVEGARDE.includes(cle)) return true;
  if (possede(PREFERENCES_SAUVEGARDE, cle)) return PREFERENCES_SAUVEGARDE[cle].includes(brute);
  let v;
  try { v = JSON.parse(brute); } catch { return false; }
  if (cle === 'courses_cochees') return idsValides(v, 1, 31);
  const routine = /^routines_(Quotidien|Hebdomadaire|Annuel)_(.+)$/.exec(cle);
  if (routine) {
    const bornes = { Quotidien: [1, 11], Hebdomadaire: [12, 16], Annuel: [17, 20] };
    return idsValides(v, ...bornes[routine[1]]);
  }
  if (!estObjet(v)) return false;
  if (cle === 'serenitine_humeurs') return Object.entries(v).every(([date, humeur]) => estDate(date) && HUMEURS_SAUVEGARDE.includes(humeur));
  if (cle === 'mouvement_activites') return Object.entries(v).every(([jour, texte]) => JOURS_SAUVEGARDE.includes(jour) && typeof texte === 'string');
  if (cle === 'sommeil_journal') {
    return Object.entries(v).every(([date, fiche]) =>
      (date === 'fiche' || estDate(date)) && estObjet(fiche) &&
      Object.entries(fiche).every(([champ, texte]) => {
        if (typeof texte !== 'string') return false;
        if (champ === 'notes') return true;
        if (champ === 'qualite') return ['', 'Mauvaise', 'Moyenne', 'Bonne', 'Excellente'].includes(texte);
        return ['coucher', 'lever'].includes(champ) && (texte === '' || /^([01]\d|2[0-3]):[0-5]\d$/.test(texte));
      })
    );
  }
  const historique = /^historique_(pilier_)?(Quotidien|Hebdomadaire|Annuel)$/.exec(cle);
  if (!historique) return false;
  const f = historique[2];
  return Object.entries(v).every(([periode, valeur]) => {
    if (!estPeriode(periode, f)) return false;
    if (!historique[1]) return estCompte(valeur, TOTAUX_SAUVEGARDE[f]);
    const repartition = {
      Quotidien: { Nutrition: 4, Sommeil: 3, Stress: 2, Mouvement: 2 },
      Hebdomadaire: { Nutrition: 2, Sommeil: 1, Stress: 1, Mouvement: 1 },
      Annuel: { Nutrition: 2, Sommeil: 0, Stress: 0, Mouvement: 2 },
    };
    return estObjet(valeur) && Object.entries(valeur).every(([pilier, nb]) => PILIERS_SAUVEGARDE.includes(pilier) && estCompte(nb, repartition[f][pilier]));
  });
}

function lireDonnees(storage) {
  const donnees = Object.create(null);
  for (let i = 0; i < storage.length; i++) {
    const cle = storage.key(i);
    if (cle && cleSauvegardable(cle)) donnees[cle] = storage.getItem(cle);
  }
  return donnees;
}

function verifierSauvegarde(sauvegarde) {
  if (!estObjet(sauvegarde) || sauvegarde.application !== 'Serenitine' || sauvegarde.version !== 1 || !estObjet(sauvegarde.donnees)) {
    throw new Error('Ce fichier n’est pas une sauvegarde Sérénitine compatible.');
  }
  const entrees = Object.entries(sauvegarde.donnees);
  if (entrees.length === 0) throw new Error('Cette sauvegarde ne contient aucune donnée.');
  if (entrees.length > 50000 || !entrees.every(([cle, valeur]) => cleSauvegardable(cle) && valeurValide(cle, valeur))) {
    throw new Error('La sauvegarde contient des données invalides ou incompatibles. Rien n’a été modifié.');
  }
  return sauvegarde.donnees;
}

function remplacerDonnees(storage, donnees) {
  const avant = lireDonnees(storage);
  try {
    Object.keys(avant).forEach(cle => storage.removeItem(cle));
    Object.entries(donnees).forEach(([cle, valeur]) => storage.setItem(cle, valeur));
  } catch {
    try {
      Object.keys(lireDonnees(storage)).forEach(cle => storage.removeItem(cle));
      Object.entries(avant).forEach(([cle, valeur]) => storage.setItem(cle, valeur));
    } catch {
      throw new Error('Le navigateur a bloqué la restauration et le rétablissement des données. Conserve ton fichier de sauvegarde et ne réinitialise pas l’application.');
    }
    throw new Error('Restauration impossible, notamment si le stockage est plein. Les données précédentes ont été rétablies.');
  }
}

const STYLE_SAUVEGARDE = `
.profil-sauvegarde { padding: 22px; margin-bottom: 20px; background: #faf6ee; border: 1px solid #e8dece; border-radius: 22px; }
.profil-sauvegarde-entete { display: flex; align-items: center; gap: 12px; }
.profil-sauvegarde-icone { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 42px; height: 42px; border-radius: 50%; background: #e8eff4; color: #526f84; }
.profil-sauvegarde h3 { margin: 0; color: #5c3d2e; font-size: 15px; font-weight: 600; line-height: 1.5; }
.profil-sauvegarde p { margin: 14px 0; color: #786b5e; font-size: 12px; line-height: 1.8; }
.profil-sauvegarde-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.profil-sauvegarde-actions button { display: flex; align-items: center; justify-content: center; gap: 8px; flex: 1 1 120px; min-height: 44px; padding: 12px; border: 1px solid #d9cebf; border-radius: 12px; background: #fffdf9; color: #5c3d2e; font: inherit; font-size: 13px; cursor: pointer; }
.profil-sauvegarde-actions button:first-child { background: #5c3d2e; color: #fffaf3; border-color: #5c3d2e; }
.profil-sauvegarde-actions button:disabled { opacity: .55; cursor: default; }
.profil-sauvegarde .profil-sauvegarde-note { margin-bottom: 0; font-size: 11px; }
.profil-sauvegarde .profil-sauvegarde-message { padding: 10px 12px; margin-bottom: 0; border-radius: 10px; background: #e8eff4; color: #405b6c; }
`;

export default function SauvegardeDonnees() {
  const fichierRef = useRef(null);
  const [occupe, setOccupe] = useState(false);
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState(false);
  const informer = (texte, estErreur = false) => { setMessage(texte); setErreur(estErreur); };

  const exporter = () => {
    try {
      const donnees = lireDonnees(localStorage);
      const sauvegarde = { application: 'Serenitine', version: 1, creeLe: new Date().toISOString(), donnees };
      verifierSauvegarde(sauvegarde);
      const fichier = new Blob([JSON.stringify(sauvegarde, null, 2)], { type: 'application/json' });
      if (fichier.size > LIMITE_FICHIER) throw new Error('La sauvegarde dépasse la limite de 5 Mo.');
      const url = URL.createObjectURL(fichier);
      const lien = document.createElement('a');
      lien.href = url;
      lien.download = `serenitine-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(lien);
      try { lien.click(); } finally { lien.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000); }
      informer('Téléchargement demandé. Vérifie que le fichier est bien enregistré dans tes fichiers ou téléchargements.');
    } catch (e) {
      informer(e.message || 'Impossible de créer la sauvegarde.', true);
    }
  };

  const restaurer = async (event) => {
    const fichier = event.target.files?.[0];
    event.target.value = '';
    if (!fichier) return;
    setOccupe(true);
    informer('Vérification du fichier…');
    try {
      if (fichier.size > LIMITE_FICHIER) throw new Error('Ce fichier dépasse la limite de 5 Mo.');
      let sauvegarde;
      try { sauvegarde = JSON.parse(await fichier.text()); }
      catch { throw new Error('Le fichier ne peut pas être lu. Sélectionne le fichier JSON exporté par Sérénitine.'); }
      const donnees = verifierSauvegarde(sauvegarde);
      const accord = window.confirm('Restaurer cette sauvegarde ?\n\nLes routines, historiques, humeurs, notes et préférences présents sur cet appareil seront remplacés par ceux du fichier. Exporte d’abord tes données actuelles si tu souhaites les conserver.');
      if (!accord) { informer('Restauration annulée. Aucune donnée modifiée.'); return; }
      remplacerDonnees(localStorage, donnees);
      window.alert('Sauvegarde restaurée. L’application va se recharger.');
      window.location.reload();
    } catch (e) {
      informer(e.message || 'Impossible de restaurer ce fichier.', true);
    } finally { setOccupe(false); }
  };

  return (
    <section className="profil-sauvegarde" aria-labelledby="titre-sauvegarde">
      <style>{STYLE_SAUVEGARDE}</style>
      <div className="profil-sauvegarde-entete">
        <span className="profil-sauvegarde-icone" aria-hidden="true"><FolderHeart size={22} strokeWidth={1.6} /></span>
        <h3 id="titre-sauvegarde">Sauvegarder mes données</h3>
      </div>
      <p>Garde une copie de tes routines, historiques, humeurs et notes. Tu pourras les retrouver sur un autre appareil ou autre navigateur en restaurant ce fichier.</p>
      <div className="profil-sauvegarde-actions">
        <button type="button" onClick={exporter} disabled={occupe}><Download size={17} /> Exporter</button>
        <button type="button" onClick={() => fichierRef.current?.click()} disabled={occupe}><Upload size={17} /> Restaurer</button>
      </div>
      <input ref={fichierRef} type="file" accept=".json,application/json" onChange={restaurer} style={{ display: 'none' }} aria-label="Choisir une sauvegarde Sérénitine" />
      <p className="profil-sauvegarde-note">Sauvegarde manuelle. Le fichier contient tes informations personnelles et n’est pas chiffré : conserve-le dans un endroit privé. Aucun envoi vers un serveur n’est effectué par cette fonction. La restauration remplace les données, sans les fusionner.</p>
      {message && <p className="profil-sauvegarde-message" role={erreur ? 'alert' : 'status'}>{message}</p>}
    </section>
  );
}
