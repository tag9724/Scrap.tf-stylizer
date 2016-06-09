/* Let's change the textarea */

var BBCODE = [
    // Color
    function(text) {
        var re = /\[color=(\S+)\]([^[]*(?:\[(?!color=\S+\]|\/color\])[^[]*)*)\[\/color\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="color:$1">$2</span>');
        }
        return text;
    },
    // url
    function(text) {
        var re = /\[url=(\S+)\]([^[]*(?:\[(?!url=\S+\]|\/url\])[^[]*)*)\[\/url\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<a href="$1">$2</a>');
        }
        return text;
    },
    // underline
    function(text) {
        var re = /\[u]([^[]*(?:\[(?!u]|\/u\])[^[]*)*)\[\/u\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="text-decoration:underline">$1</span>');
        }
        return text;
    },
    // Italic
    function(text) {
        var re = /\[i]([^[]*(?:\[(?!i]|\/i\])[^[]*)*)\[\/i\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="font-style:italic;">$1</span>');
        }
        return text;
    },
    // line-through
    function(text) {
        var re = /\[s]([^[]*(?:\[(?!s]|\/s\])[^[]*)*)\[\/s\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="text-decoration: line-through;">$1</span>');
        }
        return text;
    },
    // bold
    function(text) {
        var re = /\[b]([^[]*(?:\[(?!b]|\/b\])[^[]*)*)\[\/b\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="font-weight: bold;">$1</span>');
        }
        return text;
    }
];

function ParseArea(ev) {
    // View the parsed content
    var c = raffleArea.value.replace(/\n/g, '<br/>');
    for (let i = 0, len = BBCODE.length; i < len; i++) c = BBCODE[i](c);
    content.innerHTML = c;
    // display the number of caracters left
    formatHelp.querySelector('#chars span').innerHTML = 3500 - raffleArea.value.length;
}

function DisplayArea() {
    content.style.display = "block";
}

function HideArea() {
    content.style.display = "none";
}

// Add the contentEditable
var raffleArea = document.getElementById('rafflemessage');
var content = document.createElement('p');
content.setAttribute('id', 'Content');
raffleArea.insertAdjacentElement('afterend', content);

// Add event
raffleArea.addEventListener('keyup', ParseArea);
raffleArea.addEventListener('focus', DisplayArea);
raffleArea.addEventListener('blur', HideArea);

/* Text formatting help */

function Put(bbcode) {
    raffleArea.value += bbcode;
}

var formatHelp = document.querySelector('#raffle-form > div:nth-child(2) > label > b');
formatHelp.innerHTML += "<div id='formatting'>" +
    "<i class='fa fa-bold' onclick='Put(\"[b][/b]\")'></i>" +
    "<i class='fa fa-underline' onclick='Put(\"[u][/u]\")'></i>" +
    "<i class='fa fa-italic' onclick='Put(\"[i][/i]\")'></i>" +
    "<i class='fa fa-strikethrough' onclick='Put(\"[s][/s]\")'></i>" +
    "<i class='fa fa-paint-brush' onclick='Put(\"[color=][/color]\")'></i>" +
    "<i class='fa fa-link' onclick='Put(\"[url=][/url]\")'></i>" +
    "<div id='chars'>left : <span>3500</span></div>" +
    "</div>";
