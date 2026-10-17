# Plan de pruebas

## Automáticas

| Comando | Qué cubre | Resultado en esta versión |
|---|---|---|
| `node tests/run-tests.js` | Banco (identificadores, opciones, respuestas válidas, procedencia), cálculo de resultados, temporizador, sesiones, persistencia y respaldo de datos corruptos | 49 de 49 correctas |
| `node tests/contraste.js` | Contraste WCAG de 12 combinaciones de texto y fondo de la hoja de estilos | 12 de 12 cumplen (mínimo 4.5:1) |
| `node tests/ui-smoke.js` | Flujo completo en un navegador simulado: inicio, diagnóstico, respuestas, entrega, revisión, seguimiento, teoría, simulacro con reloj, meta, sin errores de consola | 21 de 21 correctas (requiere jsdom) |

## Manuales (pendientes en el equipo del usuario)

Estas pruebas requieren un navegador real. Marca cada una al probarla en Windows.

- [ ] Doble clic en `index.html` abre la app sin errores.
- [ ] Chrome: el diagnóstico se completa, se recarga la página y el avance sigue.
- [ ] Edge: lo mismo.
- [ ] Firefox: lo mismo.
- [ ] Simulacro con 2 minutos: al recargar a mitad, el reloj sigue bajando; al agotarse, se entrega solo.
- [ ] Exportar copia, borrar progreso, importar la copia: los datos vuelven.
- [ ] Importar un archivo que no es JSON: aparece un mensaje claro y no se borran los datos.
- [ ] Celular o ventana de 375 px: no hay desplazamiento horizontal y los botones se pueden tocar.
- [ ] Navegación solo con teclado: el foco siempre se ve y el orden tiene sentido.
- [ ] Contraste: revisar con un verificador de contraste (texto normal 4.5:1 mínimo).
- [ ] Con movimiento reducido activado en Windows: no hay animaciones.
- [ ] Celular (375 px): ninguna pantalla se desplaza horizontalmente; el historial se lee en tarjetas; la calculadora de puntaje muestra el promedio.
- [ ] Celular: el diagnóstico se responde con el dedo sin tocar otras opciones por error.
- [ ] Sin conexión: abrir desde `http://localhost`, cargar una vez, cortar la red y recargar. La app debe abrir.
- [ ] Doble clic en `index.html` no muestra errores por el service worker (no se registra con file://).

## Limitaciones de esta verificación

- No se ha probado en navegadores reales ni en Windows. Solo en un DOM simulado.
- El contraste se calcula con la fórmula WCAG en `tests/contraste.js` para las combinaciones principales, no para cada pantalla.
- El modo sin conexión no se ha probado en un navegador real; solo se comprueba que los archivos del caché existan.
