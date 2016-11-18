( function () {
    const ITEMS = document.querySelectorAll( '.well-padding > .auction-items > div, .panel-raffle-items > div' );
    const RegQuality = /quality(\d*)/;
    const RegParticles = /particles_440\/(\d*)/;
    const RegKillstreakWeapon = /killstreak(\d)/i;
    const RegKillstreakKit = /(.*?) (.*?) Kit/i;
    const RegWeaponWear = /(Battle Scarred)|(Well-Worn)|(Field-Tested)|(Minimal Wear)|(Factory New)/gi;

    const Quality = {
        0: "Normal",
        1: "Genuine",
        3: "Vintage",
        6: "Unique",
        5: "Unusual",
        9: "Self-Made",
        11: "Strange",
        13: "Haunted",
        14: "Collector's",
        15: "Decorated Weapon"
    };

    const Killstreak = {
        1: 'Killstreak',
        2: 'Specialized Killstreak',
        3: 'Professional Killstreak'
    };

    const KillstreakIndex = {
        'Basic': 1,
        'Specialized': 2,
        'Professional': 3
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

            let name = "",
                killstreakKitIndex;

            // Decorated weapons
            if ( quality == 15 || ( quality == 11 && ITEMS[ i ].querySelector( '.statclock' ) ) ) {

                let wear = ITEMS[ i ].dataset.title.match( RegWeaponWear );
                name = ITEM_SHEMA[ defindex ];
                name += ( wear ) ? " (" + wear[ 0 ] + ")" : " (Factory new)";
            }
            // Australium
            else if ( ITEMS[ i ].getAttribute( 'style' ).indexOf( "-gold." ) != -1 ) {
                name = "Australium " + ITEM_SHEMA[ defindex ];
            }
            // Killstrek kit
            else if ( ITEM_SHEMA[ defindex ] == "Kit" ) {

                let kit = RegKillstreakKit.exec( ITEMS[ i ].dataset.title );

                if ( kit ) {

                    kit[ 2 ] = kit[ 2 ].replace( /&apos;/g, "'" );

                    for ( let key in ITEM_SHEMA ) {
                        if ( ITEM_SHEMA[ key ] == kit[ 2 ] ) {

                            // Kit name
                            name = ( kit[ 1 ].indexOf( 'Basic' ) >= 0 ) ? '' : kit[ 1 ] + ' ';
                            name += 'Killstreak Kit';

                            // Ks type and weapon defindex
                            killstreakKitIndex = KillstreakIndex[ kit[ 1 ] ] + '-' + key;

                            break;
                        }
                    }
                }

            }
            // Anything else
            else {
                name = ITEM_SHEMA[ defindex ];
            }

            // Killstreak weapon

            let isKs = RegKillstreakWeapon.exec( ITEMS[ i ].getAttribute( 'class' ) );
            if ( isKs ) {
                name = Killstreak[ isKs[ 1 ] ] + " " + name;
            }

            /* Craftable */

            link += "/" + name + "/Tradable/";
            link += ( ITEMS[ i ].getAttribute( 'class' ).indexOf( "uncraft" ) >= 0 ) ? "Non-Craftable" : "Craftable";

            /* Extras parameters */

            // Unusual particles
            if ( quality == 5 ) {
                link += "/" + RegParticles.exec( ITEMS[ i ].getAttribute( 'style' ) )[ 1 ];
            }
            // Killstreak kit
            else if ( killstreakKitIndex ) {
                link += "/" + killstreakKitIndex;
            }

            /* Append the resulted icon */

            ITEMS[ i ].appendChild( BuildDOM.BpLink( link ) );
        }
    }
} )();
