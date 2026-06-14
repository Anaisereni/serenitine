import React from 'react';

const jouerSonCoche = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
};

function Routine({ nom, description, pilier, cochee, onToggle, onOuvrirFiche, afficherPilier = true }) {

  const handleToggle = () => {
    if (!cochee) jouerSonCoche(); // son uniquement quand on coche, pas quand on décoche
    onToggle();
  };

  return (
    <div className={`routine-item ${cochee ? 'cochee' : ''}`}>
      <input
        type="checkbox"
        checked={cochee}
        onChange={handleToggle}
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