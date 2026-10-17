/* Pruebas de la lógica de Saber Pro Prep. Sin dependencias: ejecutar con `node tests/run-tests.js`. */
'use strict';
const assert = require('assert');
const path = require('path');
const A = (p) => require(path.join(__dirname, '..', 'assets', p));

const scoring = A('js/scoring.js');
const timer = A('js/timer.js');
const session = A('js/session.js');
const store = A('js/store.js');
const bank = A('data/bank.js');
const genericos = A('data/bank-genericos.js');

let passed = 0;
let failed = 0;
const failures = [];
function test(name, fn) {
  try { fn(); passed++; console.log('  ok   ' + name); }
  catch (e) { failed++; failures.push(name + ': ' + e.message); console.log('  FAIL ' + name + '\n       ' + e.message); }
}

console.log('\nBanco de preguntas');
const Q = bank.questions.concat(genericos.questions);
const DS = bank.questions;
test('el banco tiene al menos una pregunta', () => assert.ok(Q.length > 0));
test('los identificadores son únicos', () => {
  const ids = Q.map(q => q.id);
  assert.strictEqual(new Set(ids).size, ids.length);
});
test('cada pregunta tiene 4 opciones no vacías', () => {
  Q.forEach(q => {
    assert.strictEqual(q.opciones.length, 4, q.id);
    q.opciones.forEach(o => assert.ok(o && o.trim().length > 0, q.id + ' opción vacía'));
  });
});
test('la respuesta correcta es un índice válido (0-3)', () => {
  Q.forEach(q => assert.ok(Number.isInteger(q.correcta) && q.correcta >= 0 && q.correcta <= 3, q.id));
});
test('las opciones no se repiten dentro de una pregunta', () => {
  Q.forEach(q => assert.strictEqual(new Set(q.opciones).size, 4, q.id));
});
test('cada pregunta tiene enunciado, explicación, módulo, competencia y tema', () => {
  Q.forEach(q => ['enunciado', 'explicacion', 'modulo', 'competencia', 'tema'].forEach(k => {
    assert.ok(typeof q[k] === 'string' && q[k].trim().length > 0, q.id + ' falta ' + k);
  }));
});
test('la procedencia es una etiqueta permitida', () => {
  Q.forEach(q => assert.ok(bank.procedenciasPermitidas.includes(q.procedencia), q.id));
});
test('el banco de Diseño de Software tiene 40 preguntas, igual que la guía', () => {
  assert.strictEqual(DS.filter(q => q.modulo === 'Diseño de Software').length, 40);
});
test('cada módulo genérico tiene al menos 8 preguntas (cuota del diagnóstico)', () => {
  ['Razonamiento Cuantitativo', 'Lectura Crítica', 'Competencias Ciudadanas', 'Comunicación Escrita', 'Inglés'].forEach(m => {
    assert.ok(genericos.questions.filter(q => q.modulo === m).length >= 8, m);
  });
});
test('las competencias de los genéricos pertenecen a su módulo en la guía', () => {
  genericos.questions.forEach(q => {
    assert.ok(genericos.competenciasPorModulo[q.modulo].includes(q.competencia), q.id + ' ' + q.competencia);
  });
});
test('el diagnóstico toma 10 de Diseño y 8 de cada genérico (50 en total)', () => {
  const sess = A('js/session.js');
  const d = sess.selectDiagnostico(Q);
  assert.strictEqual(d.preguntas.length, 50);
  assert.strictEqual(d.preguntas.filter(q => q.modulo === 'Diseño de Software').length, 10);
  assert.strictEqual(d.preguntas.filter(q => q.modulo === 'Inglés').length, 8);
  assert.deepStrictEqual(d.faltantes, []);
});
test('el diagnóstico avisa si un módulo no tiene suficientes preguntas', () => {
  const sess = A('js/session.js');
  const d = sess.selectDiagnostico(DS);
  assert.ok(d.faltantes.some(f => f.modulo === 'Inglés' && f.faltan === 8));
});
test('las respuestas correctas no se concentran en una sola letra (ninguna supera el 40 %)', () => {
  const conteo = [0, 0, 0, 0];
  Q.forEach(q => conteo[q.correcta]++);
  conteo.forEach((n, i) => assert.ok(n / Q.length <= 0.4, 'letra ' + 'ABCD'[i] + ' con ' + n + ' de ' + Q.length));
});
test('las preguntas nuevas indican la fuente del tema', () => {
  Q.filter(q => q.id >= 'DS-013').forEach(q => assert.ok(typeof q.fuenteTema === 'string' && q.fuenteTema.length > 0, q.id));
});
test('las preguntas de práctica no se etiquetan como oficiales', () => {
  Q.forEach(q => assert.notStrictEqual(q.procedencia, 'oficial_verificada', q.id));
});
test('las competencias de Diseño de Software pertenecen a las afirmaciones de la guía', () => {
  DS.forEach(q => assert.ok(bank.competencias.afirmaciones.includes(q.competencia), q.id));
});

