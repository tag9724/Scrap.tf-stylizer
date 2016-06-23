var s = document.createElement('script');
s.innerHTML = 'const LOADINGGIF = "' + chrome.extension.getURL('img/loading.gif') + '";';
(document.head || document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};

InjectMulti(['globalFilter.js', 'filters/default.js', 'filters/level.js', 'filters/craftable.js']);
