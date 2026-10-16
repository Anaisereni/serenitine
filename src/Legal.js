import React, { useState } from 'react';
import { AlertTriangle, Lock, ClipboardList, FileText } from 'lucide-react';

const sections = [
  {
    id: 1,
    titre: "Disclaimer santé",
    Icon: AlertTriangle,
    contenu: [
      { sous_titre: "Avertissement important", texte: "Les informations et contenus proposés par l'application Sérénitine sont fournis à titre purement éducatif et informatif. Ils ne constituent en aucun cas un avis médical, un diagnostic ou une prescription thérapeutique." },
      { sous_titre: "Pas de substitution médicale", texte: "L'application Sérénitine ne remplace pas une consultation médicale, un suivi par un professionnel de santé ou un traitement prescrit. En cas de doute sur votre état de santé, de symptômes persistants ou de pathologie connue, consultez toujours un médecin ou un professionnel de santé qualifié." },
      { sous_titre: "Responsabilité de l'utilisateur", texte: "L'utilisateur est seul responsable de l'usage qu'il fait des informations disponibles dans l'application. Les routines et conseils proposés sont destinés à des personnes en bonne santé générale. Toute personne souffrant d'une pathologie chronique, en cours de traitement médical ou présentant des contre-indications doit adapter les recommandations en accord avec son médecin." },
      { sous_titre: "Expertise de l'auteure", texte: "Le contenu de l'application a été élaboré par Anaïs PATA, masseur-kinésithérapeute diplômée d'État et formée en nutrition. Ce contenu reflète les connaissances scientifiques disponibles au moment de sa rédaction et peut évoluer avec les avancées de la recherche." }
    ]
  },
  {
  id: 2,
  titre: "Politique de confidentialité",
  Icon: Lock,
  contenu: [
    {
      sous_titre: "Responsable de l’application",
      texte: "Sérénitine est éditée par Anaïs PATA. Pour toute question concernant vos données ou cette politique de confidentialité, vous pouvez écrire à contact@serenitineapp.fr. Dernière mise à jour : 16 octobre 2026."
    },
    {
      sous_titre: "Une utilisation sans compte",
      texte: "L’application ne nécessite pas de compte utilisateur. Aucun nom complet, email ou numéro de téléphone ne vous est demandé pour utiliser les routines et les outils. Un prénom peut être renseigné facultativement pour personnaliser votre accueil."
    },
    {
      sous_titre: "Les informations enregistrées sur votre appareil",
      texte: "Selon les fonctionnalités utilisées, Sérénitine enregistre localement votre prénom facultatif, vos routines cochées, vos historiques et statistiques de progression, vos humeurs, les articles cochés dans la liste de courses, vos informations et notes sur le sommeil, vos pensées et actions liées au stress, votre programme d’activité physique et vos notes libres. Vos choix d’onglets et de filtres sont également mémorisés."
    },
    {
      sous_titre: "À quoi servent ces informations ?",
      texte: "Ces informations permettent de retrouver vos saisies, de suivre vos habitudes et de personnaliser votre navigation. Elles sont enregistrées dans le stockage local de votre navigateur (localStorage). Certaines informations temporaires de navigation, comme la position dans la liste des articles, utilisent le sessionStorage. Aucune synchronisation entre appareils ni sauvegarde de ces saisies sur un serveur n’est proposée. Dans le fonctionnement actuel de l’application, elles ne sont pas transmises à l’éditrice, à Cloudflare Web Analytics ou aux partenaires commerciaux."
    },
    {
      sous_titre: "Conservation et suppression des saisies",
      texte: "Les informations du localStorage n’ont pas de date d’expiration automatique définie par l’application : elles restent disponibles jusqu’à leur suppression ou leur effacement par le navigateur. Vous pouvez modifier les saisies depuis les outils concernés et supprimer les données persistantes de Sérénitine avec le bouton « Réinitialiser mes données » dans Profil. Les données temporaires du sessionStorage sont normalement effacées à la fin de la session du navigateur. Vous pouvez également effacer les données du site depuis les paramètres de votre navigateur. La suppression est définitive en l’absence de sauvegarde."
    },
    {
      sous_titre: "Confidentialité sur un appareil partagé",
      texte: "Les informations locales ne sont pas protégées par un compte ou un mot de passe propre à Sérénitine. Une personne ayant accès à votre appareil et à votre navigateur peut donc potentiellement les consulter. Certains textes libres peuvent contenir des informations sensibles : limitez-vous aux renseignements utiles et évitez d’y inscrire des informations identifiantes concernant d’autres personnes."
    },
    {
      sous_titre: "Mesure d’audience avec Cloudflare Web Analytics",
      texte: "Sérénitine utilise Cloudflare Web Analytics pour comprendre la fréquentation et les performances de l’application. Selon sa documentation, ce service n’utilise pas de cookies ou de stockage local pour mesurer l’audience et ne recourt pas à l’empreinte numérique pour suivre les visiteurs. Les statistiques concernent notamment les visites, les pages consultées et les performances de chargement. Les textes saisis dans les outils et votre prénom ne sont pas envoyés à ce service par l’application."
    },
    {
      sous_titre: "Hébergement et données techniques",
      texte: "L’application est hébergée et distribuée par Cloudflare. Lors de votre connexion, des données techniques, notamment l’adresse IP et des informations sur les requêtes, peuvent être traitées pour fournir le service et assurer sa sécurité. Ces traitements sont distincts des saisies conservées sur votre appareil. Cloudflare est une entreprise américaine et peut traiter des données dans les pays où elle exerce ses activités, selon les garanties décrites dans sa documentation. Sa politique de confidentialité est accessible à l’adresse https://www.cloudflare.com/policies/privacy/."
    },
    {
      sous_titre: "Cookies et stockage du navigateur",
      texte: "Sérénitine n’intègre actuellement aucune publicité ni outil de suivi publicitaire. Le stockage local utilisé par ses fonctionnalités sert à conserver vos saisies et vos préférences. Le service Cloudflare Web Analytics ne dépose pas de cookies de mesure d’audience selon sa documentation. Des mécanismes techniques liés à la sécurité de l’hébergement peuvent dépendre de la configuration de Cloudflare."
    },
    {
      sous_titre: "Liens externes, affiliations et Doctolib",
      texte: "L’application contient des liens vers des sites externes, notamment Doctolib et des marchands. Certains liens affiliés comportent un identifiant permettant d’attribuer une visite ou un achat à Sérénitine. Ils ne contiennent pas vos notes, votre humeur, votre prénom ou votre historique de routines. Lorsque vous ouvrez un site externe, celui-ci peut traiter des données de connexion et utiliser ses propres cookies ou traceurs conformément à sa politique et à vos choix. Les informations renseignées pour prendre rendez-vous sur Doctolib relèvent du parcours de réservation et de ses propres règles de confidentialité."
    },
    {
  sous_titre: "Contact par email",
  texte: "Lorsque vous écrivez à contact@serenitineapp.fr, votre adresse email, le contenu de votre message et les éventuelles pièces jointes sont traités pour répondre à votre demande. La messagerie est fournie par OVHcloud et consultée via Zimbra. Ces échanges ne donnent pas accès aux informations enregistrées localement dans votre application. Évitez de transmettre des informations médicales détaillées par ce moyen. Les échanges concernant une consultation, la facturation ou un litige font l’objet d’une gestion distincte. Les échanges sont conservés pendant le temps nécessaire au traitement de votre demande et à son suivi. Une conservation supplémentaire peut être nécessaire pour respecter une obligation légale ou pour la gestion d’un litige."
},
{
  sous_titre: "Bases légales",
  texte: "La gestion des demandes générales reçues par email repose sur l’intérêt légitime de l’éditrice à répondre aux utilisateurs. Les traitements techniques nécessaires à la sécurité et au bon fonctionnement du site reposent sur l’intérêt légitime à fournir et protéger l’application. Les demandes liées à une consultation ou à une obligation légale relèvent des bases légales propres à ces démarches."
},
{
  sous_titre: "Statistiques et journaux techniques",
  texte: "Cloudflare Web Analytics permet à l’éditrice de consulter les statistiques des six derniers mois. Cette période de consultation ne correspond pas nécessairement à la durée de conservation de toutes les données techniques de Cloudflare. La journalisation facultative Workers Observability est actuellement désactivée pour Sérénitine. Les traitements techniques liés à l’hébergement et à la sécurité sont décrits dans la politique de confidentialité de Cloudflare : https://www.cloudflare.com/privacypolicy/."
},
    {
      sous_titre: "Vos droits et votre contact",
      texte: "Vous pouvez consulter et modifier vos saisies directement dans l’application et les supprimer comme indiqué ci-dessus. L’éditrice ne peut pas récupérer à distance les informations présentes uniquement sur votre appareil. Pour les traitements de données personnelles relevant de sa responsabilité, vous pouvez demander l’exercice des droits applicables à votre situation en écrivant à contact@serenitineapp.fr. Vous pouvez également adresser une réclamation à la CNIL sur www.cnil.fr."
    }
  ]
},
  {
    id: 3,
    titre: "Mentions légales",
    Icon: ClipboardList,
    contenu: [
      { sous_titre: "Éditeur de l'application", texte: "Nom : Anaïs PATA\nQualité : Masseur-kinésithérapeute diplômée d'État, formée en nutrition\nVille d'exercice : Reims\nNuméro RPPS : 10102113585\nEmail de contact : contact@serenitineapp.fr" },
      { sous_titre: "Hébergement", texte: "L'application Sérénitine est hébergée par Cloudflare, Inc., 101 Townsend St, San Francisco, California 94107, États-Unis. Site web : cloudflare.com" },
      { sous_titre: "Propriété intellectuelle", texte: "L'ensemble du contenu de l'application Sérénitine est protégé par le droit d'auteur et appartient à Anaïs PATA. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable." },
      { sous_titre: "Droit applicable", texte: "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents." }
    ]
  },
  {
    id: 4,
    titre: "Conditions générales d'utilisation",
    Icon: FileText,
    contenu: [
      { sous_titre: "Acceptation des conditions", texte: "L'utilisation de l'application Sérénitine implique l'acceptation pleine et entière des présentes conditions générales d'utilisation. Ces conditions peuvent être modifiées à tout moment." },
      { sous_titre: "Accès à l'application", texte: "L'application Sérénitine est accessible gratuitement à tout utilisateur disposant d'un accès internet. Tous les frais nécessaires à l'accès sont à la charge de l'utilisateur." },
      { sous_titre: "Utilisation", texte: "L'utilisateur s'engage à utiliser l'application de manière conforme à sa destination. Il s'engage notamment à ne pas utiliser l'application à des fins commerciales et à ne pas reproduire son contenu sans autorisation." },
      { sous_titre: "Limitation de responsabilité", texte: "L'éditeur de l'application ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de l'application. L'application est fournie en l'état sans garantie d'aucune sorte." },
      { sous_titre: "Modification et évolution", texte: "L'éditeur se réserve le droit de modifier, suspendre ou interrompre l'application à tout moment sans préavis. Le contenu peut être mis à jour régulièrement pour refléter les dernières recommandations scientifiques." },
      { sous_titre: "Liens affiliés", texte: "Certains liens présents dans l'application Sérénitine peuvent être des liens affiliés. Cela signifie que si vous effectuez un achat via ces liens, Sérénitine peut percevoir une commission de la part du marchand, sans aucun surcoût pour vous. Les produits recommandés sont sélectionnés pour leur qualité et leur cohérence avec les valeurs de l'application. Les liens affiliés sont clairement identifiés dans la section Outils de l'application." },
    ]
  }
];

