// Get references to the input and preview elements
const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');

//grabbing the theme-switch button id for the event listener
// Add this near the top with other constants
const themeSwitch = document.getElementById('theme-switch');

//! custom extensions for text highlighting, dont forget add any extensions to the showdown converter
//! or the syntax wont register in the markdown preview.
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
    replace: function(match, content){ //type !co1 for custom block function: Closing Oppositin 1st speaker
        return `> ##CG 2nd speech (Opp extension speaker)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

const co2_highlight = {
    type: 'lang',
    regex: /!co2([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){ //type !co2 for custom block function: Closing Opposition 2nd speaker
        return `> ##CG 2nd speech (Opp whip)\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//! blockquote highlighting for APDs
//custom blockquote highlight for Prime Minister's speech: type !pm
const PM_highlight = {
    type: 'lang',
    regex: /!pm([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##PM speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//custom blockquote highlight for Leader of Opposition's speech: type !lo
const Lo_highlight = {
    type: 'lang',
    regex: /!lo([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##LO speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//custom blockquote highlight for Deputy Prime Minister's speech
const DPM_highlight = {
    type: 'lang',
    regex: /!dpm([\s\S]+?)(?=\n\n|$)/g, //type !dpm for custom block quote: Deputy prime minister's speech
    replace: function(match, content){
        return `> ##DPM speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//custom blockquote highlight for DLO's speech
const DLO_highlight = {
    type: 'lang',
    regex: /!dlo([\s\S]+?)(?=\n\n|$)/g, //type !dlo for custom block quote: Deputy prime minister's speech
    replace: function(match, content){
        return `> ##DLO speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//custom blockquote highlight for Gov whip's speech
const Gwhip_highlight = {
    type: 'lang',
    regex: /!gw([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##Gov whip speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//custom blockquote highlight for opp whip's speech
const Owhip_highlight = {
    type: 'lang',
    regex: /!ow([\s\S]+?)(?=\n\n|$)/g,
    replace: function(match, content){
        return `> ##Opp whip speech\n${content.split('\n').map(line => '> ' + line).join('\n')}`
    }
}

//! custom highlighting for CDs



// Create converter instance and add all extension functions
const converter = new showdown.Converter({
    extensions: [rebutHighlight, arghighlight, og1_highlight, worldbuildhighlight, 
        og2_highlight, oo1_highlight, oo2_highlight, co1_highlight, co2_highlight, 
        cg1_highlight, cg2_highlight, og1_highlight, og2_highlight, PM_highlight, 
    DPM_highlight, Gwhip_highlight, DLO_highlight, Owhip_highlight, Lo_highlight]
});


// Set basic options
converter.setOption('tables', true); //enables markdown table syntax
converter.setOption('strikethrough', true); //enables ~~strikethrough~~ text in markdown
converter.setOption('breaks', true); //enables single line breaks to create new lines, without this you would need two line breaks for a new paragraph
converter.setOption('simpleLineBreaks', true); //treat single line breaks as <br> without needing two spaces at the end

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
    const currentTheme = document.documentElement.getAttribute('data-theme'); //get the current theme of the window
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; //set the new theme to the switched theme, if light mode is detected in currentTheme, set newTheme to dark and vice versa
    document.documentElement.setAttribute('data-theme', newTheme); //set the value of newTheme to data-theme variable
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Add event listener for theme toggle, uses the toggleTHeme function when the toggle dark mode button
//is clicked
themeSwitch.addEventListener('click', toggleTheme);