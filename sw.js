/* Saber Pro Prep - modo sin conexión. Guarda la app en caché la primera vez que se abre
 * desde http://localhost o un servidor. Con doble clic en index.html (file://) no hay
 * service worker: la app funciona igual, solo que sin esta caché. */
'use strict';
const VERSION = 'spp-v3';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/scoring.js',
  './assets/js/timer.js',
  './assets/js/puntaje.js',
  './assets/js/session.js',
  './assets/js/store.js',
  './assets/js/app.js',
  './assets/js/registro-sw.js',
  './assets/data/bank.js',
  './assets/data/bank-genericos.js',
  './assets/data/teoria.js'
];

self.addEventListener('install', function (evento) {
  evento.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ARCHIVOS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (evento) {
  evento.waitUntil(caches.keys().then(function (claves) {
    return Promise.all(claves.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (evento) {
  if (evento.request.method !== 'GET') return;
  evento.respondWith(caches.match(evento.request).then(function (en) {
    return en || fetch(evento.request).catch(function () { return caches.match('./index.html'); });
  }));
});