const STYLE_LEGAL = `
.legal-page {
  color: #5c5045;
}

.legal-liste {
  display: grid;
  gap: 12px;
}

.legal-carte {
  display: flex;
  align-items: center;
  gap: 14px;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background: #faf6ee;
  border: 1px solid #e8dece;
  border-radius: 22px;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.legal-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e8eff4;
  color: #526f84;
}

.legal-carte-titre {
  flex: 1;
  color: #5c3d2e;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
}

.legal-fleche {
  color: #92765b;
}

.legal-retour {
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

.legal-introduction {
  padding: 24px 20px;
  margin-bottom: 20px;
  background: #faf6ee;
  border: 1px solid #e8dece;
  border-radius: 22px;
}

.legal-introduction h2 {
  margin: 16px 0 0;
  color: #5c3d2e;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
}

.legal-section {
  padding: 22px;
  margin-bottom: 14px;
  background: #fffdf9;
  border: 1px solid #e8dece;
  border-radius: 20px;
}

.legal-section h3 {
  margin: 0 0 12px;
  color: #5c3d2e;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
}

.legal-section p {
  margin: 0;
  color: #635b52;
  font-size: 14px;
  line-height: 1.9;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.legal-page button:focus-visible {
  outline: 3px solid #526f84;
  outline-offset: 3px;
}

@media (max-width: 380px) {
  .legal-carte,
  .legal-section {
    padding: 18px;
  }

  .legal-introduction h2 {
    font-size: 21px;
  }
}
`;

