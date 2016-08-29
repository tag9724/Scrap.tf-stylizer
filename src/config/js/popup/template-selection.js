class TemplateList {
    constructor() {
        this.appendBox = document.getElementById('templates');
        this.listTemplates = "";

        /* TemplateURL */

        let urlBox = document.getElementById('TemplateManageURL') || {};
        urlBox.href = chrome.extension.getURL('/config/templates.html');
        urlBox.target = "about_blank";

        this.ConstructList();

        /* event */

        this.appendBox.addEventListener('click', this.SelectTemplate.bind(this));
    }
    ConstructContent(name, id, colors, isDefault) {
        let colorBoxes = "";

        for (let k in colors) {
            if (["border", "btntext"].indexOf(k) === -1)
                colorBoxes += `<div class="btn-group color" style="background: ${colors[k]};"></div>`;
        }

        this.listTemplates += `<div class="box" data-def="${isDefault}" data-load="${id}"><h4 class="pull-left">${name}</h4>
        <div class="color-group" role="toolbar">${colorBoxes}</div></div>`;
    }
    ConstructList() {
        this.AppendDefault();
        this.AppendSaved();
    }
    AppendDefault() {
        for (let i = 0, len = DEFAULT.length; i < len; i++) {
            this.ConstructContent(DEFAULT[i].name, DEFAULT[i].id, DEFAULT[i].colors, true);
        }
    }
    AppendSaved() {
        chrome.storage.local.get(["AvailableTemplates"], function(res) {
            res = res['AvailableTemplates'];

            if (res) {
                for (let k in res) {
                    if (res[k].name && k && res[k].colors)
                        this.ConstructContent(res[k].name, k, res[k].colors, false);
                }
            }

            // Append the content

            this.appendBox.innerHTML = this.listTemplates;

            // And check what template is used

            chrome.storage.local.get('UsedTemplate', function(res) {
                if (res.UsedTemplate) {
                    let box = document.querySelector('.box[data-load="' + res.UsedTemplate + '"]');

                    if (box)
                        box.classList.add('active');
                }
            });

        }.bind(this));
    }
    SelectTemplate(ev) {

        var boxes = this.appendBox.querySelectorAll('.box'),
            target = {},
            current = this.appendBox.querySelector('.active');

        if (current)
            current.classList.remove('active');

        for (let i = 0, len = boxes.length; i < len; i++) {

            if (boxes[i].contains(ev.target)) {
                target = {
                    id: boxes[i].dataset.load,
                    def: boxes[i].dataset.def
                };

                // Add the active class
                boxes[i].classList.add('active');

                break;
            }
        }

        if (target.def === "true") {
            this.ConstructDefaultTemplate(target.id);
        } else if (target.def === "false") {
            this.ConstructSavedTemplate(target.id);
        }

    }
    ConstructDefaultTemplate(id) {

        if (id !== "default") {

            /* Get the template JSON  */

            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "templates/" + id + ".json");
            xhttp.onreadystatechange = function(data) {

                // Save the template

                if (xhttp.readyState === 4) {

                    let newSave = {};
                    newSave[id] = JSON.parse(xhttp.responseText);
                    newSave['UsedTemplate'] = id;

                    chrome.storage.local.set(
                        newSave,
                        function() {
                            BuildUsedTemplate();
                        });
                }
            }.bind(this);
            xhttp.send();

        } else {
            chrome.storage.local.remove('UsedTemplate');
            chrome.storage.local.remove('CurrentTemplate');
        }
    }
    ConstructSavedTemplate(id) {
        chrome.storage.local.set({
                'UsedTemplate': id
            },
            function() {
                BuildUsedTemplate();
            });
    }
}
new TemplateList();
