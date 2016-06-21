chrome.storage.sync.get(["sound", "background", "dark"], function(res) {

    document.onreadystatechange = function() {
        if (document.readyState == "interactive") {
            /* Set the notification sound */

            if (res.sound && res.sound != "") {
                let notifSound = document.getElementById('chatBeep');
                notifSound.innerHTML = '';
                notifSound.setAttribute('src', res.sound);
            }

            /* Set the background */

            if (res.background && res.background != "") {
                document.body.style.background = 'url("' + res.background + '") center top / cover fixed';
            }

            /* Change the logo (darktheme) */

            if (res.dark) {
                document.querySelector('.navbar-brand.big-logo').setAttribute('src', chrome.extension.getURL('img/logo-v3-white.svg'));
            }
        }
    }

    /* Apply the darktheme */

    if (res.dark) {
        let dark = document.createElement('link');
        dark.setAttribute('rel', 'stylesheet');
        dark.setAttribute('href', chrome.extension.getURL('css/darktheme.css'));
        document.head.appendChild(dark);
    }
});
