/* Load Current configuration */

function StyleApply(res) {
    // Remove .curr to all
    var rmAll = SOUND.querySelectorAll('input');
    for (let i = 0, len = rmAll.length; i < len; i++) rmAll[i].classList.remove('btn-success');

    // Change the style of this element
    if (res.soundSelected && res.soundSelected.indexOf('#') == 0) {
        SOUND.querySelector('input[value="' + res.soundSelected + '"]').classList.add('btn-success');
    } else {
        var url = SOUND.querySelector('#soundUrl');
        url.classList.add('btn-success');
        // Display the saved url
        (res.sound) ? url.value = res.sound: "";
    }
}

chrome.storage.local.get(["sound", "soundSelected"], StyleApply);

/* Set the configuration */

const SOUND = document.getElementById('soundBox');
const SOUND_FORM = SOUND.querySelector('form');

function SaveSound(url, choosen) {
    chrome.storage.local.set({
        sound: url,
        soundSelected: choosen
    }, function() {
        StyleApply({
            soundSelected: choosen
        });
    });
}

// Magic appear here

function ChooseSound(ev) {
    // Preselected sounds
    if (ev.target.type == "button") {
        // Play the sound
        var playSound = document.createElement('audio');
        playSound.setAttribute('src', chrome.extension.getURL('mp3/' + ev.target.name + '.mp3'));
        playSound.play();
        // Save the sound configuration
        SaveSound(chrome.extension.getURL('mp3/' + ev.target.name + '.mp3'), ev.target.value);
    }
}

function SubmitSound(ev) {

    ev.preventDefault();

    var url = SOUND_FORM.querySelector('#soundUrl').value;

    // Play the sound
    if (url != "") {
        var playSound = document.createElement('audio');
        playSound.setAttribute('src', url);
        playSound.play();
    }
    // Save the sound
    SaveSound(url, "");
}

// Add event on SOUND ( children )
SOUND.addEventListener("click", ChooseSound);
SOUND_FORM.addEventListener("submit", SubmitSound);
