TemplatesManage.prototype.Save = function(use) {

    /* Build JSON save */

    var NewSave = {
            name: (this.nameInput.value === "") ? "Unamed Template" : this.nameInput.value
        },
        colors = [];

    // Colors

    NewSave.colors = {};

    for (let i = 0, len = 6; i < len; i++) {

        let currColor = TemplateManage.colorForm[i].querySelector('[type="color"]').value;
        let cTarget = TemplateManage.colorForm[i].dataset.ctarget;

        NewSave.colors[cTarget] = currColor;
        if (cTarget !== "border") colors.push(currColor);
    }

    NewSave.buttons = {};

    for (let i = 6, len = TemplateManage.colorForm.length; i < len; i++) {

        let currColor = TemplateManage.colorForm[i].querySelector('[type="color"]').value;
        let cTarget = TemplateManage.colorForm[i].dataset.ctarget;

        NewSave.buttons[cTarget] = currColor;
        if (cTarget !== "btntext") colors.push(currColor);
    }

    // Border btn radius

    NewSave.buttons.radius = Number(this.btnBorderForm.value) || 0;

    // Border Avatar radius

    NewSave.avatarBorders = [];

    for (let i = 0, len = 4; i < len; i++) {
        NewSave.avatarBorders[i] = Number(this.avatarForm[i].value) || 0;
    }

    // Background

    NewSave.background = Background.conf;

    // Google Font

    NewSave.fonts = {
        "global": GoogleFont.globalFont,
        "title": GoogleFont.titleFont,
        "fontList": {}
    };

    for (let i = 0, arr = ["globalFont", "titleFont"]; i < 2; i++) {
        if (GoogleFont.fontList[GoogleFont[arr[i]]]) {
            NewSave.fonts.fontList[GoogleFont[arr[i]]] = GoogleFont.fontList[GoogleFont[arr[i]]];
        }
    }

    // Custom CSS

    NewSave.customCSS = this.customCSS.value;

    /* If it's a new template create a new save */

    if (this.isDefault) {
        this.isDefault = false;
        this.templateID = this.GenID();
    }

    /* Save the template */

    chrome.storage.local.get("AvailableTemplates", function(list) {

        // For the first saved template
        if (!list.AvailableTemplates) list.AvailableTemplates = {};

        // Add the element in the current list
        list.AvailableTemplates[this.templateID] = {
            name: NewSave.name,
            colors: colors
        };

        // Save the new list & the content

        let save = {};

        save["AvailableTemplates"] = list.AvailableTemplates;
        save[this.templateID] = NewSave;

        chrome.storage.local.set(save);

    }.bind(this));

    /* Update the cached save for the reset btn */

    this.curr = NewSave;

    updateBox = document.querySelector(`#openSection .box[data-load="${this.templateID}"] h4`);

    // Get updated colors

    var newColors = "";

    for (let i = 0, len = colors.length; i < len; i++)
        newColors += `<div class="btn-group color" style="background: ${colors[i]};"></div>`;

    // Update the template box in the main page

    if (updateBox) {
        updateBox.innerHTML = NewSave.name;
        updateBox.parentElement.querySelector('.color-group').innerHTML = newColors;
    } else {

        let colors = "";

        for (let i = 0, len = colors.length; i < len; i++)
            colors += `<div class="btn-group color" style="background: ${colors[i]};"></div>`;

        let box = `<div class="box" data-load="${this.templateID}"><h4 class="pull-left">${NewSave.name}</h4>
              <div class="color-group" role="toolbar">${newColors}</div></div>`;

        saveTemplate.innerHTML += box;
    }

    /* If the user want to use him */

    if (use === true) {
        chrome.storage.local.set({
            'UsedTemplate': this.templateID
        }, function() {
            BuildUsedTemplate();
        });
    } else {
        BuildUsedTemplate();
    }
}

TemplatesManage.prototype.GenID = function() {
    var converted_string = "",
        actual_date = Date.now() + "";
    var convert_arr = ["ABCDEFGHIJ", "abcdefghij"];
    for (var i = 0, len = actual_date.length; i < len; i++) {
        converted_string += convert_arr[Math.round(Math.random())][parseFloat(actual_date.charAt(i))];
        converted_string += convert_arr[Math.round(Math.random())][Math.round(Math.random() * 9)];
    }
    return "T=" + window.btoa(converted_string).replace('=', '');
}
