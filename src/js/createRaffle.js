/* Let's change the textarea */
function ParseArea(ev) {
    // View the parsed content
    var c = raffleArea.value.replace(/\n/g, '<br/>');
    for (let i = 0, len = BBCODE.length; i < len; i++) c = BBCODE[i](c);
    content.innerHTML = c;
    // display the number of caracters left
    document.querySelector('#chars span').textContent = 3500 - raffleArea.value.length;
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

var formatHelp = document.querySelector('#raffle-form > div:nth-child(2) > label > b');
formatHelp.outerHTML += "<div class='formattingHelp'>" +
    "<i class='fa fa-bold' onclick='document.getElementById(\"rafflemessage\").value += \"[b][/b]\"'></i>" +
    "<i class='fa fa-underline' onclick='document.getElementById(\"rafflemessage\").value += \"[u][/u]\"'></i>" +
    "<i class='fa fa-italic' onclick='document.getElementById(\"rafflemessage\").value += \"[i][/i]\"'></i>" +
    "<i class='fa fa-strikethrough' onclick='document.getElementById(\"rafflemessage\").value += \"[s][/s]\"'></i>" +
    "<i class='fa fa-eye-slash' onclick='document.getElementById(\"rafflemessage\").value += \"[color=#f7f9fa][/color]\"'></i>" +
    "<i class='fa fa-paint-brush' onclick='document.getElementById(\"rafflemessage\").value += \"[color=][/color]\"'></i>" +
    "<i class='fa fa-link' onclick='document.getElementById(\"rafflemessage\").value += \"[url=][/url]\"'></i>" +
    "<div id='chars'>left : <span>3500</span></div>" +
    "</div>";

var enterMsgHelp = document.querySelector('#raffle-form > div:nth-child(3) > label > b');
enterMsgHelp.outerHTML += "<div class='formattingHelp'>" +
    "<i class='fa fa-ban' onclick='document.getElementById(\"enteredmessage\").value += \"[color=transparent]notip[/color]\"'> Disable tips</i>" +
    "</div>";
