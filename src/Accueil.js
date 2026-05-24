import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const conseils = [
  { texte: "Commence ta journée avec un grand verre d'eau. Ton corps est déshydraté après une nuit de sommeil.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Ajoute une poignée de légumes verts à chaque repas — ils apportent fibres, vitamines et minéraux essentiels sans calories excessives.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Mâche lentement et pose ta fourchette entre chaque bouchée — le signal de satiété met 20 minutes à arriver au cerveau.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Prépare tes légumineuses en grande quantité le week-end — elles se conservent 4 jours au frigo et s'intègrent facilement dans tous les repas.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Choisis des céréales complètes plutôt que raffinées — elles stabilisent la glycémie et tiennent plus longtemps au corps.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Une poignée d'oléagineux natures en collation vaut mieux qu'un biscuit industriel — protéines, bonnes graisses et minéraux en un seul geste.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Lis la liste des ingrédients avant celle des calories — si tu ne reconnais pas la moitié des mots, le produit est probablement ultra-transformé.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Alterne les huiles d'olive et de colza dans ta cuisine — l'une pour cuire, l'autre crue pour les oméga-3.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
  { texte: "Essaie de te coucher et te lever à la même heure — même le week-end, ton horloge biologique te remerciera.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Éteins les stimulations 2h avant de dormir — pas de sport intense, pas de contenu anxiogène, laisse ton système nerveux décompresser.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Garde ta chambre fraîche — entre 16 et 19°C est la température idéale pour un sommeil profond et réparateur.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Si tu te réveilles la nuit, ne regarde pas l'heure — ça active le cerveau et rend le retour au sommeil plus difficile.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Une courte sieste de 20 minutes en début d'après-midi booste la concentration sans perturber le sommeil nocturne.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "La lumière naturelle le matin est le meilleur régulateur de ton horloge biologique — essaie de t'exposer dans les 30 minutes après le réveil.", pilier: "Sommeil", couleur: "#E6F1FB", textColor: "#0C447C" },
  { texte: "Prends 5 minutes aujourd'hui pour faire une cohérence cardiaque — inspire 5 secondes, expire 5 secondes, répète 5 minutes.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Note 3 choses positives de ta journée avant de dormir — ce simple geste recalibre progressivement ton cerveau vers le positif.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Quand tu te sens débordé, fais une seule chose à la fois — le multitasking augmente le cortisol et réduit la qualité du travail.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Sors marcher 20 minutes aujourd'hui — la lumière naturelle et le mouvement sont les meilleurs antidépresseurs naturels.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Dis non à une chose aujourd'hui qui ne te ressemble pas — chaque oui donné à quelque chose est un non donné à toi-même.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Planifie une activité qui te ressource cette semaine — la récupération émotionnelle ne se produit pas par hasard, elle se planifie.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Respire par le ventre plutôt que par la poitrine — la respiration abdominale active directement le système nerveux parasympathique.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Pose ton téléphone 1 heure avant de dormir — ton cerveau a besoin de décompresser sans flux d'informations.", pilier: "Stress", couleur: "#FAEEDA", textColor: "#633806" },
  { texte: "Lève-toi et marche 5 minutes toutes les heures — la sédentarité prolongée est un facteur de risque indépendant même si tu fais du sport.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Prends les escaliers aujourd'hui — chaque occasion de bouger compte, même les plus petites.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Fais 10 minutes d'étirements ce soir — tes muscles et articulations te remercieront demain matin.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Une marche de 30 minutes après le dîner améliore la digestion et régule la glycémie postprandiale.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Ajoute 2 séances de renforcement musculaire par semaine — après 30 ans on perd 1% de masse musculaire par an sans exercice.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Vérifie ta posture maintenant — épaules relâchées, écran à hauteur des yeux, pieds à plat au sol.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Le meilleur sport est celui que tu pratiques régulièrement — choisis une activité qui te plaît plutôt que celle qui brûle le plus de calories.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Après une séance de sport, mange des protéines dans l'heure — c'est la fenêtre optimale pour la récupération musculaire.", pilier: "Mouvement", couleur: "#FAECE7", textColor: "#7d2eb6" },
  { texte: "Pense à manger des protéines à chaque repas, surtout au petit-déjeuner et au déjeuner.", pilier: "Nutrition", couleur: "#EAF3DE", textColor: "#27500A" },
];

function Accueil() {
  const jourDuMois = new Date().getDate();
const conseilDuJour = conseils[(jourDuMois - 1) % conseils.length];
  const [instructions, setInstructions] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="accueil-wrap">

      <div className="accueil-date">{today}</div>

      <div className="accueil-hero">

  <h2 className="accueil-hero-titre">Bonjour 🩵</h2>
<p className="accueil-hero-message">Sérénitine t'accompagne chaque jour pour retrouver un rythme qui te fait du bien. Avec des routines d'hygiène de vie simples à réaliser, tu progresses à ton rythme sans pression, un pas après l'autre. L'objectif n'est pas d'être parfait dès le début, mais d'avancer progressivement afin d'optimiser ton bien-être et ta santé. Tu vas retrouver des routines quotidiennes, hebdomadaires et annuelles à réaliser. L'onglet Resssources t'aide à mieux comprendre les routines et à devenir un expert en hygiène de vie !</p>
</div>


      <div className="accueil-section-titre">Les 4 piliers</div>

      <div className="accueil-piliers">
        <div className="accueil-pilier nutrition" onClick={() => navigate('/')}>
          <span className="accueil-pilier-icon">🥗</span>
          <span className="accueil-pilier-nom">Nutrition</span>
        </div>
        <div className="accueil-pilier sommeil" onClick={() => navigate('/')}>
          <span className="accueil-pilier-icon">😴</span>
          <span className="accueil-pilier-nom">Sommeil</span>
        </div>
        <div className="accueil-pilier stress" onClick={() => navigate('/')}>
          <span className="accueil-pilier-icon">🧘</span>
          <span className="accueil-pilier-nom">Stress</span>
        </div>
        <div className="accueil-pilier mouvement" onClick={() => navigate('/')}>
          <span className="accueil-pilier-icon">🏃</span>
          <span className="accueil-pilier-nom">Mouvement</span>
        </div>
      </div>

      <div className="accueil-section-titre">Conseil du jour</div>

<div className="accueil-conseil">
  <div className="accueil-conseil-header">
    <span className="accueil-conseil-pilier" style={{ background: conseilDuJour.couleur, color: conseilDuJour.textColor }}>
      {conseilDuJour.pilier}
    </span>
    <span className="accueil-conseil-date">{today}</span>
  </div>
  <p className="accueil-conseil-texte">{conseilDuJour.texte}</p>
</div>

      <div className="accueil-section-titre">Par où commencer ?</div>

      <div className="accueil-cards">
        <div className="accueil-card" onClick={() => navigate('/')}>
          <span className="accueil-card-icon">✅</span>
          <div>
            <div className="accueil-card-titre">Routines du jour</div>
            <div className="accueil-card-sub">Coche tes habitudes quotidiennes</div>
          </div>
          <span className="accueil-card-arrow">→</span>
        </div>
        <div className="accueil-card" onClick={() => navigate('/ressources')}>
          <span className="accueil-card-icon">📖</span>
          <div>
            <div className="accueil-card-titre">Ressources</div>
            <div className="accueil-card-sub">Comprendre pourquoi c'est important</div>
          </div>
          <span className="accueil-card-arrow">→</span>
        </div>
        <div className="accueil-card" onClick={() => navigate('/statistiques')}>
          <span className="accueil-card-icon">📊</span>
          <div>
            <div className="accueil-card-titre">Statistiques</div>
            <div className="accueil-card-sub">Suivre ta progression</div>
          </div>
          <span className="accueil-card-arrow">→</span>
        </div>
      </div>
<div className="accueil-section-titre" style={{ marginTop: '1.5rem' }}>Installer l'app</div>

<div className="accueil-cards">
  <div className="accueil-card" onClick={() => setInstructions(!instructions)}>
    <span className="accueil-card-icon">📲</span>
    <div>
      <div className="accueil-card-titre">Ajouter sur mon écran d'accueil</div>
      <div className="accueil-card-sub">Accéder à Sérénitine comme une vraie app</div>
    </div>
    <span className="accueil-card-arrow">{instructions ? '↑' : '↓'}</span>
  </div>

  {instructions && (
    <div style={{ background: 'white', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: '#1D9E75', marginBottom: 10 }}>Sur iPhone (Safari) :</p>
      <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, marginBottom: 12 }}>
        1. Ouvrez l'app dans <strong>Safari</strong><br />
        2. Appuyez sur l'icône <strong>Partager</strong> (carré avec flèche vers le haut)<br />
        3. Faites défiler et appuyez sur <strong>"Sur l'écran d'accueil"</strong><br />
        4. Appuyez sur <strong>"Ajouter"</strong>
      </p>
      <p style={{ fontSize: 13, fontWeight: 500, color: '#1D9E75', marginBottom: 10 }}>Sur Android (Chrome) :</p>
      <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7 }}>
        1. Ouvrez l'app dans <strong>Chrome</strong><br />
        2. Appuyez sur les <strong>3 points</strong> en haut à droite<br />
        3. Appuyez sur <strong>"Ajouter à l'écran d'accueil"</strong><br />
        4. Appuyez sur <strong>"Ajouter"</strong>
      </p>
    </div>
  )}
</div>
    </div>
  );
}

export default Accueil;