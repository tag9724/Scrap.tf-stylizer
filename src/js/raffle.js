(function () {

  /* Raffle message ( BBCODE ) */

  let raffleMessage = Array.from(document.querySelectorAll(
    '.raffle-message:not(.puzzle):nth-child(1n):not(.raffle-password)'));

  let raffleOwnerGrade = document.querySelector('div.raffle-username b.usr-label');
  raffleOwnerGrade = (raffleOwnerGrade) ? raffleOwnerGrade.textContent : null;
  raffleOwnerGrade = (raffleOwnerGrade == "Owner" || raffleOwnerGrade == "Admin" ||
    raffleOwnerGrade == "Mod");

  for (let i = 0, len = raffleMessage.length; i < len; i++) {
    raffleMessage[i].innerHTML = BBCode.ReParse(raffleMessage[i].innerHTML, raffleOwnerGrade);
  }

  /* Comments section */

  let comBox = document.querySelector('.raffle-commenters');

  if (comBox) {

    /* Link comments by repply (mouse hover) */

    function HoverTheRainbow(ev) {

      // Select all comments
      let allComs = comBox.querySelectorAll('.comment-container');
      let users = comBox.querySelectorAll('.username');

      // Search the .comment-container parent of the element ( usefull )
      for (let i = 0, c, len = allComs.length; i < len; i++) {
        if (allComs[i].contains(ev.target)) {
          ev.target = allComs[i];
          break;
        }
      }

      if (ev.target.matches(".comment-container")) {

        // Check if the post was a repply
        let userMention = ev.target.querySelector('.user-mention');
        userMention = (userMention) ? userMention.href : null;

        // get the hovered user
        let currUser = ev.target.querySelector('.username').href;

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

    /* Debug comment section */

    let owner = document.querySelector('.raffle-username a.username');
    owner = (owner) ? owner.textContent : null;

    function DebugCommentBBCODE() {

      let allComs = comBox.querySelectorAll('.comment-content:not(.checked)');

      for (let i = 0, len = allComs.length; i < len; i++) {

        if (!allComs[i].classList.contains('checked')) {

          allComs[i].classList.add('checked');
          allComs[i].innerHTML = BBCode.ReParse(allComs[i].innerHTML);

          /* Check if this user is the raffle owner */

          let userComment = allComs[i].parentElement.parentElement;

          if (userComment.querySelector('.comment-info .username').textContent == owner)
            userComment.classList.add('owner');
        }
      }

    };

    DebugCommentBBCODE();
    comBox.addEventListener('DOMSubtreeModified', DebugCommentBBCODE);
  }

  /* Ended Raffle */

  let ended = document.querySelector(".raffle-time-left");

  if (ended) {

    /* Recreate a Raffle */

    function RecreateRaffle() {
      console.log(BBCode.UnParse(raffleMessage[0].innerHTML));
      console.log(BBCode.UnParse(raffleMessage[1].innerHTML));
      console.log('Raffle recreated :D');
    }

    /* Append Recreate Raffle button */

    function RecreateRaffleButton() {

      return false; // TEMP TODO ... one day maybe ...

      /* That's for the next update */

      let target = document.querySelector('.raffle-well .raffle-opts-row');
      let button = BuildDOM.Create({
        tag: 'button',
        classList: ['btn', 'btn-embossed', 'btn-info', 'recreate-raffle'],
        innerHTML: '<i class="fa fa-plus"></i> Recreate this raffle'
      });

      button.addEventListener('click', RecreateRaffle);
      target.appendChild(button);
    }

    /* Number of winners on ended raffles */

    if (ended.dataset.time == "Raffle Ended") {

      let reclaim = Array.from(document.querySelectorAll("div.raffle-winners > .raffle-winner")),
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
      RecreateRaffleButton();
    }

    /* Button "Recreate raffle" on failed raffle */
    else if (ended.dataset.time == "Raffle Failed") {
      RecreateRaffleButton();
    }

  }

})();
