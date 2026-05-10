import React, { useState, useEffect } from 'react';

function BandeauConsentement() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('consentement_accepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accepter = () => {
    localStorage.setItem('consentement_accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consentement-overlay">
      <div className="consentement-box">
        <div className="consentement-emoji">🔒</div>
        <h3 className="consentement-titre">Vos données sont protégées</h3>
        <p className="consentement-texte">
          L'application Routines ne collecte aucune donnée personnelle. 
          Vos informations (prénom, routines cochées, progression) sont 
          stockées uniquement sur votre appareil et ne sont jamais 
          transmises à des tiers.
        </p>
        <p className="consentement-texte" style={{ marginTop: '8px' }}>
          En utilisant cette application, vous acceptez nos{' '}
          <span 
            className="consentement-lien"
            onClick={() => window.location.href = '/legal'}
          >
            conditions d'utilisation
          </span>.
        </p>
        <button className="consentement-btn" onClick={accepter}>
          J'ai compris ✓
        </button>
      </div>
    </div>
  );
}

export default BandeauConsentement;