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
      { sous_titre: "Données collectées", texte: "L'application Sérénitine ne collecte aucune donnée personnelle identifiable. Aucun nom, email, numéro de téléphone ou information de localisation n'est collecté, transmis ou stocké sur des serveurs externes." },
      { sous_titre: "Stockage local", texte: "Les seules données enregistrées sont vos préférences d'utilisation (prénom optionnel, routines cochées, statistiques de progression) et elles sont stockées exclusivement sur votre appareil via le localStorage de votre navigateur. Ces données ne quittent jamais votre appareil et ne sont accessibles par aucun tiers." },
      { sous_titre: "Cookies", texte: "L'application Sérénitine n'utilise pas de cookies de traçage, de publicité ou d'analyse comportementale. Aucun outil de tracking tiers (Google Analytics, Facebook Pixel…) n'est intégré à l'application." },
      { sous_titre: "Vos droits RGPD", texte: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez supprimer l'intégralité de vos données à tout moment en utilisant le bouton Réinitialiser mes données disponible dans l'onglet Profil." },
      { sous_titre: "Contact", texte: "Pour toute question relative à la confidentialité de vos données, vous pouvez nous contacter à l'adresse suivante : contact@serenitineapp.fr" }
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
      { sous_titre: "Modification et évolution", texte: "L'éditeur se réserve le droit de modifier, suspendre ou interrompre l'application à tout moment sans préavis. Le contenu peut être mis à jour régulièrement pour refléter les dernières recommandations scientifiques." }
    ]
  }
];

function SectionLegal({ section, onRetour }) {
  return (
    <div className="article-wrap">
      <button className="fiche-retour" onClick={onRetour}>← Retour</button>
      <div className="article-emoji"><section.Icon size={40} /></div>
      <h2 className="fiche-titre">{section.titre}</h2>
      {section.contenu.map((s, i) => (
        <div key={i} className="article-section">
          <h3 className="article-section-titre">{s.sous_titre}</h3>
          <p className="article-section-texte" style={{ whiteSpace: 'pre-line' }}>{s.texte}</p>
        </div>
      ))}
    </div>
  );
}

function Legal() {
  const [sectionActive, setSectionActive] = useState(null);

  if (sectionActive) {
    return <SectionLegal section={sectionActive} onRetour={() => setSectionActive(null)} />;
  }

  return (
    <div className="ressources-wrap">
      <h2 className="ressources-titre">Informations légales</h2>
      <p className="ressources-sous-titre">Transparence et protection de vos données</p>
      <div className="ressources-liste">
        {sections.map(s => (
          <div key={s.id} className="ressource-card" onClick={() => setSectionActive(s)}>
            <div className="ressource-card-emoji"><s.Icon size={24} /></div>
            <div className="ressource-card-body">
              <div className="ressource-card-titre">{s.titre}</div>
            </div>
            <span className="accueil-card-arrow">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Legal;