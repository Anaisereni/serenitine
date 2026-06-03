import React from 'react';

function Routine({ nom, description, pilier, cochee, onToggle, onOuvrirFiche, afficherPilier = true }) {
  return (
    <div className={`routine-item ${cochee ? 'cochee' : ''}`}>
      <input
        type="checkbox"
        checked={cochee}
        onChange={onToggle}
      />
      <div
        className="routine-texte"
        onClick={() => {
          console.log("clic sur", nom);
          onOuvrirFiche();
        }}
        style={{ cursor: 'pointer' }}
      >
        <span className="routine-nom">{nom}</span>
        <span className="routine-desc">{description}</span>
      </div>
      {afficherPilier && (
        <span className={`routine-pilier ${pilier.toLowerCase()}`}>
          {pilier}
        </span>
      )}
    </div>
  );
}

export default Routine;