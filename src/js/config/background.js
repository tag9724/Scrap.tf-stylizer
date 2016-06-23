const BACK = document.getElementById('backgroundUrlForm');
const LOCALFILE = document.getElementById('LocalImage');
const FILENAME = document.getElementById('fileName');
const LOCALFILEFORM = document.getElementById('FormLocalFile');

/* Get saved background url OLD */

chrome.storage.sync.get("background", function(res) {

    if (res.background) {
        console.log("sync trouvé");
        BACK.querySelector('#ownBackURL').value = (res.background) ? res.background : "";

        // For the update transition
        chrome.storage.local.set({
            background: res.background
        });
        chrome.storage.sync.remove(["background"]);
    }
});

/* Get saved background url */

chrome.storage.local.get(["background", "localBackground"], function(res) {
    if (res.localBackground) {
        FILENAME.innerHTML = res.localBackground;
    } else {
        BACK.querySelector('#ownBackURL').value = (res.background) ? res.background : "";
    }
});

/* Set the background */

function SubmitBackground(ev) {

    ev.preventDefault();

    chrome.storage.local.set({
        background: BACK.querySelector('#ownBackURL').value,
        localBackground: false
    });
}

BACK.addEventListener('submit', SubmitBackground);

/* Save a local image */

LOCALFILE.addEventListener('change', function(ev) {

    // Just display the image name

    if (ev.target.files[0]) {
        FILENAME.innerHTML = ev.target.files[0].name;
    }
});

LOCALFILEFORM.addEventListener('submit', function(ev) {
    ev.preventDefault();

    // And here convert the local image in base64 and save it

    if (ev.target[0].files[0]) {

        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            chrome.storage.local.set({
                background: readerEvt.target.result,
                localBackground: ev.target[0].files[0].name
            });
        };

        reader.readAsDataURL(ev.target[0].files[0]);
    }
})
