chrome.storage.local.get('background', function(res) {
    if (res.background)
        chrome.storage.local.remove('background');
});
