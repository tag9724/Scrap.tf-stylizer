chrome.webRequest.onCompleted.addListener(function(ev) {
    console.log(ev);
}, {
    urls: ["*://*.scrap.tf/css/flat-ui-pro.css"],
    types: ["stylesheet"]
}, ['responseHeaders']);
chrome.tabs.insertCSS(null, {
    file: "css/darktheme.css"
});
