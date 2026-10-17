/* Registra el service worker solo cuando la app se abre desde http(s). Con file:// no se registra. */
(function () {
  'use strict';
  try {
    if (!('serviceWorker' in navigator)) return;
    if (!/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.register('./sw.js').catch(function () { /* sin caché: la app sigue funcionando */ });
  } catch (e) { /* ignorar: la app no depende de esto */ }
})();
