import React from 'react';
import { useNavigate } from 'react-router-dom';

function Presentation() {
  const navigate = useNavigate();
  return (
    <div className="article-wrap">
      <button className="fiche-retour" onClick={() => navigate('/profil')}>← Retour</button>
      <div className="article-emoji">🙋🏻‍♀️</div>
      <h2 className="fiche-titre">Qui suis-je ?</h2>
      <div className="article-section">
        <p className="article-section-texte" >Je m’appelle Anaïs Pata et je suis kinésithérapeute depuis 2020. J’ai également obtenu un Master 2 en ingénierie de la santé en 2021 (spécifique masso-kinésithérapie), puis un Diplôme Universitaire en alimentation santé et micronutrition en 2024.
Depuis toujours, je m’intéresse de près au bien-être et à l’importance d’un mode de vie sain. Dans ma pratique, j’ai rapidement réalisé que beaucoup de mes patients manquaient d’informations et avaient besoin d’être guidés au quotidien.
C’est de ce constat qu’est née, en 2026, l’envie de créer cette application : un outil simple et accessible, pensé pour accompagner chacun vers de meilleures habitudes de vie.</p>
      </div>
    </div>
  );
}

export default Presentation;