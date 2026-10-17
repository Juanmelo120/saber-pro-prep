/* Saber Pro Prep - sesiones de diagnóstico, práctica y simulacro (transiciones puras). */
(function (root) {
  'use strict';
  root.SPP = root.SPP || {};
  var scoring = root.SPP.scoring || (typeof require !== 'undefined' ? require('./scoring') : null);
  var timer = root.SPP.timer || (typeof require !== 'undefined' ? require('./timer') : null);

  var TIPOS = ['diagnostico', 'practica', 'simulacro'];

  /**
   * questions: array de preguntas ya filtradas para la sesión.
   * durationMs: null para diagnóstico y práctica libre; número para simulacro.
   */
  function createSession(opts) {
    if (TIPOS.indexOf(opts.tipo) === -1) throw new Error('Tipo de sesión no válido');
    if (!opts.questions || opts.questions.length === 0) throw new Error('La sesión necesita al menos una pregunta');
    return {
      id: 's-' + opts.now + '-' + Math.floor(Math.random() * 1e6),
      tipo: opts.tipo,
      modulo: opts.modulo || null,
      ids: opts.questions.map(function (q) { return q.id; }),
      answers: {},
      marked: {},
      index: 0,
      startedAt: opts.now,
      durationMs: opts.durationMs === undefined ? null : opts.durationMs,
      status: 'en_curso',
      endedAt: null,
      endReason: null,
      result: null
    };
  }

  function assertActive(session) {
    if (!session || session.status !== 'en_curso') throw new Error('La sesión ya no está activa');
  }

  function answer(session, questionId, optionIndex) {
    assertActive(session);
    if (session.ids.indexOf(questionId) === -1) throw new Error('Pregunta fuera de la sesión');
    var next = clone(session);
    next.answers[questionId] = optionIndex;
    return next;
  }

  function clearAnswer(session, questionId) {
    assertActive(session);
    var next = clone(session);
    delete next.answers[questionId];
    return next;
  }

  function toggleMark(session, questionId) {
    assertActive(session);
    var next = clone(session);
    if (next.marked[questionId]) delete next.marked[questionId];
    else next.marked[questionId] = true;
    return next;
  }

  function goTo(session, index) {
    assertActive(session);
    if (index < 0 || index >= session.ids.length) return session;
    var next = clone(session);
    next.index = index;
    return next;
  }

  /** Entrega la sesión y calcula el resultado con las preguntas originales. */
  function submit(session, questions, now, reason) {
    assertActive(session);
    var byId = {};
    questions.forEach(function (q) { byId[q.id] = q; });
    var ordered = session.ids.map(function (id) { return byId[id]; });
    var next = clone(session);
    next.status = 'entregada';
    next.endedAt = now;
    next.endReason = reason || 'manual';
    next.result = scoring.gradeAnswers(ordered, session.answers);
    next.result.tipo = session.tipo;
    next.result.modulo = session.modulo;
    next.result.fecha = now;
    next.result.sessionId = session.id;
    return next;
  }

  /** Si el tiempo de un simulacro se agotó, la sesión se entrega automáticamente. */
  function autoSubmitIfExpired(session, questions, now) {
    if (session.status !== 'en_curso') return session;
    if (timer.isExpired(session.startedAt, session.durationMs, now)) {
      return submit(session, questions, now, 'tiempo');
    }
    return session;
  }

  function remaining(session, now) {
    if (session.status !== 'en_curso') return 0;
    return timer.remainingMs(session.startedAt, session.durationMs, now);
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  // Cuotas del diagnóstico según el prompt maestro: 10 de Diseño de Software y 8 por cada genérico.
  var CUOTAS = [
    { modulo: 'Diseño de Software', n: 10 },
    { modulo: 'Razonamiento Cuantitativo', n: 8 },
    { modulo: 'Lectura Crítica', n: 8 },
    { modulo: 'Competencias Ciudadanas', n: 8 },
    { modulo: 'Comunicación Escrita', n: 8 },
    { modulo: 'Inglés', n: 8 }
  ];

  /** Devuelve las preguntas del diagnóstico. Si un módulo no tiene suficientes, se informa en faltantes. */
  function selectDiagnostico(all) {
    var preguntas = [];
    var faltantes = [];
    CUOTAS.forEach(function (c) {
      var disponibles = all.filter(function (q) { return q.modulo === c.modulo; });
      var tomadas = disponibles.slice(0, c.n);
      preguntas = preguntas.concat(tomadas);
      if (tomadas.length < c.n) faltantes.push({ modulo: c.modulo, faltan: c.n - tomadas.length });
    });
    return { preguntas: preguntas, faltantes: faltantes, cuotas: CUOTAS.slice() };
  }

  root.SPP.session = {
    selectDiagnostico: selectDiagnostico,
    createSession: createSession, answer: answer, clearAnswer: clearAnswer,
    toggleMark: toggleMark, goTo: goTo, submit: submit,
    autoSubmitIfExpired: autoSubmitIfExpired, remaining: remaining
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SPP.session;
})(typeof window !== 'undefined' ? window : globalThis);
