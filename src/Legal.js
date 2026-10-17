import React, { useState } from 'react';
import { AlertTriangle, Lock, ClipboardList, FileText } from 'lucide-react';

// Brouillon : renseigner les mentions « À compléter » avant publication de cette version.
const sections = [
  {
    "id": 1,
    "titre": "Disclaimer santé",
    "Icon": AlertTriangle,
    "contenu": [
      {
        "sous_titre": "Avertissement important",
        "texte": "Les informations et contenus proposés par l'application Sérénitine sont fournis à titre purement éducatif et informatif. Ils ne constituent en aucun cas un avis médical, un diagnostic ou une prescription thérapeutique."
      },
      {
        "sous_titre": "Pas de substitution médicale",
        "texte": "L'application Sérénitine ne remplace pas une consultation médicale, un suivi par un professionnel de santé ou un traitement prescrit. En cas de doute sur votre état de santé, de symptômes persistants ou de pathologie connue, consultez toujours un médecin ou un professionnel de santé qualifié."
      },
      {
        "sous_titre": "Utilisation des conseils",
        "texte": "Les conseils et routines sont des repères généraux à adapter à votre situation, à vos capacités et à vos éventuelles contre-indications. En cas de maladie, de traitement ou de doute, demandez conseil à un professionnel de santé. Ne modifiez pas un traitement prescrit sur la seule base des contenus de l’application. Ces précautions n’excluent pas les responsabilités légales de l’éditrice."
      },
      {
        "sous_titre": "Expertise de l'auteure",
        "texte": "Les contenus de Sérénitine sont proposés par Anaïs PATA, masseur-kinésithérapeute et titulaire d’un Diplôme Universitaire en alimentation santé et micronutrition. L’application propose des informations générales sur les habitudes de vie. Elle n’établit pas de diagnostic et ne fournit pas de suivi médical individualisé. Les contenus peuvent être corrigés et mis à jour ; une erreur peut être signalée à contact@serenitineapp.fr."
      }
    ]
  },
  {
    "id": 2,
    "titre": "Politique de confidentialité",
    "Icon": Lock,
    "contenu": [
      {
        "sous_titre": "Responsable de l’application",
        "texte": "Sérénitine est éditée par Anaïs PATA, entrepreneur individuel (EI), responsable des traitements relevant de l’application. Adresse de domiciliation : 12 rue Joliot Curie 51100 Reims. Contact : contact@serenitineapp.fr. Dernière mise à jour : 17 octobre 2026."
      },
      {
        "sous_titre": "Une utilisation sans compte",
        "texte": "L’application ne nécessite pas de compte utilisateur. Aucun nom complet, email ou numéro de téléphone ne vous est demandé pour utiliser les routines et les outils. Un prénom peut être renseigné facultativement pour personnaliser votre accueil."
      },
      {
        "sous_titre": "Les informations enregistrées sur votre appareil",
        "texte": "Selon les fonctionnalités utilisées, Sérénitine enregistre localement votre prénom facultatif, vos routines cochées, vos historiques et statistiques de progression, vos humeurs, les articles cochés dans la liste de courses, vos informations et notes sur le sommeil, vos pensées et actions liées au stress, votre programme d’activité physique et vos notes libres. Vos choix d’onglets et de filtres sont également mémorisés."
      },
      {
        "sous_titre": "À quoi servent ces informations ?",
        "texte": "Ces informations permettent de retrouver vos saisies, de suivre vos habitudes et de personnaliser votre navigation. Elles sont enregistrées dans le stockage local de votre navigateur (localStorage). Certaines informations temporaires de navigation, comme la position dans la liste des articles, utilisent le sessionStorage. Aucune synchronisation entre appareils ni sauvegarde de ces saisies sur un serveur n’est proposée. Dans le fonctionnement actuel de l’application, elles ne sont pas transmises à l’éditrice, à Cloudflare Web Analytics ou aux partenaires commerciaux."
      },
      {
        "sous_titre": "Conservation et suppression des saisies",
        "texte": "Les informations du localStorage n’ont pas de date d’expiration automatique définie par l’application : elles restent disponibles jusqu’à leur suppression ou leur effacement par le navigateur. Vous pouvez modifier les saisies depuis les outils concernés et supprimer les données persistantes de Sérénitine avec le bouton « Réinitialiser mes données » dans Profil. Les données temporaires du sessionStorage sont normalement effacées à la fin de la session du navigateur. Vous pouvez également effacer les données du site depuis les paramètres de votre navigateur. La suppression est définitive en l’absence de sauvegarde."
      },
      {
        "sous_titre": "Export et restauration des données",
        "texte": "Vous pouvez exporter vos données depuis Profil dans un fichier JSON, puis les restaurer sur un autre appareil ou navigateur. La sauvegarde est manuelle et ne se met pas à jour automatiquement. Cette fonction n’envoie pas le fichier à l’éditrice. Le fichier contient notamment les routines, historiques, humeurs, notes, prénom facultatif et préférences enregistrées ; il peut donc contenir des informations sensibles. Il n’est pas chiffré : conservez-le dans un emplacement privé. La restauration remplace les données existantes après confirmation, sans les fusionner. Réinitialiser l’application ne supprime pas les fichiers précédemment téléchargés ni les copies conservées dans d’autres emplacements. Si vous choisissez un service de stockage en ligne pour conserver le fichier, son utilisation relève également des règles de ce service."
      },
      {
        "sous_titre": "Confidentialité sur un appareil partagé",
        "texte": "Les informations locales ne sont pas protégées par un compte ou un mot de passe propre à Sérénitine. Une personne ayant accès à votre appareil et à votre navigateur peut donc potentiellement les consulter. Certains textes libres peuvent contenir des informations sensibles : limitez-vous aux renseignements utiles et évitez d’y inscrire des informations identifiantes concernant d’autres personnes."
      },
      {
        "sous_titre": "Mesure d’audience avec Cloudflare Web Analytics",
        "texte": "Sérénitine utilise Cloudflare Web Analytics pour comprendre la fréquentation et les performances de l’application. Selon sa documentation, ce service n’utilise pas de cookies ou de stockage local pour mesurer l’audience et ne recourt pas à l’empreinte numérique pour suivre les visiteurs. Les statistiques concernent notamment les visites, les pages consultées et les performances de chargement. Les textes saisis dans les outils et votre prénom ne sont pas envoyés à ce service par l’application."
      },
      {
        "sous_titre": "Hébergement et données techniques",
        "texte": "L’application est hébergée et distribuée par Cloudflare. Lors de votre connexion, des données techniques, notamment l’adresse IP et des informations sur les requêtes, peuvent être traitées pour fournir le service et assurer sa sécurité. Ces traitements sont distincts des saisies conservées sur votre appareil. Cloudflare, Inc. est située aux États-Unis et dispose d’une infrastructure internationale. Les catégories de données transférées hors de l’Espace économique européen, les destinataires et les garanties applicables à la configuration de Sérénitine sont à compléter après vérification des services et documents contractuels utilisés. Informations du prestataire : https://www.cloudflare.com/privacypolicy/ et https://www.cloudflare.com/cloudflare-customer-dpa/."
      },
      {
        "sous_titre": "Cookies et stockage du navigateur",
        "texte": "Sérénitine n’intègre actuellement aucune publicité ni outil de suivi publicitaire. Le stockage local utilisé par ses fonctionnalités sert à conserver vos saisies et vos préférences. Le service Cloudflare Web Analytics ne dépose pas de cookies de mesure d’audience selon sa documentation. Des mécanismes techniques liés à la sécurité de l’hébergement peuvent dépendre de la configuration de Cloudflare."
      },
      {
        "sous_titre": "Liens externes, affiliations et Doctolib",
        "texte": "L’application contient des liens vers des sites externes, notamment Doctolib et des marchands. Certains liens affiliés comportent un identifiant permettant d’attribuer une visite ou un achat à Sérénitine. Ils ne contiennent pas vos notes, votre humeur, votre prénom ou votre historique de routines. Lorsque vous ouvrez un site externe, celui-ci peut traiter des données de connexion et utiliser ses propres cookies ou traceurs conformément à sa politique et à vos choix. Les informations renseignées pour prendre rendez-vous sur Doctolib relèvent du parcours de réservation et de ses propres règles de confidentialité."
      },
      {
        "sous_titre": "Contact par email",
        "texte": "Lorsque vous écrivez à contact@serenitineapp.fr, votre adresse email, le contenu de votre message et les éventuelles pièces jointes sont traités pour répondre à votre demande. La messagerie est fournie par OVHcloud et consultée via Zimbra. Ces échanges ne donnent pas accès aux informations enregistrées localement dans votre application. Évitez de transmettre des informations médicales détaillées par ce moyen. Les échanges concernant une consultation, la facturation ou un litige font l’objet d’une gestion distincte. Les échanges sont conservés pendant le temps nécessaire au traitement de votre demande et à son suivi. Une conservation supplémentaire peut être nécessaire pour respecter une obligation légale ou pour la gestion d’un litige."
      },
      {
        "sous_titre": "Bases légales",
        "texte": "La gestion des demandes générales reçues par email repose sur l’intérêt légitime de l’éditrice à répondre aux utilisateurs. Les traitements techniques nécessaires à la sécurité et au bon fonctionnement du site reposent sur l’intérêt légitime à fournir et protéger l’application. L’éditrice doit documenter la nécessité et la proportionnalité de ces traitements. Le fondement juridique et, si nécessaire, la condition applicable aux données sensibles pour les fonctionnalités locales sont à compléter après qualification de ces traitements. Les demandes liées à une consultation ou à une obligation légale relèvent des bases légales propres à ces démarches."
      },
      {
        "sous_titre": "Statistiques et journaux techniques",
        "texte": "Cloudflare Web Analytics permet à l’éditrice de consulter les statistiques des six derniers mois, selon la documentation du service. Cette période de consultation ne décrit pas à elle seule la conservation de toutes les données techniques de Cloudflare. La journalisation facultative Workers Observability est actuellement désactivée pour Sérénitine. Les durées ou critères de conservation des autres données techniques doivent être complétés à partir des services effectivement utilisés et de la documentation contractuelle applicable. Politique du prestataire : https://www.cloudflare.com/privacypolicy/."
      },
      {
        "sous_titre": "Vos droits et votre contact",
        "texte": "Vous pouvez consulter et modifier vos saisies dans l’application, les exporter et les supprimer comme indiqué ci-dessus. L’éditrice ne peut pas récupérer à distance les informations présentes uniquement sur votre appareil. Pour les traitements de données personnelles relevant de sa responsabilité, vous pouvez exercer les droits applicables à votre situation : accès, rectification, effacement, limitation et, selon la base légale, opposition ou portabilité. Lorsqu’un traitement repose sur le consentement, celui-ci peut être retiré sans remettre en cause les traitements antérieurs licites. Adressez votre demande à contact@serenitineapp.fr. Une réponse est apportée dans les délais prévus par le RGPD, en principe un mois ; une prolongation motivée peut être nécessaire dans les cas prévus par ce règlement. Vous pouvez adresser une réclamation à la CNIL sur https://www.cnil.fr/."
      },
      {
        "sous_titre": "Destinataires des données",
        "texte": "Les saisies locales ne sont pas consultables à distance par l’éditrice dans le fonctionnement décrit de l’application. L’éditrice reçoit les messages envoyés à l’adresse de contact. OVHcloud fournit la messagerie et Cloudflare intervient pour l’hébergement, la sécurité et la mesure d’audience, selon les services utilisés. L’accès des prestataires est limité aux données nécessaires à leurs prestations. Les sites externes et marchands traitent les données reçues lors de leur consultation selon leurs propres politiques."
      }
    ]
  },
  {
    "id": 3,
    "titre": "Mentions légales",
    "Icon": ClipboardList,
    "contenu": [
      {
        "sous_titre": "Éditeur de l'application",
        "texte": "Nom : Anaïs PATA — Entrepreneur individuel (EI)\nNom de l’application : Sérénitine\nAdresse de domiciliation de l’entreprise : 12 rue Joliot Curie 51100 Reims\nTéléphone professionnel : 0630984769\nEmail : contact@serenitineapp.fr\nSiren / identification au RNE : 888917234"
      },
      {
        "sous_titre": "Hébergement",
        "texte": "Cloudflare, Inc.\n101 Townsend St, San Francisco, CA 94107, États-Unis\nTéléphone de l’hébergeur : +1 (650) 319-8930\nSite : https://www.cloudflare.com/"
      },
      {
        "sous_titre": "Propriété intellectuelle",
        "texte": "Les éléments originaux de l’application sont protégés par les droits de propriété intellectuelle applicables. Les ressources appartenant à des tiers, notamment certaines icônes, illustrations, polices ou pistes audio, restent soumises aux droits et licences de leurs titulaires. Les utilisations autorisées par la loi et les licences applicables demeurent permises. Pour les autres usages nécessitant une autorisation, contactez contact@serenitineapp.fr."
      },
      {
        "sous_titre": "Droit applicable",
        "texte": "Les présentes conditions sont régies par le droit français, sous réserve des dispositions impératives applicables à l’utilisateur. En cas de difficulté, contactez l’éditrice à contact@serenitineapp.fr pour rechercher une solution amiable. À défaut, les juridictions compétentes sont déterminées conformément aux règles légales applicables."
      },
      {
        "sous_titre": "Directrice de la publication",
        "texte": "Anaïs PATA."
      },
      {
        "sous_titre": "Informations professionnelles",
        "texte": "Titre professionnel : masseur-kinésithérapeute\nNuméro RPPS : 10102113585\nPays de délivrance du titre : France\nOrdre ou organisme professionnel d’inscription : Conseil départemental de l’Ordre des masseurs-kinésithérapeutes de la Marne\nRègles professionnelles applicables : Code de déontologie des masseurs-kinésithérapeutes, intégré au Code de la santé publique.\nSérénitine propose des contenus généraux de bien-être et d’hygiène de vie ; les consultations individuelles constituent un service distinct."
      }
    ]
  },
  {
    "id": 4,
    "titre": "Conditions générales d'utilisation",
    "Icon": FileText,
    "contenu": [
      {
        "sous_titre": "Acceptation des conditions",
        "texte": "Les présentes conditions décrivent les modalités d’utilisation de Sérénitine. Elles sont accessibles dans Informations légales. Leur mise à jour ne peut priver l’utilisateur des droits que lui reconnaît la loi. Dernière mise à jour : 17 octobre 2026."
      },
      {
        "sous_titre": "Accès à l'application",
        "texte": "L'application Sérénitine est accessible gratuitement à tout utilisateur disposant d'un accès internet. Tous les frais nécessaires à l'accès sont à la charge de l'utilisateur."
      },
      {
        "sous_titre": "Utilisation",
        "texte": "L’utilisateur s’engage à ne pas porter atteinte au fonctionnement ou à la sécurité de l’application et à respecter les droits des tiers. Les contenus peuvent être consultés pour un usage personnel, dans le respect des utilisations autorisées par la loi et des licences applicables."
      },
      {
        "sous_titre": "Limitation de responsabilité",
        "texte": "L’éditrice apporte un soin raisonnable au fonctionnement de l’application et à la qualité des informations publiées. Des erreurs ou interruptions peuvent néanmoins survenir. Les contenus sont généraux et ne remplacent pas un avis médical individualisé. Aucune disposition des présentes conditions n’exclut ou ne limite une responsabilité ou une garantie qui ne pourrait légalement être exclue ou limitée."
      },
      {
        "sous_titre": "Modification et évolution",
        "texte": "L’application et ses contenus peuvent évoluer pour des raisons de maintenance, de sécurité, de correction ou d’amélioration. Dans la mesure du possible, les changements importants affectant l’utilisation du service sont annoncés et les interruptions planifiées sont signalées. Certaines interventions urgentes peuvent ne pas permettre de préavis. Les modifications interviennent dans le respect des droits prévus par la loi. Les utilisateurs sont invités à exporter leurs données avant un changement d’appareil ou une opération susceptible d’effacer le stockage local."
      },
      {
        "sous_titre": "Liens affiliés",
        "texte": "Certains liens peuvent être affiliés : si vous effectuez un achat après avoir suivi un tel lien, Sérénitine peut percevoir une commission du marchand, sans surcoût annoncé pour vous. Le caractère affilié est indiqué à proximité des liens concernés. L’existence d’une affiliation ne garantit pas qu’un produit soit adapté à votre situation personnelle. Les achats sont conclus auprès des marchands, selon leurs conditions ; Sérénitine ne réalise pas la vente de ces produits."
      },
      {
        "sous_titre": "Sauvegarde et disponibilité des données",
        "texte": "Les saisies sont conservées sur l’appareil et le navigateur utilisés. Elles ne sont pas automatiquement synchronisées ni sauvegardées sur les serveurs de l’éditrice. Une perte ou un effacement des données du navigateur peut entraîner leur disparition. L’export manuel permet d’en conserver une copie ; il appartient à l’utilisateur de vérifier que le fichier a bien été enregistré et de le conserver de manière confidentielle. La restauration remplace les données présentes et nécessite une confirmation. Ces informations ne limitent pas les responsabilités légales de l’éditrice."
      },
      {
        "sous_titre": "Consultations et services externes",
        "texte": "L’accès gratuit à l’application est distinct des consultations proposées par l’éditrice. La prise de rendez-vous est effectuée sur Doctolib. Les conditions propres à la consultation, notamment son tarif et ses modalités, sont précisées dans le parcours de réservation et les informations du professionnel. Les présentes conditions ne remplacent pas ces informations ni les obligations applicables à la prestation concernée."
      }
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
