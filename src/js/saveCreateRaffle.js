var ISPRIVATE, NewModal = document.createElement( 'div' );

/* Save raffle content */

function SaveModalRaffle() {

    var conf = {
        isPrivate: ISPRIVATE,
        raffleID: Date.now(),
        name: raffleSelect.name.value,
        message: raffleSelect.message.value,
        entmsg: raffleSelect.enteredmessage.value,
        length: raffleSelect.length.value,
        type: ( raffleSelect.method.value == "2" ) ? true : false,
        maxentries: raffleSelect.maxentries.value,
        pwd: raffleSelect.password.value,
        poll: raffleSelect.poll.value,
        nocmt: raffleSelect.comments.checked,
        twitch: raffleSelect.twitch.checked,
        subluck: raffleSelect.subluck.value
    };

    if ( ISPRIVATE ) {
        conf.privateRaffle = raffleSelect.privateRaffle.value
    } else {
        conf.privateRaffle = ( raffleSelect.isPuzzle ) ? 7 : 0;
    }

    conf.solution = ( conf.privateRaffle == 7 && raffleSelect.puzzlesolution.value );
    conf.subluck = ( conf.subluck == 0 || conf.subluck == null ) ? 1 : conf.subluck;

    conf.maxentries = ( conf.maxentries == "" ) ? "200" : conf.maxentries;

    conf.savedName = NewModal.querySelector( '#ModalValue' ).value;
    conf.savedName = ( conf.savedName == "" ) ? conf.name : conf.savedName;

    // Save in storage

    chrome.storage.local.get( [ "savedCreateRaffle" ], function ( res ) {

        // First configuration
        if ( !res.savedCreateRaffle ) {
            res.savedCreateRaffle = [];
        }

        // Add item
        res.savedCreateRaffle.push( conf );

        // save him
        chrome.storage.local.set( {
            savedCreateRaffle: res.savedCreateRaffle
        } );

    } );

    // Close the modal
    CancelModalRaffle();
}

function CancelModalRaffle() {
    // Close the modal
    NewModal.classList.add( 'hidden' );
}

function OpenSaveModal() {

    // Suggest a name for this raffle config
    NewModal.querySelector( '#ModalValue' ).setAttribute( 'placeholder', raffleSelect.name.value );

    // Display the modal
    NewModal.classList.remove( 'hidden' );
}

// Append the save icon
function AppendSaveBtn( isPriv ) {

    ISPRIVATE = ( isPriv == "true" );

    // Display the save icon

    var saveBtn = document.createElement( 'i' );
    saveBtn.classList.add( 'fa', 'fa-save', 'btn-saveConf' );
    saveBtn.addEventListener( 'click', OpenSaveModal );
    document.querySelector( 'div.panel-heading > h3' ).appendChild( saveBtn );

    /* Append the modal in the page */

    NewModal.classList.add( 'modal', 'fade', 'in', 'NewModal', 'hidden' );
    NewModal.setAttribute( 'tabindex', '-1' );
    NewModal.setAttribute( 'role', 'dialog' );
    NewModal.setAttribute( 'aria-hidden', 'false' );

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

    NewModal.querySelector( '#ModalCancel' ).addEventListener( 'click', CancelModalRaffle );
    NewModal.querySelector( '#ModalSave' ).addEventListener( 'click', SaveModalRaffle );

    document.body.appendChild( NewModal );
}
