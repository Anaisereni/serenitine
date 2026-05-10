import React from 'react';
import { useNavigate } from 'react-router-dom';

function APropos() {
  const navigate = useNavigate();
  return (
    <div className="article-wrap">
      <button className="fiche-retour" onClick={() => navigate('/profil')}>← Retour</button>
      <div className="article-emoji">🌿</div>
      <h2 className="fiche-titre">Pourquoi Epigéna ?</h2>
      <div className="article-section">
        <p className="article-section-texte">Le nom Épigéna est inspiré du mot "épigénétique" qui veut dire : étude des changements dans l'activité des gènes en fonction de l'environnement, sans modifier le code génétique lui-même.
Certains gênes peuvent être activés ou désactivés selon les facteurs externes comme l'environnement, la nutrition, le sommeil ou le stress. Nos habitudes de vie peuvent donc impacter notre santé en modifiant l'activité de nos génes, vers quelque chose de positif ou négatif.</p>
      </div>
    </div>
  );
}

export default APropos;