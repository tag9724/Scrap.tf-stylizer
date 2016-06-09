const BACK = document.querySelector('.block.back');

/* Get saved background url */

chrome.storage.sync.get("background",
    function(res) {
        BACK.querySelector('.ownBackURL').value = (res.background) ? res.background : "";
    });

/* Set the background */

function SubmitBackground(ev) {

    ev.preventDefault();

    chrome.storage.sync.set({
        background: BACK.querySelector('.ownBackURL').value,
    });
}

BACK.addEventListener('submit', SubmitBackground);
