function GenRaffleSelect( prefix ) {
    raffleSelect = {
        isPuzzle: ( prefix == 'puzzle-' ),
        raffleID: Date.now(),
        name: document.getElementById( prefix + "rafflename" ),
        message: document.getElementById( prefix + "rafflemessage" ),
        enteredmessage: document.getElementById( prefix + "enteredmessage" ),
        length: document.getElementById( prefix + "raffle-length" ),
        maxentries: document.getElementById( prefix + "raffle-maxentries" ),
        privateRaffle: document.getElementById( "raffle-private" ),
        password: document.getElementById( prefix + "raffle-password" ),
        poll: document.getElementById( prefix + "raffle-poll" ),
        comments: document.getElementById( prefix + "disable-comments" ),
        twitch: document.getElementById( "make-twitch-raffle" ),
        subluck: document.getElementById( "raffle-sub-luck" ),
        method: document.getElementById( prefix + "raffle-method" ),
        puzzlesolution: document.getElementById( 'puzzlesolution' )
    };
}

function OpenRaffleEdit( editSection ) {

    // Remove Saved raffle panel
    document.getElementById( 'PonyPanel' ).remove();

    /* Let's change the textarea */
    function ParseArea( ev ) {
        // View the parsed content
        var c = raffleArea.value.replace( /\n/g, '<br/>' );
        for ( let i = 0, len = BBCODE.length; i < len; i++ ) c = BBCODE[ i ]( c );
        content.innerHTML = c;
        // display the number of caracters left
        document.querySelector( '#chars span' ).textContent = 3500 - raffleArea.value.length;
    }

    function DisplayArea() {
        content.style.display = "block";
    }

    function HideArea() {
        content.style.display = "none";
    }

    if ( editSection == 'puzzle-' ) {
        var raffleArea = document.getElementById( 'puzzle-rafflemessage' );
        var formatHelp = document.querySelector( '#raffle-puzzle-form > div:nth-child(2) > label > b' );

        var enterMsgHelp = document.querySelector( '#raffle-puzzle-form > div:nth-child(5) > label > b' );
        var enterMsgArea = 'puzzle-enteredmessage';
    } else {
        var raffleArea = document.getElementById( 'rafflemessage' );
        var formatHelp = document.querySelector( '#raffle-form > div:nth-child(2) > label > b' );

        var enterMsgHelp = document.querySelector( '#raffle-form > div:nth-child(3) > label > b' );
        var enterMsgArea = 'enteredmessage';
    }

    // Add the contentEditable

    var content = document.createElement( 'p' );
    content.setAttribute( 'id', 'Content' );
    raffleArea.insertAdjacentElement( 'afterend', content );

    // Add event
    raffleArea.addEventListener( 'keyup', ParseArea );
    raffleArea.addEventListener( 'focus', DisplayArea );
    raffleArea.addEventListener( 'blur', HideArea );

    /* Text formatting help */

    formatHelp.outerHTML += "<div class='formattingHelp'>" +
        "<i class='fa fa-bold' onclick='document.getElementById(\"rafflemessage\").value += \"[b][/b]\"'></i>" +
        "<i class='fa fa-underline' onclick='document.getElementById(\"rafflemessage\").value += \"[u][/u]\"'></i>" +
        "<i class='fa fa-italic' onclick='document.getElementById(\"rafflemessage\").value += \"[i][/i]\"'></i>" +
        "<i class='fa fa-strikethrough' onclick='document.getElementById(\"rafflemessage\").value += \"[s][/s]\"'></i>" +
        "<i class='fa fa-eye-slash' onclick='document.getElementById(\"rafflemessage\").value += \"[color=#f7f9fa][/color]\"'></i>" +
        "<i class='fa fa-paint-brush' onclick='document.getElementById(\"rafflemessage\").value += \"[color=][/color]\"'></i>" +
        "<i class='fa fa-link' onclick='document.getElementById(\"rafflemessage\").value += \"[url=][/url]\"'></i>" +
        "<div id='chars'>left : <span>3500</span></div>" +
        "</div>";

    enterMsgHelp.outerHTML += `<div class='formattingHelp'>
        <i class='fa fa-ban' onclick='document.getElementById("${enterMsgArea}").value += "[color=transparent]notip[/color]"'> Disable tips</i>
        </div>`;
}

/* New Raffle button ( Main page ) */

( function () {
    const MajorBTN = Array.from( document.querySelectorAll( '#raffle-intro button' ) );

    for ( let i = 0, len = MajorBTN.length; i < len; i++ ) {

        MajorBTN[ i ].dataset.open = ( i == 1 ) ? 'puzzle-' : '';
        MajorBTN[ i ].dataset.private = ( i == 2 ) ? true : false;

        MajorBTN[ i ].addEventListener( 'click', function () {
            OpenRaffleEdit( this.dataset.open );
            GenRaffleSelect( this.dataset.open );
            AppendSaveBtn( this.dataset.private );
        } );
    }
} )();
