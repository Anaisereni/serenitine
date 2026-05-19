import React, { useState } from 'react';

const articles = [
  {
    id: 1,
    titre: "Les produits ultra-transformés",
    pilier: "Nutrition",
    emoji: "🏭",
    resume: "Comprendre ce que sont vraiment les produits ultra-transformés et pourquoi les limiter.",
    contenu: [
      {
        sous_titre: "Qu'est-ce qu'un produit ultra-transformé ?",
        texte: "La classification NOVA divise les aliments en 4 groupes selon leur degré de transformation. Les produits ultra-transformés (groupe 4) sont des formulations industrielles contenant des ingrédients que l'on ne trouve pas dans une cuisine normale : émulsifiants, exhausteurs de goût, colorants, arômes artificiels, sirop de glucose-fructose, huiles hydrogénées… Ils sont conçus pour être hyper-palatables — c'est-à-dire irrésistibles — et favorisent la surconsommation."
      },
      {
        sous_titre: "Comment les reconnaître ?",
        texte: "La règle simple : si vous lisez la liste des ingrédients et que vous ne reconnaissez pas la moitié des mots, c'est probablement un produit ultra-transformé. Les exemples les plus courants : sodas, céréales du petit-déjeuner industrielles, plats préparés, nuggets, biscuits industriels, chips, charcuteries avec additifs, pain de mie industriel, yaourts aromatisés avec épaississants."
      },
      {
        sous_titre: "Quels sont les risques ?",
        texte: "De nombreuses études, dont la cohorte NutriNet-Santé portant sur plus de 100 000 participants, associent la consommation régulière de produits ultra-transformés à un risque accru de maladies cardiovasculaires, de diabète de type 2, d'obésité, de certains cancers et même de dépression. Ces produits appauvrissent la densité nutritionnelle de l'alimentation tout en apportant beaucoup de calories vides."
      },
      {
        sous_titre: "Que faire concrètement ?",
        texte: "L'objectif n'est pas la perfection mais la réduction progressive. Commencez par identifier les 3 produits ultra-transformés que vous consommez le plus souvent et cherchez une alternative moins transformée. Cuisiner en batch le week-end, avoir des collations saines à portée de main et lire les étiquettes sont les meilleures stratégies pour réduire sans frustration."
      }
    ]
  },
  {
    id: 2,
    titre: "La cohérence cardiaque",
    pilier: "Stress",
    emoji: "💚",
    resume: "La technique de respiration la plus efficace pour réduire le stress en 5 minutes.",
    contenu: [
      {
        sous_titre: "Qu'est-ce que la cohérence cardiaque ?",
        texte: "La cohérence cardiaque est un état physiologique dans lequel le rythme cardiaque oscille de façon régulière et harmonieuse, synchronisé avec la respiration. Cet état est associé à une activation du système nerveux parasympathique — le système du calme et de la récupération — et à une réduction du cortisol, l'hormone du stress."
      },
      {
        sous_titre: "La méthode 365",
        texte: "La méthode la plus simple et la mieux documentée est la méthode 365 : 3 fois par jour, 6 respirations par minute, pendant 5 minutes. Concrètement : inspirez pendant 5 secondes par le nez, expirez pendant 5 secondes par la bouche. Répétez pendant 5 minutes. C'est tout. Des applications comme Respirelax ou Kardia peuvent vous guider avec un visuel."
      },
      {
        sous_titre: "Quels sont les effets ?",
        texte: "Les effets sont mesurables dès la première séance : réduction de la fréquence cardiaque, baisse de la tension artérielle, diminution du taux de cortisol salivaire. Sur le long terme, une pratique régulière améliore la variabilité de la fréquence cardiaque (VFC), un marqueur reconnu de santé cardiovasculaire et de résilience au stress. Elle améliore aussi la qualité du sommeil et la clarté mentale."
      },
      {
        sous_titre: "Quand la pratiquer ?",
        texte: "Les trois moments idéaux : le matin au réveil pour démarrer la journée dans un état calme, avant le déjeuner pour couper avec le stress de la matinée, et le soir avant le coucher pour faciliter l'endormissement. En cas de stress aigu, une seule séance de 5 minutes suffit à ramener le système nerveux à un état plus équilibré."
      }
    ]
  },
  {
    id: 3,
    titre: "Étirements quotidiens essentiels",
    pilier: "Mouvement",
    emoji: "🧘",
    resume: "Une routine d'étirements de 10 minutes pour le dos, les cervicales, les jambes et les bras.",
    contenu: [
      {
        sous_titre: "Pourquoi s'étirer chaque jour ?",
        texte: "La sédentarité moderne raccourcit progressivement les muscles et réduit la mobilité articulaire. Des étirements quotidiens de 10 minutes permettent de maintenir l'amplitude des mouvements, de prévenir les douleurs chroniques liées aux tensions musculaires, d'améliorer la posture et de réduire le risque de blessure. Le matin, ils préparent le corps. Le soir, ils favorisent la récupération."
      },
      {
        sous_titre: "Étirements du dos et des lombaires",
        texte: "Genoux à la poitrine : allongé sur le dos, ramenez les deux genoux vers la poitrine et maintenez 30 secondes. Torsion lombaire : allongé, laissez tomber les genoux d'un côté pendant 30 secondes puis de l'autre. Chat-vache : à quatre pattes, alternez dos rond et dos creux 10 fois lentement. Ces trois exercices soulagent efficacement les tensions lombaires accumulées en position assise."
      },
      {
        sous_titre: "Étirements des cervicales",
        texte: "Inclinaison latérale : assis ou debout, inclinez doucement la tête vers l'épaule droite, main droite posée sur la tempe pour accompagner sans forcer, 30 secondes de chaque côté. Rotation cervicale : tournez lentement la tête de droite à gauche 5 fois. Menton vers la poitrine : inclinez la tête en avant et maintenez 30 secondes. Ces étirements sont particulièrement importants pour les personnes travaillant sur écran."
      },
      {
        sous_titre: "Étirements des jambes",
        texte: "Ischio-jambiers : assis au sol, jambes tendues, penchez le buste vers l'avant en gardant le dos droit, maintenez 30 secondes. Quadriceps : debout, pliez un genou et tenez votre cheville derrière vous, 30 secondes par jambe. Mollets : debout face à un mur, une jambe tendue derrière vous talon au sol, 30 secondes par jambe. Ces étirements préviennent les douleurs de genoux et de hanches."
      },
      {
        sous_titre: "Étirements des bras et épaules",
        texte: "Étirement des pectoraux : entrecroisez les doigts dans le dos, ouvrez la poitrine en relevant les bras, maintenez 30 secondes. Étirement du trapèze : passez un bras au-dessus de la tête et pliez le coude, l'autre main pousse doucement le coude, 30 secondes. Étirement des avant-bras : bras tendu devant vous, fléchissez le poignet vers le bas avec l'autre main, 30 secondes. Essentiel pour prévenir les TMS liés au travail sur clavier."
      }
    ]
  },
  {
    id: 4,
    titre: "Le bilan sanguin annuel",
    pilier: "Nutrition",
    emoji: "🩸",
    resume: "Quels marqueurs demander, comment les interpréter et pourquoi c'est essentiel.",
    contenu: [
      {
        sous_titre: "Pourquoi faire un bilan sanguin chaque année ?",
        texte: "De nombreuses pathologies évoluent sans symptômes pendant des années : résistance à l'insuline, dysthyroïdie, carences en vitamine D ou B12, hypercholestérolémie… Un bilan annuel permet de les détecter tôt, quand les ajustements alimentaires ou de mode de vie suffisent encore à corriger le problème. C'est l'outil de prévention le plus accessible et le plus rentable qui soit."
      },
      {
        sous_titre: "Les marqueurs de base remboursés",
        texte: "Glycémie à jeun : dépiste le prédiabète et le diabète. Bilan lipidique complet : cholestérol total, LDL, HDL, triglycérides. Numération formule sanguine (NFS) : détecte les anémies et infections. Créatinine et urée : fonction rénale. TSH : fonction thyroïdienne. Ces marqueurs sont remboursés sur prescription de votre médecin traitant — demandez-les systématiquement."
      },
      {
        sous_titre: "Les marqueurs supplémentaires à demander",
        texte: "Vitamine D (25-OH) : déficitaire chez 80% des Français en hiver. Vitamine B12 : essentielle pour le système nerveux, souvent basse chez les végétariens. Ferritine : réserves en fer, plus fiable que le fer sérique seul. Insuline à jeun + calcul HOMA-IR : détecte la résistance à l'insuline avant que la glycémie ne soit anormale. Folates (B9) : essentiels pour les femmes en âge de procréer. Zinc et magnésium érythrocytaire si fatigue chronique."
      },
      {
        sous_titre: "Comment lire les résultats ?",
        texte: "Les valeurs de référence des laboratoires correspondent aux valeurs moyennes de la population, pas aux valeurs optimales. Par exemple, la vitamine D est considérée normale à partir de 30 ng/mL en France, mais de nombreux experts recommandent un taux optimal entre 50 et 70 ng/mL. De même, une glycémie à 1,10 g/L est dans les normes mais déjà préoccupante. Discutez toujours des résultats avec votre médecin en tenant compte de votre contexte global."
      }
    ]
  },
  {
    id: 5,
    titre: "Les additifs à éviter",
    pilier: "Nutrition",
    emoji: "⚠️",
    resume: "Les additifs alimentaires les plus préoccupants et comment les repérer sur les étiquettes.",
    contenu: [
      {
        sous_titre: "Tous les additifs sont-ils dangereux ?",
        texte: "Non — tous les additifs autorisés en Europe ont été évalués par l'EFSA (Agence européenne de sécurité des aliments). Mais certains font l'objet d'études préoccupantes et méritent une attention particulière, notamment chez les enfants, les femmes enceintes et les personnes sensibles. L'objectif n'est pas la panique mais la vigilance éclairée."
      },
      {
        sous_titre: "Les nitrites (E249, E250, E251, E252)",
        texte: "Utilisés dans les charcuteries pour leur couleur rose et leur conservation, les nitrites se transforment en nitrosamines lors de la cuisson ou de la digestion — des composés classés cancérogènes probables par le CIRC. Préférez les charcuteries sans nitrites ajoutés (de plus en plus disponibles en grande surface) et limitez la consommation à 150g par semaine maximum."
      },
      {
        sous_titre: "Les édulcorants intenses (E951, E952, E954, E955)",
        texte: "Aspartame (E951), cyclamate (E952), saccharine (E954), sucralose (E955) : ces édulcorants de synthèse sont très utilisés dans les produits 'light' et 'sans sucre'. Des études récentes suggèrent qu'ils pourraient perturber le microbiote intestinal et paradoxalement favoriser la prise de poids en perturbant les signaux de satiété. L'aspartame a été classé 'peut-être cancérogène' par le CIRC en 2023."
      },
      {
        sous_titre: "Les émulsifiants (E433, E466, E471, E472)",
        texte: "Polysorbate 80 (E433), carboxyméthylcellulose (E466), mono et diglycérides (E471, E472) : très présents dans les produits industriels pour améliorer la texture, ces émulsifiants font l'objet d'études montrant un impact négatif sur le microbiote intestinal et une possible augmentation de l'inflammation. Des recherches sont encore en cours mais la prudence est de mise."
      },
      {
        sous_titre: "Les colorants azoïques (E102, E110, E122, E129)",
        texte: "Tartrazine (E102), jaune orangé (E110), carmoisine (E122), rouge allura (E129) : ces colorants synthétiques sont associés à une augmentation de l'hyperactivité chez les enfants selon plusieurs études. En Europe, les produits qui en contiennent doivent porter la mention 'peut avoir des effets indésirables sur l'activité et l'attention chez les enfants'. À éviter particulièrement pour les plus jeunes."
      }
    ]
  },
  {
    id: 6,
    titre: "Apprendre à lire les étiquettes",
    pilier: "Nutrition",
    emoji: "🔍",
    resume: "Décrypter en 30 secondes si un produit vaut vraiment la peine d'être acheté.",
    contenu: [
      {
        sous_titre: "Par où commencer ?",
        texte: "La première chose à regarder n'est pas le tableau nutritionnel mais la liste des ingrédients. Elle est classée par ordre décroissant de quantité — le premier ingrédient est celui présent en plus grande quantité. Si le premier ingrédient est du sucre, de la farine blanche ou une huile végétale hydrogénée, le produit n'est probablement pas de grande qualité nutritionnelle."
      },
      {
        sous_titre: "La règle des 5 ingrédients",
        texte: "Un bon indicateur de qualité : si un produit contient plus de 5 ingrédients, la probabilité qu'il soit ultra-transformé augmente fortement. Ce n'est pas une règle absolue — une bonne sauce tomate peut contenir 6 ingrédients simples — mais c'est un signal d'alerte utile pour aller vite en rayon. Vérifiez aussi que vous reconnaissez tous les ingrédients listés."
      },
      {
        sous_titre: "Décrypter le tableau nutritionnel",
        texte: "Regardez les valeurs pour 100g (pas par portion, qui peut être sous-estimée). Les seuils à retenir : sucres > 10g/100g = élevé, graisses saturées > 5g/100g = élevé, sel > 1,5g/100g = élevé, fibres > 3g/100g = bon. Le Nutri-Score est un outil imparfait mais utile — un produit A ou B est généralement un meilleur choix qu'un produit D ou E."
      },
      {
        sous_titre: "Les mots piège du marketing",
        texte: "'Naturel' ne signifie rien légalement — n'importe quel produit peut l'afficher. 'Sans sucres ajoutés' ne veut pas dire sans sucre — le produit peut en contenir naturellement beaucoup. 'Allégé en matières grasses' signifie souvent plus de sucre pour compenser le goût. 'Source de fibres' ne garantit pas une bonne qualité globale. 'Bio' garantit l'absence de pesticides mais pas la qualité nutritionnelle."
      },
      {
        sous_titre: "Les applications utiles",
        texte: "Open Food Facts est une base de données collaborative et gratuite qui analyse des millions de produits — elle est intégrée dans l'application Yuka et dans d'autres. Yuka note les produits sur 100 et signale les additifs préoccupants. Ces outils sont imparfaits mais constituent un excellent point de départ pour développer son sens critique face aux produits industriels."
      }
    ]
  },
  {
    id: 7,
    titre: "Les phases du sommeil",
    pilier: "Sommeil",
    emoji: "🌙",
    resume: "Comprendre les cycles du sommeil pour mieux récupérer et optimiser ses nuits.",
    contenu: [
      {
        sous_titre: "Le sommeil n'est pas uniforme",
        texte: "Contrairement à ce que l'on pourrait penser, le sommeil n'est pas un état homogène. Une nuit se compose de 4 à 6 cycles de 90 minutes environ, chacun contenant plusieurs phases distinctes. Comprendre ces phases permet de mieux appréhender pourquoi certaines nuits sont réparatrices et d'autres non, même à durée égale."
      },
      {
        sous_titre: "Le sommeil léger (N1 et N2)",
        texte: "Le cycle commence par le sommeil léger, divisé en deux stades. Le stade N1 est la transition entre l'éveil et le sommeil — vous pouvez encore être facilement réveillé et avoir des sensations de chute. Le stade N2 représente environ 50% du temps de sommeil total : le corps se détend, la température baisse, le rythme cardiaque ralentit. C'est pendant cette phase que le cerveau produit des fuseaux de sommeil, impliqués dans la consolidation de la mémoire."
      },
      {
        sous_titre: "Le sommeil profond (N3)",
        texte: "Le stade N3, ou sommeil à ondes lentes, est la phase la plus réparatrice physiquement. C'est pendant cette phase que le corps sécrète l'hormone de croissance, régénère les tissus, renforce le système immunitaire et consolide la mémoire déclarative. Il est très difficile de se réveiller pendant le sommeil profond — si cela arrive, on se sent désorienté et confus. Cette phase est plus longue en début de nuit."
      },
      {
        sous_titre: "Le sommeil paradoxal (REM)",
        texte: "Le sommeil paradoxal (ou REM pour Rapid Eye Movements) est la phase des rêves. Le cerveau est très actif — presque autant qu'en état d'éveil — mais le corps est totalement paralysé pour éviter d'agir les rêves. C'est pendant cette phase que se consolident les mémoires émotionnelles et procédurales (apprentissages moteurs), et que le cerveau effectue un véritable tri et traitement des informations de la journée. Le sommeil paradoxal est plus abondant en fin de nuit."
      },
      {
        sous_titre: "Pourquoi ne pas couper sa nuit ?",
        texte: "Les premières heures de la nuit sont dominées par le sommeil profond (N3), essentiel à la récupération physique. Les dernières heures sont dominées par le sommeil paradoxal, essentiel à la récupération mentale et émotionnelle. Se coucher tard prive de sommeil profond. Se lever trop tôt prive de sommeil paradoxal. Les deux sont indispensables — c'est pourquoi une nuit complète de 7 à 9 heures est irremplaçable."
      },
      {
        sous_titre: "Le réveil au bon moment",
        texte: "Se réveiller en fin de cycle (après environ 90 minutes de sommeil) donne une sensation de forme bien meilleure que de se réveiller en plein sommeil profond. Des applications comme Sleep Cycle ou Pillow analysent vos mouvements pour vous réveiller dans la phase de sommeil léger dans une fenêtre de 30 minutes autour de votre alarme. Une alternative simple : calculer votre heure de réveil en multiples de 90 minutes à partir de votre heure d'endormissement."
      }
    ]
  },
  {
    id: 8,
    titre: "Les protéines : rôle et besoins",
    pilier: "Nutrition",
    emoji: "💪",
    resume: "Pourquoi les protéines sont essentielles et comment couvrir ses besoins au quotidien.",
    contenu: [
      {
        sous_titre: "Quel est le rôle des protéines ?",
        texte: "Les protéines sont les briques de construction du corps. Elles participent à la construction et la réparation des muscles, des os, de la peau et des organes. Elles sont aussi indispensables à la fabrication des enzymes digestives, des anticorps du système immunitaire, et de nombreuses hormones comme l'insuline. Sans apport suffisant en protéines, le corps ne peut pas se régénérer correctement."
      },
      {
        sous_titre: "Combien de protéines par jour ?",
        texte: "La recommandation de base est d'environ 1g de protéines par kilogramme de poids de corps par jour pour un adulte sédentaire. Soit environ 60g pour une personne de 60kg, 70g pour 70kg. Ce besoin augmente chez les sportifs (1,4 à 2g/kg), les personnes âgées (1,2 à 1,5g/kg pour prévenir la sarcopénie) et les femmes enceintes. Beaucoup de personnes consomment insuffisamment de protéines sans s'en rendre compte."
      },
      {
        sous_titre: "Les meilleures sources de protéines animales",
        texte: "Les œufs sont la source de protéines la plus complète et la mieux assimilée par l'organisme, il est possible d'en manger plusieurs par jour (un oeuf contient 6 à 7g de protéines). Les viandes blanches (poulet, dinde), les poissons et fruits de mer, les produits laitiers (fromage blanc, yaourt grec) sont également d'excellentes sources. Préférez des sources de qualité : œufs bio filière oméga 3, poissons sauvages, viandes de qualité en quantité raisonnée."
      },
      {
        sous_titre: "Les meilleures sources de protéines végétales",
        texte: "Les légumineuses (lentilles, pois chiches, haricots), le tofu et le tempeh, les graines (chanvre, courge, tournesol) et les céréales complètes contiennent des protéines végétales. Leur point faible : elles sont incomplètes en acides aminés essentiels prises séparément. La solution est de les combiner — légumineuses + céréales complètes forment une protéine complète. Exemple : lentilles + riz, houmous + pain complet."
      },
      {
        sous_titre: "Les signes d'un manque de protéines",
        texte: "Une fatigue persistante, une cicatrisation lente, une perte de masse musculaire, des ongles cassants, des cheveux fragilisés ou une immunité affaiblie peuvent signaler un apport insuffisant en protéines. Ces signes sont souvent attribués à tort à d'autres causes. Si vous suivez un régime restrictif ou que vous êtes végétalien, soyez particulièrement vigilant à couvrir vos besoins."
      }
    ]
  },
  {
    id: 9,
    titre: "La méditation",
    pilier: "Stress",
    emoji: "🧘",
    resume: "Comprendre la méditation, ses bienfaits prouvés et comment commencer simplement.",
    contenu: [
      {
        sous_titre: "Qu'est-ce que la méditation ?",
        texte: "La méditation est une pratique d'entraînement de l'attention qui consiste à observer ses pensées, sensations et émotions sans les juger. Contrairement à une idée reçue, méditer ne signifie pas 'ne penser à rien' — c'est impossible. Il s'agit plutôt d'observer le flux des pensées sans s'y accrocher, comme regarder des nuages passer dans le ciel. La méditation de pleine conscience (mindfulness) est la forme la plus étudiée scientifiquement."
      },
      {
        sous_titre: "Les bienfaits prouvés par la science",
        texte: "Des centaines d'études cliniques documentent les effets de la méditation régulière : réduction du stress et de l'anxiété, amélioration de la qualité du sommeil, diminution de la tension artérielle, renforcement du système immunitaire, amélioration de la concentration et de la mémoire. Le programme MBSR (Mindfulness Based Stress Reduction) développé par Jon Kabat-Zinn est l'un des plus validés scientifiquement."
      },
      {
        sous_titre: "Comment commencer ?",
        texte: "Commencez par 5 minutes par jour — la régularité prime sur la durée. Asseyez-vous confortablement, fermez les yeux, et portez votre attention sur votre respiration. Quand une pensée arrive (et elle arrivera), observez-la sans vous y accrocher et ramenez doucement votre attention à la respiration. C'est cet acte de ramener l'attention qui constitue l'entraînement — chaque distraction est une opportunité de pratiquer."
      },
      {
        sous_titre: "Les applications recommandées",
        texte: "Petit Bambou est l'application de méditation guidée francophone la plus complète — elle propose des programmes structurés pour débutants. Headspace (en anglais) est également très bien conçue. Pour les plus avancés, Insight Timer propose des milliers de méditations gratuites. Ces outils sont particulièrement utiles au début pour être guidé et maintenir une pratique régulière."
      },
      {
        sous_titre: "Méditation et cohérence cardiaque : deux pratiques complémentaires",
        texte: "La cohérence cardiaque et la méditation sont deux outils complémentaires qui agissent différemment. La cohérence cardiaque agit rapidement sur le système nerveux autonome et le cortisol — c'est l'outil d'urgence anti-stress. La méditation agit en profondeur sur les schémas de pensée et la résilience émotionnelle sur le long terme. Idéalement, pratiquez les deux : cohérence cardiaque 3 fois par jour, méditation 5 à 10 minutes le matin."
      }
    ]
  },
  {
    id: 10,
    titre: "Les compléments alimentaires",
    pilier: "Nutrition",
    emoji: "💊",
    resume: "Quand les compléments sont utiles, lesquels privilégier et comment éviter les pièges.",
    contenu: [
      {
        sous_titre: "Les compléments remplacent-ils une bonne alimentation ?",
        texte: "Non — et c'est le point le plus important. Les compléments alimentaires sont conçus pour compléter une alimentation déjà équilibrée, pas pour la remplacer. Une pilule de vitamine C ne reproduira jamais la complexité nutritionnelle d'une orange fraîche, qui contient des dizaines de micronutriments et de composés bioactifs qui agissent en synergie. La priorité reste toujours l'alimentation."
      },
      {
        sous_titre: "La vitamine D : le complément le plus utile",
        texte: "La vitamine D est déficitaire chez environ 80% des Français, surtout entre octobre et avril. Elle est indispensable à l'immunité, la santé osseuse, la régulation de l'humeur et de nombreuses fonctions hormonales. La supplémentation en vitamine D3 (cholécalciférol) est recommandée pour la quasi-totalité de la population française en automne et hiver — idéalement après dosage sanguin pour adapter la dose."
      },
      {
        sous_titre: "Le magnésium : l'allié du stress",
        texte: "Le magnésium est impliqué dans plus de 300 réactions enzymatiques dans l'organisme. Il est souvent déficitaire chez les personnes stressées car le stress accélère son élimination urinaire. Les signes d'un manque : crampes, fatigue, irritabilité, troubles du sommeil. Privilégiez les formes bien absorbées : bisglycinate, malate ou glycérophosphate de magnésium. Évitez l'oxyde de magnésium, peu assimilé."
      },
      {
        sous_titre: "Les oméga-3 : essentiels si peu de poisson",
        texte: "Les oméga-3 à longue chaîne (EPA et DHA) sont indispensables pour la santé cardiovasculaire, cérébrale et la régulation de l'inflammation. Si vous ne consommez pas de petits poissons gras 2 fois par semaine, une supplémentation en huile de poisson ou en huile d'algues (pour les végétariens) est justifiée. Vérifiez la teneur en EPA et DHA sur l'étiquette — elle doit être élevée."
      },
      {
        sous_titre: "Les pièges à éviter",
        texte: "Méfiez-vous des compléments miracles aux allégations trop belles, des formules multi-vitamines peu dosées qui ne servent à rien, et des compléments achetés sans analyse préalable. En France, les compléments alimentaires ne sont pas des médicaments et ne nécessitent pas d'autorisation de mise sur le marché — la qualité est très variable. Privilégiez les marques reconnues, les formes bien absorbées et consultez un professionnel de santé avant de commencer."
      }
    ]
  },
  {
    id: 11,
    titre: "Les fruits et légumes de saison",
    pilier: "Nutrition",
    emoji: "🥦",
    resume: "Pourquoi manger de saison est meilleur pour la santé, le goût et la planète.",
    contenu: [
      {
        sous_titre: "Pourquoi la saisonnalité compte-t-elle ?",
        texte: "Un fruit ou légume cueilli à maturité et consommé rapidement est bien plus riche en vitamines, minéraux et antioxydants qu'un produit cueilli vert, transporté sur des milliers de kilomètres et stocké pendant des semaines. Des études montrent que certains légumes peuvent perdre jusqu'à 50% de leur teneur en vitamine C en quelques jours après la récolte. Manger de saison, c'est manger au moment où les aliments sont nutritionnellement au meilleur."
      },
      {
        sous_titre: "Les grandes saisons alimentaires",
        texte: "Printemps : asperges, radis, petits pois, fraises, cerises, épinards. Été : tomates, courgettes, aubergines, poivrons, concombres, pêches, abricots, melons. Automne : potiron, courges, champignons, raisins, poires, pommes. Hiver : poireaux, choux, carottes, betteraves, agrumes, kiwis. Ces repères sont indicatifs et varient selon les régions — les marchés locaux sont la meilleure boussole."
      },
      {
        sous_titre: "Les bénéfices environnementaux",
        texte: "Manger de saison réduit significativement l'empreinte carbone de son alimentation. Les fruits et légumes hors saison sont souvent cultivés sous serres chauffées ou importés par avion — deux modes de production très énergivores. Selon l'ADEME, l'alimentation représente environ 25% de l'empreinte carbone d'un Français. Choisir des produits de saison et locaux est l'un des gestes les plus impactants."
      },
      {
        sous_titre: "Comment s'organiser concrètement ?",
        texte: "Affichez un calendrier des fruits et légumes de saison dans votre cuisine — vous en trouverez facilement en ligne. Faites vos courses au marché local plutôt qu'au supermarché. Abonnez-vous à un panier de légumes (AMAP) pour recevoir automatiquement des produits de saison. En hiver, n'hésitez pas à cuisiner des légumineuses et des légumes racines — ils sont nutritifs, économiques et parfaitement adaptés à la saison."
      },
      {
        sous_titre: "Frais, surgelé ou en conserve ?",
        texte: "Les légumes surgelés juste après la récolte conservent une grande partie de leurs nutriments — parfois mieux que des légumes frais stockés plusieurs jours. C'est une excellente alternative économique aux légumes de saison. Les conserves sont acceptables mais moins intéressantes nutritionnellement et souvent plus riches en sel. La hiérarchie : frais de saison et local > surgelé > conserve."
      }
    ]
  },
  {
    id: 12,
    titre: "L'importance du bio",
    pilier: "Nutrition",
    emoji: "🌱",
    resume: "Ce que garantit vraiment le label bio, ses limites et comment prioriser ses achats.",
    contenu: [
      {
        sous_titre: "Que garantit le label bio ?",
        texte: "Le label bio européen (AB) garantit l'absence de pesticides de synthèse, d'OGM, d'engrais chimiques de synthèse et d'additifs alimentaires pour la grande majorité des ingrédients. Pour les produits transformés, au moins 95% des ingrédients agricoles doivent être biologiques. Le bio garantit aussi de meilleures conditions d'élevage pour les animaux et interdit certains traitements vétérinaires préventifs."
      },
      {
        sous_titre: "Bio = meilleur pour la santé ?",
        texte: "Les études montrent que les produits bio contiennent moins de résidus de pesticides — c'est le principal bénéfice santé démontré. Certaines études suggèrent également une teneur légèrement supérieure en antioxydants et en oméga-3 pour les produits animaux bio. Cependant, bio ne signifie pas automatiquement plus nutritif — un biscuit bio reste un biscuit. La qualité globale de l'alimentation prime sur le label."
      },
      {
        sous_titre: "Les limites du bio",
        texte: "Le bio n'est pas parfait : certains pesticides naturels sont autorisés et peuvent être utilisés en quantités importantes. Le bio importé a une empreinte carbone élevée. Le label bio ne garantit pas les conditions de travail des agriculteurs. Et le bio industriel n'a parfois que peu à voir avec l'agriculture biologique traditionnelle. Un légume bio venu d'Espagne en hiver est moins vertueux qu'un légume conventionnel local et de saison."
      },
      {
        sous_titre: "Comment prioriser sans se ruiner ?",
        texte: "Si le budget est limité, priorisez le bio pour les aliments les plus contaminés en pesticides : fraises, pommes, raisins, pêches, épinards, poivrons, céleri (la dirty dozen). Pour les aliments naturellement peu contaminés (avocat, ananas, mangue, oignon, maïs doux), le conventionnel est acceptable. Priorisez aussi le bio pour les produits animaux — les pesticides et antibiotiques se concentrent dans les graisses animales."
      },
      {
        sous_titre: "Bio, local ou de saison : que choisir ?",
        texte: "Idéalement les trois — mais si vous devez choisir, voici la hiérarchie recommandée : local et de saison d'abord (impact environnemental et fraîcheur), puis bio (moins de pesticides). Un produit local et de saison conventionnel est souvent préférable à un produit bio importé hors saison. La meilleure option reste le marché local avec des producteurs que vous pouvez questionner sur leurs pratiques."
      }
    ]
  },
  {
    id: 13,
    titre: "Les effets de l'activité physique sur le corps",
    pilier: "Mouvement",
    emoji: "🏃",
    resume: "Ce que le sport fait vraiment à votre corps, de la tête aux pieds.",
    contenu: [
      {
        sous_titre: "Les effets immédiats dès la première séance",
        texte: "Dès les premières minutes d'activité physique, le cœur accélère pour irriguer les muscles en oxygène, la température corporelle monte, les bronches se dilatent pour augmenter les échanges gazeux. Le cerveau libère des endorphines — les hormones du bien-être — et de la dopamine, responsable de la motivation et du plaisir. C'est pourquoi on se sent mieux après avoir bougé, même quand on n'en avait pas envie au départ."
      },
      {
        sous_titre: "Les effets sur le cerveau",
        texte: "L'activité physique régulière est l'un des meilleurs protecteurs du cerveau connus à ce jour. Elle stimule la neurogenèse — la création de nouveaux neurones — notamment dans l'hippocampe, zone clé pour la mémoire. Elle augmente le volume de matière grise, améliore la concentration, réduit le risque de dépression et d'anxiété aussi efficacement que certains antidépresseurs selon plusieurs méta-analyses, et réduit de 30 à 40% le risque de démence."
      },
      {
        sous_titre: "Les effets sur le cœur et la circulation",
        texte: "L'entraînement cardiovasculaire régulier renforce le muscle cardiaque qui devient plus efficace — il pompe plus de sang à chaque battement, ce qui fait baisser la fréquence cardiaque au repos. Il améliore la flexibilité des artères, réduit la tension artérielle, diminue le mauvais cholestérol (LDL) et augmente le bon (HDL), réduit les triglycérides et améliore la sensibilité à l'insuline. C'est le médicament préventif le plus puissant contre les maladies cardiovasculaires."
      },
      {
        sous_titre: "Les effets sur les muscles et les os",
        texte: "Le renforcement musculaire augmente la masse et la force musculaires, améliore la posture et prévient les douleurs chroniques. Il stimule aussi la densité osseuse en exerçant des contraintes mécaniques sur les os — essentiel pour prévenir l'ostéoporose, surtout chez les femmes après la ménopause. Après 30 ans, on perd naturellement environ 1% de masse musculaire par an sans activité — l'exercice est le seul moyen efficace de contrer cette perte."
      },
      {
        sous_titre: "Combien et quel type d'activité ?",
        texte: "L'OMS recommande 150 à 300 minutes d'activité modérée par semaine (marche rapide, vélo, natation) ou 75 à 150 minutes d'activité intense (course, sport collectif), plus 2 séances de renforcement musculaire. La clé est la régularité — 30 minutes par jour sont plus bénéfiques que 3h le week-end. Tout mouvement compte : les escaliers, la marche pour aller au travail, le jardinage. L'idéal est de combiner cardio et renforcement musculaire."
      }
    ]
  },
  {
    id: 14,
    titre: "Comment équilibrer son assiette",
    pilier: "Nutrition",
    emoji: "🍽️",
    resume: "La méthode simple pour composer des repas équilibrés sans se compliquer la vie.",
    contenu: [
      {
        sous_titre: "La règle de l'assiette équilibrée",
        texte: "Une façon simple de visualiser un repas équilibré : divisez mentalement votre assiette en trois parties. La moitié de l'assiette est composée de légumes (crus ou cuits). Un quart est composé de protéines (viande, poisson, œufs, légumineuses, tofu). Le dernier quart est composé de féculents de qualité (céréales complètes, légumineuses, pommes de terre). Ajoutez une matière grasse de qualité (huile d'olive, colza) et vous avez un repas nutritionnellement complet."
      },
      {
        sous_titre: "L'importance de la variété",
        texte: "Un repas équilibré ne suffit pas — c'est la variété sur la semaine qui compte. L'idéal est de varier les sources de protéines (alterner viande, poisson, œufs, légumineuses), les types de légumes (différentes couleurs = différents nutriments), et les féculents. Une règle simple : essayez de ne pas manger la même chose deux jours de suite. Plus votre alimentation est variée, plus elle couvre l'ensemble de vos besoins nutritionnels."
      },
      {
        sous_titre: "Le petit-déjeuner idéal",
        texte: "Contrairement à ce que la publicité véhicule, le petit-déjeuner idéal n'est pas composé de céréales sucrées et de jus de fruits. Un bon petit-déjeuner contient des protéines (œuf, fromage blanc, yaourt grec), des bonnes graisses (oléagineux, avocat), des fibres (pain complet, flocons d'avoine) et des fruits frais. Ce type de petit-déjeuner stabilise la glycémie sur toute la matinée et évite la fatigue de 11h."
      },
      {
        sous_titre: "Faut-il compter les calories ?",
        texte: "Compter les calories est fastidieux, souvent inexact et peut entretenir une relation anxieuse à la nourriture. Une approche plus saine consiste à se concentrer sur la qualité des aliments plutôt que sur les quantités. Un corps bien nourri avec des aliments complets et variés régule naturellement sa faim et sa satiété. Les calories ne se valent pas toutes — 200 calories de noix n'ont pas le même effet métabolique que 200 calories de bonbons."
      },
      {
        sous_titre: "Les erreurs les plus fréquentes",
        texte: "Manger trop vite empêche les signaux de satiété d'arriver à temps. Boire des boissons sucrées pendant les repas ajoute des calories vides sans apporter de satiété. Finir systématiquement son assiette sans écouter sa faim coupe le lien avec les signaux internes de satiété."
      }
    ]
  },
  {
    id: 15,
    titre: "Les oléagineux : une poignée par jour",
    pilier: "Nutrition",
    emoji: "🥜",
    resume: "Noix, amandes, noisettes : pourquoi une poignée par jour est l'un des meilleurs gestes santé.",
    contenu: [
      {
        sous_titre: "Qu'est-ce qu'un oléagineux ?",
        texte: "Les oléagineux sont des fruits ou graines riches en huiles végétales : noix, amandes, noisettes, noix de cajou, pistaches, noix de macadamia, noix du Brésil, graines de courge, de tournesol, de sésame, de lin, de chanvre. Malgré leur richesse en graisses, ils sont associés dans de nombreuses études à une meilleure santé cardiovasculaire, un meilleur contrôle du poids et une réduction de la mortalité globale."
      },
      {
        sous_titre: "Leur composition nutritionnelle exceptionnelle",
        texte: "Les oléagineux sont denses en bonnes graisses insaturées (oméga-3 et oméga-9), en protéines végétales, en fibres, en magnésium, en zinc, en sélénium, en vitamine E et en polyphénols antioxydants. Les noix sont particulièrement riches en oméga-3. Les amandes sont excellentes pour le magnésium et la vitamine E. Les noix du Brésil sont la meilleure source alimentaire de sélénium — une seule noix couvre les besoins journaliers."
      },
      {
        sous_titre: "Pourquoi une poignée par jour ?",
        texte: "Une poignée d'oléagineux correspond à environ 30g — c'est la dose associée aux bénéfices santé dans la majorité des études. La célèbre étude PREDIMED, portant sur 7 000 participants, a montré qu'une consommation quotidienne de noix réduisait de 30% le risque cardiovasculaire. Cette quantité apporte environ 150 à 200 calories de très haute qualité nutritionnelle, ce qui en fait l'une des meilleures collations possibles."
      },
      {
        sous_titre: "Comment les consommer ?",
        texte: "Privilégiez les oléagineux natures, non salés et non grillés pour préserver leurs nutriments et éviter les excès de sel. Vous pouvez les consommer en collation, les ajouter dans vos salades, yaourts, porridges ou smoothies. Les purées d'oléagineux (purée d'amande, de noisette, de cajou) sont une excellente alternative au beurre. Conservez-les à l'abri de la lumière et de la chaleur pour éviter l'oxydation des graisses."
      },
      {
        sous_titre: "Attention aux allergies",
        texte: "Les oléagineux font partie des 14 allergènes majeurs reconnus en Europe. Les allergies aux noix, aux arachides et aux autres fruits à coque peuvent être sévères, voire engager le pronostic vital. Si vous n'avez jamais consommé certains oléagineux, introduisez-les progressivement et en petite quantité. En cas de doute ou d'antécédents familiaux d'allergie, consultez un allergologue avant d'augmenter votre consommation."
      }
    ]
  },
  {
    id: 16,
    titre: "Céréales complètes vs raffinées",
    pilier: "Nutrition",
    emoji: "🌾",
    resume: "Pourquoi choisir des céréales complètes et comment les intégrer facilement dans son alimentation.",
    contenu: [
      {
        sous_titre: "Quelle est la différence ?",
        texte: "Une céréale complète conserve l'ensemble de ses couches : le son (riche en fibres et minéraux), le germe (riche en vitamines B, E et antioxydants) et l'endosperme (riche en amidon). Une céréale raffinée a été débarrassée du son et du germe — il ne reste que l'endosperme, essentiellement de l'amidon. Ce processus de raffinage retire jusqu'à 75% des fibres, 80% du magnésium et la majorité des vitamines B."
      },
      {
        sous_titre: "Les effets sur la glycémie",
        texte: "Les céréales raffinées (pain blanc, riz blanc, pâtes blanches) ont un index glycémique élevé — elles font monter rapidement la glycémie, provoquant un pic d'insuline suivi d'une hypoglycémie réactionnelle responsable de la fatigue et des fringales de l'après-midi. Les céréales complètes ont un index glycémique bien plus bas grâce à leurs fibres — elles libèrent leur énergie progressivement et maintiennent une glycémie stable sur plusieurs heures."
      },
      {
        sous_titre: "Les meilleures céréales complètes",
        texte: "L'avoine est l'une des meilleures céréales complètes — riche en bêta-glucanes, des fibres solubles qui réduisent le cholestérol. Le sarrasin est naturellement sans gluten et très riche en protéines et minéraux. Le quinoa (techniquement une graine) contient tous les acides aminés essentiels. L'épeautre, le seigle et l'orge sont d'excellentes alternatives au blé raffiné. Le riz complet remplace avantageusement le riz blanc."
      },
      {
        sous_titre: "Comment passer aux céréales complètes ?",
        texte: "La transition doit être progressive pour éviter les inconforts digestifs liés à l'augmentation des fibres. Commencez par remplacer un aliment à la fois : le pain blanc par du pain complet ou au levain, le riz blanc par du riz semi-complet, les pâtes blanches par des pâtes complètes. Augmentez simultanément votre consommation d'eau. En deux à trois semaines, votre microbiote s'adapte et les éventuels inconforts disparaissent."
      },
      {
        sous_titre: "Et le gluten dans tout ça ?",
        texte: "Le gluten est une protéine présente dans le blé, l'orge et le seigle. La maladie cœliaque (intolérance vraie au gluten) touche environ 1% de la population et nécessite une éviction totale du gluten. La sensibilité non cœliaque au gluten est plus courante mais encore mal définie. Pour la grande majorité des personnes, le gluten n'est pas problématique — c'est le raffinage des céréales qui pose problème, pas le gluten en lui-même. Évitez le sans-gluten industriel souvent très transformé."
      }
    ]
  },
  {
    id: 17,
    titre: "Les huiles à privilégier",
    pilier: "Nutrition",
    emoji: "🫒",
    resume: "Olive, colza, lin : quelles huiles choisir, pour quoi et pourquoi les graisses sont essentielles.",
    contenu: [
      {
        sous_titre: "Les graisses sont-elles toutes mauvaises ?",
        texte: "Non — les graisses sont indispensables à la vie. Elles constituent les membranes de toutes nos cellules, permettent l'absorption des vitamines liposolubles (A, D, E, K), servent de précurseurs aux hormones et participent au bon fonctionnement du cerveau (composé à 60% de graisses). Le problème n'est pas la quantité de graisses mais leur qualité. Les graisses trans (huiles hydrogénées) et un excès d'oméga-6 sont problématiques — les bonnes graisses insaturées sont au contraire bénéfiques."
      },
      {
        sous_titre: "L'huile d'olive : l'or de la Méditerranée",
        texte: "L'huile d'olive extra vierge de première pression à froid est l'huile la plus étudiée et la plus recommandée. Riche en acide oléique (oméga-9) et en polyphénols antioxydants, elle est associée à une réduction du risque cardiovasculaire, de l'inflammation et de certains cancers. Elle supporte bien la chaleur modérée (jusqu'à 180°C). Choisissez-la extra vierge, en bouteille en verre sombre, et consommez-la dans l'année suivant sa production."
      },
      {
        sous_titre: "L'huile de colza : la meilleure pour les oméga-3",
        texte: "L'huile de colza est la plus riche en acide alpha-linolénique (ALA), un oméga-3 végétal essentiel. Elle a un excellent rapport oméga-6/oméga-3 (2:1, proche de l'idéal). Elle est aussi riche en vitamine E. En revanche, elle ne supporte pas bien la chaleur — utilisez-la exclusivement crue, en assaisonnement. Alternez huile d'olive et huile de colza pour couvrir à la fois vos besoins en oméga-9 et en oméga-3."
      },
      {
        sous_titre: "Les autres huiles intéressantes",
        texte: "L'huile de lin est la plus riche en oméga-3 de toutes les huiles végétales — à utiliser crue uniquement et à conserver au réfrigérateur. L'huile de noix est également très riche en oméga-3 et délicieuse en vinaigrette. L'huile de coco, malgré son image santé, est très riche en graisses saturées — à utiliser avec modération pour la cuisson à haute température. L'huile de tournesol classique est très riche en oméga-6 — à limiter."
      },
      {
        sous_titre: "Les huiles à éviter",
        texte: "Les margarines et huiles hydrogénées contiennent des acides gras trans qui augmentent le mauvais cholestérol et le risque cardiovasculaire — évitez-les absolument. Les huiles végétales génériques (huile de tournesol en grande quantité, huile de palme) déséquilibrent le rapport oméga-6/oméga-3. Les huiles chauffées au-delà de leur point de fumée se dégradent et produisent des composés toxiques — n'utilisez jamais une huile qui fume."
      }
    ]
  },
  {
    id: 18,
    titre: "Produits ménagers : choisir sans danger",
    pilier: "Environnement",
    emoji: "🧹",
    resume: "Comment nettoyer son intérieur sans exposer sa santé et l'environnement à des substances toxiques.",
    contenu: [
      {
        sous_titre: "Pourquoi s'inquiéter des produits ménagers ?",
        texte: "Nous passons en moyenne 80% de notre temps en intérieur, et l'air intérieur est souvent 5 à 10 fois plus pollué que l'air extérieur selon l'ADEME. Les produits ménagers conventionnels contiennent de nombreuses substances préoccupantes : solvants, parfums de synthèse, conservateurs, agents de surface irritants, perturbateurs endocriniens. Ces substances s'accumulent dans l'air intérieur, sur les surfaces et dans l'organisme par inhalation et contact cutané."
      },
      {
        sous_titre: "Les substances les plus préoccupantes",
        texte: "Les alkylphénols (nonylphénol, octylphénol) sont des perturbateurs endocriniens présents dans certains détergents. Le triclosan, antibactérien très répandu, perturbe la thyroïde et favorise les résistances bactériennes. Les parfums de synthèse peuvent contenir des centaines de molécules dont certaines sont allergisantes ou toxiques. Le chlore et l'ammoniac dégagent des vapeurs irritantes pour les voies respiratoires. Le formaldéhyde, présent dans certains produits, est classé cancérogène certain."
      },
      {
        sous_titre: "Les labels à privilégier",
        texte: "Ecocert est le label français de référence pour les produits ménagers écologiques — il garantit l'absence de substances pétrochimiques, de perturbateurs endocriniens et une biodégradabilité rapide. L'Écolabel Européen (fleur verte) garantit des critères environnementaux stricts sur tout le cycle de vie du produit. Nature & Progrès est un label encore plus exigeant. Évitez les allégations marketing comme 'vert', 'naturel' ou 'écologique' sans label certifié."
      },
      {
        sous_titre: "Les alternatives maison",
        texte: "Le vinaigre blanc détartre et désinfecte naturellement les surfaces, les WC et la salle de bain. Le bicarbonate de soude est un abrasif doux, déodorant et légèrement désinfectant. Le savon de Marseille véritable (72% d'huile d'olive) nettoie en douceur sans résidu toxique. Le cristaux de soude dégraissent efficacement. Ces quatre ingrédients couvrent 90% des besoins ménagers, sont économiques, biodégradables et sans danger pour la santé."
      },
      {
        sous_titre: "Les bons réflexes au quotidien",
        texte: "Aérez votre logement au moins 10 minutes par jour, même en hiver — c'est le geste le plus efficace pour réduire la pollution intérieure. Évitez de mélanger les produits ménagers entre eux, surtout javel et ammoniaque ou javel et vinaigre — ces mélanges produisent des gaz toxiques. Privilégiez les sprays aux aérosols qui diffusent des particules fines dans l'air. Conservez les produits ménagers dans leurs emballages d'origine et hors de portée des enfants. Enfin, n'oublions pas que le propre n'a pas d'odeur, nous n'avons pas besoin d'avoir du parfum sur nos vêtements, nos surfaces ou dans l'air."
      }
    ]
  },
  {
    id: 19,
    titre: "Cosmétiques : décrypter les compositions",
    pilier: "Environnement",
    emoji: "🧴",
    resume: "Comment lire les étiquettes de vos cosmétiques et éviter les ingrédients problématiques.",
    contenu: [
      {
        sous_titre: "Pourquoi s'intéresser à la composition ?",
        texte: "La peau est notre plus grand organe et absorbe une partie des substances avec lesquelles elle est en contact. Une étude américaine a montré qu'une femme s'applique en moyenne 168 ingrédients chimiques différents sur son corps chaque matin via ses cosmétiques. Si la majorité est sans danger, certains composants sont des perturbateurs endocriniens, allergisants ou potentiellement cancérogènes. La réglementation européenne est plus stricte qu'ailleurs mais ne garantit pas l'innocuité de toutes les substances autorisées."
      },
      {
        sous_titre: "Les perturbateurs endocriniens à éviter",
        texte: "Les parabènes (methylparaben, propylparaben, butylparaben) sont des conservateurs mimant les œstrogènes — ils ont été retrouvés dans des tumeurs mammaires. Les phtalates (souvent cachés sous le terme 'parfum') perturbent le système hormonal masculin. Le BHA et le BHT sont des antioxydants classés perturbateurs endocriniens probables. Le resorcinol présent dans certaines teintures capillaires perturbe la thyroïde. Ces substances sont particulièrement préoccupantes pour les femmes enceintes et les jeunes enfants."
      },
      {
        sous_titre: "Les autres ingrédients préoccupants",
        texte: "Le formaldéhyde et ses libérateurs (DMDM hydantoin, imidazolidinyl urea) sont classés cancérogènes — présents dans certains shampooings et vernis à ongles. Les silicones (diméthicone, cyclopentasiloxane) ne sont pas dangereux pour la santé mais très polluants pour l'environnement aquatique. Les PEG (polyéthylène glycols) peuvent être contaminés par des impuretés cancérogènes. Le talc peut contenir des fibres d'amiante selon sa provenance."
      },
      {
        sous_titre: "Les labels cosmétiques de confiance",
        texte: "Cosmos Organic (anciennement Ecocert) est le label de référence en Europe pour les cosmétiques bio — il garantit au minimum 95% d'ingrédients d'origine naturelle et 20% d'ingrédients bio. Nature & Progrès est encore plus exigeant. Le label BDIH allemand et Natrue sont également fiables. En France, le label Cosmébio repose sur le référentiel Cosmos. Méfiez-vous des labels fantaisistes créés par les marques elles-mêmes sans certification indépendante."
      },
      {
        sous_titre: "Les applications pour s'y retrouver",
        texte: "INCI Beauty est une application française qui analyse la composition de vos cosmétiques en scannant le code-barres ou en recherchant le produit — elle note chaque ingrédient et signale les substances préoccupantes. QuelCosmetic fonctionne sur le même principe. Yuka analyse également les cosmétiques en plus des produits alimentaires. Ces outils sont imparfaits — un ingrédient noté négatif n'est pas forcément dangereux à la concentration utilisée — mais ils constituent un excellent point de départ pour développer son sens critique."
      }
    ]
  },
  {
    id: 20,
    titre: "Alimentation et sommeil",
    pilier: "Sommeil",
    emoji: "🍽️",
    resume: "Ce que vous mangez influence directement la qualité de vos nuits — et vice versa.",
    contenu: [
      {
        sous_titre: "Le lien entre nutrition et sommeil",
        texte: "L'alimentation et le sommeil sont étroitement liés dans les deux sens. Un mauvais sommeil augmente la faim le lendemain (via la ghréline, hormone de l'appétit) et pousse vers les aliments sucrés et gras. À l'inverse, certains aliments perturbent l'endormissement ou la qualité des cycles. Comprendre ces interactions permet d'agir sur les deux leviers simultanément pour améliorer sa récupération nocturne."
      },
      {
        sous_titre: "Les aliments qui favorisent le sommeil",
        texte: "Le tryptophane est un acide aminé précurseur de la sérotonine et de la mélatonine — les hormones du bien-être et du sommeil. On le trouve dans les œufs, la dinde, le poulet, les produits laitiers, les bananes, les oléagineux et les légumineuses. Les glucides complexes consommés au dîner facilitent le passage du tryptophane dans le cerveau. Un dîner équilibré comprenant des protéines, des légumes et des féculents complets est idéal pour favoriser l'endormissement."
      },
      {
        sous_titre: "Les aliments et boissons à éviter le soir",
        texte: "La caféine est le perturbateur de sommeil numéro un — elle bloque les récepteurs à l'adénosine, la molécule qui crée la pression de sommeil. Sa demi-vie est de 5 à 7 heures, ce qui signifie qu'un café à 16h a encore la moitié de son effet à 21h. L'alcool, bien qu'il facilite l'endormissement, fragmente les cycles et supprime le sommeil paradoxal. Les repas trop gras ou trop épicés ralentissent la digestion et augmentent la température corporelle, deux facteurs défavorables à l'endormissement."
      },
      {
        sous_titre: "L'horaire des repas compte aussi",
        texte: "Dîner tard décale l'horloge biologique et perturbe la sécrétion de mélatonine. Idéalement, le dîner devrait être pris 2 à 3 heures avant le coucher pour laisser le temps à la digestion de s'amorcer. Un estomac trop plein au moment du coucher oblige le corps à maintenir une activité digestive importante au lieu de se consacrer à la récupération. Si vous avez faim tard le soir, une petite collation légère (banane, amandes, tisane) est préférable à un repas complet."
      },
      {
        sous_titre: "Les carences qui perturbent le sommeil",
        texte: "Le magnésium joue un rôle clé dans la régulation du système nerveux et la qualité du sommeil — une carence est fréquente et se manifeste par des crampes nocturnes, des réveils fréquents et une agitation. La vitamine D, dont le déficit touche une large partie de la population, est associée à des troubles du sommeil et notamment à l'insomnie. Le fer, dont le déficit cause une anémie, provoque des jambes sans repos qui perturbent l'endormissement. Un bilan sanguin permet de dépister ces carences."
      }
    ]
  },
  {
    id: 21,
    titre: "Les troubles du sommeil",
    pilier: "Sommeil",
    emoji: "😔",
    resume: "Insomnie, apnée, jambes sans repos : reconnaître et comprendre les principaux troubles du sommeil.",
    contenu: [
      {
        sous_titre: "L'insomnie : bien plus qu'une difficulté à dormir",
        texte: "L'insomnie touche environ 30% de la population adulte et se définit par des difficultés d'endormissement, des réveils nocturnes fréquents ou un réveil trop précoce, associés à une fatigue diurne. L'insomnie chronique (plus de 3 nuits par semaine depuis plus de 3 mois) nécessite une prise en charge. La thérapie cognitivo-comportementale pour l'insomnie (TCC-I) est aujourd'hui reconnue comme le traitement le plus efficace à long terme — plus efficace que les somnifères et sans effets secondaires."
      },
      {
        sous_titre: "L'apnée du sommeil : souvent non diagnostiquée",
        texte: "Le syndrome d'apnées obstructives du sommeil (SAOS) touche environ 4 à 8% des adultes, souvent sans qu'ils le sachent. Il se caractérise par des arrêts répétés de la respiration pendant le sommeil, entraînant des micro-réveils qui fragmentent les cycles sans que la personne en ait conscience. Les signes : ronflement intense, fatigue chronique malgré un temps de sommeil suffisant, maux de tête le matin, somnolence diurne. Le diagnostic se fait par polysomnographie et le traitement principal est la ventilation par PPC (pression positive continue)."
      },
      {
        sous_titre: "Le syndrome des jambes sans repos",
        texte: "Le syndrome des jambes sans repos (SJSR) se manifeste par une sensation désagréable dans les jambes (picotements, fourmillements, besoin irrépressible de bouger) qui apparaît au repos, surtout le soir et la nuit. Il touche environ 8% de la population et est souvent associé à une carence en fer — un dosage de la ferritine est recommandé. L'activité physique régulière, les étirements des jambes et la correction d'éventuelles carences (fer, magnésium, vitamine D) soulagent souvent les symptômes."
      },
      {
        sous_titre: "La dette de sommeil et le décalage de phase",
        texte: "La dette de sommeil s'accumule quand on dort régulièrement moins que son besoin naturel. Contrairement à une idée reçue, on ne récupère pas intégralement une dette de sommeil en dormant un week-end — les effets cognitifs et métaboliques persistent. Le décalage de phase est fréquent chez les adolescents et jeunes adultes : l'horloge biologique est naturellement décalée vers des heures tardives, rendant l'endormissement précoce difficile. La luminothérapie matinale et une exposition à la lumière naturelle dès le réveil aident à recaler l'horloge."
      },
      {
        sous_titre: "Quand consulter un médecin ?",
        texte: "Consultez votre médecin si vous souffrez d'insomnie depuis plus de 3 mois et qu'elle impacte votre qualité de vie, si votre partenaire signale des ronflements importants ou des arrêts respiratoires, si vous ressentez une somnolence diurne excessive malgré un temps de sommeil suffisant, ou si vous avez des sensations désagréables dans les jambes au repos. Un médecin du sommeil ou un centre spécialisé peut réaliser les explorations nécessaires pour identifier et traiter la cause."
      }
    ]
  },
  {
    id: 22,
    titre: "Le burn-out : reconnaître et prévenir",
    pilier: "Stress",
    emoji: "🔥",
    resume: "Comprendre le burn-out, identifier les signes précoces et retrouver un équilibre durable.",
    contenu: [
      {
        sous_titre: "Qu'est-ce que le burn-out ?",
        texte: "Le burn-out ou épuisement professionnel est un syndrome résultant d'un stress chronique au travail qui n'a pas été géré avec succès. Il se caractérise par trois dimensions selon la définition de la psychologue Christina Maslach : l'épuisement émotionnel et physique, la dépersonnalisation (détachement cynique envers son travail et les autres) et la diminution du sentiment d'accomplissement personnel. Ce n'est pas une faiblesse — c'est une réponse physiologique à une surcharge prolongée."
      },
      {
        sous_titre: "Les signes avant-coureurs à ne pas ignorer",
        texte: "Le burn-out s'installe progressivement — reconnaître les signaux précoces permet d'agir avant l'effondrement. Signes physiques : fatigue persistante qui ne cède pas après le repos, troubles du sommeil, maux de tête fréquents, infections à répétition (immunité affaiblie), tensions musculaires chroniques. Signes psychologiques : irritabilité, cynisme croissant, sentiment d'être débordé en permanence, difficultés de concentration, perte de motivation et de plaisir. Signes comportementaux : isolement social, augmentation de la consommation d'alcool ou de café, procrastination."
      },
      {
        sous_titre: "Les facteurs de risque",
        texte: "Certains profils et contextes augmentent le risque de burn-out : les métiers d'aide et de soin (soignants, enseignants, travailleurs sociaux), les postes à fortes responsabilités avec peu d'autonomie, les personnalités perfectionnistes ou à tendance anxieuse, le manque de reconnaissance au travail, les conflits de valeurs entre ce qu'on fait et ce en quoi on croit. Le télétravail, en effaçant la frontière entre vie professionnelle et personnelle, est également un facteur de risque depuis la pandémie."
      },
      {
        sous_titre: "Comment prévenir le burn-out ?",
        texte: "La prévention passe par plusieurs leviers complémentaires. Protégez vos ressources : sommeil suffisant, activité physique régulière, alimentation équilibrée et moments de déconnexion totale. Posez des limites claires : apprenez à dire non, définissez des horaires de travail et respectez-les. Cultivez des activités ressourçantes hors travail. Identifiez vos valeurs et veillez à ce que votre travail y soit aligné. Parlez de votre charge à votre manager avant d'être à bout — attendre le point de rupture est toujours plus coûteux."
      },
      {
        sous_titre: "Que faire si vous pensez être en burn-out ?",
        texte: "Si vous vous reconnaissez dans plusieurs des signes décrits, consultez votre médecin traitant sans attendre — il peut vous orienter vers un arrêt de travail si nécessaire et vers un accompagnement psychologique adapté. Le burn-out nécessite du temps pour récupérer — plusieurs mois dans les cas sévères. La reprise du travail doit être progressive et accompagnée d'un travail de fond sur les causes. Un psychologue spécialisé en thérapies cognitivo-comportementales (TCC) peut vous aider à modifier les schémas de pensée et de comportement qui ont contribué à l'épuisement."
      }
    ]
  },
  {
    id: 23,
    titre: "Les émotions et le corps",
    pilier: "Stress",
    emoji: "💙",
    resume: "Comment le stress et les émotions se logent dans le corps et comment les libérer.",
    contenu: [
      {
        sous_titre: "Le corps garde la mémoire des émotions",
        texte: "Les émotions ne sont pas que des expériences mentales — elles ont une réalité physique bien documentée. La peur contracte les épaules et le diaphragme. La tristesse alourdit la poitrine. La colère tend les mâchoires et les poings. Le stress chronique crée des tensions musculaires persistantes, notamment dans le trapèze, les lombaires et le psoas. Ces tensions corporelles peuvent devenir autonomes — persister même quand la cause émotionnelle a disparu — et engendrer des douleurs chroniques."
      },
      {
        sous_titre: "Le système nerveux autonome au cœur du lien corps-esprit",
        texte: "Le système nerveux autonome régule automatiquement nos fonctions vitales et notre réponse au stress. En situation de danger (réel ou perçu), le système sympathique active la réponse fight or flight : augmentation du rythme cardiaque, tension musculaire, accélération de la respiration, suppression de la digestion. Quand le danger passe, le système parasympathique devrait prendre le relais pour ramener le calme. En cas de stress chronique, le système sympathique reste en hyperactivité permanente — avec des conséquences importantes sur la santé."
      },
      {
        sous_titre: "Le rôle du psoas, muscle des émotions",
        texte: "Le psoas est un muscle profond qui relie la colonne lombaire au fémur et traverse le bassin. C'est le seul muscle qui connecte le tronc aux jambes. Il joue un rôle clé dans la posture et la marche mais aussi dans la réponse au stress — en situation de peur, il se contracte pour préparer la fuite ou la protection. Chez les personnes soumises à un stress chronique, le psoas est souvent chroniquement contracté, entraînant des douleurs lombaires, des tensions dans les hanches et une posture voûtée."
      },
      {
        sous_titre: "Les pratiques pour libérer les tensions émotionnelles",
        texte: "L'activité physique est le moyen le plus direct de libérer les tensions accumulées — elle complète le cycle physiologique du stress que le sédentarisme laisse inachevé. Le yoga, le tai-chi et le qi gong combinent mouvement, respiration et attention corporelle pour réguler le système nerveux. La cohérence cardiaque agit directement sur le système nerveux autonome. La sophrologie et la pleine conscience aident à développer la conscience corporelle et à identifier les tensions avant qu'elles ne deviennent douloureuses."
      },
      {
        sous_titre: "Quand consulter ?",
        texte: "Si vous souffrez de douleurs chroniques sans cause organique identifiée, de tensions musculaires persistantes malgré les étirements, ou si vous remarquez que vos douleurs s'aggravent en période de stress, une approche psychocorporelle peut être très bénéfique. Les kinésithérapeutes formés aux approches psychocorporelles, les ostéopathes, les psychologues spécialisés en thérapies somatiques (EMDR, Somatic Experiencing) ou en TCC peuvent vous accompagner dans ce travail de reconnexion corps-esprit."
      }
    ]
  },
  {
    id: 24,
    titre: "Mieux gérer son temps",
    pilier: "Stress",
    emoji: "⏰",
    resume: "Des méthodes concrètes pour reprendre le contrôle de son temps et réduire le stress chronique.",
    contenu: [
      {
        sous_titre: "Pourquoi avons-nous l'impression de manquer de temps ?",
        texte: "Le sentiment de manquer de temps est l'une des principales sources de stress moderne. Il est souvent lié non pas à un manque objectif de temps mais à un manque de clarté sur ses priorités, à une difficulté à dire non, à une surcharge d'obligations et à la fragmentation de l'attention par les notifications et les interruptions. La bonne nouvelle : la gestion du temps s'apprend et quelques méthodes simples peuvent transformer radicalement son rapport au quotidien."
      },
      {
        sous_titre: "La méthode Eisenhower : urgent vs important",
        texte: "La matrice d'Eisenhower divise les tâches en quatre quadrants selon deux axes : urgent/non urgent et important/non important. Les tâches urgentes ET importantes sont à faire immédiatement. Les tâches importantes mais non urgentes — comme prendre soin de sa santé, se former, entretenir ses relations — sont à planifier : ce sont elles qui ont le plus d'impact sur le long terme. Les tâches urgentes mais non importantes sont à déléguer. Les tâches ni urgentes ni importantes sont à éliminer. La plupart des gens passent leur temps dans l'urgence et négligent l'important."
      },
      {
        sous_titre: "La technique Pomodoro",
        texte: "La technique Pomodoro consiste à travailler en blocs de 25 minutes de concentration totale (téléphone éteint, notifications coupées) suivis de 5 minutes de pause. Après 4 cycles, une pause longue de 15 à 30 minutes. Cette méthode exploite la psychologie de la contrainte temporelle — sachant qu'on ne travaille que 25 minutes, le cerveau se met en action plus facilement. Elle protège aussi contre la fatigue cognitive et améliore la qualité du travail produit."
      },
      {
        sous_titre: "Apprendre à dire non",
        texte: "Dire non est l'une des compétences les plus importantes pour protéger son énergie et son temps. Chaque oui donné à quelque chose est un non donné à autre chose — souvent à soi-même. Pour apprendre à dire non : gagnez du temps avant de répondre ('je vérifie mon agenda et je reviens vers toi'), proposez une alternative ('je ne peux pas cette semaine mais je peux la semaine prochaine'), expliquez brièvement sans vous justifier excessivement. Un non dit clairement et bienveillamment est toujours préférable à un oui suivi d'une exécution bâclée ou d'un ressentiment."
      },
      {
        sous_titre: "Les rituels de transition",
        texte: "Les rituels de transition sont des mini-routines qui marquent le passage d'une activité à une autre et permettent au cerveau de changer de mode. Entre le travail et la vie personnelle : une marche, un sport, une douche, une méditation de 5 minutes. Entre deux tâches importantes : 2 minutes de respiration consciente. Ces rituels préviennent le débordement mental d'une sphère vers l'autre et améliorent la présence dans chaque moment. Ils sont particulièrement importants pour les personnes en télétravail dont les frontières sont floues."
      }
    ]
  },
  {
    id: 25,
    titre: "Renforcement musculaire à la maison",
    pilier: "Mouvement",
    emoji: "💪",
    resume: "Un programme complet pour renforcer son corps sans matériel et sans quitter son domicile.",
    contenu: [
      {
        sous_titre: "Pourquoi le renforcement musculaire est indispensable",
        texte: "Le renforcement musculaire n'est pas réservé aux sportifs ou aux personnes qui veulent 'prendre du muscle'. Il est indispensable pour tous : il maintient la masse musculaire qui diminue naturellement avec l'âge (sarcopénie), renforce les os et prévient l'ostéoporose, améliore la posture et réduit les douleurs chroniques, booste le métabolisme de base et améliore la sensibilité à l'insuline. Deux séances par semaine suffisent pour obtenir des bénéfices significatifs."
      },
      {
        sous_titre: "Les exercices de base sans matériel",
        texte: "Le squat renforce les quadriceps, les fessiers et les ischio-jambiers — descendez comme pour vous asseoir sur une chaise, dos droit, genoux dans l'axe des pieds. La pompe travaille les pectoraux, les triceps et les épaules — adaptez l'inclinaison selon votre niveau (sur les genoux pour débuter). La fente avant cible les quadriceps et les fessiers. Le gainage (planche) renforce la sangle abdominale et les muscles profonds du dos. Le pont fessier (allongé sur le dos, poussez les hanches vers le haut) cible les fessiers et les ischio-jambiers."
      },
      {
        sous_titre: "Comment structurer une séance",
        texte: "Une séance de 30 minutes efficace se structure ainsi : 5 minutes d'échauffement (marche sur place, rotations articulaires, squats lents), 20 minutes d'exercices (3 séries de 10 à 15 répétitions de 4 à 5 exercices), 5 minutes d'étirements. Respectez 60 à 90 secondes de repos entre chaque série. La progression est essentielle : quand un exercice devient trop facile, augmentez le nombre de répétitions, réduisez le temps de repos ou ajoutez une variante plus difficile."
      },
      {
        sous_titre: "Les principes clés pour progresser",
        texte: "La régularité prime sur l'intensité — deux séances hebdomadaires régulières valent mieux qu'une séance intensive suivie de 3 semaines d'absence. La récupération est aussi importante que l'entraînement — les muscles se renforcent pendant le repos, pas pendant l'effort. La technique prime sur la charge — un mouvement mal exécuté est source de blessure. Écoutez votre corps : une légère courbature le lendemain est normale, une douleur articulaire pendant l'effort ne l'est pas."
      },
      {
        sous_titre: "Débuter progressivement",
        texte: "Si vous débutez, commencez par une seule série de 10 répétitions de chaque exercice et augmentez progressivement sur plusieurs semaines. Ne cherchez pas à tout faire parfaitement dès le début — la priorité est de créer l'habitude. Des applications comme Freeletics, Nike Training Club ou FizzUp proposent des programmes guidés sans matériel adaptés à tous les niveaux. En cas de douleur chronique ou de pathologie, consultez un kinésithérapeute avant de commencer pour adapter les exercices à votre situation."
      }
    ]
  },
  {
    id: 26,
    titre: "La récupération après le sport",
    pilier: "Mouvement",
    emoji: "🛁",
    resume: "Pourquoi la récupération est aussi importante que l'entraînement et comment l'optimiser.",
    contenu: [
      {
        sous_titre: "La récupération : partie intégrante de l'entraînement",
        texte: "Une erreur fréquente des sportifs débutants est de considérer la récupération comme du temps perdu. C'est l'inverse : c'est pendant la récupération que les adaptations physiologiques se produisent. Les muscles se renforcent, les fibres endommagées se réparent, les stocks d'énergie se reconstituent. Sans récupération suffisante, l'entraînement conduit au surentraînement — une forme d'épuisement physiologique qui dégrade les performances et augmente le risque de blessure."
      },
      {
        sous_titre: "La nutrition post-effort",
        texte: "La fenêtre anabolique — les 30 à 60 minutes après l'effort — est le moment optimal pour apporter les nutriments nécessaires à la récupération. L'idéal est de consommer une combinaison de protéines (pour la réparation musculaire) et de glucides (pour reconstituer les stocks de glycogène). Exemples pratiques : yaourt grec + fruits, shake protéiné + banane, œufs + pain complet. L'hydratation est aussi critique — compensez les pertes sudorales avec de l'eau, voire une boisson légèrement salée après un effort intense."
      },
      {
        sous_titre: "Le sommeil : le meilleur des récupérateurs",
        texte: "C'est pendant le sommeil profond que l'hormone de croissance est sécrétée en grande quantité — elle est essentielle à la réparation musculaire et à la récupération générale. Un sportif qui dort 6 heures récupère deux fois moins bien qu'un sportif qui dort 8 heures, à entraînement égal. Priorisez le sommeil avant tout autre stratégie de récupération : il est gratuit, naturel et incomparablement efficace."
      },
      {
        sous_titre: "Les techniques de récupération active",
        texte: "La récupération active consiste à maintenir une activité légère les jours de repos — marche, natation douce, vélo léger, yoga. Elle améliore la circulation sanguine et accélère l'élimination des déchets métaboliques. Les étirements post-effort (maintenus 30 secondes minimum) réduisent les courbatures et maintiennent la souplesse. Le massage — auto-massage au foam roller ou massage par un professionnel — améliore la circulation et réduit les tensions musculaires. Le bain froid ou la douche froide après l'effort réduit l'inflammation et les courbatures."
      },
      {
        sous_titre: "Reconnaître les signes de surentraînement",
        texte: "Le surentraînement survient quand la charge d'entraînement dépasse les capacités de récupération de l'organisme. Signes d'alerte : baisse des performances malgré l'entraînement, fatigue persistante qui ne cède pas au repos, troubles du sommeil, irritabilité, perte de motivation, infections fréquentes, douleurs musculaires et articulaires chroniques. Si vous reconnaissez ces signes, réduisez l'intensité et le volume d'entraînement pendant 1 à 2 semaines et consultez un médecin du sport si les symptômes persistent."
      }
    ]
  },
  {
    id: 27,
    titre: "Les plastiques alimentaires à éviter",
    pilier: "Environnement",
    emoji: "♻️",
    resume: "Quels plastiques sont dangereux pour la santé et comment les remplacer au quotidien.",
    contenu: [
      {
        sous_titre: "Pourquoi les plastiques alimentaires sont préoccupants",
        texte: "Les plastiques alimentaires peuvent libérer des substances chimiques dans les aliments, en particulier sous l'effet de la chaleur, des acides ou des graisses. Les perturbateurs endocriniens les plus documentés dans les plastiques sont le bisphénol A (BPA) et les phtalates. Bien que le BPA soit désormais interdit dans les biberons et les contenants pour enfants en Europe, il est encore présent dans de nombreux emballages alimentaires et ses substituts (BPS, BPF) soulèvent des inquiétudes similaires."
      },
      {
        sous_titre: "Décrypter les codes de recyclage",
        texte: "Les plastiques sont identifiés par un numéro de 1 à 7 dans le triangle de recyclage. Les plus préoccupants : le n°3 (PVC) contient des phtalates, le n°6 (polystyrène) peut libérer du styrène, le n°7 (autres) peut contenir du BPA. Les plus sûrs pour le contact alimentaire : le n°1 (PET, bouteilles d'eau — à usage unique uniquement), le n°2 (PEHD, bouteilles de lait), le n°4 (PEBD), le n°5 (polypropylène, boîtes alimentaires). En cas de doute, préférez toujours le verre, l'inox ou la céramique."
      },
      {
        sous_titre: "Les situations à risque à éviter",
        texte: "Ne jamais chauffer les aliments dans des contenants en plastique, même estampillés 'micro-ondes safe' — la chaleur accélère la migration des substances chimiques. Ne pas laisser une bouteille d'eau en plastique dans une voiture chaude. Éviter les emballages plastiques pour les aliments gras (fromage, viande) — les graisses facilitent la migration des perturbateurs endocriniens. Ne pas utiliser de film plastique en contact direct avec les aliments gras ou chauds. Jeter les contenants plastiques rayés ou vieillis."
      },
      {
        sous_titre: "Les alternatives pratiques",
        texte: "Le verre est l'alternative la plus sûre pour le stockage et le réchauffage des aliments — il est inerte, ne migre rien et se lave facilement. L'inox alimentaire est idéal pour les gourdes, les boîtes repas et les ustensiles de cuisine. La cire d'abeille (wraps) remplace avantageusement le film alimentaire pour couvrir les aliments froids. Le papier sulfurisé et le papier d'aluminium sont des alternatives pour les cuissons. La silicone alimentaire de qualité (sans charge) est généralement considérée comme sûre pour la cuisson."
      },
      {
        sous_titre: "Les microplastiques : une menace émergente",
        texte: "Les microplastiques sont des fragments de plastique de moins de 5mm résultant de la dégradation des plastiques dans l'environnement. Ils ont été retrouvés dans l'eau du robinet, les eaux embouteillées, le sel marin, le miel, les fruits de mer et même dans le sang et les poumons humains. Leurs effets sur la santé sont encore à l'étude mais préoccupants. Pour les limiter : filtrez votre eau du robinet, réduisez votre consommation de plastiques à usage unique et choisissez des aliments peu transformés avec peu d'emballages."
      }
    ]
  },
  {
    id: 28,
    titre: "Viandes rouges et charcuteries : trouver le bon équilibre",
    pilier: "Nutrition",
    emoji: "🥩",
    resume: "Pourquoi limiter la viande rouge et la charcuterie, et comment trouver le bon équilibre sans se priver.",
    contenu: [
      {
        sous_titre: "Quelle quantité de viande rouge par semaine ?",
        texte: "Les recommandations nutritionnelles actuelles préconisent de limiter la consommation de viande rouge à 300g maximum par semaine, soit environ 2 à 3 portions. La viande rouge englobe le bœuf, le veau, le porc, l'agneau, le mouton et le cheval. Au-delà de cette quantité, le risque de cancer colorectal augmente de façon significative selon les études épidémiologiques. Cela ne signifie pas qu'il faut supprimer la viande rouge — elle reste une excellente source de protéines, de fer héminique (très bien absorbé) et de zinc — mais la consommer de façon raisonnée."
      },
      {
        sous_titre: "Et pour la charcuterie ?",
        texte: "La charcuterie (jambon, saucisson, lardons, bacon, rillettes, pâté…) est encore plus limitée — 150g maximum par semaine est la recommandation. Contrairement à la viande rouge, la charcuterie est classée cancérogène certain (groupe 1) par le Centre International de Recherche sur le Cancer, principalement en raison des nitrites utilisés comme conservateurs et du processus de transformation. Préférez les charcuteries sans nitrites ajoutés, de plus en plus disponibles en grande surface et chez les artisans bouchers."
      },
      {
        sous_titre: "Pourquoi ces limites ?",
        texte: "La cuisson à haute température de la viande rouge (grillades, fritures) produit des composés potentiellement cancérogènes comme les amines hétérocycliques et les hydrocarbures aromatiques polycycliques. Les modes de cuisson plus doux — mijotage, cuisson à la vapeur, four à basse température — sont préférables. Par ailleurs, un excès de viande rouge est associé à un risque accru de maladies cardiovasculaires, notamment en raison de sa teneur en graisses saturées."
      },
      {
        sous_titre: "Par quoi remplacer la viande rouge ?",
        texte: "Les jours sans viande rouge, privilégiez les volailles (poulet, dinde, canard), les poissons et fruits de mer, les œufs et les légumineuses. Ces alternatives apportent des protéines de qualité avec un profil nutritionnel souvent plus favorable. Les légumineuses associées à des céréales complètes fournissent tous les acides aminés essentiels et sont excellentes pour le microbiote intestinal. Alterner les sources de protéines est la meilleure stratégie pour une alimentation à la fois saine, variée et plaisante."
      },
      {
        sous_titre: "Comment s'organiser concrètement ?",
        texte: "Une façon simple de respecter ces recommandations : planifiez 2 repas avec viande rouge par semaine maximum (ex: bœuf le mardi, agneau le samedi), 2 repas avec poisson, 2 repas avec volaille ou œufs, et 1 repas végétarien avec légumineuses. Pour la charcuterie, réservez-la aux occasions plutôt qu'au quotidien — une tranche de jambon dans un sandwich de temps en temps ne pose aucun problème dans le cadre d'une alimentation globalement équilibrée."
      }
    ]
  },
  {
    id: 29,
    titre: "Alcool et tabac : ce que la science dit vraiment",
    pilier: "Nutrition",
    emoji: "🚭",
    resume: "Les effets réels de l'alcool et du tabac sur la santé.",
    contenu: [
      {
        sous_titre: "L'alcool : pas de dose sans risque",
        texte: "Contrairement à une idée longtemps répandue, il n'existe pas de dose d'alcool sans risque pour la santé. Les études récentes, notamment une méta-analyse publiée dans The Lancet portant sur 195 pays, concluent que la dose la plus sûre est zéro. L'alcool est classé cancérogène certain (groupe 1) par le CIRC et est associé à plus de 200 maladies et traumatismes. En France, Santé Publique France recommande de ne pas dépasser 10 verres standard par semaine, pas plus de 2 par jour, et d'avoir au moins 2 jours sans alcool par semaine."
      },
      {
        sous_titre: "Les effets de l'alcool sur le corps",
        texte: "L'alcool perturbe le sommeil en supprimant le sommeil paradoxal — il peut faciliter l'endormissement mais dégrade significativement la qualité de la nuit. Il altère la mémoire et la concentration dès des doses modérées. Il est très calorique (7 kcal/g) et favorise la prise de poids. Sur le long terme, une consommation régulière même modérée augmente le risque de cancers (bouche, gorge, œsophage, sein, foie, côlon), de maladies cardiovasculaires, de troubles hépatiques et de dépendance."
      },
      {
        sous_titre: "Le tabac : le premier facteur de mortalité évitable",
        texte: "Le tabac est la première cause de mortalité évitable en France, responsable de 75 000 décès par an. Il contient plus de 70 substances cancérogènes et est impliqué dans les cancers du poumon, de la bouche, de la gorge, de la vessie, du pancréas et du col de l'utérus, entre autres. Il multiplie par 10 à 15 le risque de cancer du poumon et par 2 à 4 le risque de maladies cardiovasculaires. Il n'existe pas de niveau de consommation de tabac sans risque — même fumer occasionnellement présente des risques significatifs."
      },
      {
        sous_titre: "Le tabac et le corps au quotidien",
        texte: "Au-delà des maladies chroniques, le tabac a des effets immédiats sur la qualité de vie : il réduit les capacités respiratoires et sportives, accélère le vieillissement cutané, dégrade la qualité du sommeil, altère le goût et l'odorat, et nuit à la fertilité. Il aggrave également l'anxiété sur le long terme — contrairement à l'impression de soulagement que procure une cigarette, la nicotine entretient le cycle de dépendance qui génère lui-même le stress."
      },
      {
        sous_titre: "Arrêter : des aides efficaces existent",
        texte: "Arrêter de fumer est le geste de santé le plus impactant qu'un fumeur puisse faire, à tout âge. Les substituts nicotiniques (patchs, gommes, inhaleurs) sont remboursés par l'Assurance Maladie jusqu'à 150€ par an. La varénicline (Champix) et le bupropion sont des médicaments efficaces sur prescription. Les thérapies cognitivo-comportementales (TCC) améliorent significativement les chances de succès. La ligne Tabac Info Service (3989) propose un accompagnement gratuit. Pour l'alcool, si vous ressentez une dépendance, parlez-en à votre médecin sans attendre — des traitements efficaces existent."
      }
    ]
  },
  {
    id: 30,
    titre: "L'addiction au sucre : comprendre et s'en libérer",
    pilier: "Nutrition",
    emoji: "🍬",
    resume: "Pourquoi on est accro aux produits sucrés, comment ça fonctionne dans le cerveau et comment s'en sortir.",
    contenu: [
      {
        sous_titre: "Le sucre active le circuit de la récompense",
        texte: "L'attraction pour les aliments sucrés n'est pas une question de volonté — c'est une réponse neurobiologique. Consommer du sucre stimule la libération de dopamine dans le noyau accumbens, la zone du cerveau impliquée dans le plaisir et la récompense. Ce mécanisme est identique à celui activé par certaines drogues. Avec une consommation régulière de produits sucrés, le cerveau s'adapte en réduisant sa sensibilité à la dopamine — ce qui pousse à consommer de plus en plus pour obtenir le même effet de satisfaction."
      },
      {
        sous_titre: "Le vrai problème : les produits sucrés ultra-transformés",
        texte: "Il est important de distinguer le sucre naturellement présent dans les fruits, les légumes et les produits laitiers — qui s'accompagne de fibres, vitamines et minéraux — des sucres ajoutés dans les produits industriels. Ces derniers sont souvent associés à des graisses, des arômes artificiels et des textures conçues pour maximiser le plaisir et minimiser la satiété. C'est cette combinaison — sucre + gras + sel + arômes — qui crée l'effet addictif des produits ultra-transformés, bien plus que le sucre seul."
      },
      {
        sous_titre: "Les signes d'une dépendance aux produits sucrés",
        texte: "Vous pourriez être en situation de dépendance si vous ressentez des fringales intenses et incontrôlables pour les produits sucrés, si vous mangez des produits sucrés même sans faim ou en sachant que vous ne devriez pas, si vous ressentez de la culpabilité après avoir consommé mais recommencez quand même, si vous avez des difficultés à vous arrêter une fois que vous avez commencé, ou si vous ressentez de l'irritabilité ou de l'anxiété quand vous n'avez pas accès à ces aliments."
      },
      {
        sous_titre: "Pourquoi les régimes stricts ne fonctionnent pas",
        texte: "Supprimer brutalement tous les produits sucrés crée un effet de privation qui augmente les fringales et mène souvent à des épisodes de surconsommation. Le cerveau interprète la restriction comme une menace et renforce le désir pour les aliments interdits. Une approche progressive et bienveillante est bien plus efficace sur le long terme. L'objectif n'est pas la perfection mais de réduire progressivement la fréquence et la quantité tout en se permettant des plaisirs occasionnels sans culpabilité."
      },
      {
        sous_titre: "Des stratégies concrètes pour réduire progressivement",
        texte: "Commencez par identifier vos déclencheurs — stress, ennui, fatigue, habitudes sociales — et trouvez des alternatives pour chacun. Réduisez progressivement le sucre dans votre café ou thé sur plusieurs semaines. Remplacez les produits sucrés industriels par des alternatives moins transformées : fruits frais, dattes, chocolat noir à plus de 70%. Mangez suffisamment de protéines et de bonnes graisses à chaque repas pour stabiliser la glycémie et réduire les fringales. Dormez suffisamment — le manque de sommeil augmente significativement les envies de sucre en stimulant la ghréline, l'hormone de l'appétit."
      }
    ]
  }
];

