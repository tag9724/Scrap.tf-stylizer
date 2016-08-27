var defTemplate = document.getElementById('defTemplate');
var saveTemplate = document.getElementById('saveTemplates');

/* Load from defaults template */

function LoadDefaults() {

    var append = "";

    for (var i = 0, len = DEFAULT.length; i < len; i++) {

        let colors = "";

        for (let k in DEFAULT[i].colors) {
            if (["border", "btntext"].indexOf(k) === -1)
                colors += `<div class="btn-group color" style="background: ${DEFAULT[i].colors[k]};"></div>`;
        }

        append += `<div class="box" data-load="${DEFAULT[i].id}"><h4 class="pull-left">${DEFAULT[i].name}</h4>
        <div class="color-group" role="toolbar">${colors}</div></div>`;
    }

    defTemplate.innerHTML = append;

}

/* Load from saved */

function LoadSaved() {

    chrome.storage.local.get(["AvailableTemplates"], function(res) {

        res = res['AvailableTemplates'];

        if (res) {

            let append = "";

            // Build the list of templates

            for (let k in res) {

                let colors = "";

                for (let i = 0; i < 9; i++) {
                    colors += `<div class="btn-group color" style="background: ${res[k].colors[i]};"></div>`;
                }

                append += `<div class="box" data-load="${k}"><h4 class="pull-left">${res[k].name}</h4>
                <div class="color-group" role="toolbar">${colors}</div></div>`;
            }

            // Display the list of templates
            saveTemplate.innerHTML = append;

        } else {
            saveTemplate.innerHTML = "<p>You don't have any saved template</p>"; // TEMP next maj add the "import template" button;
        }
    });

}

/* Open template */

function OpenEditSection(ev) {

    var boxes = this.querySelectorAll('.box'),
        box;

    // Search the .box selected

    for (let i = 0, len = boxes.length; i < len; i++) {
        if (boxes[i].contains(ev.target)) {
            box = boxes[i];
            break;
        }
    }

    //  element found

    if (box) {

        // Default template
        if (this.id == "defTemplate") {
            TemplateManage.GetDefaultTemplate(box.dataset.load);
        }
        // Saved template
        else {
            TemplateManage.GetSavedTemplate(box.dataset.load);
        }
    }
}

/* Launch */

var TemplateManage;

document.addEventListener("DOMContentLoaded", function() {

    TemplateManage = new TemplatesManage();

    LoadDefaults();
    LoadSaved();

    defTemplate.addEventListener('click', OpenEditSection);
    saveTemplate.addEventListener('click', OpenEditSection);
});
