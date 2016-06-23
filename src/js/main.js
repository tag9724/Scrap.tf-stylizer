chrome.storage.sync.get(["sound", "background", "dark"], function(res) {

    document.onreadystatechange = function() {
        if (document.readyState == "interactive") {
            /* Set the notification sound */

            if (res.sound && res.sound != "") {
                let notifSound = document.getElementById('chatBeep');
                notifSound.innerHTML = '';
                notifSound.setAttribute('src', res.sound);
            }

            /* Change the logo (darktheme) */

            if (res.dark) {
                document.querySelector('.navbar-brand.big-logo').setAttribute('src', chrome.extension.getURL('img/logo-v3-white.svg'));
            }
        }
    }

    /* Get the background ( Remove that in few days ) */

    if (res.background && res.background != "") {
        let back = document.createElement('style');
        back.innerHTML = "body {background: url('" + res.background + "') center top / cover fixed !important;}";
        document.head.appendChild(back);

        chrome.storage.local.set({
            background: res.background
        });
        chrome.storage.sync.remove(["background"]);
    }

    /* Apply the darktheme */

    if (res.dark) {
        let dark = document.createElement('link');
        dark.setAttribute('rel', 'stylesheet');
        dark.setAttribute('href', chrome.extension.getURL('css/darktheme.css'));
        document.head.appendChild(dark);
    }
});

/* The background can't no longer be saved in the sync storage */

chrome.storage.local.get(["background"], function(res) {
    if (res.background && res.background != "") {
        let back = document.createElement('style');
        back.innerHTML = "body {background: url('" + res.background + "') center top / cover fixed !important;}";
        document.head.appendChild(back);
    }
});
