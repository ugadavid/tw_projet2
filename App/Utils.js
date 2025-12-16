/**
 * Utils
 * -----
 * Rôle : regrouper des fonctions utilitaires "pures",
 * indépendantes du DOM et réutilisables dans l’application.
 */
const Utils = {
  /**
   * Normalise une chaîne de caractères pour la comparaison :
   * - supprime les espaces en début et fin
   * - ignore la casse
   * - supprime les diacritiques (accents)
   * @param {string} str - Chaîne à normaliser
   * @returns {string}
   */
  normalizeText(str) {
    return String(str || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  },

  /**
   * Calcule le score d’une question à cases à cocher
   * en autorisant un score partiel :
   * - proportion des bonnes réponses cochées
   * - pénalité légère si des réponses incorrectes sont cochées
   * @param {Array<string>} selected - Valeurs cochées par l’utilisateur
   * @param {Array<string>} correctSet - Valeurs correctes attendues
   * @param {number} maxPoints - Nombre de points maximum pour la question
   * @returns {{earned: number, max: number}}
   */
  scoreCheckbox(selected, correctSet, maxPoints) {
    const sel = new Set(selected);
    const correct = new Set(correctSet);

    let good = 0, bad = 0;
    sel.forEach(v => (correct.has(v) ? good++ : bad++));

    const totalCorrect = correct.size;
    let ratio = totalCorrect ? (good / totalCorrect) : 0;

    if (bad > 0) ratio -= Math.min(0.5, bad * 0.25);
    ratio = Math.max(0, Math.min(1, ratio));

    return {
      earned: Math.round(ratio * maxPoints * 100) / 100,
      max: maxPoints
    };
  }
};
