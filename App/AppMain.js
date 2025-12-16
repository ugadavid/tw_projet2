/**
 * AppMain
 * -------
 * Point d’entrée unique de l’application.
 * - instancie le gestionnaire métier (QuizManager)
 * - instancie le gestionnaire d’interface (UIHandlers)
 * Le chargement est effectué après le DOM Ready.
 */
class AppMain {

  /**
   * Constructeur
   * Initialise les différents modules de l’application
   * et leur fournit une référence commune.
   */
  constructor() {
    this.manager = new QuizManager(this);
    this.ui = new UIHandlers(this);
  }
}

/**
 * Initialisation de l’application
 * Appelé une fois le DOM entièrement chargé.
 */
$(function() {
  new AppMain();
});