console.log('\nCálculo de resultados');
const sample = [
  { id: 'a', modulo: 'M', competencia: 'C1', correcta: 0 },
  { id: 'b', modulo: 'M', competencia: 'C1', correcta: 2 },
  { id: 'c', modulo: 'M', competencia: 'C2', correcta: 1 },
  { id: 'd', modulo: 'N', competencia: 'C2', correcta: 3 }
];
test('cuenta aciertos y calcula porcentaje con un decimal', () => {
  const r = scoring.gradeAnswers(sample, { a: 0, b: 1, c: 1, d: 3 });
  assert.strictEqual(r.correct, 3);
  assert.strictEqual(r.total, 4);
  assert.strictEqual(r.pct, 75);
});
test('una pregunta sin responder cuenta como no acertada', () => {
  const r = scoring.gradeAnswers(sample, { a: 0 });
  assert.strictEqual(r.correct, 1);
  assert.strictEqual(r.unanswered, 3);
  assert.strictEqual(r.pct, 25);
});
test('el desempeño por competencia y por módulo es correcto', () => {
  const r = scoring.gradeAnswers(sample, { a: 0, b: 1, c: 1, d: 0 });
  assert.deepStrictEqual(r.byCompetence.C1, { total: 2, correct: 1, pct: 50 });
  assert.deepStrictEqual(r.byCompetence.C2, { total: 2, correct: 1, pct: 50 });
  assert.deepStrictEqual(r.byModule.N, { total: 1, correct: 0, pct: 0 });
});
test('sin preguntas el porcentaje es 0 y no NaN', () => {
  const r = scoring.gradeAnswers([], {});
  assert.strictEqual(r.pct, 0);
});
test('una respuesta 0 (opción A) se cuenta como respondida', () => {
  const r = scoring.gradeAnswers(sample, { a: 0 });
  assert.strictEqual(r.perQuestion[0].answered, true);
  assert.strictEqual(r.perQuestion[0].ok, true);
});

console.log('\nTemporizador');
test('calcula el tiempo restante con la hora real', () => {
  assert.strictEqual(timer.remainingMs(1000, 60000, 31000), 30000);
});
test('no devuelve tiempo negativo', () => {
  assert.strictEqual(timer.remainingMs(0, 1000, 5000), 0);
});
test('sin duración no hay límite', () => {
  assert.strictEqual(timer.remainingMs(0, null, 5000), null);
  assert.strictEqual(timer.isExpired(0, null, 999999999), false);
});
test('formatea mm:ss con horas y ceros', () => {
  assert.strictEqual(timer.formatClock(3599999), '00:59:59');
  assert.strictEqual(timer.formatClock(3661000), '01:01:01');
  assert.strictEqual(timer.formatClock(0), '00:00:00');
});

