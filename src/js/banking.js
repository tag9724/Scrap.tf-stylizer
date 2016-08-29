const CURR_BOT = window.location.pathname.split('/');
const SVGBP = chrome.extension.getURL('../img/backpackTF.svg');

function BpLink(botType, botID) {
    var bpLink = document.createElement('a');
    bpLink.classList.add('bpLink');
    bpLink.href = "http://backpack.tf/profiles/" + BOTS[botType][botID][1];
    bpLink.target = "_blank";
    bpLink.style.backgroundImage = "url(" + SVGBP + ")";

    return bpLink;
}

/* Bot page */

if (CURR_BOT[2] && BOTS[CURR_BOT[1]][CURR_BOT[2]]) {
    // Append icon on the header
    let appendPlace = document.querySelector('.welcome-overlay-container > div > div > div.well-padding');

    if (appendPlace)
        appendPlace.appendChild(BpLink(CURR_BOT[1], CURR_BOT[2]));
}

/* Main banking page */
else {
    let bankBoxes = Array.from(document.querySelectorAll('.bank-selector-box'));

    for (let i = 0, len = bankBoxes.length; i < len; i++) {
        // Get the bot id & append the icon
        let botID = bankBoxes[i].children[0].href.split('/')[4];

        // In case of the bot is not listed
        if (BOTS[CURR_BOT[1]][botID])
            bankBoxes[i].appendChild(BpLink(CURR_BOT[1], botID));
    }
}
