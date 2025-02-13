// Import marked from CDN
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

// Get references to the input and preview elements
const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');

// Function to update the preview
function updatePreview() {
    const markdownText = markdownInput.value;
    markdownPreview.innerHTML = marked.parse(markdownText);
}

// Listen for input events
markdownInput.addEventListener('input', updatePreview);

// Initial render
updatePreview();