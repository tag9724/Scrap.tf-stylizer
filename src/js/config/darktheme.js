const CHECK = document.getElementById('EnableDarkTheme');

/* Get saved configuration */

chrome.storage.sync.get("dark",
    function(res) {
        CHECK.checked = !!res.dark;
    });

/* Save the configuration */

function ApplyDark(ev) {
    chrome.storage.sync.set({
        dark: ev.target.checked
    });
}

CHECK.addEventListener('change', ApplyDark);
