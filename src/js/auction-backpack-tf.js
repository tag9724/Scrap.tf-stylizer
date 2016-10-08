( function () {
    const ITEMS = document.querySelectorAll( '.well-padding > .auction-items > div' );
    const RegQuality = /quality(\d*)/;
    const RegParticles = /particles_440\/(\d*)/;

    const Quality = {
        0: "Normal",
        1: "Genuine",
        3: "Vintage",
        6: "Unique",
        5: "Unusual",
        9: "Self-Made",
        11: "Strange",
        14: "Collector's",
        15: "Decorated Weapon"
    };

    // ITEM_SHEMA[ defindex ]

    for ( let i = 0, len = ITEMS.length; i < len; i++ ) {

        let link = "";

        let defindex = ITEMS[ i ].dataset.defindex;
        let slot = ITEMS[ i ].dataset.slot;

        /* Check item in the def_index list */

        if ( ITEM_SHEMA[ defindex ] ) {

            let quality = RegQuality.exec( ITEMS[ i ].classList )[ 1 ];

            // Quality
            link = "http://backpack.tf/stats/" + Quality[ quality ];

            /* Item name */

            let name = "";

            // Decorated weapons
            if ( quality == 15 ) {
                name = ITEMS[ i ].dataset.title.replace( '(', "| " + ITEM_SHEMA[ defindex ] + ' (' );
            }
            // Australium
            else if ( ITEMS[ i ].getAttribute( 'style' ).indexOf( "-gold." ) != -1 ) {
                name = "Australium " + ITEM_SHEMA[ defindex ];
            }
            // Anything else
            else {
                name = ITEM_SHEMA[ defindex ];
            }

            link += "/" + name + "/Tradable/";

            /* Craftable & unusuals particles */

            link += ( ITEMS[ i ].getAttribute( 'class' ).indexOf( "uncraft" ) >= 0 ) ? "Non-Craftable" : "Craftable";

            if ( quality == 5 )
                link += "/" + RegParticles.exec( ITEMS[ i ].getAttribute( 'style' ) )[ 1 ];

            /* Append the resulted icon */

            ITEMS[ i ].appendChild( BuildDOM.BpLink( link ) );
        }

    }
} )();