console.log('\nSesiones');
test('crear sesión rechaza tipos desconocidos', () => {
  assert.throws(() => session.createSession({ tipo: 'otro', questions: sample, now: 0 }));
});
test('crear sesión rechaza una lista vacía', () => {
  assert.throws(() => session.createSession({ tipo: 'practica', questions: [], now: 0 }));
});
test('responder guarda la respuesta sin mutar la sesión original', () => {
  const s0 = session.createSession({ tipo: 'practica', questions: sample, now: 0 });
  const s1 = session.answer(s0, 'a', 2);
  assert.strictEqual(s0.answers.a, undefined);
  assert.strictEqual(s1.answers.a, 2);
});
test('no se puede responder una pregunta que no pertenece a la sesión', () => {
  const s0 = session.createSession({ tipo: 'practica', questions: sample, now: 0 });
  assert.throws(() => session.answer(s0, 'zzz', 0));
});
test('marcar para revisar alterna el estado', () => {
  const s0 = session.createSession({ tipo: 'practica', questions: sample, now: 0 });
  const s1 = session.toggleMark(s0, 'b');
  const s2 = session.toggleMark(s1, 'b');
  assert.strictEqual(s1.marked.b, true);
  assert.strictEqual(s2.marked.b, undefined);
});
test('navegar fuera de rango no cambia la posición', () => {
  const s0 = session.createSession({ tipo: 'practica', questions: sample, now: 0 });
  assert.strictEqual(session.goTo(s0, 9).index, 0);
  assert.strictEqual(session.goTo(s0, 2).index, 2);
});
test('el simulacro se entrega solo al agotarse el tiempo', () => {
  const s0 = session.createSession({ tipo: 'simulacro', questions: sample, now: 0, durationMs: 1000 });
  const antes = session.autoSubmitIfExpired(s0, sample, 500);
  assert.strictEqual(antes.status, 'en_curso');
  const despues = session.autoSubmitIfExpired(s0, sample, 1000);
  assert.strictEqual(despues.status, 'entregada');
  assert.strictEqual(despues.endReason, 'tiempo');
});
test('el tiempo restante sobrevive a una recarga (depende solo de startedAt)', () => {
  const s0 = session.createSession({ tipo: 'simulacro', questions: sample, now: 1000, durationMs: 60000 });
  const copia = JSON.parse(JSON.stringify(s0));
  assert.strictEqual(session.remaining(copia, 31000), 30000);
});
test('entregar calcula el resultado y lo deja inmutable tras la entrega', () => {
  let s = session.createSession({ tipo: 'practica', questions: sample, now: 0 });
  s = session.answer(s, 'a', 0);
  s = session.answer(s, 'b', 2);
  const e = session.submit(s, sample, 5000, 'manual');
  assert.strictEqual(e.status, 'entregada');
  assert.strictEqual(e.result.correct, 2);
  assert.throws(() => session.answer(e, 'c', 1));
});
test('el resultado usa el orden original de la sesión', () => {
  const s = session.createSession({ tipo: 'practica', questions: sample, now: 0 });
  const e = session.submit(s, sample.slice().reverse(), 1, 'manual');
  assert.deepStrictEqual(e.result.perQuestion.map(p => p.id), ['a', 'b', 'c', 'd']);
});

