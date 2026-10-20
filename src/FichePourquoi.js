import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import { Salad, Moon, Flower2, Activity, BookOpen, Lightbulb } from 'lucide-react';

const fiches = [
  { id: 1, titre: "Boire 1,5 à 2L d'eau", pilier: "Nutrition", contenu: "Le corps est composé à 60% d'eau. Une déshydratation même légère (1 à 2%) suffit à altérer la concentration, la digestion et la régulation de la température corporelle. L'eau participe aussi à l'élimination des déchets par les reins. Mieux vaut répartir les apports tout au long de la journée plutôt que de boire de grandes quantités d'un coup. Le café, le thé ou les infusions sans sucre comptent." },
  { id: 2, titre: "Manger à heure régulière", pilier: "Nutrition", contenu: "Des repas à heures régulières synchronisent l'horloge biologique digestive, optimisent la sécrétion d'enzymes et régulent la glycémie. Sauter un repas ou reculer l'heure entraîne souvent une compensation excessive lors du repas suivant et favorise le grignotage. Une structure régulière aide également à mieux ressentir les signaux de faim et de satiété. Voici les repas idéaux : petit déjeuner (matin), déjeuner (midi), collation en milieu d'après-midi puis dîner. Le petit-déjeuner n'est pas une obligation tout comme la collation." },
  { id: 3, titre: "Consommer des fruits et légumes", pilier: "Nutrition", contenu: "Les fruits et légumes sont la principale source de fibres, de vitamines, de minéraux et d'antioxydants de notre alimentation. Les fibres nourrissent le microbiote intestinal, régulent le transit et contribuent à la satiété. Les antioxydants protègent les cellules du stress oxydatif, impliqué dans le vieillissement et de nombreuses maladies chroniques. Les 5 fruits et légumes correspondent à 5 portions de 80g (400g au total), une portion c'est par exemple: 1 fruit entier ou une poignet de petits fruits, 2 cuillères à soupe de légumes cuits, ou encore un bol de salade. Ça n'inclut pas les pommes de terre et féculents, ni les légumineuses ou encore les jus de fruits." },
  { id: 4, titre: "Limiter les produits ultra-transformés", pilier: "Nutrition", contenu: "Les produits ultra-transformés contiennent des additifs, des sucres ajoutés, des graisses hydrogénées et du sel en excès. De nombreuses études les associent à un risque accru de maladies cardiovasculaires, de diabète de type 2 et d'obésité. Ils appauvrissent aussi la densité nutritionnelle de l'alimentation sans apporter de vrais nutriments.Exemples: chips, pizzas, biscuits industriels, bonbons, soda... Maximum 1 par jour." },
  { id: 5, titre: "Se coucher et se lever à heure régulière", pilier: "Sommeil", contenu: "Le corps fonctionne selon une horloge biologique interne, le rythme circadien, qui régule sur 24h la température corporelle, la sécrétion d'hormones et le cycle veille-sommeil. Se lever à une heure fixe stabilise cette horloge et facilite l'endormissement naturel. En effet , il est plus intéressant de contrôler son heure de lever car cela engendrera naturellement une pression de sommeil en fin de journée. Les grasses matinées du week-end perturbent l'endormissement en début de semaine, comme si le corps devait se recaler à chaque fois." },
  { id: 6, titre: "Zone de décompression 2h avant le coucher", pilier: "Sommeil", contenu: "L'endormissement nécessite une baisse progressive de l'éveil du système nerveux. Les activités stimulantes, sport intense, jeux vidéo, contenus émotionnellement chargés, maintiennent le cerveau en état d'alerte et retardent la production de mélatonine, l'hormone du sommeil. Cette fenêtre de 2h est simplement le temps dont le système nerveux a besoin pour amorcer la transition vers le repos." },
  { id: 7, titre: "Dormir 7 à 9 heures", pilier: "Sommeil", contenu: "Le sommeil n'est pas un temps mort : c'est une phase active de récupération physique et mentale. C'est pendant le sommeil que le cerveau consolide les apprentissages, que les tissus se régénèrent et que le système immunitaire se renforce. Un sommeil chroniquement insuffisant est associé à une prise de poids, une baisse de l'immunité et un risque accru de maladies cardiovasculaires." },
  { id: 8, titre: "Cohérence cardiaque", pilier: "Stress", contenu: "La cohérence cardiaque est une technique de respiration contrôlée, environ 6 respirations par minute, qui synchronise le rythme cardiaque et le système nerveux autonome. Elle active le système parasympathique, responsable de la détente, et réduit le taux de cortisol, l'hormone du stress. Cinq minutes suffisent pour obtenir un effet mesurable sur la fréquence cardiaque et le niveau de tension intérieure. Tu peux réaliser cet exercice dans l'onglet 'Outils' pilier stress. Si tu n'es pas dans une période stressante ce n'est pas obligatoire, tu peux cocher directement." },
  { id: 9, titre: "Prendre l'air au moins 20 min", pilier: "Stress", contenu: "Exposer son corps à la lumière naturelle et à l'air extérieur a des effets directs sur le système nerveux. La lumière du jour régule la production de sérotonine, un neurotransmetteur clé pour l'humeur et la motivation." },
  { id: 10, titre: "30 min d'activité modérée", pilier: "Mouvement", contenu: "La marche est l'activité physique la plus accessible et l'une des mieux documentées en matière de bénéfices pour la santé. Elle améliore la santé cardiovasculaire, régule la glycémie, soutient le transit intestinal et réduit le niveau de stress. Les 30 minutes d'activité modérée quotidienne correspondent à tout mouvement qui élève légèrement le rythme cardiaque et la respiration, sans pour autant vous empêcher de tenir une conversation, comme la marche rapide, le vélo tranquille ou le jardinage. L'essentiel est que l'effort soit perceptible mais confortable, atteignable en une seule session ou en plusieurs courtes tranches de 10 minutes réparties dans la journée." },
  { id: 11, titre: "Éviter la sédentarité prolongée", pilier: "Mouvement", contenu: "Rester assis plus de 60 minutes consécutives ralentit la circulation sanguine, réduit l'activité métabolique et favorise les tensions musculaires. La sédentarité prolongée est reconnue comme un facteur de risque indépendant pour la santé, même chez les personnes qui font du sport par ailleurs. Se lever et marcher quelques minutes toutes les heures suffit à relancer la circulation." },
  { id: 12, titre: "Manger des légumineuses au moins 2 fois", pilier: "Nutrition", contenu: "Lentilles, pois chiches, haricots rouges, fèves… les légumineuses sont une source exceptionnelle de fibres solubles, de protéines végétales et de minéraux. Elles ont un index glycémique bas, ce qui stabilise la glycémie sur la durée. Associées à une céréale complète, elles forment une protéine complète, un duo efficace pour réduire la part de viande sans manquer d'acides aminés essentiels. 2 portions ou plus par semaine." },
  { id: 13, titre: "Consommer des petits poissons gras 1 à 2 fois", pilier: "Nutrition", contenu: "Sardines, maquereau, hareng, anchois : ces petits poissons sont parmi les meilleures sources alimentaires d'oméga-3 à longue chaîne (EPA et DHA), essentiels pour la santé cardiovasculaire, cérébrale et la régulation de l'inflammation. Contrairement aux grands poissons, ils accumulent peu de métaux lourds. Ils sont aussi riches en vitamine D, souvent déficitaire sous nos latitudes. 1 à 2 portions par semaine. Si tu ne manges pas de poissons, il est possible de se supplémenter en oméga 3 EPA et DHA non présents dans les produits végétaux > se renseigner auprès d'un pharamcien, médecin ou professionnel formé en nutrition." },
  { id: 14, titre: "Évaluer la qualité de son sommeil", pilier: "Sommeil", contenu: "Un sommeil long n'est pas nécessairement un sommeil réparateur. Se réveiller fatigué, avoir du mal à s'endormir ou se réveiller fréquemment la nuit sont des signaux à prendre au sérieux. Un bilan hebdomadaire permet de repérer des tendances, stress accumulé, mauvaises habitudes du soir, environnement inadapté, et d'ajuster avant que le déficit de sommeil ne s'installe durablement. Tu peux noter tout cela dans l'outil 'sommeil' si besoin." },
  { id: 15, titre: "Bilan du stress de la semaine", pilier: "Stress", contenu: "Le stress chronique s'installe souvent à bas bruit, sans que l'on s'en rende compte. Prendre quelques minutes chaque semaine pour identifier ce qui a pesé, charge de travail, tensions relationnelles, manque de temps pour soi, permet de sortir du mode réactif et de reprendre la main. Ce bilan n'est pas une rumination : c'est un outil de conscience de soi qui aide à ajuster ses priorités. Tu peux utiliser l'outil 'stress' si besoin." },
  { id: 16, titre: "Faire 2 séances de sport", pilier: "Mouvement", contenu: "L'OMS recommande pour un adulte 150 à 300 minutes d'activité modérée par semaine, complétées par 2 sessions d'activité plus intenses. Voici ce que ça donne en pratique : 30 min d'activité modérée par jour (marche, balade en vélo... >routine quotidienne) et 2 séances plus intenses dans la semaine (tennis, course à pied, cross-fit, musculation...)." },
  { id: 17, titre: "Bilan sanguin complet", pilier: "Nutrition", contenu: "Un bilan sanguin annuel permet de détecter précocement des déséquilibres silencieux : résistance à l'insuline, carences en vitamine D ou B12, dysfonction thyroïdienne, anémie… Ces anomalies peuvent passer inaperçues pendant des années et pourtant impacter l'énergie, l'humeur, le sommeil et l'immunité. Un bilan complet est le meilleur outil de prévention à disposition de chacun." },
  { id: 18, titre: "Consultation médecin généraliste", pilier: "Nutrition", contenu: "La consultation annuelle est l'occasion de faire le point sur sa santé globale, de mettre à jour ses vaccins et de demander les analyses remboursées. C'est aussi le moment d'évoquer des symptômes discrets que l'on aurait tendance à minimiser au quotidien. La prévention est toujours plus efficace et moins coûteuse que le traitement." },
  { id: 19, titre: "Consultation dentaire", pilier: "Mouvement", contenu: "La santé bucco-dentaire est étroitement liée à la santé générale. Des infections dentaires non traitées peuvent avoir des répercussions sur le système cardiovasculaire et l'état des articulations. Un détartrage annuel élimine le tartre que le brossage ne peut pas atteindre et permet de dépister précocement caries, gingivites ou lésions." },
  { id: 20, titre: "Consultation gynécologique ou urologique", pilier: "Mouvement", contenu: "Le suivi gynécologique ou urologique permet le dépistage de pathologies souvent asymptomatiques à un stade précoce. Pour les femmes, le frottis cervico-utérin est recommandé tous les 3 ans entre 25 et 65 ans et un check-up annuel est fortement recommandé. Pour les hommes, un suivi prostatique est conseillé à partir de 50 ans ou plus tôt en cas d'antécédents familiaux. Si non concerné, coche directement la case." },
];

