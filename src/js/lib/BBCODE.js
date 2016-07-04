// Don't move any entry seriously ... need to recode this ****
var scrapTFEmotes = '43nero8killerBibleThumpNiGHTSVerdigrisVVermillionVVictoriaVVioletVViridianVVitellaryVadministratoraltariaangelcakeangry_mouseantelionantonioapplejackarcticfoxaurozbackstabballoonsbatcountrybdaybghdbigDbigMbigPbionicbunionblush_mousebrohoofbrohoof2burningrosebuttscagecakecaptainfalconcelestiacheepchrysaliscmcookiecoolpikacoolpika2derpderpmousedevsunsdflydimadimablushdimahappydimasaddogtordukeadecheepelizhappyelizhappy2elizmadelizsurprisefaxonfeeshfennekinfloofehfluttercryfluttershyfluttersmileflutteryayfoxyfryingpanfurrfurrygabengibusglassesgrizzhalehandshakehappy_mousehappykittyheyguysholyhoovyhughugpilehundkopfhuzzahhystericalicebeariesikajantranjanuduckjemmyjemmy43jibanyankappakatuenkicklakotalazypandalikeabosslittlebuddylucinalunamanfacemaxsmonkeymoon2mouseymrxnoisenolovenormanoddpandapapaparapiepillfoxpinkamenapinkiepiepinkypizzaplagueoverseerpokeballpopsicleprincesspuzzleqtquestionblockrafflerainbowdashrarecandyrarityreaperrefinedrunningbombsad_mousesaladsandvichsapscott713scramblerscrapsethshakoshamanshibaslicesmallmeepsmashballsmileinhdsmithhealzsonicthsouliespookysprintingbombsquibsquib2squib3squibbodysteamsuuslimeszoruatardistfm_confettithedocthunderbombtiptip2toottophattrumptwilightsparkleuncraftablevinylwhipwhiterabbitwoofwubzomgzorua';
var kappaIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAQAAAA+LdxbAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAALDSURBVDjLddRLa5xlGIDh65vpJF8mk0xmJiapiSY10gNSlWorilJ0IejabRduXbkT/4H/QrEbcSG4cFURV8UDtlYQp01LaJI2hyaZUyeZ4/e6sDhJmz7bhwte3gfuqOvJ+SrkzVj2QNGl6PFt9Dj5Jaz4QeysdZueUTDk0+ip5NewpCZrRVfaqIyeNW2vmfNBdAT5OWwJghl31T1UNeqWmjmnLWlIXI4OkR9DRSJlzIoa/vYXEiUz0iqWpZzwfcSx/8CN0BTbd0+s6b51D81Zl1WyIVLStmsCj8hyqMnouGtVw55dm2YUTJq2aN0dd7Qldgak7KGWsttuq8rL6euYdN5JRW1LbvjdvgcD8puujrJl60aUTDluytvOGdeyb9KiYEVnQP4Qa1hVkRhR9KbEnDeMaunqYdh5N5UHJGXbPR2RFy2YN+84hh3T0dPXsqfggs0Bia2pGjXrdafMec6sIRmRRCQrlkjMGxuQb6IzIRKJTXnXGTGo29aQktfSQ8H4gHBMT2LG+16WQs1VN2QsKFq1bE1a3uxB8qFv5XzkHS3X/eO2mxqmjCi54ictec86NyBXw0Up153Gni23lHUVLXjJKaNiY2IzXhiQt6I/wwVBgoL3nLXmvq4TTiq5aEjasGnFgw/LmXXJlD1ZY8acUJfRE0mbt6Uo1lI7SCZNK6ir68sYkpJX0VHEpLyMYTs2DpKJKB36+tI6GrqCiqq8lnEPVLSN2NY8SGhqI6NvX0VVz/OarmjbVTetae/Rvf4ncVQOeeOCIRP6svJSFi3ZEPSVRKLDhFeja6ElK5IzbsM1Qd++WFPauIZPoscIdTtyYlVDmFazrCIxrWjt0X89EaXvQiKjK3jFnFVlq3qKdmz6InpKx/gykLcop6pmW1Nk3edHRWkwX4esvAkFfVt2VHx8IH5HEi6HfX05Qc2ezw7V8l8tNhNJnVppEAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wMy0wNlQxNTowMzozNS0wODowMACjc9IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMDMtMDZUMTU6MDM6MzUtMDg6MDBx/stuAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjYuNi0yIDIwMTAtMTItMDMgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnQBY9wgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABd0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQAMjhTy6IIAAAAFnRFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADI1VyScmwAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzMxMDc1MDE1jO/flwAAABF0RVh0VGh1bWI6OlNpemUAODU3QkK8TFNyAAAALXRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vdG1wL21pbmltYWdpY2sxNzcxNy0yMy5wbmcV7/n0AAAAAElFTkSuQmCC';
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
    // Kappa emote support
    function(text) {
        var re = /:([kappa]*?):/i;

        while (text.search(re) !== -1) {
            text = text.replace(re, '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAQAAAA+LdxbAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAALDSURBVDjLddRLa5xlGIDh65vpJF8mk0xmJiapiSY10gNSlWorilJ0IejabRduXbkT/4H/QrEbcSG4cFURV8UDtlYQp01LaJI2hyaZUyeZ4/e6sDhJmz7bhwte3gfuqOvJ+SrkzVj2QNGl6PFt9Dj5Jaz4QeysdZueUTDk0+ip5NewpCZrRVfaqIyeNW2vmfNBdAT5OWwJghl31T1UNeqWmjmnLWlIXI4OkR9DRSJlzIoa/vYXEiUz0iqWpZzwfcSx/8CN0BTbd0+s6b51D81Zl1WyIVLStmsCj8hyqMnouGtVw55dm2YUTJq2aN0dd7Qldgak7KGWsttuq8rL6euYdN5JRW1LbvjdvgcD8puujrJl60aUTDluytvOGdeyb9KiYEVnQP4Qa1hVkRhR9KbEnDeMaunqYdh5N5UHJGXbPR2RFy2YN+84hh3T0dPXsqfggs0Bia2pGjXrdafMec6sIRmRRCQrlkjMGxuQb6IzIRKJTXnXGTGo29aQktfSQ8H4gHBMT2LG+16WQs1VN2QsKFq1bE1a3uxB8qFv5XzkHS3X/eO2mxqmjCi54ictec86NyBXw0Up153Gni23lHUVLXjJKaNiY2IzXhiQt6I/wwVBgoL3nLXmvq4TTiq5aEjasGnFgw/LmXXJlD1ZY8acUJfRE0mbt6Uo1lI7SCZNK6ir68sYkpJX0VHEpLyMYTs2DpKJKB36+tI6GrqCiqq8lnEPVLSN2NY8SGhqI6NvX0VVz/OarmjbVTetae/Rvf4ncVQOeeOCIRP6svJSFi3ZEPSVRKLDhFeja6ElK5IzbsM1Qd++WFPauIZPoscIdTtyYlVDmFazrCIxrWjt0X89EaXvQiKjK3jFnFVlq3qKdmz6InpKx/gykLcop6pmW1Nk3edHRWkwX4esvAkFfVt2VHx8IH5HEi6HfX05Qc2ezw7V8l8tNhNJnVppEAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wMy0wNlQxNTowMzozNS0wODowMACjc9IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMDMtMDZUMTU6MDM6MzUtMDg6MDBx/stuAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjYuNi0yIDIwMTAtMTItMDMgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnQBY9wgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABd0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQAMjhTy6IIAAAAFnRFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADI1VyScmwAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzMxMDc1MDE1jO/flwAAABF0RVh0VGh1bWI6OlNpemUAODU3QkK8TFNyAAAALXRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vdG1wL21pbmltYWdpY2sxNzcxNy0yMy5wbmcV7/n0AAAAAElFTkSuQmCC" alt="kappa" >');
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
    // Kappa icon and Yep I'm serious with this code
    function(tag) {
        var kappaImg = tag.querySelectorAll('img:not([data-kappa])'),
            exp = /Kappa/i;
            
        for (let i = 0, len = kappaImg.length; i < len; i++) {
            if (exp.test(kappaImg[i].title)) {
                kappaImg[i].dataset.kappa = true;
                kappaImg[i].onload = function(ev) {
                    ev.target.src = kappaIcon;
                    ev.target.onload = null;
                    console.log('ev');
                };
            }
        }
    }
];
