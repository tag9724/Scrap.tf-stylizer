/* Future BBCODE Parser */

if ( typeof BBCode === "undefined" ) {

    var BBCode = new class BBCODE_PARSER {

        constructor() {

            this.kappaIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAQAAAA+LdxbAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAALDSURBVDjLddRLa5xlGIDh65vpJF8mk0xmJiapiSY10gNSlWorilJ0IejabRduXbkT/4H/QrEbcSG4cFURV8UDtlYQp01LaJI2hyaZUyeZ4/e6sDhJmz7bhwte3gfuqOvJ+SrkzVj2QNGl6PFt9Dj5Jaz4QeysdZueUTDk0+ip5NewpCZrRVfaqIyeNW2vmfNBdAT5OWwJghl31T1UNeqWmjmnLWlIXI4OkR9DRSJlzIoa/vYXEiUz0iqWpZzwfcSx/8CN0BTbd0+s6b51D81Zl1WyIVLStmsCj8hyqMnouGtVw55dm2YUTJq2aN0dd7Qldgak7KGWsttuq8rL6euYdN5JRW1LbvjdvgcD8puujrJl60aUTDluytvOGdeyb9KiYEVnQP4Qa1hVkRhR9KbEnDeMaunqYdh5N5UHJGXbPR2RFy2YN+84hh3T0dPXsqfggs0Bia2pGjXrdafMec6sIRmRRCQrlkjMGxuQb6IzIRKJTXnXGTGo29aQktfSQ8H4gHBMT2LG+16WQs1VN2QsKFq1bE1a3uxB8qFv5XzkHS3X/eO2mxqmjCi54ictec86NyBXw0Up153Gni23lHUVLXjJKaNiY2IzXhiQt6I/wwVBgoL3nLXmvq4TTiq5aEjasGnFgw/LmXXJlD1ZY8acUJfRE0mbt6Uo1lI7SCZNK6ir68sYkpJX0VHEpLyMYTs2DpKJKB36+tI6GrqCiqq8lnEPVLSN2NY8SGhqI6NvX0VVz/OarmjbVTetae/Rvf4ncVQOeeOCIRP6svJSFi3ZEPSVRKLDhFeja6ElK5IzbsM1Qd++WFPauIZPoscIdTtyYlVDmFazrCIxrWjt0X89EaXvQiKjK3jFnFVlq3qKdmz6InpKx/gykLcop6pmW1Nk3edHRWkwX4esvAkFfVt2VHx8IH5HEi6HfX05Qc2ezw7V8l8tNhNJnVppEAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wMy0wNlQxNTowMzozNS0wODowMACjc9IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMDMtMDZUMTU6MDM6MzUtMDg6MDBx/stuAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjYuNi0yIDIwMTAtMTItMDMgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnQBY9wgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABd0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQAMjhTy6IIAAAAFnRFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADI1VyScmwAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzMxMDc1MDE1jO/flwAAABF0RVh0VGh1bWI6OlNpemUAODU3QkK8TFNyAAAALXRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vdG1wL21pbmltYWdpY2sxNzcxNy0yMy5wbmcV7/n0AAAAAElFTkSuQmCC';

            this.scrapTFEmotes = [ "43nero", "8killer", "BibleThump", "NiGHTS", "VerdigrisV", "VermillionV", "VictoriaV", "VioletV", "ViridianV", "VitellaryV", "administrator", "altaria", "angelcake", "angry_mouse", "antelion", "antonio", "applejack", "arcticfox", "art", "auroz", "backstab", "balloons", "bap", "batcountry", "bday", "bernep", "bghd", "bigD", "bigM", "bigP", "bionicbunion", "birdspy", "bluecrab", "blush_mouse", "brohoof", "brohoof2", "burningrose", "butts", "cage", "cake", "captainfalcon", "catty_evil", "catty_good", "catty_sad", "catty_strange", "celestia", "cheep", "chrysalis", "cm", "cookie", "coolpika", "coolpika2", "crashygrumpy", "crashyshocked", "crashysilly", "crashysmile", "csdfrown", "derp", "derpmouse", "devsuns", "dfly", "diaheart", "dima", "dimablush", "dimahappy", "dimasad", "dogtor", "doorknob", "drak", "duk", "ead", "eatom", "ech", "eep", "elizhappy", "elizhappy2", "elizmad", "elizsurprise", "emptyengie", "enclaveblue", "eomvestigate", "eyes", "faxon", "feesh", "fennekin", "fish", "floofeh", "floofeon", "fluttercry", "fluttershy", "fluttersmile", "flutteryay", "foxy", "fryingpan", "fume", "furr", "furry", "gaben", "gasp_mouse", "giantdad", "gibus", "glasses", "grandpa", "grizz", "h3art", "hale", "hamshank", "handshake", "happy_mouse", "happykitty", "hearthstone", "heyguys", "holy", "hoovy", "hug", "huge", "hugpile", "hundkopf", "huzzah", "hysterical", "icebear", "ies", "ika", "ineff", "ineffoh", "ineffp", "jac", "janfav", "janno", "janstop", "jantran", "januduck", "jemmy", "jemmy43", "jibanyan", "katuen", "kick", "lakota", "lazypanda", "likeaboss", "littlebuddy", "lucina", "luna", "manface", "maxs", "melting", "monkey", "moon2", "mousey", "mrx", "noise", "nolove", "nom", "norman", "odd", "oops_mouse", "osu", "otter", "otter2", "overwatch", "p_mouse", "panda", "papa", "para", "phantomhappy", "phantommeh", "phantomsad", "phantomsurprised", "pie", "pile", "pillfox", "pinkamena", "pinkiepie", "pinky", "pixeleevee", "pixeleeveefestive", "pixeleeveefestive2", "pizza", "plagueoverseer", "poi", "pokeball", "polishedturd", "pootis", "pops", "popsicle", "predecessor", "princess", "pspikawink", "puzzle", "qt", "questionblock", "raffle", "rainbowdash", "rarecandy", "rarity", "rdspeechless", "reaper", "reclaimed", "redcrab", "refined", "runningbomb", "sad_mouse", "salad", "sandvich", "sap", "scott713", "scrambler", "scrap", "seth", "shako", "shaman", "sharkedtreasure", "sharkie", "shiba", "sillyfume", "slice", "smallmeep", "smashball", "smileinhd", "smithhealz", "sonicth", "soulie", "spooky", "sprintingbomb", "squib", "squib2", "squib3", "squibbody", "steam", "suuslime", "szorua", "tardis", "teamcaptain", "telegram", "tf2sniper", "tfm_confetti", "thedoc", "thunderbomb", "tip", "tip2", "toot", "tophat", "trump", "twilightsparkle", "uncraftable", "vinyl", "whip", "whiterabbit", "woh", "woof", "wub", "wuff", "yv", "zeke", "zomg", "zorua" ];

            this.scrapTFEmotesLowerCase = this.scrapTFEmotes.map( function ( value ) {
                return value.toLowerCase();
            } );

            /* HTML string to BBCODE */

            this.unparse = {
                userMention: /<a.*href="(.*?)".*class="user-mention".*?>(.*?)<\/a>/g,
                url: /<a.*?href="(.*?)".*?>(.*?)<\/a>/g,
                youtube: /<a class="moviestrip" href="(.*?)".*?><\/a>/gi,
                iframe: /<iframe.*?src="(.*?)".*?<\/iframe>/g,
                color: /<span style="color:(.*?)".*?>(.*?)<\/span>/g,
                img: /<img src="(.*?)".*?>/g,
                emote: /<img.*?title="(.*?)".*?>/gi,
                basics: {
                    b: [ /(<strong>)/gi, /(<\/strong>)/g ],
                    i: [ /(<em>)/gi, /(<\/em>)/g ],
                    s: [ /(<s>)/gi, /(<\/s>)/g ],
                    u: [ /(<u>)/gi, /(<\/u>)/g ],
                    code: [ /(<code>)/gi, /(<\/code>)/g ]
                },
                heart: /<i.*?class=".*?fa-heart"><\/i>/gi,
                br: /(<br>|<br\/>)/gi
            };

            /* TODO put an explicit comment here */

            this.parse = {
                url: /((https?|ftps?):\/\/[^"|^)|'<\s]+)(?![^<>]*>|[^"]*?<\/a)/ig,
                emote: /:(\w{1,}):/g
            };

            this.replaceHtmlEntites = ( function () {
                let translate_re = /&(nbsp|amp|quot|lt|gt);/g,
                    translate = {
                        'nbsp': String.fromCharCode( 160 ),
                        'amp': '&',
                        'quot': '"',
                        'lt': '<',
                        'gt': '>'
                    },
                    translator = function ( $0, $1 ) {
                        return translate[ $1 ];
                    };

                return function ( s ) {
                    return s.replace( translate_re, translator );
                };
            } )();

        }

        /* Parse from scratch */

        Parse( str, parseAdmin ) {

            let res, result;

            if ( parseAdmin ) {
                result = XBBCODE_ADMIN.process( {
                    text: str
                } ).html;
            } else {
                result = XBBCODE.process( {
                    text: str
                } ).html;
            }

            // Basic urls

            while ( ( res = this.parse.url.exec( str ) ) !== null ) {
                result = result.replace( res[ 0 ], '<a target="_blank" href="' + res[ 1 ] + '">' + res[ 1 ] + '</a>' );
            }

            str = result;

            // Emotes

            while ( ( res = this.parse.emote.exec( str ) ) !== null ) {

                res[ 1 ] = res[ 1 ].toLowerCase();
                let link = '',
                    indexScrapTFEmote = this.scrapTFEmotesLowerCase.indexOf( res[ 1 ] );

                // Kappa emote
                if ( res[ 1 ] == "kappa" ) {
                    link = this.kappaIcon;
                }
                // ScrapTF emotes
                else if ( indexScrapTFEmote >= 0 ) {
                    link = 'https://scrap.tf/img/emotes/' + this.scrapTFEmotes[ indexScrapTFEmote ] + '.png';
                }
                // Steam icon
                else {
                    link = 'https://steamcommunity-a.akamaihd.net/economy/emoticon/' + res[ 1 ];
                }

                result = result.replace(
                    res[ 0 ],
                    `<img src="${link}" title="${res[1]}" onerror="this.setAttribute('src','https://steamcommunity-a.akamaihd.net/economy/emoticon/missing')"/>`
                );
            }

            str = result;

            // Heart icons

            result = result.replace( /♥/g, '<i style="color:red" class="fa fa-heart"></i>' );

            return result;

        }

        /* Comment section & semi-parsed content */

        ReParse( str, parseAdmin ) {
            // HTML => BBCODE
            str = this.UnParse( str, true );

            // BBCODE => HTML
            return this.Parse( str, parseAdmin )
                .replace( /(?:\r\n|\r|\n)/, '' )
                .replace( /(?:\r\n|\r|\n)/g, '<br/>' );
        }

        /* HTML to BBCODE */

        UnParse( str, reparse ) {

            str = this.replaceHtmlEntites( str );
            let res, result = str;

            // Basic elements

            for ( let i = 0; i < 2; i++ ) {

                let close = ( i > 0 ) ? '/' : '';

                for ( let key in this.unparse.basics ) {
                    result = result.replace( this.unparse.basics[ key ][ i ], '[' + close + key + ']' );
                }
            }

            str = result;

            // Youtube videos

            while ( ( res = this.unparse.youtube.exec( str ) ) !== null ) {
                if ( reparse && res[ 1 ].indexOf( '//youtu.be' ) == 0 ) {
                    result = result.replace( res[ 0 ], '[youtube]' + res[ 1 ] + '[/youtube]' );
                } else {
                    result = result.replace( res[ 0 ], 'https:' + res[ 1 ] );
                }
            }

            str = result;

            // Iframes ( youtube video also )

            while ( ( res = this.unparse.iframe.exec( str ) ) !== null ) {
                result = result.replace( res[ 0 ], res[ 1 ].replace( 'https://youtube.com/embed', 'https://youtu.be' ) );
            }

            str = result;

            // User mention ( comments )

            while ( ( res = this.unparse.userMention.exec( str ) ) !== null ) {
                result = result.replace( res[ 0 ], '[mention=' + res[ 1 ] + ']' + res[ 2 ] + '[/mention]' );
            }

            str = result;

            // Urls

            while ( ( res = this.unparse.url.exec( str ) ) !== null ) {
                // regular link
                if ( res[ 1 ] == res[ 2 ] ) {
                    result = result.replace( res[ 0 ], res[ 1 ] );
                    console.log( res );
                }
                // BBCODE url
                else {
                    result = result.replace( res[ 0 ], '[url=' + res[ 1 ] + ']' + res[ 2 ] + '[/url]' );
                }
            }

            str = result;

            // Colors

            while ( ( res = this.unparse.color.exec( str ) ) !== null ) {
                result = result.replace( res[ 0 ], '[color=' + res[ 1 ] + ']' + res[ 2 ] + '[/color]' );
            }

            str = result;

            // Images

            while ( ( res = this.unparse.img.exec( str ) ) !== null ) {
                result = result.replace( res[ 0 ], '[img]' + res[ 1 ] + '[/img]' );
            }

            str = result;

            // Emotes

            while ( ( res = this.unparse.emote.exec( str ) ) !== null ) {
                result = result.replace( res[ 0 ], ':' + res[ 1 ] + ':' );
            }

            str = result;

            // Heart ...

            while ( ( res = this.unparse.heart.exec( str ) ) !== null ) {
                result = result.replace( res[ 0 ], '♥' );
            }

            return result.replace( this.unparse.br, "\n" );

        }
    }
}
