# Saber Pro Prep

Herramienta personal de práctica para el Saber Pro. **No es un producto oficial del ICFES.**
Las preguntas de este banco son originales de práctica; no son preguntas oficiales.

## Cómo abrirla en Windows

1. Descarga o copia la carpeta `saber-pro-prep`.
2. Haz doble clic en `index.html`. Se abre en tu navegador (Chrome, Edge o Firefox).

No necesitas instalar nada ni tener internet para practicar. La tipografía se carga desde
Google Fonts cuando hay conexión; sin ella se usa una fuente del sistema.

Si prefieres un servidor local (opcional):

```text
cd ruta\a\saber-pro-prep
python -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador.

## Qué funciona en esta versión

- **Inicio:** meta personal (un número libre), resumen del diagnóstico, teoría y siguiente paso.
- **Diagnóstico:** 50 preguntas: 10 de Diseño de Software y 8 de cada módulo genérico. El avance se guarda.
- **Simulacro y práctica:** eliges cuántas preguntas y si quieres límite de tiempo.
  - El temporizador usa la hora real. Si recargas la página, el tiempo sigue corriendo.
  - Si se agota el tiempo, la sesión se entrega sola.
  - El modo con límite no permite pausar.
- **Teoría:** las doce unidades de Diseño de Software tienen contenido completo (objetivo,
  explicación, ejemplo, error frecuente y fuente).
- **Consejos:** recomendaciones de estudio y lo que dice la guía oficial 2026-2 (cantidad de preguntas, escala, Comunicación Escrita).
- **Calculadora de puntaje global:** cuando recibas tus resultados, escribe los puntajes de cada módulo (0 a 300) y la app calcula el promedio. No guarda nada.
- **Próxima aplicación:** fechas del calendario ICFES (versión del 13/08/2026). Confirma siempre en icfes.gov.co.
- **Seguimiento:** también muestra el promedio por módulo, ponderado por número de preguntas.
- **Celular:** se adapta a pantallas de 375 px; el historial se muestra en tarjetas.
- **Sin conexión:** cuando la app se abre desde `http://localhost` o un servidor, se guarda
  en caché y sigue funcionando sin internet. Con doble clic en `index.html` no hay caché,
  pero la app funciona igual.
- **Seguimiento:** gráfico de evolución e historial, solo con resultados reales.
- **Datos:** exportar copia JSON, importar (se valida antes), borrar progreso.

## Limitaciones que debes conocer

- **Preguntas originales:** las 40 de Diseño de Software y las 40 de los módulos genéricos son originales, basadas en los temas y competencias de las guías del ICFES. No son preguntas oficiales.
- **Comunicación Escrita:** en la prueba real es una tarea abierta de texto argumentativo. Aquí se practican sus criterios con opción múltiple; la app no evalúa redacciones.
- **Teoría de módulos genéricos:** no existe todavía. Solo Diseño de Software tiene teoría.
- **Porcentajes internos:** los porcentajes son un indicador de práctica. No son puntajes
  oficiales del ICFES.
- **Duración:** la guía 2026-2 da 4 horas y 40 minutos para la sesión completa; no fija duración por módulo. El límite de tiempo es
  una decisión tuya en la pantalla de simulacro.
- **Datos locales:** el progreso se guarda solo en este navegador y en este equipo. No se
  sincroniza. Si borras los datos del navegador, se pierde. Exporta copias de seguridad.
- **Una sola fuente de verdad:** si usas la app en dos navegadores, cada uno tiene su propio progreso.

## Cómo añadir preguntas

Edita `assets/data/bank.js`. Cada pregunta necesita:

- `id` único (por ejemplo `DS-013`).
- `modulo`, `competencia`, `tema`, `dificultad`.
- `procedencia`: uno de `practica_original`, `oficial_verificada` o `pendiente_verificacion`.
  Usa `oficial_verificada` solo si la pregunta viene de una fuente oficial verificada.
- `enunciado`, `opciones` (exactamente 4), `correcta` (índice 0 a 3), `explicacion`
  y `errorFrecuente`.

Después ejecuta las pruebas (ver abajo). Fallarán si falta un campo o si hay un id repetido.

## Pruebas

Lógica (no necesita nada extra):

```text
node tests/run-tests.js
```

Interfaz (necesita Node.js y jsdom). En una carpeta aparte:

```text
npm install jsdom
```

Y luego, desde la carpeta del proyecto, indicando dónde está jsdom:

```text
set NODE_PATH=ruta\a\la\carpeta\con\node_modules
node tests/ui-smoke.js
```

Si jsdom no está instalado, la prueba de interfaz se omite y lo indica.

Las pruebas automáticas no reemplazan la revisión visual. Revisa la app en tu navegador
con la lista de `docs/plan-pruebas.md`.

## Fuentes

Ver `docs/matriz-fuentes.md` y `docs/investigacion-icfes.md`.
