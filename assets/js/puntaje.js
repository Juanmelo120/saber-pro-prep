/* Saber Pro Prep - cálculo del puntaje global a partir de puntajes de módulo ingresados por el usuario.
 * Regla de la guía de orientación de módulos genéricos 2026-2 (ICFES): cada módulo se reporta de 0 a 300
 * sin decimales, y el Puntaje Global es el promedio de los cinco módulos genéricos, aproximado al entero
 * más cercano. Si no se presentó Inglés por las razones del reglamento, el PG es el promedio de los otros cuatro.
 * Esta función solo hace la suma: no convierte porcentajes de práctica en puntajes oficiales. */
(function (root) {
  'use strict';
  root.SPP = root.SPP || {};

  var MODULOS = [
    { clave: 'RC', nombre: 'Razonamiento Cuantitativo' },
    { clave: 'LC', nombre: 'Lectura Crítica' },
    { clave: 'CC', nombre: 'Competencias Ciudadanas' },
    { clave: 'CE', nombre: 'Comunicación Escrita' },
    { clave: 'EN', nombre: 'Inglés' }
  ];

  // valores: { RC: '250', LC: '', CC: '', CE: '', EN: '' } (texto o número). Vacío = no informado.
  function puntajeGlobal(valores) {
    var usados = [];
    var suma = 0;
    for (var i = 0; i < MODULOS.length; i++) {
      var m = MODULOS[i];
      var crudo = valores ? valores[m.clave] : undefined;
      if (crudo === undefined || crudo === null || String(crudo).trim() === '') continue;
      var n = Number(String(crudo).trim());
      if (!/^\d+$/.test(String(crudo).trim()) || n < 0 || n > 300) {
        return { ok: false, error: 'El puntaje de ' + m.nombre + ' debe ser un número entero entre 0 y 300.' };
      }
      usados.push(m.clave);
      suma += n;
    }
    // Los cinco módulos son necesarios; Inglés puede faltar solo si el reglamento lo permite.
    var obligatorios = ['RC', 'LC', 'CC', 'CE'];
    var faltan = obligatorios.filter(function (c) { return usados.indexOf(c) === -1; });
    if (faltan.length) {
      return { ok: false, error: 'Faltan puntajes de: ' + faltan.map(function (c) {
        return MODULOS.filter(function (m) { return m.clave === c; })[0].nombre;
      }).join(', ') + '.' };
    }
    if (!usados.length) return { ok: false, error: 'Ingresa los puntajes de los módulos.' };
    return { ok: true, pg: Math.round(suma / usados.length), usados: usados, sinIngles: usados.indexOf('EN') === -1 };
  }

  root.SPP.puntaje = { puntajeGlobal: puntajeGlobal, MODULOS: MODULOS };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SPP.puntaje;
})(typeof window !== 'undefined' ? window : globalThis);
