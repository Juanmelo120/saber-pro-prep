/* Saber Pro Prep - banco de preguntas.
 * TODAS las preguntas de este archivo son ORIGINALES DE PRÁCTICA (procedencia: practica_original).
 * No son preguntas oficiales del ICFES. Afirmaciones tomadas de la Guía de Diseño de Software
 * Saber Pro 2026-2 (40 preguntas de selección múltiple con única respuesta).
 * Campos: id, modulo, competencia, tema, dificultad, procedencia, escenario (opcional),
 * enunciado, opciones (4), correcta (índice 0-3), explicacion, errorFrecuente. */
(function (root) {
  'use strict';
  root.SPP = root.SPP || {};

  var A1 = 'Afirmación 1: identificar y formular el problema';
  var A2 = 'Afirmación 2: analizar alternativas y seleccionar';
  var A3 = 'Afirmación 3: especificar, verificar y validar';
  var MOD = 'Diseño de Software';
  var PROC = 'practica_original';

  var questions = [
    {
      id: 'DS-001', modulo: MOD, competencia: A1, tema: 'Requisitos funcionales y no funcionales',
      dificultad: 'basica', procedencia: PROC,
      escenario: 'Una app de citas médicas debe permitir reservar una cita en menos de 2 segundos en redes móviles lentas y proteger los datos de salud de los pacientes.',
      enunciado: '¿Cuál de las siguientes es un requisito no funcional?',
      opciones: [
        'Permitir al paciente cancelar una cita reservada.',
        'Responder en menos de 2 segundos en redes móviles lentas.',
        'Enviar un recordatorio por SMS el día anterior.',
        'Mostrar el historial de citas del paciente.'
      ],
      correcta: 1,
      explicacion: 'Los requisitos no funcionales describen cualidades del sistema, como rendimiento, seguridad o disponibilidad. La opción B define un atributo de rendimiento. Las demás describen funciones que el sistema debe ofrecer.',
      errorFrecuente: 'Confundir una función con una cualidad: «enviar un SMS» es funcional; «hacerlo en menos de 2 segundos» es no funcional.'
    },
    {
      id: 'DS-002', modulo: MOD, competencia: A1, tema: 'Restricciones de diseño',
      dificultad: 'basica', procedencia: PROC,
      escenario: 'Un emprendimiento de dos desarrolladores necesita publicar su primera versión en tres meses. Tiene un presupuesto mensual bajo y no cuenta con personal de operaciones.',
      enunciado: '¿Qué debe guiar con mayor fuerza la decisión de arquitectura?',
      opciones: [
        'La preferencia personal del equipo por una tecnología nueva.',
        'El presupuesto, el plazo y la falta de personal de operaciones.',
        'El número de funciones que ofrece la competencia.',
        'La arquitectura que usa la empresa más grande del sector.'
      ],
      correcta: 1,
      explicacion: 'Las restricciones son condiciones que limitan las soluciones posibles: presupuesto, plazo y capacidades del equipo. Una arquitectura compleja que el equipo no puede operar viola esas restricciones, aunque sea técnicamente elegante.',
      errorFrecuente: 'Elegir una solución por moda o por lo que hacen otros, sin revisar las restricciones del caso.'
    },
    {
      id: 'DS-003', modulo: MOD, competencia: A2, tema: 'Análisis de alternativas de arquitectura',
      dificultad: 'media', procedencia: PROC,
      escenario: 'Una cooperativa necesita que sus socios consulten saldos desde zonas rurales con conexión intermitente. La respuesta debe ser inmediata y el presupuesto de servidores es limitado.',
      enunciado: '¿Qué alternativa es la más adecuada para el escenario?',
      opciones: [
        'Un servidor central que responde cada consulta en tiempo real.',
        'Una caché local en el dispositivo con sincronización periódica al servidor.',
        'Una arquitectura de microservicios por cada tipo de consulta.',
        'Una copia completa de la base de datos en cada oficina.'
      ],
      correcta: 1,
      explicacion: 'La caché local responde al instante sin conexión estable y reduce la carga del servidor. El servidor central falla sin red. Los microservicios aumentan la complejidad y el costo operativo sin resolver la conexión. Replicar la base en cada oficina es costoso y no resuelve la consulta del socio en campo.',
      errorFrecuente: 'Escoger la alternativa más «potente» sin comprobar si cumple el requisito de respuesta inmediata con conexión intermitente.'
    },
    {
      id: 'DS-004', modulo: MOD, competencia: A2, tema: 'Selección de estructuras de datos',
      dificultad: 'media', procedencia: PROC,
      escenario: 'Una aplicación almacena lecturas de miles de sensores. Con frecuencia debe recuperar la lectura más reciente de un sensor concreto.',
      enunciado: '¿Qué estructura permite recuperar la lectura de un sensor en tiempo constante promedio?',
      opciones: [
        'Una lista enlazada sin índice.',
        'Una tabla hash indexada por el identificador del sensor.',
        'Un arreglo ordenado con búsqueda binaria en cada consulta.',
        'Una cola de prioridad que se recorre completa en cada lectura.'
      ],
      correcta: 1,
      explicacion: 'Una tabla hash da acceso promedio en tiempo constante por clave. La lista enlazada exige recorrer nodos. La búsqueda binaria es logarítmica y obliga a mantener el orden. La cola de prioridad no está pensada para buscar por clave.',
      errorFrecuente: 'Usar una lista por simplicidad, sin considerar el costo de buscar por clave cuando hay muchos datos.'
    },
    {
      id: 'DS-005', modulo: MOD, competencia: A1, tema: 'Atributos de calidad',
      dificultad: 'basica', procedencia: PROC,
      escenario: 'Un sistema de pagos en línea debe seguir funcionando aunque falle uno de sus servidores.',
      enunciado: '¿Qué atributo de calidad describe mejor este requisito?',
      opciones: ['Usabilidad', 'Disponibilidad', 'Portabilidad', 'Mantenibilidad'],
      correcta: 1,
      explicacion: 'La disponibilidad mide qué tan accesible está el sistema cuando se le necesita, incluso ante fallas. La portabilidad se refiere a ejecutarlo en otros entornos, la mantenibilidad a modificarlo con facilidad y la usabilidad a su facilidad de uso.',
      errorFrecuente: 'Confundir disponibilidad (seguir funcionando) con rendimiento (qué tan rápido responde).'
    },
    {
      id: 'DS-006', modulo: MOD, competencia: A2, tema: 'Acoplamiento entre módulos',
      dificultad: 'media', procedencia: PROC,
      escenario: 'Un módulo de facturación debe avisar a un módulo de inventario cuando se emite una factura. Los equipos quieren poder cambiar cada módulo sin afectar al otro.',
      enunciado: '¿Qué mecanismo reduce más el acoplamiento entre ambos módulos?',
      opciones: [
        'Llamadas directas y síncronas de un módulo al otro.',
        'Variables globales compartidas por ambos módulos.',
        'Publicar un evento «factura emitida» que el módulo de inventario consume.',
        'Copiar el código de inventario dentro de facturación.'
      ],
      correcta: 2,
      explicacion: 'Con eventos, el emisor no conoce a los consumidores, así que cada módulo puede evolucionar por separado. Las llamadas directas y las variables globales crean dependencias fuertes. Copiar el código duplica la lógica.',
      errorFrecuente: 'Creer que desacoplar consiste solo en separar carpetas, sin cambiar la forma en que se comunican los módulos.'
    },
    {
      id: 'DS-007', modulo: MOD, competencia: A3, tema: 'Modelado con UML',
      dificultad: 'basica', procedencia: PROC,
      enunciado: 'Se quiere representar el orden de los mensajes que intercambian un cliente, un servicio de pagos y una base de datos durante una compra. ¿Qué diagrama UML es el más adecuado?',
      opciones: ['Diagrama de clases', 'Diagrama de secuencia', 'Diagrama de despliegue', 'Diagrama de componentes'],
      correcta: 1,
      explicacion: 'El diagrama de secuencia muestra las interacciones entre participantes a lo largo del tiempo. El de clases muestra estructura estática, el de despliegue muestra nodos físicos y el de componentes muestra módulos y sus interfaces.',
      errorFrecuente: 'Usar el diagrama de clases para mostrar un flujo: describe estructura, no el orden de los mensajes.'
    },
    {
      id: 'DS-008', modulo: MOD, competencia: A3, tema: 'Verificación y validación',
      dificultad: 'media', procedencia: PROC,
      escenario: 'El equipo revisa que el campo de correo rechace direcciones sin «@», tal como indica la especificación. Luego un grupo de usuarios prueba si completar la compra es fácil.',
      enunciado: '¿Qué pareja de actividades corresponde a verificación y a validación, en ese orden?',
      opciones: [
        'Verificación: revisar el cumplimiento de la especificación técnica. Validación: comprobar con usuarios que la solución satisface su necesidad.',
        'Verificación: comprobar con usuarios. Validación: revisar la especificación técnica.',
        'Verificación y validación son la misma actividad con distinto nombre.',
        'Verificación: corregir errores de sintaxis. Validación: compilar el código.'
      ],
      correcta: 0,
      explicacion: 'Verificación responde a «¿construimos bien el producto?» frente a la especificación. Validación responde a «¿construimos el producto correcto?» frente a la necesidad real del usuario.',
      errorFrecuente: 'Usar ambos términos como sinónimos, o reducir la verificación a errores de sintaxis.'
    },
    {
      id: 'DS-009', modulo: MOD, competencia: A3, tema: 'Diseño de bases de datos',
      dificultad: 'basica', procedencia: PROC,
      escenario: 'Un cliente puede realizar muchos pedidos, pero cada pedido pertenece a un único cliente.',
      enunciado: '¿Cuál es el diseño relacional adecuado?',
      opciones: [
        'Relación 1:1, con la clave del pedido guardada en la tabla de clientes.',
        'Relación 1:N, con una clave foránea de cliente en la tabla de pedidos.',
        'Relación N:M, con una tabla intermedia obligatoria.',
        'No relacionar las tablas y guardar el nombre del cliente como texto en cada pedido.'
      ],
      correcta: 1,
      explicacion: 'Un cliente tiene muchos pedidos y cada pedido tiene un solo cliente: es una relación 1:N. La clave foránea va en el lado «muchos». Guardar el nombre como texto en cada pedido pierde integridad referencial.',
      errorFrecuente: 'Poner la clave foránea en el lado equivocado de la relación.'
    },
    {
      id: 'DS-010', modulo: MOD, competencia: A3, tema: 'Metodologías de desarrollo',
      dificultad: 'basica', procedencia: PROC,
      escenario: 'Los requisitos de un proyecto cambian cada dos semanas según la retroalimentación de los usuarios. El cliente quiere ver avances funcionales con frecuencia.',
      enunciado: '¿Qué enfoque de desarrollo se ajusta mejor?',
      opciones: [
        'Modelo en cascada, sin cambios una vez terminada la fase de diseño.',
        'Desarrollo iterativo e incremental, con entregas funcionales frecuentes.',
        'Una única entrega al final del proyecto.',
        'Documentar todos los requisitos antes de hablar con el usuario.'
      ],
      correcta: 1,
      explicacion: 'Los enfoques ágiles, como Scrum o Kanban, entregan incrementos funcionales con frecuencia y aceptan cambios. El modelo en cascada resiste mal los cambios tardíos, y una entrega única retrasa la retroalimentación.',
      errorFrecuente: 'Aplicar una metodología rígida a un proyecto con requisitos inestables.'
    },
    {
      id: 'DS-011', modulo: MOD, competencia: A3, tema: 'Diseño de interfaces',
      dificultad: 'media', procedencia: PROC,
      escenario: 'En una pantalla de compra, el botón «Pagar» tiene el mismo color, tamaño y ubicación que los botones secundarios. Los usuarios tardan en encontrar la acción principal.',
      enunciado: '¿Qué cambio mejora más la jerarquía visual?',
      opciones: [
        'Dar el mismo peso visual a todas las acciones para que se vean equilibradas.',
        'Destacar la acción principal con contraste, tamaño y ubicación consistente, y dar menos peso a las secundarias.',
        'Ocultar las acciones secundarias en un menú sin texto.',
        'Reemplazar todos los textos por íconos sin etiqueta.'
      ],
      correcta: 1,
      explicacion: 'La jerarquía visual guía al usuario hacia la acción principal. Los íconos sin etiqueta y los menús ocultos dificultan la comprensión y la accesibilidad.',
      errorFrecuente: 'Tratar todos los elementos con el mismo peso, lo que obliga al usuario a buscar la acción principal.'
    },
    {
      id: 'DS-012', modulo: MOD, competencia: A3, tema: 'Especificación de requisitos verificables',
      dificultad: 'media', procedencia: PROC,
      enunciado: '¿Cuál de las siguientes especificaciones es verificable?',
      opciones: [
        'El sistema debe ser rápido.',
        'El sistema debe ser fácil de usar para cualquier persona.',
        'El sistema debe responder en 2 segundos o menos, en el percentil 95, con 500 usuarios concurrentes.',
        'El sistema debe ser moderno y elegante.'
      ],
      correcta: 2,
      explicacion: 'Una especificación verificable define una condición medible y un escenario de prueba. Las demás dependen de la interpretación subjetiva de quien las lee.',
      errorFrecuente: 'Escribir requisitos con adjetivos vagos que no se pueden probar.'
    },
    {
      id: 'DS-013', modulo: MOD, competencia: A3, tema: 'Gestión de configuración', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Un equipo debe integrar un sistema nuevo con uno heredado y necesita controlar versiones del código, cambios y líneas base. ¿Qué elemento es central?',
      opciones: [
        'Un repositorio de control de versiones con líneas base y registro de cambios',
        'Un diagrama de despliegue',
        'Un manual de usuario',
        'Una lista de precios del proveedor'
      ],
      correcta: 0,
      explicacion: 'La gestión de configuración controla versiones, cambios y líneas base de los productos. Un repositorio con historial de cambios permite saber qué versión está integrada y revertir si hace falta.',
      errorFrecuente: 'Confundir la gestión de configuración con la documentación para el usuario.'
    },
    {
      id: 'DS-014', modulo: MOD, competencia: A3, tema: 'Modelos de ciclo de vida', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      escenario: 'Un proyecto grande tiene riesgos técnicos altos y los requisitos todavía pueden cambiar. El equipo quiere evaluar riesgos en cada fase antes de avanzar.',
      enunciado: '¿Qué modelo de ciclo de vida se ajusta mejor?',
      opciones: [
        'Modelo de cascada puro, sin retorno a fases anteriores',
        'Codificar primero y planificar después',
        'Entrega única al final del proyecto',
        'Modelo en espiral, con evaluación de riesgos en cada ciclo'
      ],
      correcta: 3,
      explicacion: 'El modelo en espiral repite ciclos en los que se planifica, analiza riesgos, construye y evalúa. Permite revisar requisitos y decisiones en cada vuelta.',
      errorFrecuente: 'Elegir cascada en proyectos con riesgos altos y requisitos inestables.'
    },
    {
      id: 'DS-015', modulo: MOD, competencia: A3, tema: 'Pruebas de caja blanca', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Un tester revisa la lógica interna de un procedimiento: cubre cada decisión, cada ciclo y cada camino del código. ¿Qué tipo de prueba realiza?',
      opciones: [
        'Pruebas de caja negra',
        'Pruebas de aceptación',
        'Pruebas de carga',
        'Pruebas de caja blanca'
      ],
      correcta: 3,
      explicacion: 'Las pruebas de caja blanca se diseñan a partir de la estructura interna del código: decisiones, ciclos y caminos. Las de caja negra se basan solo en entradas y salidas.',
      errorFrecuente: 'Llamar caja negra a cualquier prueba que no mira el código, sin distinguir qué se cubre.'
    },
    {
      id: 'DS-016', modulo: MOD, competencia: A2, tema: 'Selección de arquitectura', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      escenario: 'Una empresa necesita que sus aplicaciones compartan servicios reutilizables, tiene muchas integraciones externas y distintos equipos mantienen cada servicio.',
      enunciado: '¿Qué arquitectura es la más adecuada?',
      opciones: [
        'Arquitectura orientada a servicios',
        'Un monolito único sin interfaces',
        'Una hoja de cálculo compartida',
        'Un solo programa de escritorio sin conexión a red'
      ],
      correcta: 0,
      explicacion: 'Una arquitectura orientada a servicios expone funciones reutilizables mediante interfaces claras y permite que equipos distintos mantengan cada servicio. Un monolito sin interfaces dificulta esa reutilización y la coordinación.',
      errorFrecuente: 'Elegir un monolito por simplicidad aunque las restricciones exijan reutilización entre equipos.'
    },
    {
      id: 'DS-017', modulo: MOD, competencia: A2, tema: 'Arquitectura de integración', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Nuevos componentes deben integrarse con aplicaciones existentes mediante mecanismos de coordinación, sin reescribir esas aplicaciones. ¿Qué arquitectura lo permite mejor?',
      opciones: [
        'Copiar los módulos antiguos dentro de los nuevos',
        'Reemplazar todo el sistema en una sola noche',
        'Una base de datos sin ninguna conexión',
        'Una arquitectura basada en mensajería o middleware de integración'
      ],
      correcta: 3,
      explicacion: 'El middleware o la mensajería coordinan componentes sin acoplarlos directamente y permiten integrar sistemas existentes sin reescribirlos. Copiar código o reemplazar todo ignora la restricción de no reescribir.',
      errorFrecuente: 'Proponer reemplazar sistemas existentes cuando la restricción pide integrarlos.'
    },
    {
      id: 'DS-018', modulo: MOD, competencia: A1, tema: 'Estudio de factibilidad', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Antes de iniciar un proyecto, el equipo evalúa si la solución es viable. ¿Cuál es el aspecto principal del estudio de factibilidad?',
      opciones: [
        'Escribir el código final del sistema',
        'Diseñar los colores de la interfaz',
        'Contratar el equipo de pruebas',
        'Verificar si la solución es viable con los recursos y restricciones disponibles'
      ],
      correcta: 3,
      explicacion: 'La factibilidad responde si la solución es viable técnica, económica y operativamente con los recursos y restricciones reales. Es una decisión previa al desarrollo.',
      errorFrecuente: 'Confundir factibilidad con planificación detallada o con el diseño visual.'
    },
    {
      id: 'DS-019', modulo: MOD, competencia: A3, tema: 'Estrategias de integración de pruebas', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Cuatro módulos deben combinarse en un sistema. ¿Qué estrategia reduce más el riesgo al combinarlos y probarlos por etapas?',
      opciones: [
        'No probar la integración hasta el final',
        'Probar solo el módulo final',
        'Integración incremental, combinando y probando los módulos por etapas',
        'Integrar los cuatro módulos de una vez sin pruebas intermedias'
      ],
      correcta: 2,
      explicacion: 'La integración incremental (de arriba hacia abajo o de abajo hacia arriba) localiza los errores en cada etapa, porque solo aparecen pocos cambios a la vez. Integrar todo de una vez dificulta encontrar la causa de una falla.',
      errorFrecuente: 'Dejar las pruebas de integración para el final, cuando la causa de los errores es difícil de aislar.'
    },
    {
      id: 'DS-020', modulo: MOD, competencia: A3, tema: 'Diseño de interfaces para comparar datos', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      escenario: 'El gerente general quiere comparar rápidamente los totales de ventas entre varios periodos.',
      enunciado: '¿Qué interfaz es la más adecuada?',
      opciones: [
        'Un informe narrativo de texto de varias páginas',
        'Una lista de registros sin ordenar',
        'Un gráfico de barras o un tablero con comparación directa',
        'Una pantalla con animaciones decorativas'
      ],
      correcta: 2,
      explicacion: 'Para comparar cantidades, un gráfico de barras o un tablero facilita ver diferencias de un vistazo. El texto narrativo y las listas sin ordenar obligan a hacer la comparación mentalmente.',
      errorFrecuente: 'Elegir una presentación de texto cuando la tarea del usuario es comparar cifras.'
    },
    {
      id: 'DS-021', modulo: MOD, competencia: A2, tema: 'Patrones de diseño: recorrido de colecciones', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Se quiere recorrer los elementos de una colección sin depender de su implementación interna. ¿Qué patrón es el adecuado?',
      opciones: [
        'Patrón Iterador',
        'Patrón Singleton',
        'Patrón Prototype',
        'Patrón Adapter'
      ],
      correcta: 0,
      explicacion: 'El patrón Iterador ofrece una forma uniforme de recorrer una colección sin exponer su estructura interna. Singleton limita una instancia, Prototype copia objetos y Adapter cambia interfaces.',
      errorFrecuente: 'Usar Singleton o Adapter para problemas de recorrido de colecciones.'
    },
    {
      id: 'DS-022', modulo: MOD, competencia: A3, tema: 'Consistencia entre diagramas UML', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Un diagrama de secuencia muestra que la clase A invoca un método de la clase B. ¿Qué debe ser cierto en el diagrama de clases para que sea consistente?',
      opciones: [
        'Nada: los diagramas son independientes entre sí',
        'La clase B debe desaparecer del modelo',
        'La clase A debe ser una interfaz',
        'Debe existir una asociación o dependencia de A hacia B, y B debe ofrecer ese método'
      ],
      correcta: 3,
      explicacion: 'Los diagramas de un mismo modelo deben ser coherentes. Si la secuencia muestra una llamada de A a B, el diagrama de clases debe mostrar la relación que la permite y el método en B.',
      errorFrecuente: 'Tratar los diagramas de secuencia y de clases como documentos sin relación entre sí.'
    },
    {
      id: 'DS-023', modulo: MOD, competencia: A3, tema: 'Pruebas de unidad y de integración', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Un módulo de cálculo de impuestos funciona bien aislado, pero falla al recibir los datos que le envía el módulo de facturación. ¿Qué tipo de prueba debía detectarlo?',
      opciones: [
        'Prueba de unidad',
        'Prueba de estrés',
        'Prueba de usabilidad',
        'Prueba de integración'
      ],
      correcta: 3,
      explicacion: 'Las pruebas de unidad validan cada componente aislado. Un fallo al recibir datos de otro módulo es un problema de interfaz entre componentes, y lo detecta una prueba de integración.',
      errorFrecuente: 'Confiar en pruebas de unidad para detectar errores que solo aparecen al combinar módulos.'
    },
    {
      id: 'DS-024', modulo: MOD, competencia: A2, tema: 'Patrón Observer', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Varias vistas de una aplicación deben actualizarse automáticamente cuando cambia la calificación de un estudiante. ¿Cuál es la forma correcta de diseñarlo?',
      opciones: [
        'Usar el patrón Observer: el sujeto notifica a los observadores registrados cuando cambia',
        'Duplicar la calificación en cada vista',
        'Usar una variable global que cada vista lee sin avisos',
        'Hacer que cada vista consulte la base de datos cada segundo sin sincronizarse'
      ],
      correcta: 0,
      explicacion: 'Observer desacopla el sujeto de las vistas: cuando cambia el dato, el sujeto avisa a todos los observadores registrados. Duplicar datos o consultar sin control produce inconsistencias.',
      errorFrecuente: 'Duplicar el dato en varias vistas, lo que hace que se desincronicen.'
    },
    {
      id: 'DS-025', modulo: MOD, competencia: A3, tema: 'Arquitectura MVC', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'En el patrón MVC, ¿qué componente representa los objetos del problema real y sus reglas de negocio?',
      opciones: [
        'Vista',
        'Enrutador',
        'Modelo',
        'Controlador'
      ],
      correcta: 2,
      explicacion: 'El modelo contiene los datos y las reglas del problema. La vista presenta información y el controlador coordina entradas del usuario.',
      errorFrecuente: 'Poner la lógica de negocio en la vista o en el controlador.'
    },
    {
      id: 'DS-026', modulo: MOD, competencia: A3, tema: 'Herencia', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'La clase C2 debe tener todos los atributos de C1 y además sus propios atributos. ¿Cuál es la mejor forma de definirla?',
      opciones: [
        'Copiar todos los atributos de C1 dentro de C2',
        'Heredar de C1 y declarar en C2 solo los atributos nuevos',
        'Crear C2 sin relación con C1',
        'Declarar C1 dentro de C2 como un atributo más'
      ],
      correcta: 1,
      explicacion: 'La herencia reutiliza los atributos y comportamientos de la superclase. Copiarlos duplica código y complica el mantenimiento.',
      errorFrecuente: 'Copiar atributos en lugar de heredarlos, lo que duplica código.'
    },
    {
      id: 'DS-027', modulo: MOD, competencia: A3, tema: 'Operaciones estáticas', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: '¿Por qué una operación de una clase puede ejecutarse sin crear un objeto de esa clase?',
      opciones: [
        'Porque el objeto siempre existe en memoria',
        'Porque la operación es privada',
        'Porque la clase es una interfaz',
        'Porque la operación es estática, es decir, pertenece a la clase'
      ],
      correcta: 3,
      explicacion: 'Una operación estática pertenece a la clase y no a una instancia, así que se invoca sobre la clase directamente.',
      errorFrecuente: 'Confundir operaciones de instancia con operaciones de clase.'
    },
    {
      id: 'DS-028', modulo: MOD, competencia: A3, tema: 'Sobrescritura de métodos', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Una subclase necesita redefinir un método de su superclase con otro comportamiento. ¿Qué debe permitir la superclase?',
      opciones: [
        'Que el método no tenga nombre',
        'Que el método sea estático sin excepciones',
        'Que el método sea final o privado',
        'Que el método sea virtual o sobrescribible'
      ],
      correcta: 3,
      explicacion: 'Solo los métodos marcados como sobrescribibles (virtuales en muchos lenguajes) pueden redefinirse en subclases. Los finales o privados no se pueden redefinir.',
      errorFrecuente: 'Marcar como final un método que luego se necesita redefinir.'
    },
    {
      id: 'DS-029', modulo: MOD, competencia: A3, tema: 'Desarrollo basado en componentes', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: '¿Por qué el desarrollo basado en componentes puede reducir el tiempo y los recursos de prueba?',
      opciones: [
        'Porque los componentes nunca cambian',
        'Porque no se necesitan pruebas',
        'Porque los componentes reutilizados ya fueron probados y se concentran las pruebas en la integración',
        'Porque se prueban solo en producción'
      ],
      correcta: 2,
      explicacion: 'Si un componente reutilizado ya está probado, el esfuerzo se concentra en comprobar cómo se integra con el resto del sistema.',
      errorFrecuente: 'Suponer que un componente reutilizado no requiere ninguna verificación en su nuevo contexto.'
    },
    {
      id: 'DS-030', modulo: MOD, competencia: A1, tema: 'Técnicas de elicitación de requisitos', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'El equipo debe obtener requisitos de un proceso de intercambio de productos entre empresas, con pasos y reglas precisas. ¿Qué técnica es la más adecuada?',
      opciones: [
        'Modelar el proceso (por ejemplo, con diagramas de flujo o BPMN) y validarlo con los usuarios',
        'Una encuesta de una sola pregunta',
        'Observar el proceso sin registrar nada',
        'Entrevistas abiertas sin ningún guion'
      ],
      correcta: 0,
      explicacion: 'Modelar el proceso permite describir pasos, reglas y excepciones, y validarlo con quienes lo ejecutan. Las técnicas sin registro o sin guion dejan requisitos ambiguos.',
      errorFrecuente: 'Recoger requisitos de procesos complejos solo con entrevistas abiertas, sin modelarlos.'
    },
    {
      id: 'DS-031', modulo: MOD, competencia: A2, tema: 'Tolerancia a fallas en pagos', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      escenario: 'Un sistema de compras recibe pagos lentos y, a veces, cobros duplicados.',
      enunciado: '¿Qué diseño es el más adecuado?',
      opciones: [
        'Cancelar la compra al primer retraso',
        'Cobrar de nuevo automáticamente si no hay respuesta',
        'Ocultar el problema al cliente sin registrar nada',
        'Usar identificadores únicos de transacción para evitar duplicados y confirmar cada reintento'
      ],
      correcta: 3,
      explicacion: 'Un identificador por transacción permite reconocer reintentos y evitar cobros duplicados; la confirmación explícita garantiza que el estado sea consistente.',
      errorFrecuente: 'Reintentar pagos sin identificar la transacción, lo que duplica cobros.'
    },
    {
      id: 'DS-032', modulo: MOD, competencia: A3, tema: 'Normalización de relaciones N:M', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Un estudiante puede inscribirse en varios cursos, y un curso tiene varios estudiantes. ¿Cómo se normaliza esta relación?',
      opciones: [
        'Guardar todos los cursos en una sola columna de texto',
        'Crear una tabla por cada estudiante',
        'Una tabla de inscripciones con clave compuesta (estudiante, curso)',
        'Una tabla con estudiante y curso como columnas repetidas'
      ],
      correcta: 2,
      explicacion: 'Una relación muchos a muchos se resuelve con una tabla intermedia cuya clave combina las dos claves foráneas, evitando redundancias.',
      errorFrecuente: 'Guardar listas dentro de una columna, lo que viola la normalización.'
    },
    {
      id: 'DS-033', modulo: MOD, competencia: A3, tema: 'Modelo de dominio', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Un artista es un tipo de usuario que publica obras. ¿Qué modelo conceptual lo representa mejor?',
      opciones: [
        'Un diagrama de estados sin clases',
        'Un diagrama de actividades de la interfaz',
        'Un diagrama de despliegue',
        'Un diagrama de dominio con una generalización (Artista es un Usuario) y la relación de publicar obras'
      ],
      correcta: 3,
      explicacion: 'El modelo de dominio representa conceptos del problema y sus relaciones. La generalización expresa que artista es una especialización de usuario.',
      errorFrecuente: 'Usar diagramas de despliegue o de actividades para modelar conceptos del dominio.'
    },
    {
      id: 'DS-034', modulo: MOD, competencia: A3, tema: 'Casos de uso: comportamiento opcional', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'En un caso de uso de compra, el comprador puede o no donar durante el pago. ¿Cómo se representa en UML?',
      opciones: [
        'Con una asociación de herencia',
        'No se representa',
        'Con una relación «include» obligatoria',
        'Con una relación «extend» que agrega la donación como comportamiento opcional'
      ],
      correcta: 3,
      explicacion: 'La relación «extend» expresa un comportamiento opcional que se agrega al caso de uso base bajo ciertas condiciones. «Include» se usa para comportamiento obligatorio y reutilizado.',
      errorFrecuente: 'Usar «include» para algo que es opcional.'
    },
    {
      id: 'DS-035', modulo: MOD, competencia: A1, tema: 'Requisitos funcionales', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: '¿Cuál de las siguientes es un requisito funcional?',
      opciones: [
        'El sistema debe generar un reporte mensual de ventas en PDF.',
        'El sistema debe ser seguro.',
        'El sistema debe ser elegante.',
        'El sistema debe ser barato de mantener.'
      ],
      correcta: 0,
      explicacion: 'Un requisito funcional describe una acción o servicio concreto que el sistema debe ofrecer. Las demás opciones describen cualidades o restricciones, y no son verificables sin más detalle.',
      errorFrecuente: 'Confundir cualidades (seguridad, costo) con funciones concretas.'
    },
    {
      id: 'DS-036', modulo: MOD, competencia: A2, tema: 'Estructuras lineales', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Las solicitudes deben atenderse en el orden en que llegaron. ¿Qué estructura de datos corresponde?',
      opciones: [
        'Árbol binario',
        'Cola (FIFO)',
        'Grafo dirigido',
        'Pila (LIFO)'
      ],
      correcta: 1,
      explicacion: 'Una cola atiende primero al elemento que llegó primero (FIFO). Una pila atiende primero al último que llegó (LIFO).',
      errorFrecuente: 'Usar una pila cuando el orden de atención es el de llegada.'
    },
    {
      id: 'DS-037', modulo: MOD, competencia: A2, tema: 'Búsqueda en colecciones ordenadas', dificultad: 'media', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Un catálogo ordenado de un millón de productos debe buscarse por código con eficiencia. ¿Qué método es el más adecuado?',
      opciones: [
        'Recorrido lineal desde el primer elemento',
        'Búsqueda binaria sobre el arreglo ordenado',
        'Una pila que se vacía en cada consulta',
        'Una lista enlazada sin índice'
      ],
      correcta: 1,
      explicacion: 'La búsqueda binaria aprovecha el orden y requiere pocas comparaciones incluso con un millón de elementos. El recorrido lineal y la lista sin índice revisan muchos más datos.',
      errorFrecuente: 'Usar recorrido lineal en colecciones grandes ya ordenadas.'
    },
    {
      id: 'DS-038', modulo: MOD, competencia: A1, tema: 'Requisitos no funcionales de seguridad', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Un banco exige que los datos de los clientes estén cifrados mientras viajan por la red. ¿Qué tipo de requisito es?',
      opciones: [
        'Requisito no funcional de seguridad',
        'Requisito funcional de reportes',
        'Caso de uso de consulta de saldo',
        'Restricción de costo del proyecto'
      ],
      correcta: 0,
      explicacion: 'El cifrado en tránsito es una cualidad del sistema relacionada con seguridad, es decir, un requisito no funcional. No describe una función de negocio.',
      errorFrecuente: 'Clasificar como funcional cualquier requisito que aparece en una pantalla.'
    },
    {
      id: 'DS-039', modulo: MOD, competencia: A3, tema: 'Validación con usuarios', dificultad: 'basica', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      enunciado: 'Los usuarios confirman que el flujo de compra resuelve su necesidad real. ¿Qué actividad se realizó?',
      opciones: [
        'Compilación',
        'Depuración',
        'Verificación',
        'Validación'
      ],
      correcta: 3,
      explicacion: 'Validar es comprobar que el producto resuelve la necesidad del usuario. Verificar es comprobar que cumple la especificación técnica.',
      errorFrecuente: 'Usar verificación y validación como sinónimos.'
    },
    {
      id: 'DS-040', modulo: MOD, competencia: A2, tema: 'Criterios de selección entre alternativas', dificultad: 'alta', procedencia: PROC,
      fuenteTema: 'Tema de la guía de Diseño de Software (cuadernillo liberado 2018, índice de temas)',
      escenario: 'Entre dos alternativas, una cuesta menos pero exige más mantenimiento; la otra cuesta más y es simple de operar. El presupuesto es prioritario y el equipo es pequeño.',
      enunciado: '¿Qué decisión está mejor justificada?',
      opciones: [
        'La más cara, porque siempre es mejor',
        'Ninguna, porque no se pueden comparar',
        'La que tenga más funciones aunque no se usen',
        'La más barata, siempre que el equipo pueda mantenerla; el costo de mantenimiento debe incluirse en la comparación'
      ],
      correcta: 3,
      explicacion: 'La comparación debe incluir el costo total, no solo el de compra. Con un equipo pequeño, el mantenimiento pesa tanto como el precio inicial, y el presupuesto es prioritario.',
      errorFrecuente: 'Comparar solo el precio inicial y olvidar el costo de mantenimiento.'
    }
  ];

  root.SPP.bank = {
    version: 1,
    procedenciasPermitidas: ['oficial_verificada', 'practica_original', 'pendiente_verificacion'],
    competencias: { modulo: MOD, afirmaciones: [A1, A2, A3] },
    questions: questions
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SPP.bank;
})(typeof window !== 'undefined' ? window : globalThis);