const THEMES_FICHES = {
  Nutrition: { fond: '#eaf3de', couleur: '#52734a', Icone: Salad },
  Sommeil: { fond: '#e6f1fb', couleur: '#526f84', Icone: Moon },
  Stress: { fond: '#faeeda', couleur: '#987440', Icone: Flower2 },
  Mouvement: { fond: '#f2e8f1', couleur: '#927094', Icone: Activity },
};

const STYLE_FICHES = `
.fiche-moderne { padding: 1rem; color: #5c5045; }
.fiche-moderne .fiche-navigation { display: inline-flex; align-items: center; gap: 8px; min-height: 42px; padding: 10px 14px; margin-bottom: 18px; border: 1px solid #e8dece; border-radius: 12px; background: #faf6ee; color: #5c3d2e; font: inherit; font-size: 13px; cursor: pointer; }
.fiche-moderne .fiche-introduction { padding: 24px 20px; margin-bottom: 20px; background: #faf6ee; border: 1px solid #e8dece; border-radius: 22px; }
.fiche-moderne .fiche-icone { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; margin-bottom: 14px; border-radius: 50%; }
.fiche-moderne .fiche-categorie { display: inline-block; padding: 4px 9px; border-radius: 20px; font-size: 11px; font-weight: 500; line-height: 1.5; }
.fiche-moderne .fiche-introduction h2 { margin: 14px 0 0; color: #5c3d2e; font-size: 24px; font-weight: 600; line-height: 1.4; overflow-wrap: anywhere; }
.fiche-moderne .fiche-explication { padding: 22px; margin-bottom: 20px; border: 1px solid #e8dece; border-radius: 20px; background: #fffdf9; }
.fiche-moderne .fiche-explication h3 { display: flex; align-items: center; gap: 10px; margin: 0 0 16px; color: #5c3d2e; font-size: 16px; font-weight: 600; line-height: 1.6; }
.fiche-moderne .fiche-explication h3 > span { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%; background: #e8eff4; color: #526f84; }
.fiche-moderne .fiche-explication p { margin: 0; color: #635b52; font-size: 14px; font-weight: 400; line-height: 1.9; white-space: pre-line; overflow-wrap: anywhere; }
.fiche-moderne button:focus-visible { outline: 3px solid #526f84; outline-offset: 3px; }
@media (max-width: 380px) { .fiche-moderne .fiche-introduction h2 { font-size: 21px; } .fiche-moderne .fiche-explication { padding: 18px; } }
`;

