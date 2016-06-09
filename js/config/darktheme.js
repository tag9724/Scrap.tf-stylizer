const CHECK = document.querySelector('.formcheck input[type="checkbox"]');

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
