var IS_PRIVATE, NewModal = document.createElement('div');

// New raffles is private ?

document.querySelector("#raffle-intro > div:nth-child(2) > button").addEventListener("click", function() {
    AppendSaveBtn(false);
});
document.querySelector("#raffle-intro > div:nth-child(3) > button").addEventListener("click", function() {
    AppendSaveBtn(true);
});

/* Save raffle content */

function SaveModalRaffle() {

    var conf = {
        isPrivate: IS_PRIVATE,
        raffleID: Date.now(),
        name: document.getElementById("rafflename").value,
        message: document.getElementById("rafflemessage").value,
        length: document.getElementById("raffle-length").value,
        type: (document.getElementById("raffle-method").value == "2") ? true : false,
        maxentries: document.getElementById("raffle-maxentries").value,
        privateRaffle: document.getElementById(IS_PRIVATE ? "raffle-private" : "raffle-public").value,
        pwd: document.getElementById("raffle-password").value,
        poll: document.getElementById("raffle-poll").value,
        nocmt: document.getElementById("disable-comments").checked,
        twitch: document.getElementById("make-twitch-raffle").checked,
        subluck: document.getElementById("raffle-sub-luck").value,
        entmsg: document.getElementById("enteredmessage").value
    };
    conf.solution = (conf.privateRaffle == 7 && document.getElementById("puzzlesolution").value);
    conf.subluck = (conf.subluck == 0 || conf.subluck == null) ? 1 : conf.subluck;

    conf.maxentries = (conf.maxentries == "") ? "200" : conf.maxentries;

    conf.savedName = NewModal.querySelector('#ModalValue').value;
    conf.savedName = (conf.savedName == "") ? conf.name : conf.savedName;

    // Save in storage

    chrome.storage.local.get(["savedCreateRaffle"], function(res) {

        // First configuration
        if (!res.savedCreateRaffle) {
            console.log("Construct config");
            res.savedCreateRaffle = [];
        }

        // Add item
        res.savedCreateRaffle.push(conf);

        // save him
        chrome.storage.local.set({
            savedCreateRaffle: res.savedCreateRaffle
        }, function(err, msg) {
            console.log("Config saved", err, msg);
        });

    });

    // Close the modal
    NewModal.classList.add('hidden');
}

function CancelModalRaffle() {
    // Close the modal
    NewModal.classList.add('hidden');
}

function OpenSaveModal() {

    // Suggest a name for this raffle config
    NewModal.querySelector('#ModalValue').setAttribute('placeholder',
        document.getElementById("rafflename").value);

    // Display the modal
    NewModal.classList.remove('hidden');
}

// Append the save icon
function AppendSaveBtn(isPriv) {

    IS_PRIVATE = isPriv;

    // Remove The load box
    var PonyPanel = document.getElementById('PonyPanel');
    PonyPanel ? PonyPanel.remove() : false;

    // Display the save icon

    var saveBtn = document.createElement('i');
    saveBtn.classList.add('fa', 'fa-save', 'btn-saveConf');
    saveBtn.addEventListener('click', OpenSaveModal);
    document.querySelector('div.panel-heading > h3').appendChild(saveBtn);

    /* Append the modal in the page */

    NewModal.classList.add('modal', 'fade', 'in', 'NewModal', 'hidden');
    NewModal.setAttribute('tabindex', '-1');
    NewModal.setAttribute('role', 'dialog');
    NewModal.setAttribute('aria-hidden', 'false');

    NewModal.innerHTML = '<div class="modal-backdrop fade in" style="height: 0px;"></div>' +
        '<div class="modal-dialog">' +
        '   <div class="modal-content">' +
        '      <div class="modal-header">' +
        '         <h4 class="modal-title"><i18n>Save this raffle configuration</i18n></h4>' +
        '      </div>' +
        '      <div class="modal-body">' +
        '         <input type="text" id="ModalValue" placeholder="Enter your wanted name" class="form-control" autocomplete="off">' +
        '      </div>' +
        '      <div class="modal-footer">' +
        '         <button id="ModalCancel" type="button" class="btn btn-default btn-embossed">' +
        '            <i18n>Cancel</i18n>' +
        '         </button>' +
        '         <button id="ModalSave" type="button" class="btn btn-primary btn-embossed">' +
        '            <i18n>Save</i18n>' +
        '         </button>' +
        '      </div>' +
        '   </div>' +
        '</div>';

    NewModal.querySelector('#ModalCancel').addEventListener('click', CancelModalRaffle);
    NewModal.querySelector('#ModalSave').addEventListener('click', SaveModalRaffle);

    document.body.appendChild(NewModal);
}
