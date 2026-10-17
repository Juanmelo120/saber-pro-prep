/* Saber Pro Prep - interfaz. La lógica vive en scoring, timer, session y store (probadas en tests/). */
(function () {
  'use strict';
  var S = window.SPP;
  var app = document.getElementById('app');
  var MODULO = S.bank.competencias.modulo;
  var BANCO = S.bank.questions.concat(S.bankGenericos.questions);
  function countModulo(m) { return BANCO.filter(function (q) { return q.modulo === m; }).length; }
  var MODULOS = ['Diseño de Software', 'Razonamiento Cuantitativo', 'Lectura Crítica', 'Competencias Ciudadanas', 'Comunicación Escrita', 'Inglés'];

  // ---------- almacenamiento (con respaldo en memoria si el navegador lo bloquea) ----------
  function makeStorage() {
    try {
      var probe = '__spp_probe__';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      return window.localStorage;
    } catch (e) {
      var mem = {};
      return {
        getItem: function (k) { return k in mem ? mem[k] : null; },
        setItem: function (k, v) { mem[k] = String(v); },
        removeItem: function (k) { delete mem[k]; }
      };
    }
  }

  var store = S.store.createStore(makeStorage());
  var state = store.load();
  var loadNotice = store.getLastError();
  var ui = { review: null, confirmSubmit: false, notice: loadNotice || '', simForm: { modulo: MODULO, n: countModulo(MODULO), minutos: 60 }, pg: { valores: {}, resultado: null } };

  function persist() {
    if (!store.save(state)) ui.notice = store.getLastError();
  }

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function fechaTexto(ms) {
    try { return new Date(ms).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }); }
    catch (e) { return new Date(ms).toISOString(); }
  }

  function questionsFor(sess) {
    var byId = {};
    BANCO.forEach(function (q) { byId[q.id] = q; });
    return sess.ids.map(function (id) { return byId[id]; }).filter(Boolean);
  }

  function activeSession() {
    var s = state.sesionActiva;
    return s && s.status === 'en_curso' ? s : null;
  }

  // ---------- rutas ----------
  var RUTAS = ['inicio', 'diagnostico', 'simulacro', 'teoria', 'consejos', 'seguimiento', 'datos'];
  var ETIQUETAS = {
    inicio: 'Inicio', diagnostico: 'Diagnóstico', simulacro: 'Simulacro',
    teoria: 'Teoría', consejos: 'Consejos', seguimiento: 'Seguimiento', datos: 'Datos'
  };

  function currentRoute() {
    var h = (location.hash || '').replace(/^#\/?/, '').split('/')[0];
    return RUTAS.indexOf(h) === -1 ? 'inicio' : h;
  }

  function navHtml(route) {
    return '<nav class="nav" aria-label="Principal"><ul>' + RUTAS.map(function (r) {
      var current = r === route ? ' aria-current="page"' : '';
      return '<li><a href="#/' + r + '"' + current + '>' + ETIQUETAS[r] + '</a></li>';
    }).join('') + '</ul></nav>';
  }

  function noticeHtml() {
    if (!ui.notice) return '';
    return '<div class="aviso" role="status">' + esc(ui.notice) + '</div>';
  }

  // ---------- vistas ----------
  function viewInicio() {
    var activa = activeSession();
    var ult = state.resultados.length ? state.resultados[state.resultados.length - 1] : null;
    var diag = state.diagnostico;
    var estudiadas = Object.keys(state.teoria).filter(function (k) { return state.teoria[k]; }).length;
    var disponibles = S.teoria.unidades.filter(function (u) { return u.disponible; }).length;
    var siguiente;
    if (activa) siguiente = '<p>Tienes una sesión en curso.</p><a class="btn btn-primario" href="#/' + (activa.tipo === 'diagnostico' ? 'diagnostico' : 'simulacro') + '">Continuar</a>';
    else if (!diag) siguiente = '<p>Haz el diagnóstico para conocer tus puntos de partida.</p><a class="btn btn-primario" href="#/diagnostico">Iniciar diagnóstico</a>';
    else siguiente = '<p>Estudia la unidad de teoría disponible y luego practica.</p><a class="btn btn-primario" href="#/teoria">Ir a teoría</a>';

    return '' +
      '<h1 tabindex="-1" id="titulo">Saber Pro Prep</h1>' +
      '<p class="lead">Herramienta personal de preparación. No es un producto oficial del ICFES.</p>' +
      noticeHtml() +
      '<div class="tarjetas">' +
        '<article class="tarjeta"><h2>Meta personal</h2>' +
          '<form id="form-meta" class="inline">' +
            '<label for="meta">Puntaje global objetivo (escala de 0 a 300)</label>' +
            '<input id="meta" name="meta" type="number" min="0" max="300" step="1" value="' + (state.meta.objetivo === null ? '' : esc(state.meta.objetivo)) + '">' +
            '<button class="btn" type="submit">Guardar meta</button>' +
          '</form>' +
          '<p class="ayuda">Es una referencia tuya. La escala oficial de cada módulo va de 0 a 300 y el puntaje global es su promedio.</p>' +
        '</article>' +
        '<article class="tarjeta"><h2>Diagnóstico</h2>' +
          (diag ? '<p class="grande">' + esc(diag.pct) + '%</p><p>Aciertos del último diagnóstico (indicador interno).</p>' : '<p class="grande">Pendiente</p><p>Aún no lo has completado.</p>') +
        '</article>' +
        '<article class="tarjeta"><h2>Teoría</h2>' +
          '<p class="grande">' + estudiadas + ' de ' + disponibles + '</p><p>Unidades disponibles estudiadas. Las demás llegarán en fases siguientes.</p>' +
        '</article>' +
      '</div>' +
      '<section class="tarjeta destacada" aria-labelledby="sig"><h2 id="sig">Tu siguiente paso</h2>' + siguiente + '</section>' +
      '<section class="tarjeta" aria-labelledby="cal"><h2 id="cal">Próxima aplicación oficial</h2>' +
        '<p><strong>Domingo 18 de octubre de 2026</strong>: aplicación de la prueba del segundo semestre (cambió de fecha por el terremoto de agosto).</p>' +
        '<p><strong>19 de febrero de 2027</strong>: resultados individuales en icfes.gov.co.</p>' +
        '<p class="ayuda">Fuente: calendario ICFES versión del 13/08/2026. Confirma tu citación y tu sede en icfes.gov.co antes de ir.</p>' +
      '</section>' +
      (ult ? '<section class="tarjeta"><h2>Último resultado</h2><p>' + esc(ult.pct) + '% de aciertos · ' + esc(ult.correct) + ' de ' + esc(ult.total) + ' · ' + fechaTexto(ult.fecha) + '</p></section>' : '');
  }

  function viewDiagnostico() {
    var activa = activeSession();
    if (activa && activa.tipo === 'diagnostico') return viewSesion(activa);
    if (ui.review && ui.review.tipo === 'diagnostico') return viewRevision(ui.review);
    return '' +
      '<h1 tabindex="-1" id="titulo">Diagnóstico</h1>' +
      noticeHtml() +
      '<p class="lead">El diagnóstico usa preguntas originales de práctica. Puedes detenerte y continuar después; tu avance se guarda en este navegador.</p>' +
      '<div class="aviso informativo">' + esc(textoDiagnostico()) + '</div>' +
      '<div class="acciones"><button class="btn btn-primario" type="button" data-action="iniciar-diagnostico">Iniciar diagnóstico</button></div>';
  }

  function textoDiagnostico() {
    var d = S.session.selectDiagnostico(BANCO);
    var partes = d.cuotas.map(function (c) { return c.n + ' de ' + c.modulo; }).join(', ');
    var txt = 'El diagnóstico tiene ' + d.preguntas.length + ' preguntas: ' + partes + '.';
    if (d.faltantes.length) {
      txt += ' Faltan preguntas en: ' + d.faltantes.map(function (f) { return f.modulo + ' (' + f.faltan + ')'; }).join(', ') + '.';
    }
    return txt;
  }

  function viewSimulacro() {
    var activa = activeSession();
    if (activa && activa.tipo !== 'diagnostico') return viewSesion(activa);
    if (ui.review && ui.review.tipo !== 'diagnostico') return viewRevision(ui.review);
    var f = ui.simForm;
    var disponibles = countModulo(f.modulo);
    var reducido = f.n < 40;
    var opcionesModulo = MODULOS.map(function (m) {
      return '<option value="' + esc(m) + '"' + (m === f.modulo ? ' selected' : '') + '>' + esc(m) + ' (' + countModulo(m) + ' preguntas)</option>';
    }).join('');
    return '' +
      '<h1 tabindex="-1" id="titulo">Simulacro y práctica</h1>' +
      noticeHtml() +
      '<p class="lead">Elige cuántas preguntas quieres y si quieres límite de tiempo. El límite lo defines tú: las guías oficiales del módulo no fijan una duración.</p>' +
      '<form id="form-sim" class="tarjeta formulario">' +
        '<div class="campo"><label for="sim-mod">Módulo</label>' +
          '<select id="sim-mod" name="modulo">' + opcionesModulo + '</select></div>' +
        '<div class="campo"><label for="sim-n">Número de preguntas (máximo ' + disponibles + ' en este módulo)</label>' +
          '<input id="sim-n" name="n" type="number" min="1" max="' + disponibles + '" value="' + esc(f.n) + '"></div>' +
        '<div class="campo"><label for="sim-min">Límite de tiempo en minutos (0 = sin límite)</label>' +
          '<input id="sim-min" name="minutos" type="number" min="0" max="600" value="' + esc(f.minutos) + '"></div>' +
        '<p class="ayuda">' + (reducido ? 'Esta sesión es una práctica con banco reducido. No equivale a un simulacro oficial completo.' : 'Las preguntas son originales de práctica. Esta sesión no equivale a un simulacro oficial.') + '</p>' +
        '<div class="acciones"><button class="btn btn-primario" type="submit">Comenzar</button></div>' +
      '</form>';
  }

  function viewSesion(sess) {
    var qs = questionsFor(sess);
    var total = sess.ids.length;
    var i = sess.index;
    var q = qs[i];
    var sinResponder = total - Object.keys(sess.answers).length;
    var timed = sess.durationMs !== null;
    var reloj = timed
      ? '<div class="reloj" role="timer" aria-live="off"><span class="reloj-etq">Tiempo restante</span><span id="reloj" class="reloj-val">' + S.timer.formatClock(S.session.remaining(sess, Date.now())) + '</span></div>'
      : '<div class="reloj"><span class="reloj-etq">Sin límite de tiempo</span></div>';
    var mapa = sess.ids.map(function (id, idx) {
      var estado = sess.answers[id] !== undefined ? 'respondida' : 'pendiente';
      if (sess.marked[id]) estado = 'marcada';
      var actual = idx === i ? ' actual' : '';
      var etiq = 'Pregunta ' + (idx + 1) + ', ' + estado + (idx === i ? ', actual' : '');
      return '<button type="button" class="celda ' + estado + actual + '" data-action="ir" data-i="' + idx + '" aria-label="' + esc(etiq) + '">' + (idx + 1) + '</button>';
    }).join('');
    var opciones = q.opciones.map(function (op, idx) {
      var marcada = sess.answers[q.id] === idx ? ' checked' : '';
      var letra = String.fromCharCode(65 + idx);
      return '<label class="opcion"><input type="radio" name="op" value="' + idx + '" data-action="responder" data-q="' + esc(q.id) + '"' + marcada + '><span class="letra">' + letra + '</span><span>' + esc(op) + '</span></label>';
    }).join('');
    var confirm = ui.confirmSubmit
      ? '<div class="aviso alerta" role="alertdialog" aria-labelledby="conf-t"><p id="conf-t"><strong>¿Entregar la sesión?</strong> ' + (sinResponder > 0 ? 'Quedan ' + sinResponder + ' preguntas sin responder. ' : '') + 'No podrás cambiar las respuestas después.</p>' +
        '<div class="acciones"><button class="btn btn-primario" type="button" data-action="entregar">Sí, entregar</button><button class="btn" type="button" data-action="cancelar-entrega">Seguir respondiendo</button></div></div>'
      : '';
    var etiqTipo = sess.tipo === 'diagnostico' ? 'Diagnóstico' : (timed ? 'Simulacro con límite' : 'Práctica');
    var etiqModulo = sess.modulo || 'Todos los módulos';

    return '' +
      '<div class="sesion-cabecera"><div><p class="ayuda">' + esc(etiqTipo) + ' · ' + esc(etiqModulo) + '</p>' +
        '<h1 tabindex="-1" id="titulo">Pregunta ' + (i + 1) + ' de ' + total + '</h1></div>' + reloj + '</div>' +
      noticeHtml() +
      confirm +
      '<div class="sesion">' +
        '<section class="pregunta" aria-labelledby="enun">' +
          (q.escenario ? '<p class="escenario">' + esc(q.escenario) + '</p>' : '') +
          (q.pasaje ? '<blockquote class="pasaje">' + esc(q.pasaje) + '</blockquote>' : '') +
          '<h2 id="enun" class="enunciado">' + esc(q.enunciado) + '</h2>' +
          '<fieldset class="opciones"><legend class="sr">Opciones de respuesta</legend>' + opciones + '</fieldset>' +
          '<div class="acciones pie">' +
            '<button class="btn" type="button" data-action="anterior"' + (i === 0 ? ' disabled' : '') + '>Anterior</button>' +
            '<button class="btn" type="button" data-action="marcar" aria-pressed="' + (sess.marked[q.id] ? 'true' : 'false') + '">' + (sess.marked[q.id] ? 'Quitar marca' : 'Marcar para revisar') + '</button>' +
            (i === total - 1
              ? '<button class="btn btn-primario" type="button" data-action="pedir-entrega">Revisar y entregar</button>'
              : '<button class="btn btn-primario" type="button" data-action="siguiente">Siguiente</button>') +
          '</div>' +
        '</section>' +
        '<aside class="mapa" aria-label="Mapa de preguntas">' +
          '<h2>Preguntas</h2>' +
          '<p class="ayuda">Respondidas, marcadas y pendientes.</p>' +
          '<div class="cuadricula">' + mapa + '</div>' +
          '<div class="acciones"><button class="btn" type="button" data-action="pedir-entrega">Entregar</button></div>' +
        '</aside>' +
      '</div>';
  }

  function viewRevision(r) {
    var byId = {};
    BANCO.forEach(function (q) { byId[q.id] = q; });
    var comp = Object.keys(r.byCompetence || {}).map(function (k) {
      var c = r.byCompetence[k];
      return '<li><span>' + esc(k) + '</span><span>' + esc(c.correct) + ' de ' + esc(c.total) + ' (' + esc(c.pct) + '%)</span></li>';
    }).join('');
    var detalle = r.perQuestion.map(function (p, idx) {
      var q = byId[p.id];
      if (!q) return '';
      var estado = !p.answered ? 'Sin responder' : (p.ok ? 'Correcta' : 'Incorrecta');
      var clase = !p.answered ? 'neutra' : (p.ok ? 'buena' : 'mala');
      var tuya = p.answered ? '<p>Tu respuesta: ' + esc(String.fromCharCode(65 + p.chosen)) + ' · ' + esc(q.opciones[p.chosen]) + '</p>' : '';
      return '<details class="detalle ' + clase + '"><summary><span class="estado">' + estado + '</span> Pregunta ' + (idx + 1) + ': ' + esc(q.enunciado) + '</summary>' +
        tuya +
        '<p><strong>Respuesta correcta:</strong> ' + esc(String.fromCharCode(65 + q.correcta)) + ' · ' + esc(q.opciones[q.correcta]) + '</p>' +
        '<p>' + esc(q.explicacion) + '</p>' +
        '<p class="ayuda"><strong>Error frecuente:</strong> ' + esc(q.errorFrecuente) + '</p></details>';
    }).join('');
    return '' +
      '<h1 tabindex="-1" id="titulo">Resultado · ' + (r.tipo === 'diagnostico' ? 'Diagnóstico' : 'Práctica o simulacro') + '</h1>' +
      (r.endReason === 'tiempo' ? '<div class="aviso alerta">Se entregó automáticamente porque se acabó el tiempo.</div>' : '') +
      '<section class="tarjeta"><p class="grande">' + esc(r.pct) + '%</p>' +
        '<p>' + esc(r.correct) + ' de ' + esc(r.total) + ' correctas · ' + esc(r.unanswered) + ' sin responder</p>' +
        '<p class="ayuda">Porcentaje interno de aciertos para tu práctica. No es un puntaje oficial del ICFES.</p></section>' +
      '<section class="tarjeta"><h2>Por competencia</h2><ul class="lista-barras">' + comp + '</ul></section>' +
      '<section aria-labelledby="det"><h2 id="det">Revisión</h2>' + detalle + '</section>' +
      '<div class="acciones"><button class="btn btn-primario" type="button" data-action="cerrar-revision">Volver al inicio</button></div>';
  }

  function viewTeoria(params) {
    var unidad = params && S.teoria.unidades.filter(function (u) { return u.id === params; })[0];
    if (unidad && unidad.disponible) return viewUnidad(unidad);
    return '' +
      '<h1 tabindex="-1" id="titulo">Teoría · ' + esc(MODULO) + '</h1>' +
      '<p class="lead">Estudia por unidad. Cada unidad incluye objetivo, explicación, ejemplo y una pregunta de práctica.</p>' +
      '<ol class="unidades">' + S.teoria.unidades.map(function (u) {
        if (!u.disponible) return '<li><span class="deshabilitada">' + u.orden + '. ' + esc(u.titulo) + '</span> <span class="ayuda">(próximamente)</span></li>';
        var hecha = state.teoria[u.id] ? ' · estudiada' : '';
        return '<li><a href="#/teoria/' + u.id + '">' + u.orden + '. ' + esc(u.titulo) + '</a>' + hecha + '</li>';
      }).join('') + '</ol>';
  }

  function viewUnidad(u) {
    var hecha = !!state.teoria[u.id];
    return '' +
      '<p><a href="#/teoria">← Volver a teoría</a></p>' +
      '<h1 tabindex="-1" id="titulo">Unidad ' + u.orden + ': ' + esc(u.titulo) + '</h1>' +
      '<section class="tarjeta"><h2>Objetivo</h2><p>' + esc(u.objetivo) + '</p></section>' +
      '<section class="tarjeta"><h2>Explicación</h2>' + u.explicacion.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</section>' +
      '<section class="tarjeta"><h2>Ejemplo</h2><p>' + esc(u.ejemplo) + '</p></section>' +
      '<section class="tarjeta aviso informativo"><h2>Error frecuente</h2><p>' + esc(u.errorFrecuente) + '</p></section>' +
      '<section class="tarjeta"><h2>Práctica</h2>' +
        '<p>Practica esta unidad en la pregunta de práctica original. Luego podrás ver la explicación.</p>' +
        '<p><a class="btn" href="#/simulacro">Ir a práctica con el banco actual</a></p>' +
      '</section>' +
      '<p class="ayuda">Fuente: ' + esc(u.fuente) + '</p>' +
      '<div class="acciones"><button class="btn ' + (hecha ? '' : 'btn-primario') + '" type="button" data-action="toggle-estudio" data-unit="' + esc(u.id) + '" aria-pressed="' + (hecha ? 'true' : 'false') + '">' + (hecha ? 'Marcar como no estudiada' : 'Marcar como estudiada') + '</button></div>';
  }

  function promedioPorModulo(rs) {
    var acum = {};
    rs.forEach(function (r) {
      Object.keys(r.byModule || {}).forEach(function (m) {
        var c = r.byModule[m];
        if (!c || !c.total) return;
        if (!acum[m]) acum[m] = { correct: 0, total: 0, n: 0 };
        acum[m].correct += c.correct; acum[m].total += c.total; acum[m].n += 1;
      });
    });
    var out = {};
    Object.keys(acum).forEach(function (m) {
      var a = acum[m];
      out[m] = { n: a.n, pct: Math.round((a.correct * 1000) / a.total) / 10 };
    });
    return out;
  }

  function viewCalculadoraPG() {
    var v = ui.pg.valores || {};
    var campos = S.puntaje.MODULOS.map(function (m) {
      return '<div class="campo"><label for="pg-' + m.clave + '">' + esc(m.nombre) + (m.clave === 'EN' ? ' (opcional)' : '') + '</label>' +
        '<input id="pg-' + m.clave + '" name="' + m.clave + '" type="number" inputmode="numeric" min="0" max="300" step="1" value="' + esc(v[m.clave] || '') + '"></div>';
    }).join('');
    var r = ui.pg.resultado;
    var salida = '';
    if (r && r.ok) salida = '<p class="grande" aria-live="polite">' + r.pg + '</p><p>Puntaje global calculado' + (r.sinIngles ? ' sin Inglés (promedio de cuatro módulos)' : '') + '.</p>';
    else if (r && !r.ok) salida = '<p class="aviso alerta" role="alert">' + esc(r.error) + '</p>';
    return '' +
      '<section class="tarjeta" aria-labelledby="pg-titulo"><h2 id="pg-titulo">Calculadora de puntaje global</h2>' +
        '<p class="ayuda">Cuando recibas tus resultados oficiales, escribe los puntajes de cada módulo (0 a 300). La app calcula el promedio. No se guarda.</p>' +
        '<form id="form-pg" class="formulario">' + campos +
          '<div class="acciones"><button class="btn btn-primario" type="submit">Calcular</button></div>' +
        '</form>' + salida +
      '</section>';
  }

  function viewSeguimiento() {
    var rs = state.resultados;
    if (!rs.length) {
      return '<h1 tabindex="-1" id="titulo">Seguimiento</h1>' +
        '<div class="tarjeta vacio"><p>Aún no hay resultados guardados.</p><p class="ayuda">Completa un diagnóstico o una práctica para ver tu evolución aquí.</p>' +
        '<p><a class="btn btn-primario" href="#/diagnostico">Ir al diagnóstico</a></p></div>' +
        viewCalculadoraPG();
    }
    var ultimo = rs[rs.length - 1];
    var puntos = rs.map(function (r, idx) {
      var x = rs.length === 1 ? 300 : 40 + (idx * 520) / (rs.length - 1);
      var y = 170 - (r.pct * 150) / 100;
      return { x: x, y: y, r: r, idx: idx };
    });
    var linea = puntos.length > 1 ? '<polyline class="linea" points="' + puntos.map(function (p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ') + '"/>' : '';
    var svg = '<svg viewBox="0 0 600 200" role="img" aria-labelledby="gt gd" class="grafico">' +
      '<title id="gt">Evolución del porcentaje de aciertos</title><desc id="gd">Porcentaje de aciertos por sesión, en orden cronológico.</desc>' +
      '<line x1="40" y1="170" x2="580" y2="170" class="eje"/><line x1="40" y1="20" x2="40" y2="170" class="eje"/>' +
      linea + puntos.map(function (p) { return '<circle class="punto" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="5"/>'; }).join('') +
      '</svg>';
    var tabla = '<table><caption>Resultados guardados</caption><thead><tr><th scope="col">Fecha</th><th scope="col">Tipo</th><th scope="col">Aciertos</th><th scope="col">%</th></tr></thead><tbody>' +
      rs.slice().reverse().map(function (r) {
        return '<tr><td data-etiq="Fecha">' + fechaTexto(r.fecha) + '</td><td data-etiq="Tipo">' + (r.tipo === 'diagnostico' ? 'Diagnóstico' : 'Práctica') + '</td><td data-etiq="Aciertos">' + esc(r.correct) + ' de ' + esc(r.total) + '</td><td data-etiq="Porcentaje">' + esc(r.pct) + '%</td></tr>';
      }).join('') + '</tbody></table>';
    var comp = Object.keys(ultimo.byCompetence || {}).map(function (k) {
      var c = ultimo.byCompetence[k];
      return '<li><span class="etiq">' + esc(k) + '</span><span class="barra" aria-hidden="true"><span style="width:' + esc(c.pct) + '%"></span></span><span>' + esc(c.pct) + '%</span></li>';
    }).join('');
    var modulos = promedioPorModulo(rs);
    var filasModulo = Object.keys(modulos).map(function (m) {
      var c = modulos[m];
      return '<li><span class="etiq">' + esc(m) + ' <span class="ayuda">(' + c.n + (c.n === 1 ? ' resultado' : ' resultados') + ')</span></span><span class="barra" aria-hidden="true"><span style="width:' + esc(c.pct) + '%"></span></span><span>' + esc(c.pct) + '%</span></li>';
    }).join('');
    return '' +
      '<h1 tabindex="-1" id="titulo">Seguimiento</h1>' +
      '<p class="ayuda">Porcentajes internos de práctica, no puntajes oficiales.</p>' +
      viewCalculadoraPG() +
      '<section class="tarjeta"><h2>Evolución</h2>' + svg + '</section>' +
      '<section class="tarjeta"><h2>Promedio por módulo</h2>' +
        (filasModulo ? '<p class="ayuda">Promedio de todos tus resultados, ponderado por número de preguntas.</p><ul class="lista-barras">' + filasModulo + '</ul>' : '<p>Aún no hay preguntas por módulo registradas.</p>') +
      '</section>' +
      '<section class="tarjeta"><h2>Desempeño por competencia (último resultado)</h2><ul class="lista-barras">' + comp + '</ul></section>' +
      '<section class="tarjeta"><h2>Historial</h2>' + tabla + '</section>';
  }

  function viewConsejos() {
    var pasos = [
      'Haz el diagnóstico antes de estudiar, para ver dónde empiezas.',
      'Estudia una unidad de teoría y luego practica sus preguntas.',
      'Haz simulacros con límite de tiempo al menos una vez por semana.',
      'Revisa cada error con su explicación y anota por qué te equivocaste.',
      'Repite la práctica en las competencias con porcentaje más bajo.'
    ];
    return '' +
      '<h1 tabindex="-1" id="titulo">Consejos de estudio</h1>' +
      '<p class="lead">Recomendaciones generales de preparación. No garantizan un resultado.</p>' +
      '<section class="tarjeta"><h2>Antes del examen</h2><ol class="unidades">' +
        pasos.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></section>' +
      '<section class="tarjeta"><h2>Durante la prueba</h2><ul class="unidades">' +
        '<li>Lee primero la instrucción y, si hay pasaje, léelo completo antes de las preguntas.</li>' +
        '<li>Si una pregunta se alarga, marca la pregunta y sigue; vuelve al final.</li>' +
        '<li>Descarta primero las opciones que contradicen el texto o el enunciado.</li>' +
        '<li>Cuida el tiempo: revisa el reloj cada cierto número de preguntas.</li>' +
      '</ul></section>' +
      '<section class="tarjeta"><h2>Qué cuidar en la práctica</h2><ul class="unidades">' +
        '<li>Un porcentaje alto con pocas preguntas no dice mucho. Prefiere sesiones de 20 o más.</li>' +
        '<li>Los porcentajes de esta app son internos. Úsalos para comparar tu propio avance.</li>' +
        '<li>Si las preguntas se repiten, cambia el módulo o estudia la teoría antes.</li>' +
      '</ul></section>' +
      '<section class="tarjeta"><h2>Lo que dice la guía oficial 2026-2</h2><ul class="unidades">' +
        '<li>Razonamiento Cuantitativo, Lectura Crítica y Competencias Ciudadanas: 30 preguntas cada una.</li>' +
        '<li>Inglés: 45 preguntas en siete partes (emparejar, avisos, conversaciones, textos con huecos e inferencias).</li>' +
        '<li>Comunicación Escrita: una tarea abierta. Escribes un texto argumentativo de máximo dos páginas.</li>' +
        '<li>Cada módulo se reporta de 0 a 300 sin decimales. El puntaje global es el promedio de los cinco módulos.</li>' +
        '<li>La sesión completa dura 4 horas y 40 minutos, según las tablas de la guía.</li>' +
      '</ul><p class="ayuda">Las preguntas de esta app no son oficiales. Consulta las guías en icfes.gov.co.</p></section>';
  }

  function viewDatos() {
    return '' +
      '<h1 tabindex="-1" id="titulo">Datos y copias de seguridad</h1>' +
      noticeHtml() +
      '<div class="aviso informativo">Tu progreso se guarda solo en este navegador. No se sincroniza entre dispositivos y puede perderse si borras los datos del navegador. Exporta una copia de seguridad con frecuencia.</div>' +
      '<section class="tarjeta"><h2>Exportar</h2><p>Descarga un archivo JSON con todo tu progreso.</p>' +
        '<button class="btn btn-primario" type="button" data-action="exportar">Descargar copia</button></section>' +
      '<section class="tarjeta"><h2>Importar</h2><p>Se validará el archivo antes de reemplazar tus datos.</p>' +
        '<label class="btn" for="archivo">Elegir archivo JSON</label>' +
        '<input id="archivo" class="sr" type="file" accept="application/json,.json" data-action="importar"></section>' +
      '<section class="tarjeta peligro"><h2>Borrar todo</h2><p>Elimina tu progreso de este navegador. Esta acción no se puede deshacer.</p>' +
        '<label class="opcion-check"><input id="confirmo-borrar" type="checkbox"> Entiendo que se borrará todo</label>' +
        '<button class="btn btn-peligro" type="button" data-action="borrar">Borrar progreso</button></section>';
  }

  // ---------- render ----------
  function render() {
    var route = currentRoute();
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    var html;
    if (route === 'inicio') html = viewInicio();
    else if (route === 'diagnostico') html = viewDiagnostico();
    else if (route === 'simulacro') html = viewSimulacro();
    else if (route === 'teoria') html = viewTeoria(parts[1]);
    else if (route === 'consejos') html = viewConsejos();
    else if (route === 'seguimiento') html = viewSeguimiento();
    else html = viewDatos();

    var enSesion = !!activeSession() || !!ui.review;
    app.innerHTML = '<a class="saltar" href="#principal">Ir al contenido</a>' +
      '<header class="cabecera"><span class="marca">Saber Pro Prep</span>' + navHtml(route) + '</header>' +
      '<main id="principal" tabindex="-1" class="contenido">' + html + '</main>';
    var t = document.getElementById('titulo');
    if (t && !enSesion) t.focus({ preventScroll: false });
    syncTimer();
  }

  // ---------- acciones ----------
  function iniciarSesion(opts) {
    if (activeSession()) { ui.notice = 'Ya hay una sesión en curso. Termínala antes de empezar otra.'; render(); return; }
    try {
      state.sesionActiva = S.session.createSession({
        tipo: opts.tipo, modulo: opts.modulo === undefined ? MODULO : opts.modulo, questions: opts.questions, now: Date.now(), durationMs: opts.durationMs
      });
      ui.notice = '';
      ui.review = null;
      ui.confirmSubmit = false;
      persist();
      render();
    } catch (e) {
      ui.notice = 'No se pudo iniciar la sesión: ' + e.message;
      render();
    }
  }

  function actualizar(fn) {
    var sess = activeSession();
    if (!sess) return;
    try {
      state.sesionActiva = fn(sess);
      persist();
    } catch (e) {
      ui.notice = e.message;
    }
    render();
  }

  function entregar(reason) {
    var sess = activeSession();
    if (!sess) return;
    var qs = questionsFor(sess);
    var entregada = S.session.submit(sess, qs, Date.now(), reason);
    state = store.addResult(state, entregada.result);
    ui.review = entregada.result;
    ui.confirmSubmit = false;
    ui.notice = '';
    persist();
    render();
  }

  var ticker = null;
  function syncTimer() {
    var sess = activeSession();
    if (ticker) { clearInterval(ticker); ticker = null; }
    if (!sess || sess.durationMs === null) return;
    ticker = setInterval(tick, 1000);
    tick();
  }

  function tick() {
    var sess = activeSession();
    if (!sess) { clearInterval(ticker); ticker = null; return; }
    var now = Date.now();
    if (S.timer.isExpired(sess.startedAt, sess.durationMs, now)) {
      entregar('tiempo');
      return;
    }
    var el = document.getElementById('reloj');
    if (el) el.textContent = S.timer.formatClock(S.session.remaining(sess, now));
  }

  function descargar(nombre, texto) {
    var blob = new Blob([texto], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 0);
  }

  app.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-action]');
    if (!el) return;
    var accion = el.getAttribute('data-action');
    if (el.tagName === 'INPUT' && el.type === 'file') return;
    switch (accion) {
      case 'iniciar-diagnostico':
        iniciarSesion({ tipo: 'diagnostico', modulo: null, questions: S.session.selectDiagnostico(BANCO).preguntas, durationMs: null });
        break;
      case 'anterior':
        actualizar(function (s) { return S.session.goTo(s, s.index - 1); });
        break;
      case 'siguiente':
        actualizar(function (s) { return S.session.goTo(s, s.index + 1); });
        break;
      case 'ir':
        actualizar(function (s) { return S.session.goTo(s, parseInt(el.getAttribute('data-i'), 10)); });
        break;
      case 'marcar':
        actualizar(function (s) { return S.session.toggleMark(s, questionsFor(s)[s.index].id); });
        break;
      case 'pedir-entrega':
        ui.confirmSubmit = true; render();
        break;
      case 'cancelar-entrega':
        ui.confirmSubmit = false; render();
        break;
      case 'entregar':
        entregar('manual');
        break;
      case 'cerrar-revision':
        ui.review = null; location.hash = '#/inicio'; render();
        break;
      case 'toggle-estudio':
        var uid = el.getAttribute('data-unit');
        state.teoria[uid] = !state.teoria[uid];
        if (!state.teoria[uid]) delete state.teoria[uid];
        persist(); render();
        break;
      case 'exportar':
        descargar('saber-pro-prep-copia-' + new Date().toISOString().slice(0, 10) + '.json', store.exportBackup(state));
        break;
      case 'borrar':
        if (!document.getElementById('confirmo-borrar').checked) {
          ui.notice = 'Marca la casilla de confirmación para borrar el progreso.'; render(); break;
        }
        state = S.store.emptyState();
        try { window.localStorage.removeItem(S.store.KEY); } catch (e) { /* sin acceso: ya quedó vacío en memoria */ }
        ui.notice = 'Progreso borrado.'; persist(); render();
        break;
    }
  });

  app.addEventListener('change', function (ev) {
    var el = ev.target;
    var accion = el.getAttribute && el.getAttribute('data-action');
    if (accion === 'responder') {
      var qid = el.getAttribute('data-q');
      var idx = parseInt(el.value, 10);
      actualizar(function (s) { return S.session.answer(s, qid, idx); });
    } else if (accion === 'importar') {
      var file = el.files && el.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var res = store.importBackup(String(reader.result));
        if (!res.ok) { ui.notice = res.error; render(); return; }
        state = res.state;
        ui.notice = 'Copia importada correctamente.';
        persist(); render();
      };
      reader.onerror = function () { ui.notice = 'No se pudo leer el archivo.'; render(); };
      reader.readAsText(file);
    }
  });

  app.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var form = ev.target;
    if (form.id === 'form-pg') {
      var valores = {};
      S.puntaje.MODULOS.forEach(function (m) { valores[m.clave] = form.elements[m.clave].value; });
      ui.pg = { valores: valores, resultado: S.puntaje.puntajeGlobal(valores) };
      render();
      return;
    }
    if (form.id === 'form-meta') {
      var v = form.elements.meta.value;
      if (v !== '' && !(Number(v) >= 0 && Number(v) <= 300)) { ui.notice = 'La meta debe estar entre 0 y 300.'; render(); return; }
      state.meta.objetivo = v === '' ? null : Number(v);
      ui.notice = 'Meta guardada.';
      persist(); render();
    } else if (form.id === 'form-sim') {
      var modulo = form.elements.modulo.value;
      var disponibles = countModulo(modulo);
      var n = parseInt(form.elements.n.value, 10);
      var minutos = parseInt(form.elements.minutos.value, 10);
      if (!(n >= 1 && n <= disponibles)) { ui.notice = 'El número de preguntas debe estar entre 1 y ' + disponibles + ' para este módulo.'; render(); return; }
      if (!(minutos >= 0 && minutos <= 600)) { ui.notice = 'El límite debe estar entre 0 y 600 minutos.'; render(); return; }
      ui.simForm = { modulo: modulo, n: n, minutos: minutos };
      var qs = BANCO.filter(function (x) { return x.modulo === modulo; }).slice(0, n);
      iniciarSesion({
        tipo: minutos > 0 ? 'simulacro' : 'practica',
        modulo: modulo,
        questions: qs,
        durationMs: minutos > 0 ? minutos * 60000 : null
      });
    }
  });

  window.addEventListener('hashchange', function () {
    ui.notice = '';
    render();
  });

  // Si la página se recargó con un simulacro vencido, se entrega al cargar.
  (function recuperar() {
    var sess = activeSession();
    if (sess) {
      var qs = questionsFor(sess);
      var ajustada = S.session.autoSubmitIfExpired(sess, qs, Date.now());
      if (ajustada.status !== 'en_curso') {
        state.sesionActiva = ajustada;
        var result = S.session.submit(sess, qs, Date.now(), 'tiempo');
        state = store.addResult(state, result.result);
        ui.review = result.result;
        ui.notice = 'La sesión se entregó automáticamente porque se acabó el tiempo mientras la página estaba cerrada.';
        persist();
      }
    }
  })();

  if (!location.hash) location.hash = '#/inicio';
  render();
})();
