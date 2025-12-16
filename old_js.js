  // ----------------------------
    // Utils (normalisation texte)
    // ----------------------------
    function normalizeText(str) {
      return String(str || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // diacritiques
    }

    // Score checkbox: retourne {earned, max}
    function scoreCheckbox(selected, correctSet, maxPoints) {
      // points partiels: proportion d’items corrects cochés, pénalité si faux cochés
      const sel = new Set(selected);
      const correct = new Set(correctSet);

      let good = 0;
      let bad = 0;

      sel.forEach(v => (correct.has(v) ? good++ : bad++));
      const totalCorrect = correct.size;

      // base = part des bonnes cochées
      let ratio = totalCorrect ? (good / totalCorrect) : 0;

      // pénalité légère si on coche des mauvaises
      if (bad > 0) ratio -= Math.min(0.5, bad * 0.25);

      ratio = Math.max(0, Math.min(1, ratio));

      return {
        earned: Math.round(ratio * maxPoints * 100) / 100,
        max: maxPoints
      };
    }

    // ----------------------------
    // Apparition progressive
    // ----------------------------
    function revealNext(qid) {
      const $next = $('[data-qid="' + (qid + 1) + '"]');
      if ($next.length) $next.removeClass('q-hidden');
    }

    function isAnswered($q) {
      const type = $q.data('type');
      const qid = Number($q.data('qid'));

      if (type === 'text') {
        const v = $q.find('input[type="text"]').val();
        return normalizeText(v).length > 0;
      }
      if (type === 'radio') {
        return $q.find('input[type="radio"][name="q' + qid + '"]:checked').length > 0;
      }
      if (type === 'checkbox') {
        return $q.find('input[type="checkbox"][name="q' + qid + '"]:checked').length > 0;
      }
      return false;
    }

    // ----------------------------
    // Correction / scoring
    // ----------------------------
    function gradeQuestion($q) {
      const type = $q.data('type');
      const qid = Number($q.data('qid'));
      const points = Number($q.data('points') || 1);
      const correctRaw = String($q.data('correct') || '');
      const correctTokens = correctRaw.split(',').map(s => s.trim()).filter(Boolean);

      // reset couleurs
      $q.removeClass('q-wrong q-partial q-correct');

      if (type === 'radio') {
        const v = $q.find('input[type="radio"][name="q' + qid + '"]:checked').val();
        const ok = v && v === correctRaw;
        $q.addClass(ok ? 'q-correct' : 'q-wrong');
        return { earned: ok ? points : 0, max: points };

      } else if (type === 'text') {
        const v = $q.find('input[type="text"]').val();
        const answers = String($q.data('answers') || '').split(',').map(s => normalizeText(s));
        const nv = normalizeText(v);

        const ok = nv && answers.includes(nv);
        $q.addClass(ok ? 'q-correct' : 'q-wrong');
        return { earned: ok ? points : 0, max: points };

      } else if (type === 'checkbox') {
        const selected = $q.find('input[type="checkbox"][name="q' + qid + '"]:checked').map(function(){ return this.value; }).get();
        const scored = scoreCheckbox(selected, correctTokens, points);

        const ratio = scored.max ? scored.earned / scored.max : 0;
        if (ratio >= 0.999) $q.addClass('q-correct');
        else if (ratio > 0) $q.addClass('q-partial');
        else $q.addClass('q-wrong');

        return scored;
      }

      return { earned: 0, max: points };
    }

    // ----------------------------
    // UI : voir réponse
    // ----------------------------
    function showAnswer($q, text) {
      const $box = $q.find('.answer-box');
      $box.text('Bonne réponse : ' + text).show();
    }

    // ----------------------------
    // Init
    // ----------------------------
    $(function() {

      // Apparition progressive : quand une question est répondue -> révéler la suivante
      $('#quizForm').on('input change', 'input', function() {
        const $q = $(this).closest('section[data-qid]');
        const qid = Number($q.data('qid'));
        if (isAnswered($q)) revealNext(qid);
      });

      // Boutons "voir la bonne réponse"
      $('#quizForm').on('click', '.btn-show-answer', function() {
        const $q = $(this).closest('section[data-qid]');
        const ans = $(this).data('answer');
        showAnswer($q, ans);
      });

      // Vérifier
      $('#btnCheck').on('click', function() {
        // afficher toutes les questions (au cas où)
        $('section[data-qid]').removeClass('q-hidden');

        let earnedTotal = 0;
        let maxTotal = 0;

        $('section[data-qid]').each(function() {
          const $q = $(this);
          const res = gradeQuestion($q);
          earnedTotal += res.earned;
          maxTotal += res.max;
        });

        // score + barre
        const percent = maxTotal ? Math.round((earnedTotal / maxTotal) * 100) : 0;

        $('#resultBox').removeClass('d-none');
        $('#scoreText').text(`${earnedTotal} point(s) sur ${maxTotal} (${percent}%)`);
        $('#scoreBar').css('width', percent + '%').text(percent + '%');
        $('#scoreBar').attr('aria-valuenow', percent);
      });

      // Reset
      $('#btnReset').on('click', function() {
        // reset formulaire + UI
        $('#quizForm')[0].reset();
        $('#resultBox').addClass('d-none');
        $('#scoreBar').css('width', '0%').text('0%');
        $('#scoreText').text('—');

        // reset couleurs + réponses
        $('section[data-qid]').removeClass('q-wrong q-partial q-correct');
        $('.answer-box').hide().text('');

        // réaffichage progressif : seule Q1 visible
        $('section[data-qid]').addClass('q-hidden');
        $('[data-qid="1"]').removeClass('q-hidden');
      });

    });