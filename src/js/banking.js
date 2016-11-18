const CURR_BOT = window.location.pathname.split( '/' );

/* Bot page */

if ( CURR_BOT[ 2 ] && BOTS[ CURR_BOT[ 1 ] ][ CURR_BOT[ 2 ] ] ) {
    // Append icon on the header
    let appendPlace = document.querySelector( '.welcome-overlay-container > div > div > div.well-padding' );

    if ( appendPlace )
        appendPlace.appendChild(
            BuildDOM.BpLink( "http://backpack.tf/profiles/" + BOTS[ CURR_BOT[ 1 ] ][ CURR_BOT[ 2 ] ][ 1 ] )
        );

}

/* Main banking page */
else {
    let bankBoxes = Array.from( document.querySelectorAll( '.bank-selector-box' ) );

    for ( let i = 0, len = bankBoxes.length; i < len; i++ ) {
        // Get the bot id & append the icon
        let botID = bankBoxes[ i ].children[ 0 ].href.split( '/' )[ 4 ];

        // In case of the bot is not listed
        if ( BOTS[ CURR_BOT[ 1 ] ][ botID ] )
            bankBoxes[ i ].appendChild(
                BuildDOM.BpLink( "http://backpack.tf/profiles/" + BOTS[ CURR_BOT[ 1 ] ][ botID ][ 1 ] )
            );

    }
}
