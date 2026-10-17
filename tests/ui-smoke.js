/* Prueba de humo de la interfaz en un DOM simulado (jsdom).
 * Requiere jsdom. Ver README: `npm install jsdom` en una carpeta aparte y NODE_PATH.
 * Recorre: abrir la app, iniciar el diagnóstico, responder, entregar, ver el resultado
 * y comprobar que el progreso queda guardado. */
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');

let JSDOM;
try { ({ JSDOM } = require('jsdom')); }
catch (e) {
  console.log('Prueba de interfaz omitida: jsdom no está instalado (ver README).');
  process.exit(0);
}

const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// Incrusta los scripts locales para que jsdom no necesite un servidor.
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
  return '<script>' + fs.readFileSync(path.join(root, src), 'utf8') + '</script>';
});

const errores = [];
const vc = new (require('jsdom').VirtualConsole)();
vc.on('jsdomError', (e) => errores.push(String(e && e.message || e)));
vc.on('error', (e) => errores.push(String(e)));

function abrir(storageDump) {
  const dom = new JSDOM(html, { url: 'http://localhost/index.html', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc });
  return dom;
}

let passed = 0, failed = 0;
const fallos = [];
function test(nombre, fn) {
  try { fn(); passed++; console.log('  ok   ' + nombre); }
  catch (e) { failed++; fallos.push(nombre + ': ' + e.message); console.log('  FAIL ' + nombre + '\n       ' + e.message); }
}
function irA(hash) {
  dom.window.location.hash = hash;
  dom.window.dispatchEvent(new dom.window.HashChangeEvent('hashchange'));
}
function click(doc, sel) {
  const el = doc.querySelector(sel);
  assert.ok(el, 'no existe ' + sel);
  el.dispatchEvent(new doc.defaultView.MouseEvent('click', { bubbles: true, cancelable: true }));
}
function changeRadio(doc, valor) {
  const el = doc.querySelector('input[type="radio"][value="' + valor + '"]');
  assert.ok(el, 'no existe la opción ' + valor);
  el.checked = true;
  el.dispatchEvent(new doc.defaultView.Event('change', { bubbles: true }));
}

console.log('\nInterfaz (flujo principal)');
const dom = abrir();
const doc = dom.window.document;

