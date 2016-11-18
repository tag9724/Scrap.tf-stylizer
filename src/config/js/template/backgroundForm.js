class BackgroundSetting {
    constructor(demo) {
        this.demo = demo;

        // Current Settings
        this.conf = {
            image: "",
            fixed: false,
            size: ""
        };

        // Forms
        this.form = {
            link: document.querySelector('form[data-backtarget="link"]'),
            file: document.querySelector('form[data-backtarget="file"]'),
            size: document.querySelector('select[data-backtarget="size"]'),
            fixed: document.querySelector('input[data-backtarget="fixed"]'),
        };

        // Add forms events
        this.form.link.addEventListener('submit', this.LinkForm.bind(this));
        this.form.file.addEventListener('submit', this.FileForm.bind(this));

        // Checkbox events
        this.form.fixed.addEventListener('change', this.FixedCheckbox.bind(this));
        this.form.size.addEventListener('change', this.SizeSelect.bind(this));

        // File input event
        this.form.file.querySelector('input[type="file"]').addEventListener('change', this.UpdateFileName.bind(this));
    }
    LinkForm(ev) {
        ev.preventDefault();
        this.DisplayDemo(ev.target[0].value);
    }
    FileForm(ev) {
        ev.preventDefault();

        // Convert the local image in base64

        if (ev.target[1].files[0]) {
            var reader = new FileReader();
            reader.onload = function(readerEvt) {
                this.DisplayDemo(readerEvt.target.result);
            }.bind(this);
            reader.readAsDataURL(ev.target[1].files[0]);
        }
    }
    SizeSelect(ev) {

        var apply = (ev.target) ? ev.target.value : ev;
        this.form.size.value = apply;

        this.demo.style.backgroundSize = apply;
        this.conf.size = apply;
    }
    FixedCheckbox(ev) {

        var apply = (ev.target) ? ev.target.checked : ev;
        this.form.fixed.checked = apply;

        if (apply === true) {
            this.demo.style.backgroundAttachment = "fixed";
        } else {
            this.demo.style.backgroundAttachment = "scroll";
        }

        this.conf.fixed = apply;
    }
    UpdateFileName(ev) {
        // Update the filename
        this.form.file.querySelector('input[type="text"]').value = ev.target.files[0].name;
    }
    DisplayDemo(image) {
        this.demo.style.backgroundImage = 'url(' + image + ')';
        this.conf.image = image;
    }
}

var Background = new BackgroundSetting(document.getElementById('editSection'));
