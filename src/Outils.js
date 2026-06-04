import React, { useState, useEffect } from 'react';

const COURSES_DEFAUT = [
  { id: 1, categorie: "Légumes & Fruits", nom: "Légumes / crudités de saison ou surgelés (légumes verts ++, légumes colorés)" },
  { id: 2, categorie: "Légumes & Fruits", nom: "Fruits de saison ou surgelés" },
  { id: 3, categorie: "Protéines", nom: "Œufs" },
  { id: 4, categorie: "Protéines", nom: "Poulet ou dinde" },
  { id: 5, categorie: "Protéines", nom: "Poisson gras (sardines, maquereau, hareng)" },
  { id: 6, categorie: "Protéines", nom: "Légumineuses (lentilles, pois chiches, haricots)" },
  { id: 7, categorie: "Protéines", nom: "Tofu ou tempeh" },
   { id: 8, categorie: "Protéines", nom: "Viande rouge (petite quantité)" },
  { id: 9, categorie: "Céréales & Féculents", nom: "Riz complet ou semi-complet" },
  { id: 10, categorie: "Céréales & Féculents", nom: "Pâtes complètes" },
  { id: 11, categorie: "Céréales & Féculents", nom: "Pain complet ou au levain ou aux graines" },
  { id: 12, categorie: "Céréales & Féculents", nom: "Flocons d'avoine" },
  { id: 13, categorie: "Céréales & Féculents", nom: "Quinoa ou sarrasin" },
  { id: 14, categorie: "Bonnes graisses", nom: "Huile d'olive extra vierge" },
  { id: 15, categorie: "Bonnes graisses", nom: "Huile de colza première pression à froid" },
  { id: 16, categorie: "Bonnes graisses", nom: "Oléagineux (noix, amandes, noisettes)" },
  { id: 17, categorie: "Bonnes graisses", nom: "Avocat" },
  { id: 18, categorie: "Produits laitiers & alternatives", nom: "Yaourt nature ou grec" },
  { id: 19, categorie: "Produits laitiers & alternatives", nom: "Fromage blanc" },
  { id: 20, categorie: "Produits laitiers & alternatives", nom: "Lait végétal (amande, avoine)" },
   { id: 21, categorie: "Produits laitiers & alternatives", nom: "Féta ou cottage cheese" },
    { id: 22, categorie: "Produits laitiers & alternatives", nom: "Beurre ou margarine au colza" },
     { id: 23, categorie: "Produits laitiers & alternatives", nom: "Fromage de chèvre ou de brebis" },
  { id: 24, categorie: "Épicerie", nom: "Herbes aromatiques (persil, basilic, coriandre...)" },
  { id: 25, categorie: "Épicerie", nom: "Épices (curcuma, cumin, gingembre...)" },
  { id: 26, categorie: "Épicerie", nom: "Chocolat noir 70%+" },
  { id: 27, categorie: "Épicerie", nom: "Conserves de légumineuses et de légumes" },
  { id: 28, categorie: "Boissons", nom: "Eau (si besoin)" },
  { id: 29, categorie: "Boissons", nom: "Tisanes (camomille, verveine, mélisse)" },
  { id: 30, categorie: "Boissons", nom: "Thé vert" },
  { id: 31, categorie: "Boissons", nom: "Café" },
];

const CATEGORIES = [...new Set(COURSES_DEFAUT.map(c => c.categorie))];

