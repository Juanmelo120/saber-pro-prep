/* Saber Pro Prep - persistencia en localStorage con versionado, validación y respaldo ante datos corruptos. */
(function (root) {
  'use strict';
  root.SPP = root.SPP || {};

  var KEY = 'sppPrep';
  var VERSION = 1;
  var MAX_HISTORY = 200;

  function emptyState() {
    return {
      version: VERSION,
      meta: { objetivo: null },            // meta personal de puntaje (opcional, dato del usuario)
      diagnostico: null,                   // último resultado del diagnóstico
      resultados: [],                      // prácticas y simulacros entregados
      sesionActiva: null,                  // sesión en curso (para recuperarla al recargar)
      teoria: {}                           // {unitId: true} unidades estudiadas
    };
  }

  /** Devuelve null si el objeto es válido; si no, un texto con el motivo. */
  function validateState(s) {
    if (!s || typeof s !== 'object') return 'no es un objeto';
    if (s.version !== VERSION) return 'versión no compatible: ' + s.version;
    if (!s.meta || typeof s.meta !== 'object') return 'falta meta';
    if (!Array.isArray(s.resultados)) return 'resultados no es una lista';
    if (!s.teoria || typeof s.teoria !== 'object') return 'teoria no es un objeto';
    if (s.sesionActiva !== null && typeof s.sesionActiva !== 'object') return 'sesionActiva inválida';
    if (s.diagnostico !== null && typeof s.diagnostico !== 'object') return 'diagnostico inválido';
    for (var i = 0; i < s.resultados.length; i++) {
      var r = s.resultados[i];
      if (!r || typeof r.pct !== 'number' || typeof r.total !== 'number' || typeof r.fecha !== 'number') {
        return 'resultado ' + i + ' incompleto';
      }
    }
    return null;
  }

  function createStore(storage) {
    var lastError = null;

    function load() {
      lastError = null;
      var raw;
      try { raw = storage.getItem(KEY); } catch (e) { lastError = 'No se puede leer el almacenamiento del navegador.'; return emptyState(); }
      if (raw === null || raw === undefined) return emptyState();
      var parsed;
      try { parsed = JSON.parse(raw); } catch (e) { parsed = null; }
      var problem = validateState(parsed);
      if (problem) {
        // Respaldo del dato dañado para no perderlo sin aviso.
        try { storage.setItem(KEY + '.dañado.' + Date.now(), raw); } catch (e) { /* sin espacio: seguimos */ }
        lastError = 'Los datos guardados no son válidos (' + problem + '). Se conservó una copia y se inició un registro nuevo.';
        return emptyState();
      }
      return parsed;
    }

    function save(state) {
      var problem = validateState(state);
      if (problem) throw new Error('Estado inválido: ' + problem);
      try {
        storage.setItem(KEY, JSON.stringify(state));
        return true;
      } catch (e) {
        lastError = 'No se pudo guardar. Revisa el espacio del navegador o exporta una copia de seguridad.';
        return false;
      }
    }

    function addResult(state, result) {
      var next = clone(state);
      next.resultados.push({
        fecha: result.fecha, tipo: result.tipo, modulo: result.modulo,
        total: result.total, correct: result.correct, pct: result.pct,
        byCompetence: result.byCompetence, byModule: result.byModule,
        sessionId: result.sessionId, endReason: result.endReason || null
      });
      if (next.resultados.length > MAX_HISTORY) next.resultados = next.resultados.slice(-MAX_HISTORY);
      if (result.tipo === 'diagnostico') next.diagnostico = next.resultados[next.resultados.length - 1];
      next.sesionActiva = null;
      return next;
    }

    /** Valida una copia de seguridad importada. Devuelve {ok, state, error}. */
    function importBackup(text) {
      var obj;
      try { obj = JSON.parse(text); } catch (e) { return { ok: false, error: 'El archivo no es JSON válido.' }; }
      if (obj && obj.app === 'saber-pro-prep' && obj.data) obj = obj.data;
      var problem = validateState(obj);
      if (problem) return { ok: false, error: 'La copia no es válida: ' + problem + '.' };
      return { ok: true, state: obj };
    }

    function exportBackup(state) {
      return JSON.stringify({ app: 'saber-pro-prep', exportado: new Date().toISOString(), data: state }, null, 2);
    }

    return {
      load: load, save: save, addResult: addResult, importBackup: importBackup,
      exportBackup: exportBackup, getLastError: function () { return lastError; }
    };
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  root.SPP.store = { createStore: createStore, emptyState: emptyState, validateState: validateState, VERSION: VERSION, KEY: KEY };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SPP.store;
})(typeof window !== 'undefined' ? window : globalThis);
