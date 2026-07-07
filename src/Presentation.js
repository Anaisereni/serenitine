import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound } from 'lucide-react';

function Presentation() {
  const navigate = useNavigate();
  return (
    <div className="article-wrap">
      <button className="fiche-retour" onClick={() => navigate('/profil')}>← Retour</button>
      <div className="article-emoji"><UserRound size={40} /></div>
      <h2 className="fiche-titre">Qui suis-je ?</h2>
      <div className="article-section">
        <p className="article-section-texte">Je m'appelle Anaïs Pata et je suis kinésithérapeute depuis 2020. Passionnée par la santé et la prévention, j'ai souhaité approfondir mes connaissances en obtenant un Master 2 en ingénierie de la santé (spécialité masso-kinésithérapie) en 2021, puis un Diplôme Universitaire en alimentation santé et micronutrition en 2024.
Depuis mes années d'études, je suis convaincue que notre bien-être se construit avant tout grâce à nos habitudes de vie. Au fil de ma pratique, j'ai constaté que beaucoup de patients souhaitaient prendre davantage soin de leur santé, mais ne savaient pas toujours par où commencer ou manquaient de repères fiables au quotidien.
C'est de cette envie d'accompagner chacun de manière simple et concrète qu'est née, en 2026, cette application. Mon objectif est de vous aider à adopter, à votre rythme, de meilleures habitudes de vie. Ici, pas de recherche de perfection : chaque petit pas compte, et ce sont les progrès réguliers qui font la différence sur le long terme.
Si vous souhaitez aller plus loin avec un accompagnement personnalisé, je propose également des consultations en visioconférence autour du bien-être, de l'hygiène de vie et de la nutrition, réservables sur Doctolib (en choisissant l'option « en vidéo »).</p>
      </div>
    </div>
  );
}
export default Presentation;