/* Contraste WCAG 2.1 de las combinaciones de texto usadas en la app. Sin dependencias.
 * Texto normal: mínimo 4.5:1. Texto grande (≥ 24 px, o ≥ 18.66 px en negrita): mínimo 3:1. */
'use strict';
function canal(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * canal((n >> 16) & 255) + 0.7152 * canal((n >> 8) & 255) + 0.0722 * canal(n & 255);
}
function ratio(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
// [nombre, texto, fondo, mínimo]
const pares = [
  ['texto principal sobre fondo', '#212529', '#F8F9FA', 4.5],
  ['texto principal sobre tarjeta', '#212529', '#FFFFFF', 4.5],
  ['texto secundario sobre fondo', '#5F6A74', '#F8F9FA', 4.5],
  ['texto secundario sobre tarjeta', '#5F6A74', '#FFFFFF', 4.5],
  ['azul sobre fondo (títulos)', '#1B3A5C', '#F8F9FA', 4.5],
  ['blanco sobre azul (cabecera, botón primario)', '#FFFFFF', '#1B3A5C', 4.5],
  ['blanco sobre rojo oscuro (confirmar entrega)', '#FFFFFF', '#A81D29', 4.5],
  ['texto de estado correcto', '#0c5d52', '#E6F4F1', 4.5],
  ['texto de estado incorrecto', '#8a1520', '#FBE3E5', 4.5],
  ['texto sobre amarillo (botón destacado)', '#212529', '#E9C46A', 4.5],
  ['texto sobre aviso amarillo', '#212529', '#FFF4CC', 4.5],
  ['enlace azul sobre aviso informativo', '#1B3A5C', '#EEF3F8', 4.5],
];
let fallos = [];
for (const [nombre, t, f, min] of pares) {
  const r = ratio(t, f);
  const ok = r >= min;
  console.log((ok ? '  ok   ' : '  FAIL ') + nombre + ' → ' + r.toFixed(2) + ':1 (mín. ' + min + ')');
  if (!ok) fallos.push(nombre + ' ' + r.toFixed(2));
}
module.exports = { ratio, pares, fallos };
if (require.main === module) {
  console.log('\n' + (pares.length - fallos.length) + ' de ' + pares.length + ' combinaciones cumplen.');
  process.exit(fallos.length ? 1 : 0);
}
