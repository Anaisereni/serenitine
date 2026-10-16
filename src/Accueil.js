
import React, { useState } from 'react';
import { Heart, Salad, Moon, Flower2, Activity, Lightbulb, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const conseils = [
  { texte: "Commence ta journée avec un grand verre d'eau. Ton corps est déshydraté après une nuit de sommeil.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Ajoute une poignée de légumes verts à chaque repas, ils apportent fibres, vitamines et minéraux essentiels sans calories excessives.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Mâche lentement et pose ta fourchette entre chaque bouchée, le signal de satiété met 20 minutes à arriver au cerveau.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Prépare tes légumineuses en grande quantité le week-end, elles se conservent 4 jours au frigo et s'intègrent facilement dans tous les repas.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Choisis des céréales complètes plutôt que raffinées, elles stabilisent la glycémie et tiennent plus longtemps au corps.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Une poignée d'oléagineux natures en collation vaut mieux qu'un biscuit industriel, protéines, bonnes graisses et minéraux en un seul geste.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Lis la liste des ingrédients avant celle des calories, si tu ne reconnais pas la moitié des mots, le produit est probablement ultra-transformé.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Alterne les huiles d'olive et de colza dans ta cuisine, l'une pour cuire, l'autre crue pour les oméga-3.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Essaie de te coucher et te lever à la même heure, même le week-end, ton horloge biologique te remerciera.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Éteins les stimulations 2h avant de dormir, pas de sport intense, pas de contenu anxiogène, laisse ton système nerveux décompresser.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Garde ta chambre fraîche, entre 16 et 19°C est la température idéale pour un sommeil profond et réparateur.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Si tu te réveilles la nuit, ne regarde pas l'heure, ça active le cerveau et rend le retour au sommeil plus difficile.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Une courte sieste de 20 minutes en début d'après-midi booste la concentration sans perturber le sommeil nocturne.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "La lumière naturelle le matin est le meilleur régulateur de ton horloge biologique, essaie de t'exposer dans les 30 minutes après le réveil.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Prends 5 minutes aujourd'hui pour faire une cohérence cardiaque, inspire 5 secondes, expire 5 secondes, répète 5 minutes.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Note 3 choses positives de ta journée avant de dormir, ce simple geste recalibre progressivement ton cerveau vers le positif.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Quand tu te sens débordé, fais une seule chose à la fois, le multitasking augmente le cortisol et réduit la qualité du travail.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Sors marcher 20 minutes aujourd'hui, la lumière naturelle et le mouvement sont les meilleurs antidépresseurs naturels.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Dis non à une chose aujourd'hui qui ne te ressemble pas, chaque oui donné à quelque chose est un non donné à toi-même.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Planifie une activité qui te ressource cette semaine, la récupération émotionnelle ne se produit pas par hasard, elle se planifie.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Respire par le ventre plutôt que par la poitrine, la respiration abdominale active directement le système nerveux parasympathique.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Pose ton téléphone 1 heure avant de dormir, ton cerveau a besoin de décompresser sans flux d'informations.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Lève-toi et marche 5 minutes toutes les heures, la sédentarité prolongée est un facteur de risque indépendant même si tu fais du sport.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Prends les escaliers aujourd'hui, chaque occasion de bouger compte, même les plus petites.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Fais 10 minutes d'étirements ce soir, tes muscles et articulations te remercieront demain matin.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Une marche de 30 minutes après le dîner améliore la digestion et régule la glycémie postprandiale.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Ajoute 2 séances de renforcement musculaire par semaine, après 30 ans on perd 1% de masse musculaire par an sans exercice.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Vérifie ta posture maintenant, épaules relâchées, écran à hauteur des yeux, pieds à plat au sol.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Le meilleur sport est celui que tu pratiques régulièrement, choisis une activité qui te plaît plutôt que celle qui brûle le plus de calories.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Après une séance de sport, mange des protéines dans l'heure, c'est la fenêtre optimale pour la récupération musculaire.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Pense à manger des protéines à chaque repas, surtout au petit-déjeuner et au déjeuner.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
];

function Accueil() {
  const navigate = useNavigate();
const prenom = (localStorage.getItem('prenom') || '').trim();

const ouvrirOutil = (pilier) => {
  localStorage.setItem('outils_dernier_onglet', pilier);
  navigate('/outils');
};
  const [instructions2, setInstructions2] = useState(false);
  const jourDuMois = new Date().getDate();
  const conseilDuJour = conseils[(jourDuMois - 1) % conseils.length];
  const [instructions, setInstructions] = useState(false);
  const [consultation, setConsultation] = useState(false);

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="accueil-wrap">

      <div className="accueil-date">{today}</div>

     <div
  className="accueil-hero"
  style={{ position: 'relative', overflow: 'hidden' }}
>
  {/* Feuilles en haut à gauche */}
  <svg
    aria-hidden="true"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      pointerEvents: 'none',
    }}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0 Q45 5 50 20 Q28 22 0 0 Z" fill="rgba(130,165,190,0.25)" />
    <path d="M0 0 Q48 15 52 32 Q28 32 0 0 Z" fill="rgba(130,165,190,0.20)" />
    <path d="M0 0 Q42 25 44 42 Q22 40 0 0 Z" fill="rgba(130,165,190,0.18)" />
    <path d="M0 0 Q30 38 26 52 Q12 46 0 0 Z" fill="rgba(130,165,190,0.22)" />
    <path d="M0 0 Q16 42 10 55 Q3 45 0 0 Z" fill="rgba(130,165,190,0.18)" />
    <path d="M0 0 Q5 44 0 56 Q-3 44 0 0 Z" fill="rgba(130,165,190,0.14)" />
    <line x1="0" y1="0" x2="38" y2="16" stroke="rgba(130,165,190,0.20)" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="26" y2="38" stroke="rgba(130,165,190,0.18)" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="8" y2="48" stroke="rgba(130,165,190,0.15)" strokeWidth="1.5" />
  </svg>

  {/* Feuilles en bas à droite */}
  <svg
    aria-hidden="true"
    style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 100,
      height: 100,
      pointerEvents: 'none',
      transform: 'rotate(180deg)',
    }}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0 Q45 5 50 20 Q28 22 0 0 Z" fill="rgba(130,165,190,0.25)" />
    <path d="M0 0 Q48 15 52 32 Q28 32 0 0 Z" fill="rgba(130,165,190,0.20)" />
    <path d="M0 0 Q42 25 44 42 Q22 40 0 0 Z" fill="rgba(130,165,190,0.18)" />
    <path d="M0 0 Q30 38 26 52 Q12 46 0 0 Z" fill="rgba(130,165,190,0.22)" />
    <path d="M0 0 Q16 42 10 55 Q3 45 0 0 Z" fill="rgba(130,165,190,0.18)" />
    <path d="M0 0 Q5 44 0 56 Q-3 44 0 0 Z" fill="rgba(130,165,190,0.14)" />
    <line x1="0" y1="0" x2="38" y2="16" stroke="rgba(130,165,190,0.20)" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="26" y2="38" stroke="rgba(130,165,190,0.18)" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="8" y2="48" stroke="rgba(130,165,190,0.15)" strokeWidth="1.5" />
  </svg>

  <div style={{ position: 'relative', zIndex: 1 }}>
    <h2 className="accueil-hero-titre">
      Bonjour{prenom ? ` ${prenom}` : ''} <Heart size={20} />
    </h2>

    <p className="accueil-hero-message">
      Un petit geste pour toi, aujourd’hui.
      Avance à ton rythme, sans pression.
    </p>

    <button
      type="button"
      className="accueil-bouton-routines"
      onClick={() => navigate('/routines')}
    >
      Retrouver mes routines <span aria-hidden="true">→</span>
    </button>
  </div>