test('la app arranca y muestra el inicio con su título', () => {
  assert.ok(doc.querySelector('#app h1'), 'falta h1');
  assert.ok(/Saber Pro Prep/.test(doc.querySelector('#app h1').textContent));
});
test('el menú tiene las siete secciones', () => {
  const links = [...doc.querySelectorAll('.nav a')].map(a => a.textContent.trim());
  assert.deepStrictEqual(links, ['Inicio', 'Diagnóstico', 'Simulacro', 'Teoría', 'Consejos', 'Seguimiento', 'Datos']);
});
test('sin resultados, seguimiento muestra estado vacío y no gráfico falso', () => {
  irA('#/seguimiento');
  assert.ok(doc.querySelector('.vacio'), 'falta estado vacío');
  assert.strictEqual(doc.querySelector('svg.grafico'), null);
});
test('iniciar el diagnóstico muestra la primera pregunta de 50', () => {
  irA('#/diagnostico');
  click(doc, '[data-action="iniciar-diagnostico"]');
  assert.ok(/Pregunta 1 de 50/.test(doc.querySelector('#titulo').textContent), doc.querySelector('#titulo').textContent);
  assert.strictEqual(doc.querySelectorAll('input[type="radio"]').length, 4);
});
test('responder marca la opción elegida', () => {
  changeRadio(doc, 1);
  assert.ok(doc.querySelector('input[type="radio"][value="1"]').checked);
});
test('siguiente avanza a la pregunta 2', () => {
  click(doc, '[data-action="siguiente"]');
  assert.ok(/Pregunta 2 de 50/.test(doc.querySelector('#titulo').textContent));
});
test('anterior vuelve a la pregunta 1 con la respuesta conservada', () => {
  click(doc, '[data-action="anterior"]');
  assert.ok(doc.querySelector('input[type="radio"][value="1"]').checked);
});
test('el progreso de la sesión se guarda en localStorage', () => {
  const raw = dom.window.localStorage.getItem('sppPrep');
  assert.ok(raw, 'no hay nada guardado');
  const s = JSON.parse(raw);
  assert.strictEqual(s.sesionActiva.tipo, 'diagnostico');
  assert.strictEqual(Object.keys(s.sesionActiva.answers).length, 1);
});
test('entregar con confirmación muestra el resultado y lo guarda en el historial', () => {
  click(doc, '[data-action="pedir-entrega"]');
  assert.ok(doc.querySelector('[role="alertdialog"]'), 'falta la confirmación');
  click(doc, '[data-action="entregar"]');
  assert.ok(/Resultado/.test(doc.querySelector('#titulo').textContent));
  assert.ok(/no es un puntaje oficial/i.test(doc.querySelector('#principal').textContent));
  const s = JSON.parse(dom.window.localStorage.getItem('sppPrep'));
  assert.strictEqual(s.resultados.length, 1);
  assert.strictEqual(s.sesionActiva, null);
  assert.ok(s.diagnostico, 'el diagnóstico no quedó registrado');
});
test('la revisión muestra la explicación y el error frecuente', () => {
  const txt = doc.querySelector('#principal').textContent;
  assert.ok(/Error frecuente/.test(txt));
  assert.ok(/Respuesta correcta/.test(txt));
});
test('el seguimiento muestra el gráfico y el historial con el resultado real', () => {
  click(doc, '[data-action="cerrar-revision"]');
  irA('#/seguimiento');
  assert.ok(doc.querySelector('svg.grafico'), 'falta el gráfico');
  assert.ok(doc.querySelector('table tbody tr'), 'falta la fila del historial');
  assert.ok(/Promedio por módulo/.test(doc.querySelector('#principal').textContent), 'falta el promedio por módulo');
});
test('inicio muestra la próxima aplicación oficial y la meta en escala de 0 a 300', () => {
  irA('#/inicio');
  assert.ok(/18 de octubre de 2026/.test(doc.querySelector('#principal').textContent), 'falta la fecha');
  assert.ok(/escala de 0 a 300/.test(doc.querySelector('#principal').textContent), 'falta la escala');
});
test('la calculadora de puntaje global calcula el promedio y avisa si falta un módulo', () => {
  irA('#/seguimiento');
  const f = doc.querySelector('#form-pg');
  assert.ok(f, 'falta la calculadora');
  for (const [k, v] of [['RC', '250'], ['LC', '200'], ['CC', '180'], ['CE', '210'], ['EN', '190']]) f.elements[k].value = v;
  f.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
  const salida = doc.querySelector('#principal').textContent;
  assert.ok(salida.includes('206') && /Puntaje global calculado/.test(salida), 'no mostró el puntaje 206');
  const g = doc.querySelector('#form-pg');
  g.elements.CC.value = '';
  g.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
  assert.ok(doc.querySelector('[role="alert"]'), 'falta el aviso de módulo faltante');
});
test('la página de consejos muestra su contenido', () => {
  irA('#/consejos');
  assert.ok(/Consejos de estudio/.test(doc.querySelector('#titulo').textContent));
  assert.ok(/garantizan un resultado/.test(doc.querySelector('#principal').textContent));
});
test('la teoría de Análisis de alternativas se puede marcar como estudiada', () => {
  irA('#/teoria/u3');
  click(doc, '[data-action="toggle-estudio"]');
  const s = JSON.parse(dom.window.localStorage.getItem('sppPrep'));
  assert.strictEqual(s.teoria.u3, true);
});
test('las unidades sin contenido aparecen deshabilitadas, sin enlace', () => {
  irA('#/teoria');
  const deshabilitadas = doc.querySelectorAll('.deshabilitada');
  assert.strictEqual(deshabilitadas.length, 0, 'ya no debería haber unidades deshabilitadas');
  const enlaces = [...doc.querySelectorAll('.unidades a')].map(a => a.getAttribute('href'));
  assert.deepStrictEqual(enlaces, ['#/teoria/u1', '#/teoria/u2', '#/teoria/u2b', '#/teoria/u3', '#/teoria/u4', '#/teoria/u5', '#/teoria/u6', '#/teoria/u7', '#/teoria/u8', '#/teoria/u9', '#/teoria/u10', '#/teoria/u11']);
});
test('el simulacro con límite de tiempo muestra el reloj', () => {
  irA('#/simulacro');
  const form = doc.querySelector('#form-sim');
  form.elements.n.value = '5';
  form.elements.minutos.value = '30';
  form.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
  assert.ok(doc.querySelector('.reloj-val'), 'falta el reloj');
  assert.ok(/00:29:|00:30:/.test(doc.querySelector('.reloj-val').textContent), doc.querySelector('.reloj-val').textContent);
});
test('un simulacro de Lectura Crítica muestra el pasaje y el módulo correcto', () => {
  // Cerrar el simulacro con reloj de la prueba anterior antes de iniciar otro.
  click(doc, '[data-action="pedir-entrega"]');
  click(doc, '[data-action="entregar"]');
  click(doc, '[data-action="cerrar-revision"]');
  irA('#/simulacro');
  const form = doc.querySelector('#form-sim');
  form.elements.modulo.value = 'Lectura Crítica';
  form.elements.n.value = '2';
  form.elements.minutos.value = '0';
  form.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
  assert.ok(doc.querySelector('.pasaje'), 'falta el pasaje');
  assert.ok(/Lectura Crítica/.test(doc.querySelector('.sesion-cabecera').textContent));
});
test('el diagnóstico completo se puede iniciar desde el menú', () => {
  irA('#/diagnostico');
  assert.ok(doc.querySelector('[data-action="iniciar-diagnostico"]') || doc.querySelector('.sesion'), 'no hay pantalla de diagnóstico');
  assert.ok(/50 preguntas/.test(doc.querySelector('.aviso.informativo').textContent));
});
test('la meta personal se guarda', () => {
  irA('#/inicio');
  const f = doc.querySelector('#form-meta');
  f.elements.meta.value = '250';
  f.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
  const s = JSON.parse(dom.window.localStorage.getItem('sppPrep'));
  assert.strictEqual(s.meta.objetivo, 250);
});
test('no hay errores de ejecución en consola', () => {
  assert.deepStrictEqual(errores, []);
});

console.log('\n' + passed + ' pruebas de interfaz correctas, ' + failed + ' fallidas.');
dom.window.close();
if (failed) { console.log('\nFallos:\n- ' + fallos.join('\n- ')); process.exit(1); }
process.exit(0);
