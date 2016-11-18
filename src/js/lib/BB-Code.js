/* Future BBCODE Parser */

if (typeof BBCode === "undefined") {

  var BBCode = new class BBCODE_PARSER {

        constructor() {

            this.kappaIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAQAAAA+LdxbAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAALDSURBVDjLddRLa5xlGIDh65vpJF8mk0xmJiapiSY10gNSlWorilJ0IejabRduXbkT/4H/QrEbcSG4cFURV8UDtlYQp01LaJI2hyaZUyeZ4/e6sDhJmz7bhwte3gfuqOvJ+SrkzVj2QNGl6PFt9Dj5Jaz4QeysdZueUTDk0+ip5NewpCZrRVfaqIyeNW2vmfNBdAT5OWwJghl31T1UNeqWmjmnLWlIXI4OkR9DRSJlzIoa/vYXEiUz0iqWpZzwfcSx/8CN0BTbd0+s6b51D81Zl1WyIVLStmsCj8hyqMnouGtVw55dm2YUTJq2aN0dd7Qldgak7KGWsttuq8rL6euYdN5JRW1LbvjdvgcD8puujrJl60aUTDluytvOGdeyb9KiYEVnQP4Qa1hVkRhR9KbEnDeMaunqYdh5N5UHJGXbPR2RFy2YN+84hh3T0dPXsqfggs0Bia2pGjXrdafMec6sIRmRRCQrlkjMGxuQb6IzIRKJTXnXGTGo29aQktfSQ8H4gHBMT2LG+16WQs1VN2QsKFq1bE1a3uxB8qFv5XzkHS3X/eO2mxqmjCi54ictec86NyBXw0Up153Gni23lHUVLXjJKaNiY2IzXhiQt6I/wwVBgoL3nLXmvq4TTiq5aEjasGnFgw/LmXXJlD1ZY8acUJfRE0mbt6Uo1lI7SCZNK6ir68sYkpJX0VHEpLyMYTs2DpKJKB36+tI6GrqCiqq8lnEPVLSN2NY8SGhqI6NvX0VVz/OarmjbVTetae/Rvf4ncVQOeeOCIRP6svJSFi3ZEPSVRKLDhFeja6ElK5IzbsM1Qd++WFPauIZPoscIdTtyYlVDmFazrCIxrWjt0X89EaXvQiKjK3jFnFVlq3qKdmz6InpKx/gykLcop6pmW1Nk3edHRWkwX4esvAkFfVt2VHx8IH5HEi6HfX05Qc2ezw7V8l8tNhNJnVppEAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wMy0wNlQxNTowMzozNS0wODowMACjc9IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMDMtMDZUMTU6MDM6MzUtMDg6MDBx/stuAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjYuNi0yIDIwMTAtMTItMDMgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnQBY9wgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABd0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQAMjhTy6IIAAAAFnRFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADI1VyScmwAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzMxMDc1MDE1jO/flwAAABF0RVh0VGh1bWI6OlNpemUAODU3QkK8TFNyAAAALXRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vdG1wL21pbmltYWdpY2sxNzcxNy0yMy5wbmcV7/n0AAAAAElFTkSuQmCC';

            this.scrapTFEmotes = "43nero,8killer,biblethump,nights,verdigrisv,vermillionv,victoriav,violetv,viridianv,vitellaryv,administrator,altaria,angelcake,angry_mouse,antelion,antonio,applejack,arcticfox,auroz,backstab,balloons,batcountry,bday,bghd,bigd,bigm,bigp,bionicbunion,bluecrab,blush_mouse,brohoof,brohoof2,burningrose,butts,cage,cake,captainfalcon,celestia,cheep,chrysalis,cm,cookie,coolpika,coolpika2,derp,derpmouse,devsuns,dfly,diaheart,dima,dimablush,dimahappy,dimasad,dogtor,doorknob,duk,ead,ech,eep,elizhappy,elizhappy2,elizmad,elizsurprise,faxon,feesh,fennekin,floofeh,floofeon,fluttercry,fluttershy,fluttersmile,flutteryay,foxy,fryingpan,furr,furry,gaben,gasp_mouse,gibus,glasses,grizz,hale,handshake,happy_mouse,happykitty,hearthstone,heyguys,holy,hoovy,hug,huge,hugpile,hundkopf,huzzah,hysterical,icebear,ies,ika,ineff,ineffoh,ineffp,jantran,januduck,jemmy,jemmy43,jibanyan,katuen,kick,lakota,lazypanda,likeaboss,littlebuddy,lucina,luna,manface,maxs,monkey,moon2,mousey,mrx,noise,nolove,nom,norman,odd,oops_mouse,overwatch,p_mouse,panda,papa,para,pie,pile,pillfox,pinkamena,pinkiepie,pinky,pizza,plagueoverseer,poi,pokeball,polishedturd,popsicle,predecessor,princess,pspikawink,puzzle,qt,questionblock,raffle,rainbowdash,rarecandy,rarity,rdspeechless,reaper,redcrab,refined,runningbomb,sad_mouse,salad,sandvich,sap,scott713,scrambler,scrap,seth,shako,shaman,sharkie,shiba,slice,smallmeep,smashball,smileinhd,smithhealz,sonicth,soulie,spooky,sprintingbomb,squib,squib2,squib3,squibbody,steam,suuslime,szorua,tardis,teamcaptain,tf2sniper,tfm_confetti,thedoc,thunderbomb,tip,tip2,toot,tophat,trump,twilightsparkle,uncraftable,vinyl,whip,whiterabbit,woof,wub,wuff,zeke,zomg,zorua";

            /* HTML string to BBCODE */

            this.unparse = {
                url: /<a.*href="(.*?)".*?>(.*?)<\/a>/gi,
                color: /<span style="color:(.*?)".*?>(.*?)<\/span>/gi,
                emote: /<img.*?title="(.*?)".*?>/gi,
                basics: {
                    b: [/(<strong>)/gi, /(<\/strong>)/gi],
                    i: [/(<em>)/gi, /(<\/em>)/gi],
                    s: [/(<s>)/gi, /(<\/s>)/gi],
                    u: [/(<u>)/gi, /(<\/u>)/gi]
                },
                br: /(<br>|<br\/>)/gi
            };

            this.emoteParse = /:(\w*):/gi;

        }

        /* Parse from scratch */

        Parse(str) {

            let result = XBBCODE.process({
                text: str
            }).html;

            // Emotes

            while ((res = this.emoteParse.exec(str)) !== null) {

                res[1] = res[1].toLowerCase();
                let link = '';

                // Kappa emote
                if (res[1] == "kappa") {
                    link = this.kappaIcon;
                }
                // ScrapTF emotes
                else if (this.scrapTFEmotes.indexOf(res[1]) >= 0) {
                    link = 'https://scrap.tf/img/emotes/' + res[1];
                }
                // Steam icon
                else {
                    link = 'https://steamcommunity-a.akamaihd.net/economy/emoticon/' + res[1];
                }

                result = result.replace(
                    res[0],
                    `<img src="${link}" title="{res[1]}" onerror="this.setAttribute('src','https://steamcommunity-a.akamaihd.net/economy/emoticon/missing')"/>`
                );
            }

        }

        /* Comment section & semi-parsed content */

        ReParse(str) {
            // HTML => BBCODE
            str = this.UnParse(str);

            // BBCODE => HTML
            return this.Parse(str);
        }

        /* HTML to BBCODE */

        UnParse(str) {

            let result = str,
                res;

            // Basic element

            for (let i = 0; i < 2; i++) {

                let close = (i > 0) ? '/' : '';

                for (let key in this.unparse.basics) {
                    result = result.replace(this.unparse.basics[key][i], '[' + close + key + ']');
                }
            }

            // Urls

            while ((res = this.unparse.url.exec(str)) !== null) {
                // regular link
                if (res[1] == res[2]) {
                    result = result.replace(res[0], res[1]);
                }
                // BBCODE url
                else {
                    result = result.replace(res[0], '[url=' + res[1] + ']' + res[2] + '[/url]');
                }
            }

            // Colors

            while ((res = this.unparse.color.exec(str)) !== null) {
                result = result.replace(res[0], '[color=' + res[1] + ']' + res[2] + '[/color]');
            }

            // Emotes

            while ((res = this.unparse.emote.exec(str)) !== null) {
                result = result.replace(res[0], ':' + res[1] + ':');
            }

            return result.replace(this.unparse.br, "\n");

        }
    }
}