function SectionLegal({ section, onRetour }) {
  return (
    <div className="legal-page" style={{ padding: '1rem' }}>
      <style>{STYLE_LEGAL}</style>

      <button
        type="button"
        className="legal-retour"
        onClick={onRetour}
      >
        ← Retour aux informations légales
      </button>

      <article>
        <header className="legal-introduction">
          <span className="legal-icone" aria-hidden="true">
            <section.Icon size={24} strokeWidth={1.6} />
          </span>
          <h2>{section.titre}</h2>
        </header>

        {section.contenu.map((s, i) => (
          <section key={i} className="legal-section">
            <h3>{s.sous_titre}</h3>
            <p>{s.texte}</p>
          </section>
        ))}
      </article>

      <button
        type="button"
        className="legal-retour"
        onClick={onRetour}
      >
        ← Retour aux informations légales
      </button>
    </div>
  );
}

function Legal() {
  const [sectionActive, setSectionActive] = useState(null);

  const changerSection = (section) => {
    setSectionActive(section);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  };

  if (sectionActive) {
    return (
      <SectionLegal
        section={sectionActive}
        onRetour={() => changerSection(null)}
      />
    );
  }

  return (
    <div className="ressources-wrap legal-page">
      <style>{STYLE_LEGAL}</style>

      <div className="entete-onglet">
        <h2 className="entete-onglet__titre">
          <Lock size={21} />
          Informations légales
        </h2>

        <p className="entete-onglet__description">
          Transparence et protection de vos données
        </p>
      </div>

      <div className="legal-liste">
        {sections.map(s => (
          <button
            key={s.id}
            type="button"
            className="legal-carte"
            onClick={() => changerSection(s)}
          >
            <span className="legal-icone" aria-hidden="true">
              <s.Icon size={22} strokeWidth={1.6} />
            </span>

            <span className="legal-carte-titre">
              {s.titre}
            </span>

            <span className="legal-fleche" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Legal;