</div>


      <div className="accueil-section-titre">Les 4 piliers</div>

     <div className="accueil-piliers">
  {[
    { nom: 'Nutrition', Icone: Salad, description: 'Mieux manger' },
    { nom: 'Sommeil', Icone: Moon, description: 'Préparer ma nuit' },
    { nom: 'Stress', Icone: Flower2, description: 'Souffler un instant' },
    { nom: 'Mouvement', Icone: Activity, description: 'Bouger à mon rythme' },
  ].map(({ nom, Icone, description }) => (
    <button
      key={nom}
      type="button"
      className={`accueil-pilier ${nom.toLowerCase()}`}
      onClick={() => ouvrirOutil(nom)}
    >
      <Icone size={23} strokeWidth={1.6} />
      <span className="accueil-pilier-nom">{nom}</span>
      <span className="accueil-pilier-description">
        {description}
      </span>
    </button>
  ))}
</div>


      <section className="accueil-conseil">
  <div className="accueil-conseil-entete">
    <span className="accueil-aide-icone" aria-hidden="true">
      <Lightbulb size={22} strokeWidth={1.6} />
    </span>

    <div>
      <h3>Conseil du jour</h3>
      <span
        className="accueil-conseil-categorie"
        style={{
          background: conseilDuJour.couleur,
          color: conseilDuJour.textColor,
        }}
      >
        {conseilDuJour.pilier}
      </span>
    </div>
  </div>

  <p className="accueil-conseil-texte">
    {conseilDuJour.texte}
  </p>
</section>

