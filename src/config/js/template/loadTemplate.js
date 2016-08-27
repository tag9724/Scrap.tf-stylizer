class TemplatesManage {
    constructor() {

        // Main boxes
        this.EDIT = document.getElementById("editSection");
        this.OPEN = document.getElementById("openSection");
        this.LOAD = document.getElementById('bigLoad');

        // Demos boxs
        this.textDemo = document.querySelectorAll('.demo[data-ctype="color"]');
        this.backDemo = document.querySelectorAll('.demo[data-ctype="backgroundColor"]');
        this.borderColorDemo = document.querySelectorAll('.demo[data-btype="borderColor"] .demo');
        this.avatarDemo = document.querySelectorAll('img[data-btarget="avatarBorder"]');
        this.btnBorderDemo = document.querySelectorAll('.demo[data-btarget="btn"]');

        // Inputs
        this.colorForm = document.querySelectorAll(`
        form[data-ctype="color"],
        form[data-ctype="backgroundColor"],
        form[data-ctype="borderColor"]`);
        this.avatarForm = document.querySelectorAll('form[data-btarget="avatarBorder"] input');
        this.btnBorderForm = document.querySelector('form[data-btarget="btn"] input');
        this.customCSS = document.getElementById('customCSS');

        // Template Name
        this.nameInput = document.getElementById('templateName');

        // Edit section main btn
        document.getElementById('ReloadConfig').addEventListener("click", this.UpdateDemo.bind(this));
        document.getElementById('ReturnToMain').addEventListener("click", this.ReturnToMain.bind(this));
        document.getElementById('Save').addEventListener("click", this.Save.bind(this));
        document.getElementById('SaveUse').addEventListener("click", this.SaveAndUse.bind(this));
        document.getElementById('Delete').addEventListener("click", this.Delete.bind(this));
    }
    GetDefaultTemplate(elem) {

        // Start animation
        this.ContainerTransition(true);

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "templates/" + elem + ".json");
        xhttp.onreadystatechange = function(data) {
            if (xhttp.readyState === 4) {
                this.curr = JSON.parse(xhttp.responseText);
                this.nameInput.value = "";

                // Display the template

                this.isDefault = true;
                this.UpdateDemo();
            }
        }.bind(this);
        xhttp.send();
    }
    GetSavedTemplate(elem) {

        // Start animation
        this.ContainerTransition(true);

        chrome.storage.local.get(elem, function(res) {
            if (res[elem]) {
                this.curr = res[elem];
                this.templateID = elem;
                this.isDefault = false;

                // Update the input name & launch
                this.nameInput.value = this.curr.name;
                this.UpdateDemo();
            }
        }.bind(this));
    }
    UpdateDemo() {

        /* Demos box */

        // Apply Text colors
        for (let i = 0, len = this.textDemo.length; i < len; i++) {
            let change = this.textDemo[i].dataset.ctarget;
            this.textDemo[i].style.color = this.curr.colors[change] || this.curr.buttons[change];
        }

        // Apply background colors
        for (let i = 0, len = this.backDemo.length; i < len; i++) {
            let change = this.backDemo[i].dataset.ctarget;
            this.backDemo[i].style.backgroundColor = this.curr.colors[change] || this.curr.buttons[change];
        }

        // Apply border color
        for (let i = 0, len = this.borderColorDemo.length; i < len; i++) {
            this.borderColorDemo[i].style.borderColor = this.curr.colors.border;
        }

        // Border radius avatars
        for (let i = 0, len = this.avatarDemo.length, rad = this.curr.avatarBorders; i < len; i++) {
            this.avatarDemo[i].style.borderRadius = rad[0] + "em " + rad[1] + "em " + rad[3] + "em " + rad[2] + "em ";
        }

        // Buttons radius
        for (let i = 0, len = this.btnBorderDemo.length; i < len; i++) {
            this.btnBorderDemo[i].style.borderRadius = this.curr.buttons.radius + "em";
        }

        /* Forms inputs */

        // Apply input colors
        for (let i = 0, len = this.colorForm.length; i < len; i++) {
            let change = this.colorForm[i].dataset.ctarget;
            let color = this.curr.colors[change] || this.curr.buttons[change];

            this.colorForm[i].querySelectorAll('input').forEach(function(elem) {
                elem.value = color;
            });
        }

        // Avatar borders radius
        for (let i = 0, len = this.curr.avatarBorders.length; i < len; i++) {
            this.avatarForm[i].value = this.curr.avatarBorders[i];
        }

        // Button borders radius
        this.btnBorderForm.value = this.curr.buttons.radius;

        /* Background */

        Background.DisplayDemo(this.curr.background.image);
        Background.SizeSelect(this.curr.background.size);
        Background.FixedCheckbox(this.curr.background.fixed);

        /* Google font */

        GoogleFont.fontList = this.curr.fonts.fontList;
        GoogleFont.UpdateAvailableFonts(this.curr.fonts.fontList || {});
        GoogleFont.ChangeGlobalFont(this.curr.fonts.global);
        GoogleFont.ChangeTitleFont(this.curr.fonts.title);
        GoogleFont.UpdateSelectorForDemo();

        /* Custom CSS */

        this.customCSS.value = this.curr.customCSS;

    }
    ReturnToMain() {
        this.ContainerTransition(false);
    }
    SaveAndUse() {
        this.Save(true);
    }
    Delete() {

        // Start animation
        this.ContainerTransition(false);

        // Delete the template

        chrome.storage.local.get("AvailableTemplates", function(list) {

            if (list.AvailableTemplates[this.templateID]) {
                delete list.AvailableTemplates[this.templateID];
                chrome.storage.local.remove(this.templateID);
            }

            chrome.storage.local.set({
                "AvailableTemplates": list.AvailableTemplates
            });
        }.bind(this));

        // If he's used ...

        chrome.storage.local.get('UsedTemplate', function(res) {
            if (res.UsedTemplate === this.templateID) {
                chrome.storage.local.remove("UsedTemplate");
                chrome.storage.local.remove('CurrentTemplate');
            }
        }.bind(this));

        // Remove the box linked with him
        document.querySelector(`#openSection .box[data-load="${this.templateID}"]`).remove();
    }
    ContainerTransition(moveToEdit) {

        // Display the loader
        this.LOAD.style.animation = "in 0.2s ease 1 forwards";

        // Display the next section
        setTimeout(function() {
            if (moveToEdit) {
                this.OPEN.classList.add('hide');
                this.EDIT.classList.remove('hide');
            } else {
                this.EDIT.classList.add('hide');
                this.OPEN.classList.remove('hide');
            }
        }.bind(this), 250);

        // Remove the loader
        setTimeout(function() {
            this.LOAD.style.animation = "out 0.25s ease 1 forwards";
        }.bind(this), 500);
    }
}
