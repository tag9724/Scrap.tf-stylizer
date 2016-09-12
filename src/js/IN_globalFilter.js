var s = document.createElement('script');
s.innerText = 'const LOADINGGIF = "' + chrome.extension.getURL('img/loading.svg') + '";';
(document.head || document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};

InjectMulti(['../lib/constructDOM.js' ,'globalFilter.js', 'filters/default.js', 'filters/level.js', 'filters/craftable.js','LaunchFilter.js']);
