/* Relly inputs */

class ColorPicker {
    constructor(elem) {
        // Format of text input ( #0f0f0f )
        this.hexFormat = /[#][0-9a-f]{6}/i;

        // Block form validation
        elem.addEventListener("submit", function(ev) {
            ev.preventDefault();
        });

        // Select the demo div and the type of change
        this.demoType = elem.dataset.ctype;
        this.demo = document.querySelectorAll('.demo[data-ctarget="' + elem.dataset.ctarget + '"]');
        this.borderDemo = document.querySelectorAll('.demo[data-ctarget="' + elem.dataset.ctarget + '"] .demo');

        // Select inputs
        this.text = elem.querySelector('input[type="text"]');
        this.color = elem.querySelector('input[type="color"]');

        // Add events
        this.text.addEventListener("keyup", this.EventText.bind(this));
        this.color.addEventListener("change", this.EventColor.bind(this));
    }
    EventText() {
        // verify hexa format
        if (this.text.value.match(this.hexFormat)) {
            this.color.value = this.text.value;
        }
        this.DisplayDemo();
    }
    EventColor() {
        this.text.value = this.color.value;
        this.DisplayDemo();
    }
    DisplayDemo() {
        // Border color ...
        if (this.demoType == "borderColor") {

            for (var i = 0, len = this.borderDemo.length; i < len; i++) {
                this.borderDemo[i].style.borderColor = this.color.value;
            }
        }
        // Background-color & color
        else {

            for (var i = 0, len = this.demo.length; i < len; i++) {
                this.demo[i].style[this.demoType] = this.color.value;
            }

        }
    }
}

/* Add events */

const PICKERS = document.querySelectorAll('.pickColor');

for (var i = 0, len = PICKERS.length; i < len; i++) {
    new ColorPicker(PICKERS[i]);
}