function Article({ article, onRetour }) {
  return (
    <div className="article-wrap">
      <button className="fiche-retour" onClick={onRetour}>← Retour</button>
      <div className={`fiche-pilier-badge ${article.pilier.toLowerCase()}`}>{article.pilier}</div>
      <div className="article-emoji">{article.emoji}</div>
      <h2 className="fiche-titre">{article.titre}</h2>
      <p className="article-resume">{article.resume}</p>
      {article.contenu.map((section, i) => (
        <div key={i} className="article-section">
          <h3 className="article-section-titre">{section.sous_titre}</h3>
          <p className="article-section-texte">{section.texte}</p>
        </div>
      ))}
    </div>
  );
}

function Ressources() {
  console.log("articles:", articles);
  const [articleActif, setArticleActif] = useState(null);
  const [pilierActif, setPilierActif] = useState("Tous");

  const PILIERS = ["Tous", "Nutrition", "Stress", "Mouvement", "Sommeil", "Environnement"];

  const articlesFiltres = articles.filter(a =>
    pilierActif === "Tous" || a.pilier === pilierActif
  );

  if (articleActif) {
    return <Article article={articleActif} onRetour={() => setArticleActif(null)} />;
  }

  return (
    <div className="ressources-wrap">
      <h2 className="ressources-titre" style={{ textAlign: 'center' }}>Ressources💡</h2>
      <p className="ressources-sous-titre" style={{ textAlign: 'center' }}>Retrouve ici des articles détaillés utiles au quotidien</p>

      <div className="piliers-filtres" style={{ marginBottom: '1.2rem' }}>
        {PILIERS.map(p => (
          <button
            key={p}
            className={`pilier-btn ${p.toLowerCase()} ${pilierActif === p ? 'actif' : ''}`}
            onClick={() => setPilierActif(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="ressources-liste">
        {articlesFiltres.map(a => (
          <div key={a.id} className="ressource-card" onClick={() => setArticleActif(a)}>
            <div className="ressource-card-emoji">{a.emoji}</div>
            <div className="ressource-card-body">
              <div className={`fiche-pilier-badge ${a.pilier.toLowerCase()}`} style={{ marginBottom: 6 }}>{a.pilier}</div>
              <div className="ressource-card-titre">{a.titre}</div>
              <div className="ressource-card-resume">{a.resume}</div>
            </div>
            <span className="accueil-card-arrow">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ressources;