function OutilNutrition() {
  const [cochees, setCochees] = useState(() => {
    try { return JSON.parse(localStorage.getItem('courses_cochees') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('courses_cochees', JSON.stringify(cochees));
  }, [cochees]);

  const toggle = (id) => {
    setCochees(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const total = COURSES_DEFAUT.length;
  const faits = cochees.length;

  return (
    <div>
      <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '0.5px solid #eee', marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#75ae79', marginBottom: 12, textAlign: 'center' }}>
          -Liste de courses idéale — diète méditerranéenne-
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 13, color: '#7c867d' }}>{faits}/{total} articles cochés</p>
          <button onClick={() => setCochees([])} style={{ fontSize: 12, color: '#cb7c5d', background: 'none', border: 'none', cursor: 'pointer' }}>
            Tout décocher
          </button>
        </div>
      </div>

      {CATEGORIES.map(cat => (
        <div key={cat} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white', marginBottom: 8 }}>{cat}</div>
          {COURSES_DEFAUT.filter(c => c.categorie === cat).map(c => (
            <div key={c.id} onClick={() => toggle(c.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', background: 'white', borderRadius: 10,
              border: '0.5px solid #eee', marginBottom: 6, cursor: 'pointer',
              opacity: cochees.includes(c.id) ? 0.5 : 1
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 4,
                border: cochees.includes(c.id) ? 'none' : '1.5px solid #ccc',
                background: cochees.includes(c.id) ? '#ded3ae' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                {cochees.includes(c.id) && <span style={{ color: 'white', fontSize: 12 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14, color: 'var(--color-text-primary)', textDecoration: cochees.includes(c.id) ? 'line-through' : 'none' }}>
                {c.nom}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function OutilSommeil() {
  const [pensees, setPensees] = useState(() => localStorage.getItem('sommeil_pensees') || '');
  const [programme, setProgramme] = useState(() => localStorage.getItem('sommeil_programme') || '');
  const [journal, setJournal] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sommeil_journal') || '{}'); }
    catch { return {}; }
  });

  const today = new Date().toISOString().split('T')[0];
  const entryAujourdhui = journal[today] || { coucher: '', lever: '', qualite: '', notes: '' };

  const updateJournal = (field, value) => {
    const updated = { ...journal, [today]: { ...entryAujourdhui, [field]: value } };
    setJournal(updated);
    localStorage.setItem('sommeil_journal', JSON.stringify(updated));
  };

  return (
    <div>
      <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '1px solid #eee', marginBottom: 12 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#185FA5', marginBottom: 8 }}>😴 Vider les pensées du soir</h3>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
          Note tout ce qui tourne dans ta tête pour libérer ton esprit avant de dormir.
        </p>
        <textarea
          value={pensees}
          onChange={e => { setPensees(e.target.value); localStorage.setItem('sommeil_pensees', e.target.value); }}
          placeholder="Ce qui me préoccupe ce soir..."
          style={{ width: '100%', minHeight: 100, border: '0.5px solid #eee', borderRadius: 8, padding: 10, fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '1px solid #eee', marginBottom: 12 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#185FA5', marginBottom: 8 }}>📋 Programme du lendemain</h3>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
          Note ce que tu as à faire demain pour ne plus y penser cette nuit.
        </p>
        <textarea
          value={programme}
          onChange={e => { setProgramme(e.target.value); localStorage.setItem('sommeil_programme', e.target.value); }}
          placeholder="Demain je dois..."
          style={{ width: '100%', minHeight: 100, border: '0.5px solid #eee', borderRadius: 8, padding: 10, fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#185FA5', marginBottom: 12 }}>📊 Journal du sommeil — aujourd'hui</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>Heure de coucher</label>
            <input type="time" value={entryAujourdhui.coucher}
              onChange={e => updateJournal('coucher', e.target.value)}
              style={{ width: '100%', border: '0.5px solid #eee', borderRadius: 8, padding: '6px 10px', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>Heure de lever</label>
            <input type="time" value={entryAujourdhui.lever}
              onChange={e => updateJournal('lever', e.target.value)}
              style={{ width: '100%', border: '0.5px solid #eee', borderRadius: 8, padding: '6px 10px', fontSize: 13 }} />
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>Qualité du sommeil</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['😴 Mauvaise', '😐 Moyenne', '🙂 Bonne', '😁 Excellente'].map(q => (
              <button key={q} onClick={() => updateJournal('qualite', q)}
                style={{
                  flex: 1, padding: '6px 4px', borderRadius: 8, fontSize: 11,
                  border: entryAujourdhui.qualite === q ? 'none' : '0.5px solid #eee',
                  background: entryAujourdhui.qualite === q ? '#E6F1FB' : 'white',
                  color: entryAujourdhui.qualite === q ? '#185FA5' : 'var(--color-text-secondary)',
                  cursor: 'pointer'
                }}>
                {q}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>Notes</label>
          <textarea value={entryAujourdhui.notes}
            onChange={e => updateJournal('notes', e.target.value)}
            placeholder="Réveils nocturnes, rêves, sensations..."
            style={{ width: '100%', minHeight: 70, border: '0.5px solid #eee', borderRadius: 8, padding: 10, fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }} />
        </div>
      </div>
    </div>
  );
}

function OutilStress() {
  const [pensees, setPensees] = useState(() => localStorage.getItem('stress_pensees') || '');
  const [actions, setActions] = useState(() => localStorage.getItem('stress_actions') || '');

  return (
    <div>
      <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '1px solid #eee', marginBottom: 12 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#854F0B', marginBottom: 8 }}>🧘 Parking à pensées</h3>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
          Dépose ici ce qui te stresse ou te préoccupe. Mettre des mots sur ses pensées aide à les dépasser.
        </p>
        <textarea
          value={pensees}
          onChange={e => { setPensees(e.target.value); localStorage.setItem('stress_pensees', e.target.value); }}
          placeholder="Ce qui me stresse en ce moment..."
          style={{ width: '100%', minHeight: 120, border: '0.5px solid #eee', borderRadius: 8, padding: 10, fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>
      <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#854F0B', marginBottom: 8 }}>✅ Actions possibles</h3>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
          Pour chaque source de stress, quelle action concrète peux-tu mettre en place ?
        </p>
        <textarea
          value={actions}
          onChange={e => { setActions(e.target.value); localStorage.setItem('stress_actions', e.target.value); }}
          placeholder="Actions que je peux faire pour améliorer la situation..."
          style={{ width: '100%', minHeight: 120, border: '0.5px solid #eee', borderRadius: 8, padding: 10, fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>
    </div>
  );
}

function OutilMouvement() {
  const [programme, setProgramme] = useState(() => localStorage.getItem('mouvement_programme') || '');

  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const [activites, setActivites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mouvement_activites') || '{}'); }
    catch { return {}; }
  });

  const updateActivite = (jour, value) => {
    const updated = { ...activites, [jour]: value };
    setActivites(updated);
    localStorage.setItem('mouvement_activites', JSON.stringify(updated));
  };

  return (
    <div>
      <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '1px solid #eee', marginBottom: 12 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#8f1d99', marginBottom: 8 }}>🏃 Programme de la semaine</h3>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>
          Planifie tes activités physiques pour la semaine — un programme écrit multiplie les chances de le suivre.
        </p>
        {jours.map(jour => (
          <div key={jour} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', minWidth: 70 }}>{jour}</div>
            <input
              type="text"
              value={activites[jour] || ''}
              onChange={e => updateActivite(jour, e.target.value)}
              placeholder="Marche / Yoga..."
              style={{ flex: 1, border: '0.5px solid #eee', borderRadius: 8, padding: '8px 10px', fontSize: 13, fontFamily: 'inherit' }}
            />
          </div>
        ))}
      </div>
      <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#951d99', marginBottom: 8 }}>📝 Notes libres</h3>
        <textarea
          value={programme}
          onChange={e => { setProgramme(e.target.value); localStorage.setItem('mouvement_programme', e.target.value); }}
          placeholder="Objectifs, sensations, progression..."
          style={{ width: '100%', minHeight: 100, border: '0.5px solid #eee', borderRadius: 8, padding: 10, fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>
    </div>
  );
}

function Outils() {
  const [pilierActif, setPilierActif] = useState('Nutrition');

  const piliers = [
    { nom: 'Nutrition', emoji: '🥗', couleur: '#27500A', bg: '#EAF3DE' },
    { nom: 'Sommeil', emoji: '😴', couleur: '#0C447C', bg: '#E6F1FB' },
    { nom: 'Stress', emoji: '🧘', couleur: '#633806', bg: '#FAEEDA' },
    { nom: 'Mouvement', emoji: '🏃', couleur: '#8626a6', bg: '#FAECE7' },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: 4, textAlign: 'center' }}>Outils ✏️</h2>
<p style={{ fontSize: 13, color: 'white', marginBottom: '1.2rem', textAlign: 'center' }}>
  Tes espaces pratiques pour agir au quotidien
</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {piliers.map(p => (
          <button key={p.nom} onClick={() => setPilierActif(p.nom)}
            style={{
              flex: 1, padding: '8px 4px', borderRadius: 20, fontSize: 12,
              border: pilierActif === p.nom ? 'none' : '0.5px solid var(--color-border-secondary)',
              background: pilierActif === p.nom ? p.bg : 'transparent',
              color: pilierActif === p.nom ? p.couleur : 'white',
              fontWeight: pilierActif === p.nom ? 500 : 400, cursor: 'pointer'
            }}>
            {p.emoji} {p.nom}
          </button>
        ))}
      </div>

      {pilierActif === 'Nutrition' && <OutilNutrition />}
      {pilierActif === 'Sommeil' && <OutilSommeil />}
      {pilierActif === 'Stress' && <OutilStress />}
      {pilierActif === 'Mouvement' && <OutilMouvement />}
    </div>
  );
}

export default Outils;