( function () {

    /* Load a previously saved raffle */

    document.addEventListener( 'LoadRaffle', function ( ev ) {
        CKEDITOR.instances[ ev.detail.target + "rafflemessage" ].setData( ev.detail.message );
        CKEDITOR.instances[ ev.detail.target + "enteredmessage" ].setData( ev.detail.enterMessage );
    } );

    /* Replace entries input text => number */

    var entries = [
        document.getElementById( 'raffle-maxentries' ),
        document.getElementById( 'puzzle-raffle-maxentries' )
    ];

    for ( let i = 0, len = entries.length; i < len; i++ ) {
        entries[ i ].setAttribute( 'type', 'number' );
        entries[ i ].setAttribute( 'step', '100' );
        entries[ i ].setAttribute( 'min', '0' );
        entries[ i ].setAttribute( 'max', '100000' );
    }

} )();

/* Send datas to content script */

function Exec( name, content ) {
    document.dispatchEvent(
        new CustomEvent( name, {
            detail: content
        } )
    );
}

/* Modal save current raffle template */

function ExecSaveRaffle() {

    let obj = {
        message: [ CKEDITOR.instances[ "rafflemessage" ].getData(), CKEDITOR.instances[ "puzzle-rafflemessage" ].getData() ],
        entmsg: [ CKEDITOR.instances[ "enteredmessage" ].getData(), CKEDITOR.instances[ "puzzle-enteredmessage" ].getData() ]
    };

    console.log( obj );

    Exec( 'SaveRaffle', obj );
}
