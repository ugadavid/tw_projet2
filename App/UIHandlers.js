/**
 * UIHandlers
 * ----------
 * Rôle : gérer uniquement les interactions avec l’interface utilisateur (DOM).
 * - mise en cache des sélecteurs jQuery
 * - écoute des événements (input, clics, clavier)
 * - délégation de la logique métier au QuizManager
 */
class UIHandlers {
  /**
   * Constructeur
   * @param {Object} app - Référence à l’application principale (AppMain)
   */
  constructor(app) {
    this.app = app;

    $(document).ready(() => {
      this.ui = this._cacheSelectors(AppConfig.SELECTORS);
      this.bindEvents();
    });
  }

  /**
   * Met en cache les sélecteurs jQuery définis dans AppConfig
   * afin d’éviter des appels répétés au DOM
   * @param {Object} selectors - Dictionnaire { clé: sélecteur CSS }
   * @returns {Object} - Dictionnaire { clé: élément jQuery }
   */
  _cacheSelectors(selectors) {
    const elements = {};
    for (const key in selectors) elements[key] = $(selectors[key]);
    return elements;
  }

  /**
   * Branche l’ensemble des événements de l’interface :
   * - progression automatique des questions
   * - affichage des bonnes réponses
   * - vérification du questionnaire
   * - réinitialisation
   * - ouverture / fermeture du panneau d’explications
   */
  bindEvents() {
    const ui = this.ui;

    // Progression
    ui.form.on('input change', 'input', (e) => {
      const $q = $(e.target).closest('section[data-qid]');
      const qid = Number($q.data('qid'));
      if (this.app.manager.isAnswered($q)) this.app.manager.revealNext(qid);
    });

    // Voir la bonne réponse
    ui.form.on('click', '.btn-show-answer', (e) => {
      const $btn = $(e.currentTarget);
      const $q = $btn.closest('section[data-qid]');
      this.app.manager.showAnswer($q, $btn.data('answer'));
    });

    // Vérifier
    ui.btnCheck.on('click', () => {
      const r = this.app.manager.checkAll();
      ui.resultBox.removeClass('d-none');
      ui.scoreText.text(`${r.earnedTotal} point(s) sur ${r.maxTotal} (${r.percent}%)`);
      ui.scoreBar.css('width', r.percent + '%').text(r.percent + '%').attr('aria-valuenow', r.percent);
    });

    // Reset
    ui.btnReset.on('click', () => {
      ui.resultBox.addClass('d-none');
      ui.scoreBar.css('width', '0%').text('0%');
      ui.scoreText.text('—');
      this.app.manager.reset();
    });

    // Help overlay
    ui.btnHelp.on('click', () => this.openHelp());
    ui.btnHelpClose.on('click', () => this.closeHelp());
    ui.btnHelpOk.on('click', () => this.closeHelp());

    ui.helpOverlay.on('click', (e) => {
      if (e.target === ui.helpOverlay[0]) this.closeHelp();
    });

    $(document).on('keydown', (e) => {
      if (e.key === 'Escape') this.closeHelp();
    });
  }

  /**
   * Ouvre le panneau d’explications (overlay)
   * et met à jour les attributs d’accessibilité
   */
  openHelp() {
    this.ui.helpOverlay.removeClass('d-none').attr('aria-hidden', 'false');
  }

  /**
   * Ferme le panneau d’explications (overlay)
   * et met à jour les attributs d’accessibilité
   */
  closeHelp() {
    this.ui.helpOverlay.addClass('d-none').attr('aria-hidden', 'true');
  }
}
