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
    ended.innerHTML += " (" + green + "/" + (green + orange) + ")";
}

/* Non whitelisted urls */

var raffleMsg = document.querySelectorAll('.raffle-message');

for (let i = 0, len = raffleMsg.length; i < len; i++) {
    raffleMsg[i].innerHTML = BBCODE[0](raffleMsg[i].innerHTML);
    raffleMsg[i].innerHTML = BBCODE[1](raffleMsg[i].innerHTML);
}
