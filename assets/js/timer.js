/* Saber Pro Prep - temporizador basado en la hora real (no en un contador que se reinicia). */
(function (root) {
  'use strict';
  root.SPP = root.SPP || {};

  /** Milisegundos restantes. Si durationMs es null, no hay límite. */
  function remainingMs(startedAt, durationMs, now) {
    if (durationMs === null || durationMs === undefined) return null;
    return Math.max(0, startedAt + durationMs - now);
  }

  function isExpired(startedAt, durationMs, now) {
    var left = remainingMs(startedAt, durationMs, now);
    return left !== null && left <= 0;
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /** 3599999 ms -> "00:59:59". Trunca a segundos completos. */
  function formatClock(ms) {
    if (ms === null || ms === undefined) return 'Sin límite';
    var total = Math.floor(ms / 1000);
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  root.SPP.timer = { remainingMs: remainingMs, isExpired: isExpired, formatClock: formatClock };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SPP.timer;
})(typeof window !== 'undefined' ? window : globalThis);
