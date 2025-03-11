// Get references to the input and preview elements
const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');

// Add this near the top with other constants
const themeSwitch = document.getElementById('theme-switch');

//! custom extensions for text highlighting
//highlighting rebuttals
const rebutHighlight = {
    type: 'lang',
    regex: /!r\s+([^#\n]+)/g, //type !r in markdown to highlight text in red
    replace: '<span style="background-color:rgb(253, 98, 92)">$1</span>'
};

//highlighting arguments
const arghighlight = {
    type: 'lang',
    regex: /!a\s+([^#\n]+)/g, //type !a in markdown to highlight text in green
    replace: '<span style="background-color:rgb(152, 249, 173)">$1</span>'
}

//highlighting worldbuilding
const worldbuildhighlight = {
    type: 'lang',
    regex: /!wb\s+([^#\n]+)/g, //type !wb in markdown to highlight text in yellow 
    replace:  '<span style="background-color:rgb(244, 247, 114)">$1</span>'
}

//! custom extension for blockquote highlighting for British Parliamentaries
const og1_highlight = {
    type: 'lang',
    regex: /!og1([\s\S]+?)(?=\n\n|$)/g, //type !og1 for custom block function: Opening Government 2nd speaker 
    replace: function(match, content) {
        return `> ##OG 1st speech (PM)\n${content.split('\n').map(line => '> ' + line).join('\n')}`;
    }
};

const og2_highlight = {
    type: 'lang',
    regex: /!og2([\s\S]+?)(?=\n\n|$)/g, //type !og2 for custom block functon: Opening Government's 1st speaker
    replace: function(match, content){
        return `> ##OG 2nd speech (DPM)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

const oo1_highlight = {
    type: 'lang',
    regex: /!oo1([\s\S]+?)(?=\n\n|$)/g, //type !oo1 for custom block function: Opening Opposition's 1st speaker
    replace: function(match, content){
        return `> ##OO 1st speech (LO)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

const oo2_highlight = {
    type: 'lang',
    regex: /!oo2([\s\S]+?)(?=\n\n|$)/g, //type !oo2 for custom block function: Openin Opposition's 2nd speaker
    replace: function(match, content){
        return `> ##OO 2nd speech (DLO)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

const cg1_highlight = {
    type: 'lang',
    regex: /!cg1([\s\S]+?)(?=\n\n|$)/g, //type !cg1 for custom block function: closing government's 1st speaker
    replace: function(match, content){
        return `> ##CG 1st speech (Gov Extension speaker)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

const cg2_highlight = {
    type: 'lang',
    regex: /!cg2([\s\S]+?)(?=\n\n|$)/g, //type !cg2 for custom block function: closing government 2nd speaker
    replace: function(match, content){
        return `> ##CG 2nd speech (Gov whip)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

const co1_highlight = {
    type: 'lang',
    regex: /!co1([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##CG 2nd speech (Opp extension speaker)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

const co2_highlight = {
    type: 'lang',
    regex: /!co2([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##CG 2nd speech (Opp whip)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//! blockquote highlighting for APDs
//custom blockquote highlight for Prime Minister's speech
const PM_highlight = {
    type: 'lang',
    regex: /!pm([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##PM speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//custom blockquote highlight for Deputy Prime Minister's speech
const DPM_highlight = {
    type: 'lang',
    regex: /!dpm([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##DPM speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

const Gwhip_highlight = {
    type: 'lang',
    regex: /!pm([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##PM speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//! custom highlighting for CDs



// Create converter instance and add extension
const converter = new showdown.Converter({
    extensions: [rebutHighlight, arghighlight, og1_highlight, worldbuildhighlight, og2_highlight, oo1_highlight, oo2_highlight, co1_highlight, co2_highlight, cg1_highlight, cg2_highlight, og1_highlight, og2_highlight, PM_highlight]
});


// Set basic options
converter.setOption('tables', true);
converter.setOption('strikethrough', true);
converter.setOption('breaks', true);
converter.setOption('simpleLineBreaks', true);

// Function to update the preview
function updatePreview() {
    const markdownText = markdownInput.value;
    markdownPreview.innerHTML = converter.makeHtml(markdownText);
}

// Listen for input events
markdownInput.addEventListener('input', updatePreview);

// Initial render
updatePreview();

// Add theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Add event listener for theme toggle, uses the toggleTHeme function when the toggle dark mode button
//is clicked
themeSwitch.addEventListener('click', toggleTheme);