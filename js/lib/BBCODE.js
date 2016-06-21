// Don't move any entry seriously ... need to recode this ****
var BBCODE = [
    // url
    function(text) {
        var re = /\[url=(\S+)\]([^[]*(?:\[(?!url=\S+\]|\/url\])[^[]*)*)\[\/url\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<a target="_blank" href="$1">$2</a>');
        }
        return text;
    },
    // Unofficials urls
    function(text) {
        var re = /((https?|ftps?):\/\/[^"|'<\s]+)(?![^<>]*>|[^"]*?<\/a)/ig;

        while (text.search(re) !== -1) {
            text = text.replace(re, '<a target="_blank" href="$1">$1</a>');
        }

        return text;
    },
    // Color
    function(text) {
        var re = /\[color=(\S+)\]([^[]*(?:\[(?!color=\S+\]|\/color\])[^[]*)*)\[\/color\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="color:$1">$2</span>');
        }
        return text;
    },
    // underline
    function(text) {
        var re = /\[u]([^[]*(?:\[(?!u]|\/u\])[^[]*)*)\[\/u\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="text-decoration:underline">$1</span>');
        }
        return text;
    },
    // Italic
    function(text) {
        var re = /\[i]([^[]*(?:\[(?!i]|\/i\])[^[]*)*)\[\/i\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="font-style:italic;">$1</span>');
        }
        return text;
    },
    // line-through
    function(text) {
        var re = /\[s]([^[]*(?:\[(?!s]|\/s\])[^[]*)*)\[\/s\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="text-decoration: line-through;">$1</span>');
        }
        return text;
    },
    // bold
    function(text) {
        var re = /\[b]([^[]*(?:\[(?!b]|\/b\])[^[]*)*)\[\/b\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<span style="font-weight: bold;">$1</span>');
        }
        return text;
    },
    // Emoticon
    function(text) {
        var re = /:([a-z0-9]*?):/i;
        var tmp;

        while ((result = re.exec(text)) !== null) {

            tmp = new RegExp(result[1], "i").exec(scrapTFEmotes);

            if (tmp) {
                text = text.replace(re, '<img src="https://scrap.tf/img/emotes/' + tmp[0] + '.png" alt="$1" onerror="this.setAttribute(\'src\', \'https://steamcommunity-a.akamaihd.net/economy/emoticon/missing\')" >');
            } else {
                text = text.replace(re, '<img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/$1" alt="$1" onerror="this.setAttribute(\'src\', \'https://steamcommunity-a.akamaihd.net/economy/emoticon/missing\')" >');
            }
        }

        return text;
    }
];

var BBCODE_EXTRAS = [
    // url
    function(text) {
        var re = /\[url=(\S+)\]([^[]*(?:\[(?!url=\S+\]|\/url\])[^[]*)*)\[\/url\]/ig;
        while (text.search(re) !== -1) {
            text = text.replace(re, '<a target="_blank" href="$1" style="color:#e74c3c;">$2</a>');
        }
        return text;
    },
    // Unofficials urls
    function(text) {
        var re = /((https?|ftps?):\/\/[^"|'<\s]+)(?![^<>]*>|[^"]*?<\/a)/ig;

        while (text.search(re) !== -1) {
            text = text.replace(re, '<a target="_blank" href="$1" style="color:#e74c3c;">$1</a>');
        }

        return text;
    },
];
