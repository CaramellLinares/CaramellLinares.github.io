// js/main.js
(function () {
  const url = 'assets/pdfs/carta_cafe.pdf';
  const pdfContainer = document.getElementById('pdf-container');

  // Mensaje de carga
  const status = document.createElement('div');
  status.className = 'pdf-status';
  status.textContent = 'Cargando PDF…';
  pdfContainer.appendChild(status);

  // PDF.js setup
  const pdfjsLib = window['pdfjs-dist/build/pdf'];
  // Worker (obligatorio para rendimiento y compatibilidad)
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

  // Cargar documento
  pdfjsLib.getDocument(url).promise
    .then(async (pdf) => {
      status.textContent = `PDF cargado. Páginas: ${pdf.numPages}`;
      // Renderizar todas las páginas
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        // Viewport base (escala 1)
        const baseViewport = page.getViewport({ scale: 1 });

        // Escala según ancho del contenedor (responsive)
        const containerWidth = pdfContainer.clientWidth - 32; // padding approx
        const scale = Math.min(2, containerWidth / baseViewport.width); // límite 2x
        const viewport = page.getViewport({ scale: scale > 0 ? scale : 1 });

        // Canvas por página
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page';
        const context = canvas.getContext('2d', { alpha: false });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        // Render
        await page.render({ canvasContext: context, viewport }).promise;

        pdfContainer.appendChild(canvas);
      }

      // Quitar el mensaje de estado tras renderizar
      status.remove();
    })
    .catch((err) => {
      status.textContent = 'No se pudo cargar el PDF. ';
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'Abrir en pestaña nueva';
      status.appendChild(a);
      console.error('PDF error:', err);
    });

  // Re-render básico si cambia el tamaño de la ventana (opcional y simple):
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => location.reload(), 200); // recarga rápida para recalcular escalas
  });
})();
