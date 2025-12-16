/**
 * AppConfig
 * ---------
 * Rôle : centraliser les constantes de l’application,
 * notamment les sélecteurs CSS utilisés par l’interface.
 */
const AppConfig = {
  SELECTORS: {
    form: '#quizForm',              // Formulaire principal
    resultBox: '#resultBox',        // Boîte de résultats
    scoreText: '#scoreText',        // Texte affichant le score
    scoreBar: '#scoreBar',          // Barre de progression du score
    btnCheck: '#btnCheck',          // Bouton "Vérifier"
    btnReset: '#btnReset',          // Bouton "Réinitialiser"

    // Panneau d'aide / explications
    btnHelp: '#btnHelp',            // Bouton "Explications"
    helpOverlay: '#helpOverlay',    // Overlay d'aide
    btnHelpClose: '#btnHelpClose',  // Bouton de fermeture de l'overlay
    btnHelpOk: '#btnHelpOk',        // Bouton "OK" de l'overlay
  }
};
