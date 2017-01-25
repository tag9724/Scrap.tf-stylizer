Inject( 'createRaffle.js' );

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

/* Send datas to injected scripts */

function Exec( name, content ) {
    document.dispatchEvent(
        new CustomEvent( name, {
            detail: content
        } )
    );
}

function OpenRaffleEdit() {

    /* Remove Saved raffle panel */

    let ponyPanel = document.getElementById( 'PonyPanel' );
    if ( ponyPanel ) ponyPanel.remove();
}

/* New Raffle button ( Main page ) */

( function () {
    const MajorBTN = Array.from( document.querySelectorAll( `button[onclick="ScrapTF.Raffles.NextStep('public')"],button[onclick="ScrapTF.Raffles.NextStep('puzzle')"],button[onclick="ScrapTF.Raffles.NextStep('private')"]` ) );

    for ( let i = 0, len = MajorBTN.length; i < len; i++ ) {

        MajorBTN[ i ].dataset.open = ( i == 1 ) ? 'puzzle-' : '';
        MajorBTN[ i ].dataset.private = ( i == 2 ) ? true : false;

        MajorBTN[ i ].addEventListener( 'click', function () {
            OpenRaffleEdit();
            GenRaffleSelect( this.dataset.open );
            AppendSaveBtn( this.dataset.private );
        } );
    }
} )();
