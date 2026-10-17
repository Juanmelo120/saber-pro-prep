/* Saber Pro Prep - banco de preguntas de módulos genéricos.
 * TODAS son ORIGINALES DE PRÁCTICA (procedencia: practica_original). No son preguntas oficiales.
 * Competencias tomadas de la Guía de orientación del Examen Saber Pro 2026-1 (ICFES).
 * Comunicación Escrita en la prueba real es una tarea abierta; aquí se practican criterios con opción múltiple. */
(function (root) {
  'use strict';
  root.SPP = root.SPP || {};

  var PROC = 'practica_original';
  var FUENTE = 'Competencias de la guía de orientación Saber Pro 2026-1 (ICFES); pregunta original';

  function q(id, modulo, competencia, tema, dificultad, enunciado, opciones, correcta, explicacion, errorFrecuente, pasaje, escenario) {
    var o = { id: id, modulo: modulo, competencia: competencia, tema: tema, dificultad: dificultad,
      procedencia: PROC, fuenteTema: FUENTE, enunciado: enunciado, opciones: opciones, correcta: correcta,
      explicacion: explicacion, errorFrecuente: errorFrecuente };
    if (pasaje) o.pasaje = pasaje;
    if (escenario) o.escenario = escenario;
    return o;
  }

  var RC = 'Razonamiento Cuantitativo';
  var LC = 'Lectura Crítica';
  var CC = 'Competencias Ciudadanas';
  var CE = 'Comunicación Escrita';
  var EN = 'Inglés';

  var RC1 = 'Interpretación y representación';
  var RC2 = 'Formulación y ejecución';
  var RC3 = 'Argumentación';
  var LC1 = 'Identifica y entiende contenidos locales';
  var LC2 = 'Comprende la articulación de las partes';
  var LC3 = 'Reflexiona a partir del texto y lo evalúa';
  var CC1 = 'Conocimientos';
  var CC2 = 'Argumentación';
  var CC3 = 'Multiperspectivismo';
  var CC4 = 'Pensamiento sistémico';
  var CE1 = 'Planteamiento';
  var CE2 = 'Organización';
  var CE3 = 'Forma de expresión';
  var EN1 = 'Lectura y uso de la lengua';

  var questions = [
    // ---------- Razonamiento Cuantitativo ----------
    q('RC-01', RC, RC1, 'Porcentajes', 'basica',
      'En una tienda, un producto cuesta 80.000 pesos y tiene un descuento del 25 %. ¿Cuál es el precio final?',
      ['55.000 pesos', '60.000 pesos', '65.000 pesos', '70.000 pesos'], 1,
      'El 25 % de 80.000 es 20.000. El precio final es 80.000 − 20.000 = 60.000 pesos. Equivale a multiplicar por 0,75.',
      'Restar 25 unidades en lugar de 25 %.'),
    q('RC-02', RC, RC1, 'Promedios', 'basica',
      'Las notas de cinco estudiantes son 3, 4, 4, 5 y 2. ¿Cuál es el promedio?',
      ['3,4', '3,6', '3,8', '4,0'], 1,
      'La suma es 18 y se divide entre 5: 3,6.',
      'Dividir entre el número de notas distintas en lugar del total de notas.'),
    q('RC-03', RC, RC2, 'Proporcionalidad', 'basica',
      'Una receta para 4 personas usa 300 gramos de harina. ¿Cuánta harina se necesita para 10 personas?',
      ['600 gramos', '650 gramos', '1.200 gramos', '750 gramos'], 3,
      'Es una proporción directa: 300 × 10 / 4 = 750 gramos.',
      'Sumar 6 personas y 6 veces la cantidad en lugar de multiplicar por la razón.'),
    q('RC-04', RC, RC3, 'Porcentajes sucesivos', 'media',
      'Un vendedor afirma que subir un precio 20 % y luego bajarlo 20 % deja el precio igual. ¿Qué conclusión valida el cálculo?',
      ['Es correcto: el precio vuelve al original',
       'Es incorrecto: si el precio era 100, queda en 96',
       'Es correcto solo si el precio inicial es 100',
       'No se puede calcular sin conocer el precio'], 1,
      'Si el precio es 100, sube a 120 y luego baja 20 % de 120, es decir 24: queda en 96. Los porcentajes se aplican sobre valores distintos.',
      'Creer que aumentos y descuentos porcentuales se cancelan automáticamente.'),
    q('RC-05', RC, RC1, 'Áreas', 'basica',
      'Un terreno rectangular mide 12 metros de largo y 7 metros de ancho. ¿Cuál es su área?',
      ['38 metros cuadrados', '74 metros cuadrados', '168 metros cuadrados', '84 metros cuadrados'], 3,
      'El área de un rectángulo es largo por ancho: 12 × 7 = 84 metros cuadrados.',
      'Sumar largo y ancho en lugar de multiplicarlos (38), o duplicar el área (168).'),
    q('RC-06', RC, RC1, 'Lectura de tablas', 'media',
      'Una tabla muestra ventas: enero 100, febrero 150 y marzo 120. ¿Entre qué meses hubo el mayor aumento absoluto?',
      ['Enero y febrero', 'Febrero y marzo', 'Marzo y abril', 'Enero y marzo'], 0,
      'De enero a febrero las ventas suben 50. De febrero a marzo bajan 30. El mayor aumento es de enero a febrero.',
      'Comparar valores no consecutivos o confundir aumento con valor final.'),
    q('RC-07', RC, RC2, 'Relaciones lineales', 'media',
      'Un servicio de taxi cobra 3.000 pesos de base más 1.500 pesos por kilómetro. ¿Cuánto cuesta un trayecto de 8 kilómetros?',
      ['12.000 pesos', '13.500 pesos', '16.500 pesos', '15.000 pesos'], 3,
      'El costo es 3.000 + 1.500 × 8 = 3.000 + 12.000 = 15.000 pesos.',
      'Olvidar sumar la tarifa base o aplicarla por kilómetro.'),
    q('RC-08', RC, RC2, 'Probabilidad', 'basica',
      'Se lanza un dado justo de seis caras. ¿Cuál es la probabilidad de obtener un número par?',
      ['1/6', '1/3', '2/3', '1/2'], 3,
      'Hay tres resultados pares (2, 4 y 6) de seis posibles: 3/6 = 1/2.',
      'Contar solo un resultado favorable o no dividir entre el total de casos.'),

    // ---------- Lectura Crítica ----------
    q('LC-01', LC, LC1, 'Información explícita', 'basica',
      'Lee el texto y responde.',
      ['De 8 a. m. a 1 p. m.', 'De 1 p. m. a 8 p. m.', 'Todos los días de 8 a. m. a 1 p. m.', 'Solo en septiembre'], 0,
      'El texto indica que los sábados de agosto el horario es de 8 a. m. a 1 p. m.',
      'Mezclar el día de la semana con los días del mes.',
      'La biblioteca municipal abrirá los sábados de 8 a. m. a 1 p. m. durante el mes de agosto, para atender a estudiantes que preparan exámenes.'),
    q('LC-02', LC, LC1, 'Eventos narrados', 'basica',
      'Lee el texto y responde: ¿por qué llegó tarde Ana?',
      ['Porque olvidó la hora', 'Porque el bus se averió', 'Porque la reunión fue cancelada', 'Porque no quería asistir'], 1,
      'El texto dice que el bus se averió en la calle 80, y esa es la causa de la llegada tarde.',
      'Inventar causas que el texto no menciona.',
      'Ana llegó tarde a la reunión porque el bus se averió en la calle 80.'),
    q('LC-03', LC, LC2, 'Función de las oraciones', 'media',
      'Lee el texto. ¿Cuál es la función de la segunda oración?',
      ['Introducir un ejemplo', 'Resumir el texto', 'Presentar una cifra', 'Introducir una limitación de la idea anterior'], 3,
      'La palabra «sin embargo» introduce una limitación: aunque haya ciclovías, sin rutas seguras pocas personas las usan.',
      'Leer el conector como si fuera una suma de ideas.',
      'Muchas ciudades reducen el tráfico con ciclovías. Sin embargo, sin rutas seguras, pocas personas usan la bicicleta como transporte.'),
    q('LC-04', LC, LC2, 'Relaciones entre ideas', 'basica',
      'Lee el texto. ¿Qué relación expresa «Por eso»?',
      ['Contraste', 'Causa y consecuencia', 'Comparación', 'Oposición temporal'], 1,
      'El conector «por eso» indica que la segunda oración es consecuencia de la primera.',
      'Confundir conectores de causa con los de contraste.',
      'La propuesta de reciclaje fue aprobada. Por eso, la empresa comenzó a instalar contenedores en cada piso.'),
    q('LC-05', LC, LC3, 'Evaluación de argumentos', 'media',
      'Lee el texto. ¿Qué debilita más la conclusión?',
      ['La extensión del texto', 'El uso de la palabra «programas»', 'Que el texto esté escrito en español', 'El número reducido de participantes del estudio'], 3,
      'Una muestra de 12 personas limita la generalización de la conclusión.',
      'Elegir un detalle de forma en lugar de la calidad de la evidencia.',
      'El texto afirma que «los programas de lectura mejoran la comprensión». El estudio citado tuvo solo 12 participantes.'),
    q('LC-06', LC, LC3, 'Hechos y opiniones', 'basica',
      '¿Cuál de estas afirmaciones es una opinión y no un hecho?',
      ['El agua hierve a 100 °C al nivel del mar.', 'La película es la mejor del año.', 'El tren sale a las 6 p. m.', 'El informe tiene 20 páginas.'], 1,
      '«La mejor del año» es un juicio de valor. Las otras afirmaciones se pueden comprobar.',
      'Confundir una afirmación con datos verificables con una valoración.'),
    q('LC-07', LC, LC2, 'Estructura del texto', 'media',
      'Lee el texto. ¿Cuál es su estructura?',
      ['Problema, soluciones y evaluación', 'Causa, efecto y conclusión únicamente', 'Narración en orden cronológico inverso', 'Lista de definiciones'], 0,
      'El texto presenta primero el problema, después tres soluciones y al final evalúa sus costos.',
      'Describir el contenido en lugar de la forma en que está organizado.',
      'Primero se describe el problema del agua en el barrio; luego se proponen tres soluciones; al final se evalúan sus costos.'),
    q('LC-08', LC, LC1, 'Información explícita', 'basica',
      'Lee el texto y responde.',
      ['Llevar casco en vías urbanas', 'Prohibir la bicicleta', 'Pagar un seguro obligatorio', 'Usar la bicicleta solo de noche'], 0,
      'El texto dice que el reglamento exige el casco en vías urbanas.',
      'Responder con una norma parecida que el texto no menciona.',
      'El reglamento exige llevar casco en bicicleta en vías urbanas.'),

    // ---------- Competencias Ciudadanas ----------
    q('CC-01', CC, CC1, 'Organización del Estado', 'basica',
      'Según el artículo 1 de la Constitución de 1991, ¿cómo se organiza el Estado colombiano?',
      ['Monarquía federal', 'República federal con fuerzas militares autónomas', 'Confederación de departamentos', 'República unitaria, descentralizada y con autonomía de sus entidades territoriales'], 3,
      'El artículo 1 define a Colombia como un Estado social de derecho organizado en forma de república unitaria, descentralizada y con autonomía de sus entidades territoriales.',
      'Confundir república unitaria con federal o confederal.'),
    q('CC-02', CC, CC1, 'Ramas del poder público', 'basica',
      '¿Qué rama del poder público es la encargada de hacer las leyes?',
      ['Ejecutiva', 'Judicial', 'Legislativa', 'Electoral'], 2,
      'La rama legislativa expide las leyes. La ejecutiva las aplica y administra; la judicial las interpreta y las aplica en los conflictos.',
      'Atribuir a la rama ejecutiva la función de expedir leyes.'),
    q('CC-03', CC, CC2, 'Falacias y generalizaciones', 'media',
      'Un argumento dice: «Como un vecino fue robado, todos los extranjeros son peligrosos». ¿Qué falla tiene?',
      ['Generalización apresurada a partir de un solo caso', 'Es una cita de autoridad válida', 'Es una pregunta retórica', 'Usa datos estadísticos verificados'], 0,
      'Concluir sobre un grupo entero a partir de un caso aislado es una generalización apresurada.',
      'No reconocer la generalización cuando el ejemplo parece real.'),
    q('CC-04', CC, CC3, 'Conflictos y perspectivas', 'basica',
      'En un conflicto por el uso de un parque, unos vecinos quieren un gimnasio y otros quieren zona verde. ¿Qué actitud favorece la convivencia?',
      ['Ignorar a quienes no piensan igual', 'Imponer la propuesta de la mayoría sin diálogo', 'Esperar a que el conflicto desaparezca solo', 'Reconocer ambas perspectivas y buscar propuestas que atiendan intereses compartidos'], 3,
      'Reconocer las perspectivas de cada grupo permite buscar acuerdos que atiendan intereses comunes.',
      'Tratar el conflicto como una competencia que se gana por mayoría.'),
    q('CC-05', CC, CC4, 'Efectos no previstos', 'media',
      'Un municipio construye más parqueaderos para reducir el tráfico, pero el tráfico aumenta. ¿Qué explica mejor el resultado?',
      ['Los parqueaderos siempre reducen el tráfico', 'El tráfico no tiene relación con la infraestructura', 'El error fue construir en el centro de la ciudad', 'Más oferta de parqueaderos y vías puede atraer más vehículos; el problema tiene varias dimensiones'], 3,
      'El pensamiento sistémico considera que una solución puede generar efectos no previstos. Más capacidad puede atraer más uso del vehículo.',
      'Ver el problema como si tuviera una sola causa y una sola solución.'),
    q('CC-06', CC, CC1, 'Mecanismos de protección de derechos', 'basica',
      '¿Qué mecanismo permite a cualquier persona pedir protección inmediata de sus derechos fundamentales cuando son amenazados?',
      ['La tutela', 'El censo nacional', 'La licencia de conducción', 'El presupuesto municipal'], 0,
      'La acción de tutela es el mecanismo constitucional para proteger derechos fundamentales de forma rápida.',
      'Confundir mecanismos de participación o administración con mecanismos de protección de derechos.'),
    q('CC-07', CC, CC2, 'Solidez de un argumento', 'basica',
      '¿Cuál enunciado es el argumento más sólido?',
      ['Hay que votar porque es lo que todos hacen.',
       'Votar es aburrido, así que no vale la pena.',
       'Participar en las elecciones permite elegir a quienes toman decisiones; por eso conviene informarse y votar.',
       'El candidato me cae bien, así que debo votar por él.'], 2,
      'Es el único enunciado que presenta una razón relacionada con la decisión y una conclusión coherente.',
      'Confundir la popularidad o la simpatía con razones.'),
    q('CC-08', CC, CC3, 'Perspectivas de comunidades afectadas', 'media',
      'En una discusión sobre un proyecto, una persona afirma que el proyecto afecta a una comunidad indígena cercana. ¿Qué debe hacer el grupo para evaluar el argumento?',
      ['Descartarlo porque viene de una persona de otro grupo', 'Votar sin escuchar la objeción', 'Ignorar el argumento para evitar conflictos', 'Revisar si los hechos son verificables y considerar la perspectiva de la comunidad afectada'], 3,
      'Evaluar un argumento exige revisar la evidencia y considerar las perspectivas de quienes pueden resultar afectados.',
      'Descalificar al hablante en lugar de evaluar el argumento.'),

    // ---------- Comunicación Escrita ----------
    q('CE-01', CE, CE1, 'Tesis', 'basica',
      '¿Qué debe contener la tesis de un texto argumentativo?',
      ['Una pregunta sin respuesta', 'Un resumen de la historia del tema', 'Una lista de citas textuales', 'Una posición clara que el texto justificará'], 3,
      'La tesis expresa la postura que el texto defenderá con argumentos.',
      'Escribir una introducción descriptiva sin postura.'),
    q('CE-02', CE, CE2, 'Organización del texto', 'basica',
      '¿Qué orden de partes favorece un texto argumentativo?',
      ['Conclusión, tesis y argumentos', 'Tesis, argumentos con evidencia y conclusión', 'Argumentos sin tesis y luego un saludo', 'Ejemplos sin orden aparente'], 1,
      'La tesis va primero, los argumentos la sustentan con evidencia y la conclusión cierra la postura.',
      'Escribir la conclusión antes de que existan argumentos.'),
    q('CE-03', CE, CE3, 'Precisión léxica', 'basica',
      '¿Cuál oración es más precisa?',
      ['Las cosas están muy mal y es un problema grave.', 'Hay cosas que pasan y eso no está bien.', 'Todo es malo en general.', 'El índice de desempleo juvenil aumentó tres puntos durante 2025.'], 3,
      'Dar un dato concreto y verificable es más preciso que usar expresiones vagas.',
      'Usar adjetivos generales en lugar de datos.'),
    q('CE-04', CE, CE2, 'Conectores', 'basica',
      'Para expresar contraste entre dos ideas, ¿qué conector es más adecuado?',
      ['Además', 'Sin embargo', 'Por ejemplo', 'En consecuencia'], 1,
      '«Sin embargo» marca contraste. «Además» suma, «por ejemplo» ilustra y «en consecuencia» indica causa.',
      'Usar «además» como si expresara contraste.'),
    q('CE-05', CE, CE1, 'Pertinencia', 'media',
      '¿Qué hace que un argumento sea pertinente en un texto de la prueba?',
      ['Responder la pregunta con una posición justificada', 'Usar palabras técnicas aunque no vengan al caso', 'Ser más largo que los demás', 'Citar muchas fuentes sin relación con el tema'], 0,
      'Un argumento es pertinente cuando responde la pregunta con una posición justificada. Si se desvía, no cumple esa condición.',
      'Escribir mucho sobre el tema sin responder la pregunta.'),
    q('CE-06', CE, CE3, 'Concordancia', 'basica',
      '¿Cuál oración contiene un error de concordancia?',
      ['Los estudiantes llegaron temprano.', 'El grupo decidió cambiar de tema.', 'Las niña llegó temprano.', 'Mis amigos vinieron a la reunión.'], 2,
      'El artículo «las» debe concordar con «niña», en singular: «la niña».',
      'Revisar solo el sentido y no la concordancia de género y número.'),
    q('CE-07', CE, CE2, 'Estructura del párrafo', 'basica',
      '¿Qué debe tener un párrafo bien construido?',
      ['Varias ideas sin relación entre sí', 'Una idea principal desarrollada con apoyo', 'Una sola oración sin desarrollo', 'Solo preguntas retóricas'], 1,
      'Un párrafo desarrolla una idea principal con ejemplos, datos o explicaciones.',
      'Juntar varias ideas en un párrafo sin desarrollar ninguna.'),
    q('CE-08', CE, CE3, 'Revisión automática y evaluación humana', 'media',
      '¿Cuál aspecto puede revisar un programa de forma automática con mayor confiabilidad?',
      ['Si la argumentación es convincente', 'La originalidad de la tesis', 'El tono adecuado para el lector', 'La presencia de conectores y la extensión del texto'], 3,
      'Los conectores y la extensión son medibles. La solidez de la argumentación o el tono requieren evaluación humana.',
      'Creer que un programa puede calificar la calidad argumentativa completa.'),

    // ---------- Inglés (preguntas en inglés, explicación en español) ----------
    q('EN-01', EN, EN1, 'Explicit information', 'basica',
      'Read: "The library opens at nine and closes at six." What time does it close?',
      ['Nine', 'Six', 'Seven', 'Eight'], 1,
      'La frase dice que cierra a las seis («closes at six»).',
      'Confundir la hora de apertura con la de cierre.'),
    q('EN-02', EN, EN1, 'Responses in conversation', 'basica',
      'Someone asks: "Could you help me with my homework?" Which reply is most appropriate?',
      ['Yes, I can help you.', 'It is on the table.', 'Here is the bus.', 'I am fine, thank you.'], 0,
      'Una respuesta adecuada a una petición de ayuda confirma o declina la ayuda.',
      'Responder con una frase que no corresponde a la pregunta.'),
    q('EN-03', EN, EN1, 'Verb agreement', 'basica',
      'Complete: She ___ to school every day.',
      ['go', 'goes', 'going', 'gone'], 1,
      'Con tercera persona singular en presente simple se añade -es o -s: «goes».',
      'Usar la forma base del verbo con he, she o it.'),
    q('EN-04', EN, EN1, 'Inference', 'media',
      'Maria put on her coat and grabbed an umbrella before leaving. What is the weather probably like?',
      ['Sunny and hot', 'Snowing heavily in summer', 'Windy and dry', 'Rainy or cold'], 3,
      'Llevar paraguas y abrigo sugiere lluvia o frío. Es una inferencia a partir de las acciones.',
      'Tomar una inferencia como dato explícito del texto.'),
    q('EN-05', EN, EN1, 'Vocabulary in context', 'media',
      'Read: "The meeting was postponed until Friday." What does "postponed" mean?',
      ['Cancelled forever', 'Held earlier', 'Held online', 'Moved to a later time'], 3,
      '«Postponed» significa aplazada a otro momento posterior.',
      'Confundir «postponed» con «cancelled».'),
    q('EN-06', EN, EN1, 'Past tense in a text', 'media',
      'The company ___ a new product last month, and sales have increased since then.',
      ['launches', 'launching', 'will launch', 'launched'], 3,
      '«Last month» indica pasado, así que se usa el pasado simple: «launched».',
      'Usar presente o futuro con una expresión de tiempo pasado.'),
    q('EN-07', EN, EN1, 'Signs and notices', 'basica',
      'A sign says: "Wet floor. Please walk carefully." Where is it most likely to be found?',
      ['In a hospital corridor or store floor', 'On a bus ticket', 'In a bank statement', 'On a restaurant menu'], 0,
      'Es un aviso de seguridad típico en pasillos o pisos recién limpiados.',
      'Elegir el lugar que contiene la palabra «floor» sin considerar el sentido.'),
    q('EN-08', EN, EN1, 'Attitude and emotion', 'media',
      'A customer says: "I have been waiting for 40 minutes." What is the customer probably feeling?',
      ['Happy and relaxed', 'Surprised by a gift', 'Bored of school', 'Frustrated'], 3,
      'Esperar mucho tiempo sin atención suele generar frustración.',
      'Interpretar la frase sin considerar el contexto emocional.')
  ];

  // Reparto de letras: cada pregunta se rota (i % 4) para que la respuesta correcta
  // no caiga siempre en la misma posición. El contenido de las opciones no cambia.
  questions = questions.map(function (item, i) {
    var k = i % 4;
    var n = item.opciones.length;
    var rotadas = item.opciones.map(function (_, j) { return item.opciones[(j + k) % n]; });
    var copia = JSON.parse(JSON.stringify(item));
    copia.opciones = rotadas;
    copia.correcta = (item.correcta - k + n) % n;
    return copia;
  });

  root.SPP.bankGenericos = {
    version: 1,
    questions: questions,
    competenciasPorModulo: {
      'Razonamiento Cuantitativo': [RC1, RC2, RC3],
      'Lectura Crítica': [LC1, LC2, LC3],
      'Competencias Ciudadanas': [CC1, CC2, CC3, CC4],
      'Comunicación Escrita': [CE1, CE2, CE3],
      'Inglés': [EN1]
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SPP.bankGenericos;
})(typeof window !== 'undefined' ? window : globalThis);
