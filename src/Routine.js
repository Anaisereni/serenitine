import React from 'react';
import { getAudioCtx, debloqueurAudio } from './audio';

const jouerSonCoche = () => {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(594, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
};

function Routine({ nom, description, pilier, cochee, onToggle, onOuvrirFiche, afficherPilier = true }) {

  const handleToggle = () => {
    debloqueurAudio();
    if (!cochee) jouerSonCoche();
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