{/* Consultation personnalisée */}
<section className="accueil-accompagnement">
  <div className="accueil-accompagnement-entete">
    <span className="accueil-aide-icone" aria-hidden="true">
      <Heart size={22} strokeWidth={1.6} />
    </span>

    <h3>Besoin d’un accompagnement ?</h3>
  </div>

  <p>
    Fais le point sur tes habitudes avec une consultation
    personnalisée en hygiène de vie.
  </p>

  <button
    type="button"
    className="accueil-consultation-bouton"
    onClick={() => setConsultation(!consultation)}
    aria-expanded={consultation}
    aria-controls="accueil-details-consultation"
  >
    {consultation ? 'Masquer les informations' : 'Découvrir les consultations'}
    <span aria-hidden="true">{consultation ? '−' : '+'}</span>
  </button>

  {consultation && (
    <div
      id="accueil-details-consultation"
      className="accueil-consultation-details"
    >
      <p>
        Je te propose un accompagnement en visio autour de
        la nutrition, du sommeil, de la gestion du stress
        et du mouvement.
      </p>

      <p>
        Les consultations se déroulent depuis chez toi.
        Choisis <strong>« en vidéo »</strong> lors de la prise
        de rendez-vous.
      </p>

      <a
        href="https://www.doctolib.fr/masseur-kinesitherapeute/mons-en-laonnois/anais-pata"
        target="_blank"
        rel="noopener noreferrer"
        className="accueil-rdv-lien"
      >
        Prendre rendez-vous ↗
      </a>
    </div>
  )}
</section>

{/* Aide et installation */}
<section className="accueil-aide">
  <h3 className="accueil-aide-titre">
    Bien démarrer avec Sérénitine
  </h3>

  <div className="accueil-aide-element">
    <button
      type="button"
      className="accueil-aide-bouton"
      onClick={() => setInstructions(!instructions)}
      aria-expanded={instructions}
      aria-controls="accueil-details-installation"
    >
      <span className="accueil-aide-icone" aria-hidden="true">
        <Smartphone size={21} strokeWidth={1.6} />
      </span>

      <span className="accueil-aide-libelle">
        <strong>Installer l’app</strong>
        <span>Retrouve Sérénitine sur ton écran d’accueil</span>
      </span>

      <span className="accueil-aide-signe" aria-hidden="true">
        {instructions ? '−' : '+'}
      </span>
    </button>

    {instructions && (
      <div
        id="accueil-details-installation"
        className="accueil-aide-contenu"
      >
        <h4>Sur iPhone, avec Safari</h4>
        <ol>
          <li>Ouvre Sérénitine dans Safari.</li>
          <li>Appuie sur l’icône <strong>Partager</strong>.</li>
          <li>Choisis <strong>Sur l’écran d’accueil</strong>.</li>
          <li>Appuie sur <strong>Ajouter</strong>.</li>
        </ol>

        <h4>Sur Android, avec Chrome</h4>
        <ol>
          <li>Ouvre Sérénitine dans Chrome.</li>
          <li>Appuie sur les <strong>trois points</strong> du menu.</li>
          <li>
            Choisis <strong>Ajouter à l’écran d’accueil</strong>
            {' '}ou <strong>Installer l’application</strong>,
            selon ton téléphone.
          </li>
          <li>Suis les indications pour confirmer.</li>
        </ol>
      </div>
    )}
  </div>

  <div className="accueil-aide-element">
    <button
      type="button"
      className="accueil-aide-bouton"
      onClick={() => setInstructions2(!instructions2)}
      aria-expanded={instructions2}
      aria-controls="accueil-details-utilisation"
    >
      <span className="accueil-aide-icone" aria-hidden="true">
        <Lightbulb size={21} strokeWidth={1.6} />
      </span>

      <span className="accueil-aide-libelle">
        <strong>Comment ça marche ?</strong>
        <span>Quelques repères pour commencer</span>
      </span>

      <span className="accueil-aide-signe" aria-hidden="true">
        {instructions2 ? '−' : '+'}
      </span>
    </button>

    {instructions2 && (
      <div
        id="accueil-details-utilisation"
        className="accueil-aide-contenu"
      >
        <ul>
          <li>
            <strong>Routines :</strong> coche tes habitudes
            quotidiennes, hebdomadaires et annuelles.
          </li>
          <li>
            <strong>Articles :</strong> découvre des ressources
            pour comprendre et avancer à ton rythme.
          </li>
          <li>
            <strong>Outils :</strong> utilise la liste de courses,
            les notes sommeil, la respiration et le programme
            de mouvement.
          </li>
          <li>
            <strong>Profil :</strong> retrouve tes statistiques
            et les informations sur l’app.
          </li>
        </ul>
      </div>
    )}
  </div>
</section>
    </div>
  );
}

export default Accueil;