function FichePourquoi() {
  const { routineId } = useContext(AppContext);
  const navigate = useNavigate();
  const fiche = fiches.find(f => f.id === routineId);
  const retour = () => navigate('/routines');

  if (!fiche) {
    return (
      <div className="fiche-moderne">
        <style>{STYLE_FICHES}</style>
        <button type="button" className="fiche-navigation" onClick={retour}>← Retour aux routines</button>
        <p>Ouvre une routine pour consulter son explication.</p>
      </div>
    );
  }

  const theme = THEMES_FICHES[fiche.pilier] || {
    fond: '#e8eff4', couleur: '#526f84', Icone: BookOpen,
  };
  const Icone = theme.Icone;

  return (
    <div className="fiche-moderne">
      <style>{STYLE_FICHES}</style>
      <button type="button" className="fiche-navigation" onClick={retour}>← Retour aux routines</button>
      <article>
        <header className="fiche-introduction">
         {![17, 18, 19, 20].includes(fiche.id) && (
  <span
    className="fiche-icone"
    style={{ background: theme.fond, color: theme.couleur }}
    aria-hidden="true"
  >
    <Icone size={26} strokeWidth={1.6} />
  </span>
)}
         {![17, 18, 19, 20].includes(fiche.id) && (
  <span
    className="fiche-categorie"
    style={{ background: theme.fond, color: theme.couleur }}
  >
    {fiche.pilier}
  </span>
)}
          <h2>{fiche.titre}</h2>
        </header>
        <section className="fiche-explication">
          <h3>
            <span aria-hidden="true"><Lightbulb size={19} strokeWidth={1.6} /></span>
            Pourquoi c’est important ?
          </h3>
          <p>{fiche.contenu}</p>
        </section>
      </article>
      <button type="button" className="fiche-navigation" onClick={retour}>← Retour aux routines</button>
    </div>
  );
}

export default FichePourquoi;