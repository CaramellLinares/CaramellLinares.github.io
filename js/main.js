const pdfUrl = 'assets/pdfs/carta_cafe.pdf'; // Ruta correcta al PDF

function loadPDF(url) {
    const container = document.getElementById('pdf-container');
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    container.appendChild(iframe);
}

document.addEventListener('DOMContentLoaded', () => {
    loadPDF(pdfUrl);
});