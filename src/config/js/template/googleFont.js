"use strict";

class FontManagement {

    constructor(elem) {

        this.fontList = {};
        this.regUrlTag = /<link href="(.*)" rel="stylesheet">/i;
        // css regexp
        this.regFontFace = /{(.*?)}/ig;
        this.regFontFamily = /font-family: '(.*?)'[;]/i;

        // Css style box
        this.cssBox = document.createElement('style');
        document.head.appendChild(this.cssBox);

        // Select all forms and the demo box

        this.formUrl = elem.querySelector('form[data-font="url"]');
        this.formGlobal = elem.querySelector('form[data-font="global"]');
        this.formTitle = elem.querySelector('form[data-font="title"]');
        this.demo = elem.querySelector('.demo[data-font="demo"]');
        this.selectTag = elem.querySelectorAll('select');

        // Add events

        this.formUrl.addEventListener('submit', this.FormUrl.bind(this));
        this.formGlobal.addEventListener('change', this.ChangeGlobalFont.bind(this));
        this.formTitle.addEventListener('change', this.ChangeTitleFont.bind(this));
    }
    FormUrl(ev) {
        ev.preventDefault();

        // Parse the url
        var url = (ev.target[0].value.match(this.regUrlTag)) ?
            ev.target[0].value.match(this.regUrlTag)[1] :
            ev.target[0].value;

        var that = this;

        /* Get css datas for this font / save and apply for demo */

        this.GetCssFontDatas(url).then(function(res) {

            /* Match all font available */

            // remove all break line
            res = res.replace(/\n/g, "");

            // Get all font name and All css rules
            var fontFaces = res.match(that.regFontFace),
                fontList = {};

            for (let i = 0, len = fontFaces.length; i < len; i++) {

                let fontName = that.regFontFamily.exec(fontFaces[i])[1];

                // Create a new font usable element
                if (!fontList[fontName]) {
                    fontList[fontName] = {
                        style: []
                    }
                }

                fontList[fontName].style.push(fontFaces[i]);
            }

            /* Save datas and display them for the demo */

            that.fontList = fontList;
            that.UpdateAvailableFonts(fontList);

            // Reset the default font

            that.ChangeGlobalFont("");
            that.ChangeTitleFont("");

        }).catch(function(err) {
            console.log('prom not ok', err);
        });

    }
    GetCssFontDatas(url) {

        /* Load css style for these google fonts */

        return new Promise(function(resolve, reject) {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {

                if (xhttp.readyState == 4) {

                    if (xhttp.status == 200) {
                        resolve(xhttp.responseText);
                    } else {
                        reject(false);
                    }
                }

            };
            xhttp.open("GET", url, true);
            xhttp.send();
        });
    }
    UpdateAvailableFonts(fontList) {
        var fontAvailable = `<option value="">Default</option>`,
            cssRules = "";

        for (let key in fontList) {
            // Input select
            fontAvailable += `<option value="` + key + `">` + key + `</option>`;

            for (let i = 0, len = fontList[key].style.length; i < len; i++) {
                cssRules += "@font-face" + fontList[key].style[i];
            }
        }

        // Update content for demos
        this.cssBox.innerHTML = cssRules;

        this.formGlobal.querySelector('select').innerHTML = fontAvailable;
        this.formTitle.querySelector('select').innerHTML = fontAvailable;

        var isFontListEmpty = !Object.keys(fontList).length;

        for (let i = 0; i < 2; i++) {
            this.selectTag[i].disabled = isFontListEmpty;
        }
    }
    ChangeGlobalFont(ev) {
        this.globalFont = (ev.target) ? ev.target.value : ev;
        this.demo.style.fontFamily = this.globalFont;
    }
    ChangeTitleFont(ev) {
        this.titleFont = (ev.target) ? ev.target.value : ev;
        this.demo.querySelector('h3').style.fontFamily = this.titleFont;
    }
    UpdateSelectorForDemo() {
        this.formGlobal.querySelector('select').value = this.globalFont;
        this.formTitle.querySelector('select').value = this.titleFont;
    }
}

var GoogleFont = new FontManagement(document.getElementById('fontDemo'));
