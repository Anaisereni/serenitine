import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound } from 'lucide-react';

const STYLE_PRESENTATION = `
.presentation-page {
  padding: 1rem;
  color: #5c5045;
}

.presentation-retour {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  margin-bottom: 18px;
  padding: 10px 14px;
  background: #faf6ee;
  border: 1px solid #e8dece;
  border-radius: 12px;
  color: #5c3d2e;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.presentation-entete {
  padding: 24px 20px;
  margin-bottom: 20px;
  background: #faf6ee;
  border: 1px solid #e8dece;
  border-radius: 22px;
}

.presentation-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  margin-bottom: 16px;
  border-radius: 50%;
  background: #e8eff4;
  color: #526f84;
}

.presentation-entete h2 {
  margin: 0;
  color: #5c3d2e;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
}

.presentation-signature {
  margin: 10px 0 0;
  color: #786b5e;
  font-family: Georgia, serif;
  font-size: 14px;
  font-style: italic;
  line-height: 1.7;
}

.presentation-contenu {
  padding: 22px;
  margin-bottom: 20px;
  background: #fffdf9;
  border: 1px solid #e8dece;
  border-radius: 20px;
}

.presentation-contenu p {
  margin: 0;
  color: #635b52;
  font-size: 14px;
  line-height: 1.9;
}

.presentation-contenu p + p {
  margin-top: 18px;
}

.presentation-page button:focus-visible {
  outline: 3px solid #526f84;
  outline-offset: 3px;
}

@media (max-width: 380px) {
  .presentation-entete h2 {
    font-size: 21px;
  }

  .presentation-contenu {
    padding: 18px;
  }
}
`;

function Presentation() {
  const navigate = useNavigate();

  return (
    <div className="presentation-page">
      <style>{STYLE_PRESENTATION}</style>

      <button
        type="button"
        className="presentation-retour"
        onClick={() => navigate('/profil')}
      >
        ← Retour au profil
      </button>

      <article>
        <header className="presentation-entete">
          <span className="presentation-icone" aria-hidden="true">
            <UserRound size={26} strokeWidth={1.6} />
          </span>

          <h2>Qui suis-je ?</h2>

          <p className="presentation-signature">
            Anaïs Pata, créatrice de Sérénitine
          </p>
        </header>

        <div className="presentation-contenu">
          <p>
            Je m'appelle Anaïs Pata et je suis kinésithérapeute
            depuis 2020. Passionnée par la santé et la prévention,
            j'ai souhaité approfondir mes connaissances en obtenant
            un Master 2 en ingénierie de la santé (spécialité
            masso-kinésithérapie) en 2021, puis un Diplôme
            Universitaire en alimentation santé et micronutrition
            en 2024.
          </p>

          <p>
            Depuis mes années d'études, je suis convaincue que
            notre bien-être se construit avant tout grâce à nos
            habitudes de vie. Au fil de ma pratique, j'ai constaté
            que beaucoup de patients souhaitaient prendre davantage
            soin de leur santé, mais ne savaient pas toujours par
            où commencer ou manquaient de repères fiables au
            quotidien.
          </p>

          <p>
            C'est de cette envie d'accompagner chacun de manière
            simple et concrète qu'est née, en 2026, cette
            application. Mon objectif est de vous aider à adopter,
            à votre rythme, de meilleures habitudes de vie.
            Ici, pas de recherche de perfection : chaque petit
            pas compte, et ce sont les progrès réguliers qui
            font la différence sur le long terme.
          </p>

          <p>
            Si vous souhaitez aller plus loin avec un
            accompagnement personnalisé, je propose également
            des consultations en visioconférence autour du
            bien-être, de l'hygiène de vie et de la nutrition,
            réservables sur Doctolib (en choisissant l'option
            « en vidéo »).
          </p>
        </div>
      </article>

      <button
        type="button"
        className="presentation-retour"
        onClick={() => navigate('/profil')}
      >
        ← Retour au profil
      </button>
    </div>
  );
}

export default Presentation;