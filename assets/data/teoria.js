/* Saber Pro Prep - contenido de estudio de Diseño de Software.
 * Solo las unidades con `disponible: true` tienen contenido completo en esta versión.
 * Competencias de referencia: Guía de Diseño de Software Saber Pro 2026-2 (ICFES), afirmaciones 1 a 3.
 * La explicación es original de la app. El campo `fuente` indica la afirmación de la guía
 * a la que corresponde el tema; la asignación unidad-afirmación es un criterio de organización propio. */
(function (root) {
  'use strict';
  root.SPP = root.SPP || {};

  var A1 = 'Afirmación 1 de la guía 2026-2: identificar y formular el problema.';
  var A2 = 'Afirmación 2 de la guía 2026-2: analizar alternativas de solución y seleccionar la más adecuada.';
  var A3 = 'Afirmación 3 de la guía 2026-2: especificar, verificar y validar.';

  var unidades = [
    {
      id: 'u1', orden: 1, titulo: 'Identificación y formulación de problemas', disponible: true,
      objetivo: 'Separar el problema real de la solución que alguien ya propuso, y formularlo de forma que pueda evaluarse.',
      explicacion: [
        'Un problema describe una situación que no funciona como debería, para quién y con qué costo. Una solución describe qué se va a construir. Cuando se mezclan las dos, el equipo empieza a diseñar antes de entender qué debe resolver.',
        'Una buena formulación identifica quién sufre el problema, qué pasa hoy, qué debería pasar y cómo se sabrá que se logró. Si no se puede medir ese último punto, el problema todavía está mal planteado.',
        'Antes de diseñar conviene comprobar causas: un síntoma (los reportes llegan tarde) puede venir de un proceso manual, de la red o de la forma de almacenar los datos. Diseñar sobre el síntoma lleva a soluciones que no resuelven nada de fondo.'
      ],
      ejemplo: 'Un cliente pide «una aplicación móvil». El problema real es que los técnicos de campo no pueden consultar órdenes de trabajo sin conexión y pierden tiempo llamando a la oficina. La aplicación es una posible solución; el problema se formula como «reducir el tiempo de consulta de órdenes en zonas sin conexión».',
      escenarioRef: 'DS-001',
      errorFrecuente: 'Aceptar la solución pedida como si fuera el problema, sin preguntar qué necesidad la origina.',
      fuente: A1
    },
    {
      id: 'u2', orden: 2, titulo: 'Requisitos funcionales y no funcionales', disponible: true,
      objetivo: 'Distinguir qué debe hacer el sistema de cómo debe comportarse, y redactar requisitos que puedan verificarse.',
      explicacion: [
        'Un requisito funcional describe una acción o una respuesta del sistema: «registrar una orden», «generar un informe mensual». Un requisito no funcional describe una cualidad: rendimiento, seguridad, disponibilidad, facilidad de uso.',
        'Un requisito es útil solo si se puede comprobar. «El sistema debe ser rápido» no se puede verificar. «La consulta de una orden responde en menos de 2 segundos con 500 usuarios simultáneos» sí.',
        'Los requisitos se obtienen de los usuarios, de las normas y del contexto de operación. Conviene verificarlos con quienes los van a usar, porque muchos cambios costosos vienen de requisitos que nadie revisó.'
      ],
      ejemplo: 'Para un sistema de citas médicas: «el paciente puede cancelar una cita hasta 2 horas antes» es funcional. «Los datos personales se cifran en tránsito» es no funcional de seguridad. Ambos se pueden probar con un caso concreto.',
      escenarioRef: 'DS-001',
      errorFrecuente: 'Escribir requisitos no funcionales como adjetivos vagos («intuitivo», «robusto») que no permiten decidir si se cumplieron.',
      fuente: A1
    },
    {
      id: 'u2b', orden: 3, titulo: 'Restricciones de diseño', disponible: true,
      objetivo: 'Identificar los límites que no se negocian (presupuesto, plazo, normas, infraestructura) y tenerlos en cuenta antes de comparar soluciones.',
      explicacion: [
        'Una restricción limita las decisiones posibles. No es un deseo: si se incumple, la solución no sirve. Ejemplos típicos son el presupuesto máximo, la fecha de entrega, el lenguaje que la organización puede mantener o una norma de protección de datos.',
        'Las restricciones se separan de los requisitos porque no se priorizan igual: un requisito puede negociarse por otro, una restricción no. Una alternativa que viola una restricción se descarta, aunque sea muy buena en lo demás.',
        'Conviene listarlas al inicio. Si aparecen tarde, obligan a rehacer el diseño.'
      ],
      ejemplo: 'Una pequeña clínica tiene un presupuesto de software fijo y no tiene servidor propio. Esas dos condiciones descartan una arquitectura que exige clúster local, sin importar qué tan escalable sea.',
      escenarioRef: 'DS-002',
      errorFrecuente: 'Tratar una restricción como un requisito más y compensarla con otra característica, cuando la restricción debía cumplirse sin excepción.',
      fuente: A1
    },
    {
      id: 'u3', orden: 4, titulo: 'Análisis de alternativas', disponible: true,
      objetivo: 'Comparar varias soluciones con criterios que salen de los requisitos y las restricciones, y justificar por qué una es la más adecuada.',
      explicacion: [
        'Antes de elegir una solución hay que nombrar las alternativas viables. Una alternativa es viable si cumple las restricciones duras, como presupuesto, plazo o conectividad, aunque no sea la óptima.',
        'Luego se comparan las alternativas con criterios explícitos. Los criterios deben salir de los requisitos: si un requisito dice que la respuesta es inmediata sin conexión, ese es el criterio que pesa más.',
        'La decisión no es «la más completa», sino la que cumple mejor lo prioritario con el menor costo de complejidad. Una alternativa que el equipo no puede operar no es una buena alternativa.'
      ],
      ejemplo: 'Para un sistema de consulta de datos, se puede comparar un servidor central (fácil de mantener, depende de la red) frente a una caché local con sincronización (responde sin red, exige resolver conflictos de sincronización). Si el requisito principal es la respuesta sin conexión, la caché gana aunque sea más compleja.',
      escenarioRef: 'DS-003',
      errorFrecuente: 'Elegir la alternativa más sofisticada sin comprobar si cumple el requisito prioritario en las condiciones reales.',
      fuente: A2
    },
    {
      id: 'u4', orden: 5, titulo: 'Arquitectura de software', disponible: true,
      objetivo: 'Organizar un sistema en componentes con responsabilidades claras y reconocer patrones como MVC y las arquitecturas por capas.',
      explicacion: [
        'La arquitectura describe los componentes principales de un sistema, sus responsabilidades y cómo se comunican. Una buena arquitectura permite cambiar una parte sin reescribir todo lo demás.',
        'En MVC, el modelo guarda los datos y las reglas del negocio, la vista muestra la información y el controlador recibe las acciones del usuario y coordina las dos. Separar estas responsabilidades facilita probar la lógica sin depender de la pantalla.',
        'En una arquitectura por capas, cada capa solo usa a la que está debajo (por ejemplo, presentación, negocio y datos). Si la capa de presentación accede directamente a la base de datos, se rompe la separación y cada cambio se propaga.'
      ],
      ejemplo: 'Una tienda en línea separa el catálogo (datos y reglas de precios), la página web (vista) y el módulo de pagos (componente con su propia interfaz). Si el proveedor de pagos cambia, solo se reescribe ese componente.',
      escenarioRef: 'DS-025',
      errorFrecuente: 'Confundir la arquitectura con la lista de tecnologías. Un diagrama con cajas de «React», «MySQL» y «Node» no dice cómo se organizan las responsabilidades.',
      fuente: A2
    },
    {
      id: 'u5', orden: 6, titulo: 'Atributos de calidad', disponible: true,
      objetivo: 'Expresar la calidad del sistema (rendimiento, seguridad, disponibilidad, mantenibilidad) en escenarios medibles que guíen el diseño.',
      explicacion: [
        'Los atributos de calidad son propiedades que el sistema debe cumplir además de sus funciones: rendimiento, disponibilidad, seguridad, mantenibilidad, usabilidad. Muchas veces se contradicen: cifrar más datos da seguridad pero cuesta rendimiento.',
        'Para que sirvan al diseño se formulan como escenarios: fuente del estímulo, estímulo, entorno, respuesta y medida. Así se puede comprobar si la arquitectura lo cumple.',
        'El atributo más importante depende del problema. En un sistema de urgencias, la disponibilidad pesa más que el costo; en un sistema de nómina, la exactitud pesa más que la velocidad.'
      ],
      ejemplo: 'Escenario de disponibilidad: si el servidor de reportes falla durante una consulta en horario laboral, el usuario sigue operando el registro de ventas y el reporte se reanuda en menos de 5 minutos. Ese escenario se puede verificar con una prueba de falla.',
      escenarioRef: 'DS-005',
      errorFrecuente: 'Escribir atributos sin medida («el sistema será seguro») o marcar como prioritarios todos los atributos, lo que impide tomar decisiones.',
      fuente: A1
    },
    {
      id: 'u6', orden: 7, titulo: 'UML', disponible: true,
      objetivo: 'Usar diagramas de casos de uso, clases y secuencia para representar comportamiento y estructura, y comprobar que sean coherentes entre sí.',
      explicacion: [
        'UML ofrece varios tipos de diagrama. Los casos de uso muestran qué puede hacer cada actor con el sistema; los de clases, la estructura estática (clases, atributos, relaciones); los de secuencia, el orden de los mensajes entre objetos en un escenario.',
        'Cada diagrama muestra una vista. Lo que aparece en un caso de uso debe tener sentido en el diagrama de secuencia y en el de clases. Por ejemplo, si un caso de uso dice que el cliente paga, debe existir una clase o un mensaje que lo represente.',
        'La relación de herencia (generalización) se usa cuando una clase especializa a otra y cumple su contrato. No se usa solo para reutilizar código si la relación no es «es un».'
      ],
      ejemplo: 'En una biblioteca, el caso de uso «Prestar libro» incluye al usuario y al bibliotecario. El diagrama de secuencia muestra que primero se verifica el estado del usuario y luego se registra el préstamo; en el diagrama de clases deben existir Usuario, Libro y Préstamo con esas relaciones.',
      escenarioRef: 'DS-022',
      errorFrecuente: 'Dibujar diagramas aislados que se contradicen: el caso de uso menciona un paso que no aparece en la secuencia, o la clase no tiene el atributo que el diagrama de secuencia usa.',
      fuente: A3
    },
    {
      id: 'u7', orden: 8, titulo: 'Estructuras de datos', disponible: true,
      objetivo: 'Elegir la estructura de datos según las operaciones que más se usan y el tamaño de los datos.',
      explicacion: [
        'Cada estructura optimiza unas operaciones y encarece otras. Una lista permite recorrer en orden y agregar al final; una tabla hash busca por clave casi en tiempo constante; un árbol binario de búsqueda mantiene el orden pero depende de su equilibrio.',
        'La decisión sale de la operación frecuente. Si el sistema busca clientes por documento miles de veces al día, una búsqueda lineal sobre una lista se vuelve el cuello de botella; si solo se recorren los datos una vez, la lista basta.',
        'Antes de elegir, conviene anotar cuántos datos habrá, qué operaciones dominan y si el orden importa. Una estructura muy eficiente que el equipo no mantiene tampoco es la opción correcta.'
      ],
      ejemplo: 'Un sistema de turnos en un banco necesita atender por orden de llegada y consultar si un cliente ya tiene turno. Una cola para el orden y una tabla hash por documento para la consulta cubren las dos operaciones; usar solo una lista obligaría a recorrerla en cada consulta.',
      escenarioRef: 'DS-004',
      errorFrecuente: 'Elegir la estructura por costumbre o por lo que conoce el programador, sin mirar qué operación domina el uso real.',
      fuente: A2
    },
    {
      id: 'u8', orden: 9, titulo: 'Bases de datos', disponible: true,
      objetivo: 'Diseñar un modelo relacional con entidades, llaves y relaciones bien definidas, y reconocer cuándo una tabla tiene problemas de normalización.',
      explicacion: [
        'Una base relacional separa los datos en tablas. Cada tabla tiene una llave primaria que identifica cada fila, y las relaciones se expresan con llaves foráneas.',
        'Una relación de muchos a muchos (por ejemplo, estudiantes y cursos) no se guarda directamente en una tabla: se resuelve con una tabla intermedia que contiene las dos llaves foráneas. Guardar listas de valores en una sola columna rompe la normalización y dificulta consultar y actualizar.',
        'Normalizar reduce la duplicidad. Si el nombre de un curso aparece repetido en cada inscripción, al cambiarlo hay que corregir muchas filas y es fácil dejar datos inconsistentes.'
      ],
      ejemplo: 'Para registrar qué estudiantes cursan qué materias, se crea una tabla Inscripción con id_estudiante e id_materia, cuya combinación es única. El nombre de cada materia vive solo en la tabla Materia.',
      escenarioRef: 'DS-032',
      errorFrecuente: 'Guardar varios valores separados por comas en una columna, o repetir datos descriptivos en cada fila en lugar de referenciarlos.',
      fuente: A3
    },
    {
      id: 'u9', orden: 10, titulo: 'Metodologías de desarrollo', disponible: true,
      objetivo: 'Comparar modelos de ciclo de vida (secuencial, incremental, iterativo) y escoger el que se ajusta al grado de certeza de los requisitos.',
      explicacion: [
        'El modelo en cascada entrega cada fase en orden. Funciona cuando los requisitos son estables y están bien documentados, porque los cambios tardíos son costosos.',
        'Los modelos incrementales entregan partes funcionales que se van sumando. Son útiles cuando el valor se puede dividir en entregas y el cliente quiere retroalimentación temprana.',
        'Los modelos iterativos repiten ciclos de diseño, construcción y evaluación para refinar el producto. Son adecuados cuando los requisitos cambian o se descubren durante el desarrollo.'
      ],
      ejemplo: 'Un sistema de nómina con normas tributarias fijas y poco cambio puede seguir un modelo secuencial. Una aplicación nueva para un mercado que aún no entiende bien sus necesidades avanza mejor con entregas incrementales que validen cada parte.',
      escenarioRef: 'DS-014',
      errorFrecuente: 'Elegir una metodología por moda. La pregunta correcta es cuánto cambian los requisitos y qué tan pronto se necesita una entrega usable.',
      fuente: A3
    },
    {
      id: 'u10', orden: 11, titulo: 'Diseño de interfaces', disponible: true,
      objetivo: 'Diseñar pantallas que permitan completar la tarea del usuario con el menor esfuerzo posible, y que sean comprensibles.',
      explicacion: [
        'Una interfaz se diseña a partir de las tareas del usuario, no de los datos que el sistema guarda. Primero se identifica qué quiere lograr el usuario y en qué pasos.',
        'Algunos principios básicos: la información importante aparece primero, las acciones posibles son visibles, los mensajes de error explican qué pasó y cómo corregirlo, y la consistencia entre pantallas reduce el aprendizaje.',
        'La interfaz también debe ser accesible: contraste suficiente, tamaños de botón cómodos y no depender solo del color para transmitir un estado.'
      ],
      ejemplo: 'En un formulario de inscripción, mostrar el error junto al campo incorrecto y escribir «El documento debe tener 8 a 10 dígitos» es más útil que una alerta genérica que diga «Datos inválidos».',
      escenarioRef: 'DS-011',
      errorFrecuente: 'Diseñar la pantalla con los campos de la base de datos en lugar de con las tareas del usuario, o usar solo el color para indicar si algo está bien o mal.',
      fuente: A3
    },
    {
      id: 'u11', orden: 12, titulo: 'Especificación, verificación y validación', disponible: true,
      objetivo: 'Diferenciar verificar (¿el sistema está construido como se especificó?) de validar (¿es lo que el usuario necesita?) y planear pruebas para ambas.',
      explicacion: [
        'La verificación compara el producto con la especificación: se hacen revisiones, pruebas de unidad, de integración y de sistema para confirmar que cada requisito se cumple.',
        'La validación pregunta si el producto resuelve el problema real. Puede cumplir todos los requisitos y aun así no servir, si los requisitos estaban mal formulados. Por eso se valida con usuarios.',
        'Los requisitos verificables facilitan ambas tareas: si cada requisito tiene un criterio de aceptación claro, la prueba es directa.'
      ],
      ejemplo: 'Un requisito dice «el sistema calcula el descuento». Verificar es probar que, con un pedido de 100.000 y 10 % de descuento, el total sea 90.000. Validar es comprobar con clientes que el descuento se entiende y se aplica como esperan.',
      escenarioRef: 'DS-008',
      errorFrecuente: 'Confundir verificación con validación y dar por correcto un sistema solo porque pasó las pruebas técnicas.',
      fuente: A3
    }
  ];

  root.SPP.teoria = { unidades: unidades };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SPP.teoria;
})(typeof window !== 'undefined' ? window : globalThis);