console.log('\nPersistencia');
function memoryStorage() {
  const m = {};
  return {
    getItem: k => (k in m ? m[k] : null),
    setItem: (k, v) => { m[k] = String(v); },
    removeItem: k => { delete m[k]; },
    _m: m
  };
}
test('un almacenamiento vacío devuelve un estado inicial válido', () => {
  const st = store.createStore(memoryStorage());
  const s = st.load();
  assert.strictEqual(store.validateState(s), null);
  assert.deepStrictEqual(s.resultados, []);
});
test('guardar y cargar conserva los datos', () => {
  const mem = memoryStorage();
  const st = store.createStore(mem);
  const s = st.load();
  s.meta.objetivo = 150;
  assert.strictEqual(st.save(s), true);
  assert.strictEqual(st.load().meta.objetivo, 150);
});
test('un JSON dañado se respalda y no rompe la app', () => {
  const mem = memoryStorage();
  mem.setItem(store.KEY, '{esto no es json');
  const st = store.createStore(mem);
  const s = st.load();
  assert.strictEqual(store.validateState(s), null);
  assert.ok(st.getLastError() && st.getLastError().includes('no son válidos'));
  assert.ok(Object.keys(mem._m).some(k => k.startsWith(store.KEY + '.dañado.')));
});
test('una versión de datos no compatible se trata como dañada', () => {
  const mem = memoryStorage();
  mem.setItem(store.KEY, JSON.stringify({ version: 99 }));
  const st = store.createStore(mem);
  assert.strictEqual(st.load().version, store.VERSION);
});
test('guardar un estado inválido lanza error y no escribe', () => {
  const mem = memoryStorage();
  const st = store.createStore(mem);
  assert.throws(() => st.save({ version: 1 }));
  assert.strictEqual(mem.getItem(store.KEY), null);
});
test('agregar un resultado de diagnóstico actualiza el diagnóstico', () => {
  const st = store.createStore(memoryStorage());
  let s = st.load();
  const r = { fecha: 1, tipo: 'diagnostico', modulo: 'x', total: 4, correct: 2, pct: 50, byCompetence: {}, byModule: {}, sessionId: 'q' };
  s = st.addResult(s, r);
  assert.strictEqual(s.diagnostico.pct, 50);
  assert.strictEqual(s.resultados.length, 1);
});
test('la copia exportada se importa y se valida', () => {
  const st = store.createStore(memoryStorage());
  const s = st.load();
  const txt = st.exportBackup(s);
  const res = st.importBackup(txt);
  assert.strictEqual(res.ok, true);
});
test('importar un archivo no válido devuelve error claro', () => {
  const st = store.createStore(memoryStorage());
  assert.strictEqual(st.importBackup('no es json').ok, false);
  assert.strictEqual(st.importBackup(JSON.stringify({ app: 'otra', data: { version: 1 } })).ok, false);
});
test('el historial no crece sin límite', () => {
  const st = store.createStore(memoryStorage());
  let s = st.load();
  for (let i = 0; i < 260; i++) s = st.addResult(s, { fecha: i, tipo: 'practica', total: 1, correct: 1, pct: 100 });
  assert.strictEqual(s.resultados.length, 200);
});
test('cada unidad de teoría disponible tiene todos sus campos y apunta a una pregunta real', () => {
  const teoria = require('../assets/data/teoria.js');
  const ids = new Set(bank.questions.map(q => q.id));
  const disp = teoria.unidades.filter(u => u.disponible);
  assert.ok(disp.length >= 12, 'se esperan las 12 unidades con contenido');
  for (const u of disp) {
    for (const c of ['objetivo', 'ejemplo', 'errorFrecuente', 'fuente']) assert.ok(u[c] && u[c].length > 10, u.id + ' sin ' + c);
    assert.ok(Array.isArray(u.explicacion) && u.explicacion.length >= 2, u.id + ' sin explicación');
    assert.ok(ids.has(u.escenarioRef), u.id + ' apunta a una pregunta inexistente: ' + u.escenarioRef);
  }
  assert.strictEqual(new Set(teoria.unidades.map(u => u.orden)).size, teoria.unidades.length, 'orden repetido');
});
test('el modo sin conexión precachea solo archivos que existen', () => {
  const fs = require('fs');
  const sw = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
  const lista = [...sw.matchAll(/'\.\/([^']+)'/g)].map(m => m[1]).filter(f => f && f !== '');
  assert.ok(lista.length >= 10, 'lista de caché muy corta');
  for (const f of lista) {
    if (f === '') continue;
    assert.ok(fs.existsSync(path.join(__dirname, '..', f)), 'no existe ' + f + ' (listado en sw.js)');
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'manifest.json'), 'utf8'));
  assert.strictEqual(manifest.lang, 'es');
});
test('puntaje global: promedio de los cinco módulos redondeado', () => {
  const pg = A('js/puntaje.js');
  const r = pg.puntajeGlobal({ RC: '250', LC: '200', CC: '180', CE: '210', EN: '190' });
  assert.deepStrictEqual([r.ok, r.pg], [true, 206]);
  assert.strictEqual(r.sinIngles, false);
});
test('puntaje global sin Inglés promedia cuatro módulos', () => {
  const pg = A('js/puntaje.js');
  const r = pg.puntajeGlobal({ RC: '251', LC: '200', CC: '180', CE: '210', EN: '' });
  assert.deepStrictEqual([r.ok, r.pg, r.sinIngles], [true, 210, true]);
});
test('puntaje global rechaza valores fuera de 0 a 300, decimales y módulos obligatorios faltantes', () => {
  const pg = A('js/puntaje.js');
  assert.strictEqual(pg.puntajeGlobal({ RC: '301', LC: '1', CC: '1', CE: '1' }).ok, false);
  assert.strictEqual(pg.puntajeGlobal({ RC: '250.5', LC: '1', CC: '1', CE: '1' }).ok, false);
  assert.strictEqual(pg.puntajeGlobal({ RC: '250', LC: '200', CC: '', CE: '210' }).ok, false);
  assert.strictEqual(pg.puntajeGlobal({ RC: '0', LC: '0', CC: '0', CE: '0' }).pg, 0);
});
test('el manifest tiene íconos de 192 y 512 px que existen (requisito de instalación)', () => {
  const fs = require('fs');
  const m = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'manifest.json'), 'utf8'));
  const tamanos = m.icons.map(i => i.sizes);
  assert.ok(tamanos.includes('192x192') && tamanos.includes('512x512'), 'faltan íconos 192 o 512');
  for (const i of m.icons) assert.ok(fs.existsSync(path.join(__dirname, '..', i.src)), 'no existe ' + i.src);
  assert.strictEqual(m.display, 'standalone');
});

console.log('\n' + passed + ' pruebas correctas, ' + failed + ' fallidas.');
if (failed) { console.log('\nFallos:\n- ' + failures.join('\n- ')); process.exit(1); }
