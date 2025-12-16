/**
 * QuizManager
 * -----------
 * Rôle : gérer la logique métier du questionnaire.
 * - progression des questions
 * - validation des réponses
 * - calcul du score
 * - gestion des états visuels (faux / partiel / juste)
 */
class QuizManager {
  /**
   * Constructeur
   * @param {Object} app - Référence à l’application principale (AppMain)
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * Affiche la question suivante dans le questionnaire
   * (utilisé pour la progression progressive)
   * @param {number} qid - Identifiant numérique de la question courante
   */
  revealNext(qid) {
    const $next = $(`[data-qid="${qid + 1}"]`);
    if ($next.length) $next.removeClass('q-hidden');
  }

  /**
   * Vérifie si une question est considérée comme "répondue"
   * selon son type (texte, radio, checkbox)
   * @param {jQuery} $q - Élément jQuery représentant la question
   * @returns {boolean}
   */
  isAnswered($q) {
    const type = $q.data('type');
    const qid = Number($q.data('qid'));

    if (type === 'text') {
      const v = $q.find('input[type="text"]').val();
      return Utils.normalizeText(v).length > 0;
    }
    if (type === 'radio') {
      return $q.find(`input[type="radio"][name="q${qid}"]:checked`).length > 0;
    }
    if (type === 'checkbox') {
      return $q.find(`input[type="checkbox"][name="q${qid}"]:checked`).length > 0;
    }
    return false;
  }

  /**
   * Corrige une question donnée et applique la couleur correspondante
   * (faux / partiel / juste)
   * @param {jQuery} $q - Élément jQuery représentant la question
   * @returns {{earned: number, max: number}} - Points obtenus et points max
   */
  gradeQuestion($q) {
    const type = $q.data('type');
    const qid = Number($q.data('qid'));
    const points = Number($q.data('points') || 1);
    const correctRaw = String($q.data('correct') || '');
    const correctTokens = correctRaw.split(',').map(s => s.trim()).filter(Boolean);

    $q.removeClass('q-wrong q-partial q-correct');

    if (type === 'radio') {
      const v = $q.find(`input[type="radio"][name="q${qid}"]:checked`).val();
      const ok = v && v === correctRaw;
      $q.addClass(ok ? 'q-correct' : 'q-wrong');
      return { earned: ok ? points : 0, max: points };
    }

    if (type === 'text') {
      const v = $q.find('input[type="text"]').val();
      const answers = String($q.data('answers') || '')
        .split(',')
        .map(s => Utils.normalizeText(s));
      const nv = Utils.normalizeText(v);

      const ok = nv && answers.includes(nv);
      $q.addClass(ok ? 'q-correct' : 'q-wrong');
      return { earned: ok ? points : 0, max: points };
    }

    if (type === 'checkbox') {
      const selected = $q.find(`input[type="checkbox"][name="q${qid}"]:checked`)
        .map(function(){ return this.value; })
        .get();

      const scored = Utils.scoreCheckbox(selected, correctTokens, points);
      const ratio = scored.max ? scored.earned / scored.max : 0;

      if (ratio >= 0.999) $q.addClass('q-correct');
      else if (ratio > 0) $q.addClass('q-partial');
      else $q.addClass('q-wrong');

      return scored;
    }

    return { earned: 0, max: points };
  }

  /**
   * Affiche la bonne réponse d’une question dans sa zone dédiée
   * @param {jQuery} $q - Élément jQuery représentant la question
   * @param {string} text - Texte de la bonne réponse
   */
  showAnswer($q, text) {
    const $box = $q.find('.answer-box');
    $box.text('Bonne réponse : ' + text).show();
  }

  /**
   * Corrige l’ensemble du questionnaire
   * - affiche toutes les questions
   * - calcule le score total et le pourcentage
   * @returns {{earnedTotal: number, maxTotal: number, percent: number}}
   */
  checkAll() {
    $('section[data-qid]').removeClass('q-hidden');

    let earnedTotal = 0, maxTotal = 0;
    $('section[data-qid]').each((_, el) => {
      const res = this.gradeQuestion($(el));
      earnedTotal += res.earned;
      maxTotal += res.max;
    });

    const percent = maxTotal ? Math.round((earnedTotal / maxTotal) * 100) : 0;
    return { earnedTotal, maxTotal, percent };
  }

  /**
   * Réinitialise le questionnaire :
   * - formulaire
   * - couleurs
   * - réponses affichées
   * - progression (retour à la question 1)
   */
  reset() {
    $(AppConfig.SELECTORS.form)[0].reset();

    $('section[data-qid]').removeClass('q-wrong q-partial q-correct');
    $('.answer-box').hide().text('');

    $('section[data-qid]').addClass('q-hidden');
    $('[data-qid="1"]').removeClass('q-hidden');
  }
}
