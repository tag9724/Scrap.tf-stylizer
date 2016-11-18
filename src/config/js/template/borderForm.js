/*
    Réaddapter le script pour le réutiliser avec les boutons
*/

class AvatarBorder {
    constructor(elem) {
        // Block form validation
        elem.addEventListener("submit", function(ev) {
            ev.preventDefault();
        });

        // Images demo
        this.demoType = elem.dataset.btype;
        this.demo = document.querySelectorAll('.demo[data-btarget="' + elem.dataset.btarget + '"]');

        // Input selector & event
        this.number = elem.querySelector('input[type="number"]');
        this.number.addEventListener('keyup', this.DisplayDemo.bind(this));
        this.number.addEventListener('change', this.DisplayDemo.bind(this));
    }
    DisplayDemo() {
        for (var i = 0, len = this.demo.length; i < len; i++) {
            this.demo[i].style[this.demoType] = this.number.value + "em";
        }
    }
}

/* Add avatars border event */

const BORDERS = document.querySelectorAll('.borderDemo');

for (var i = 0, len = BORDERS.length; i < len; i++) {
    new AvatarBorder(BORDERS[i]);
}

/* Multiple avatars demo */

const AVATAR_DEMO = document.querySelector('.avatarDemo');
const AVATAR_IMGS = AVATAR_DEMO.querySelectorAll('img');

const AVATAR_LIST = [{
    url: "HeartDesire.gif",
    color: "#CC0000"
}, {
    url: "Ezekiel.jpg",
    color: "#70B04A"
}, {
    url: "PonyTyler.jpg",
    color: "#C49B5E"
}];

var currentAvatar = 0;

AVATAR_DEMO.addEventListener('click', function(ev) {
    currentAvatar = (currentAvatar + 1) % AVATAR_LIST.length;

    for (let i = 0; i < 3; i++) {
        AVATAR_IMGS[i].src = "img/avatar/" + AVATAR_LIST[currentAvatar].url;
        AVATAR_IMGS[i].style.borderColor = AVATAR_LIST[currentAvatar].color;
    }
});
