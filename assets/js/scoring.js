/* Saber Pro Prep - cálculo de resultados (lógica pura, sin DOM).
 * El porcentaje de aciertos es solo un indicador interno de práctica.
 * NO es un puntaje oficial del ICFES. */
(function (root) {
  'use strict';
  root.SPP = root.SPP || {};

  function tally(map, key, ok) {
    if (!key) return;
    var m = map[key] || (map[key] = { total: 0, correct: 0 });
    m.total += 1;
    if (ok) m.correct += 1;
  }

  function finish(map) {
    var out = {};
    Object.keys(map).forEach(function (k) {
      var m = map[k];
      out[k] = { total: m.total, correct: m.correct, pct: round1(m.correct, m.total) };
    });
    return out;
  }

  function round1(correct, total) {
    return total ? Math.round((correct * 1000) / total) / 10 : 0;
  }

  /**
   * questions: [{id, modulo, competencia, correcta}]
   * answers:   {id: indiceOpcion}  (ausente = sin responder)
   */
  function gradeAnswers(questions, answers) {
    var byModule = {};
    var byCompetence = {};
    var perQuestion = [];
    var correct = 0;
    var unanswered = 0;

    questions.forEach(function (q) {
      var has = Object.prototype.hasOwnProperty.call(answers, q.id);
      var chosen = has ? answers[q.id] : null;
      var answered = chosen !== null && chosen !== undefined;
      var ok = answered && chosen === q.correcta;
      if (ok) correct += 1;
      if (!answered) unanswered += 1;
      perQuestion.push({
        id: q.id, chosen: answered ? chosen : null, correcta: q.correcta,
        answered: answered, ok: ok, modulo: q.modulo, competencia: q.competencia
      });
      tally(byModule, q.modulo, ok);
      tally(byCompetence, q.competencia, ok);
    });

    return {
      total: questions.length,
      correct: correct,
      unanswered: unanswered,
      pct: round1(correct, questions.length),
      byModule: finish(byModule),
      byCompetence: finish(byCompetence),
      perQuestion: perQuestion
    };
  }

  root.SPP.scoring = { gradeAnswers: gradeAnswers, round1: round1 };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SPP.scoring;
})(typeof window !== 'undefined' ? window : globalThis);
