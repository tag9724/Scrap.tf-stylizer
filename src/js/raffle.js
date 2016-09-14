var ended = document.querySelector("#pid-viewraffle > div.container > div.welcome-overlay-container > div > div.row.raffle-box-row > div.col-sm-7.raffle-info-col > dl > dd.raffle-time-left");
var isEnded = (ended) ? ended.dataset.time : false;

if (isEnded == "Raffle Ended") {
    // Number of winners & reclaimed loots
    var reclaim = document.querySelectorAll("div.raffle-winners > div"),
        green = 0,
        orange = 0;
    for (var i = 0; i < reclaim.length; i++) {
        if (reclaim[i].querySelector('i').style.color == "limegreen") {
            green++
        } else {
            orange++
        };
    }
    ended.textContent += " (" + green + "/" + (green + orange) + ")";
}

/* Non whitelisted urls in raffle description */

var raffleMsg = document.querySelectorAll('.raffle-message');

for (let i = 0, len = raffleMsg.length; i < len; i++) {
    raffleMsg[i].innerHTML = BBCODE_EXTRAS[0](raffleMsg[i].innerHTML);
    raffleMsg[i].innerHTML = BBCODE_EXTRAS[1](raffleMsg[i].innerHTML);
    // Kappa
    BBCODE_EXTRAS[2](raffleMsg[i]);
}

/* Link comments by repply (mouse hover) */

var comBox = document.querySelector('.raffle-commenters');

if (comBox) {

    // Mouse hover ( design )

    function HoverTheRainbow(ev) {

        // Select all comments
        var allComs = comBox.querySelectorAll('.comment-container');
        var users = comBox.querySelectorAll('.username');
        var target = ev.target;

        // Search the .comment-container parent of the element ( usefull )
        for (let i = 0, c, len = allComs.length; i < len; i++) {
            if (allComs[i].contains(target)) {
                target = allComs[i];
                break;
            }
        }

        if (target.matches(".comment-container")) {

            // Check if the post was a repply
            var userMention = target.querySelector('.user-mention');
            userMention = (userMention) ? userMention.href : null;

            // get the hovered user
            var currUser = target.querySelector('.username').href;

            for (let i = 0, len = users.length; i < len; i++) {

                // If the hover comment was a repply to other user
                if (users[i].href == userMention) {
                    allComs[i].classList.add('linked');
                } else {
                    allComs[i].classList.remove('linked');
                }

                // If is an other post from the same curr user
                if (users[i].href == currUser) {
                    allComs[i].classList.add('currUser');
                } else {
                    allComs[i].classList.remove('currUser');
                }
            }

        }
    }

    comBox.addEventListener('mouseover', HoverTheRainbow);

    // Debug ScrapTF bug new comment ( BBCODE not applyed )

    function DebugBBCODEScrapTF() {

        var newCom = comBox.querySelector('.comment-container');

        if (newCom && newCom.id != lastCom) {

            // Update last com
            lastCom = newCom.id;

            // And execute the replacement
            newCom = comBox.querySelector('.comment-content');

            var str = newCom.innerHTML;
            // Urls
            str = BBCODE_EXTRAS[0](str);
            str = BBCODE_EXTRAS[1](str);
            // Kappa
            BBCODE_EXTRAS[2](newCom);
            // colors
            str = BBCODE[2](str);
            // text formatting
            str = BBCODE[3](str);
            str = BBCODE[4](str);
            str = BBCODE[5](str);
            str = BBCODE[6](str);

            newCom.innerHTML = str;
        }
    }

    var allComs = comBox.querySelectorAll('.comment-content');
    var lastCom = (allComs[0]) ? allComs[0].parentElement.parentElement.id : "";

    // Apply also for all existant coms

    for (let i = 0, len = allComs.length; i < len; i++) {
        // Urls ( not whitelisteds )
        allComs[i].innerHTML = BBCODE_EXTRAS[0](allComs[i].innerHTML);
        allComs[i].innerHTML = BBCODE_EXTRAS[1](allComs[i].innerHTML);

        BBCODE_EXTRAS[2](allComs[i]);
    }

    comBox.addEventListener('DOMSubtreeModified', DebugBBCODEScrapTF);
}
