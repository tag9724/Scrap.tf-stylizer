function DateFormat( d ) {
    if ( d < 3600 ) {
        return d / 60 + " mins"
    } else if ( d < 3600 * 24 ) {
        return d / 3600 + " hours";
    } else {
        return d / ( 3600 * 24 ) + " days";
    }
}

var typeRaffle = [ "Public Raffle", "Secret Link", "Secret Link & Password",
    "My Friend Only", "Password Per Entry", "Twitch Followers Only", "Twitch Subscribers Only",
    "Puzzle Raffle", "Steam Group Only"
];
var coloredType = [ "btn-success", "btn-info", "btn-info", "btn-primary", "btn-info", "btn-primary", "btn-primary", "btn-success", "btn-primary" ];
var raffleSelect = {}; // OpenRaffleEdit()

/* Load All saved raffles */

chrome.storage.local.get( [ "savedCreateRaffle" ], function ( res ) {

    if ( res.savedCreateRaffle && res.savedCreateRaffle[ 0 ] ) {

        // Append The load Box

        document.querySelector( '.panel.panel-info' ).insertAdjacentHTML( 'afterend',
            '<div class="panel panel-info" id="PonyPanel">' +
            '   <div class="panel-heading">' +
            '      <h3 class="panel-title"><i18n>Load Raffle</i18n></h3>' +
            '   </div>' +
            '   <div class="panel-body">' +
            '      <div class="col-md-12" id="appendHere">' +
            '         ' +
            '      </div>' +
            '   </div>' +
            '</div>'
        );

        // Append saved conf

        var appendBox = document.getElementById( 'appendHere' );
        var DOMFrag = BuildDOM.NewDocFrag();

        for ( let i = 0, len = res.savedCreateRaffle.length; i < len; i++ ) {

            let nextStep = ( res.savedCreateRaffle[ i ].privateRaffle == 0 || res.savedCreateRaffle[ i ].privateRaffle == 7 ) ? false : true;
            nextStep = 'ScrapTF.Raffles.NextStep(' + nextStep + ')';

            // Yup it's ugly

            DOMFrag.appendChild(
                BuildDOM.Create( {
                    tag: 'div',
                    classList: [ 'form-group' ],
                    dataset: {
                        k: res.savedCreateRaffle[ i ].raffleID
                    },
                    childrens: [ {
                        tag: 'div',
                        classList: [ 'form-control' ],
                        attributes: {
                            onclick: nextStep
                        },
                        childrens: [ {
                            tag: 'span',
                            classList: [ 'form-control-static' ],
                            childrens: [ {
                                tag: 'i',
                                classList: [ 'fa', ( res.savedCreateRaffle[ i ].type ? 'fa-users' : 'fa-user' ) ]
                            }, {
                                tag: 'i18n',
                                textContent: res.savedCreateRaffle[ i ].savedName
                            } ]
                        }, {
                            tag: 'div',
                            classList: [ 'pull-right' ],
                            childrens: [ {
                                tag: 'span',
                                classList: [ 'btn', 'btn-xs', ( res.savedCreateRaffle[ i ].nocmt ? 'btn-danger' : 'btn-default' ) ],
                                innerHTML: '<i class="fa fa-comments-o"></i></span>'
                            }, {
                                tag: 'span',
                                classList: [ 'btn', 'btn-xs', coloredType[ res.savedCreateRaffle[ i ].privateRaffle ] ],
                                textContent: typeRaffle[ res.savedCreateRaffle[ i ].privateRaffle ]
                            }, {
                                tag: 'span',
                                classList: [ 'btn', 'btn-xs', 'btn-default' ],
                                textContent: DateFormat( res.savedCreateRaffle[ i ].length )
                            }, {
                                tag: 'span',
                                classList: [ 'btn', 'btn-xs', 'btn-default' ],
                                childrens: [ {
                                    tag: 'i',
                                    classList: [ 'fa', 'fa-users' ]
                                }, {
                                    tag: 'span',
                                    classList: [ 'entries' ],
                                    textContent: res.savedCreateRaffle[ i ].maxentries
                                } ]
                            } ]
                        } ]
                    }, {
                        tag: 'div',
                        classList: [ 'pull-right', 'btnDel' ],
                        innerHTML: '<button class="btn btn-xs btn-danger rm"><i class="fa fa-remove rm"></i></button>'
                    } ]
                } )
            );

        } // End for

        appendBox.appendChild( DOMFrag );

        // Event Add and Delete

        function MakeMilshake( ev ) {

            // Search the main div

            var target = ev.target;
            for ( let i = 0, c, len = appendBox.children.length; i < len; i++ ) {
                if ( appendBox.children[ i ].contains( target ) ) {
                    target = appendBox.children[ i ];
                    break;
                }
            }

            /* Remove from the save list the element */

            if ( ev.target.matches( '.rm' ) ) {

                chrome.storage.local.get( [ "savedCreateRaffle" ], function ( res ) {

                    // First configuration
                    if ( !res.savedCreateRaffle ) {
                        res.savedCreateRaffle = [];
                    }

                    for ( let i = 0, dataset = target.dataset.k, len = res.savedCreateRaffle.length; i < len; i++ ) {
                        if ( res.savedCreateRaffle[ i ].raffleID == dataset ) {
                            res.savedCreateRaffle.splice( i, 1 );
                            break;
                        }
                    }

                    // Remove the element
                    target.remove();

                    // Save the new config
                    chrome.storage.local.set( {
                        savedCreateRaffle: res.savedCreateRaffle
                    } );

                } );

            }

            /* Or open this element */
            else {

                // And ... continue

                chrome.storage.local.get( [ "savedCreateRaffle" ], function ( res ) {

                    if ( res.savedCreateRaffle ) {

                        // load configuration

                        let conf;

                        for ( let i = 0, dataset = target.dataset.k, len = res.savedCreateRaffle.length; i < len; i++ ) {
                            if ( res.savedCreateRaffle[ i ].raffleID == dataset ) {
                                conf = res.savedCreateRaffle[ i ];
                                break;
                            }
                        }

                        /* Display saved informations */

                        if ( conf ) {

                            /* Puzzle panel */

                            if ( conf.privateRaffle == 7 ) {

                                OpenRaffleEdit( 'puzzle' );
                                var prefix = 'puzzle-';

                                document.getElementById( 'puzzlesolution' ).value = ( conf.solution ) ? conf.solution : "";

                                // Raffle time
                                document.getElementById( 'select2-chosen-4' ).textContent = DateFormat( conf.length );

                                // Number of winners
                                document.getElementById( 'select2-chosen-5' ).textContent = conf.type ? "Multiple winners" : "One winner";

                            }

                            /* Public or private */
                            else {

                                OpenRaffleEdit( 'public' );
                                var prefix = '';

                                // Raffle time
                                document.getElementById( 'select2-chosen-1' ).textContent = DateFormat( conf.length );

                                // Number of winners
                                document.getElementById( 'select2-chosen-2' ).textContent = conf.type ? "Multiple winners" : "One winner";

                            }

                            // Spawn raffleSelect

                            GenRaffleSelect( prefix );

                            /* Inject values on inputs */

                            // Name content & enter msgs

                            raffleSelect.name.value = conf.name;
                            raffleSelect.message.value = conf.message;
                            raffleSelect.enteredmessage.value = conf.entmsg;

                            // Poll entries solution & password

                            raffleSelect.poll.value = conf.poll;
                            raffleSelect.maxentries.value = conf.maxentries;
                            raffleSelect.password.value = conf.pwd;

                            // Display the password box
                            if ( conf.privateRaffle == 2 || conf.privateRaffle == 8 ) {
                                document.getElementById( 'raffle-password-out' ).style.display = "block";
                            }

                            // Raffle time
                            raffleSelect.length.value = conf.length;

                            // Number of winners
                            raffleSelect.method.value = conf.type ? "2" : "1";

                            // Append also the save button

                            if ( conf.privateRaffle != 7 && conf.privateRaffle != 0 ) {
                                raffleSelect.privateRaffle.value = conf.privateRaffle;
                                document.getElementById( 'select2-chosen-3' ).textContent = typeRaffle[ conf.privateRaffle ];
                                document.getElementById( 'select2-chosen-4' ).textContent = typeRaffle[ conf.privateRaffle ];

                                AppendSaveBtn( "true" );
                            } else {

                                // Complicated for nothing ...

                                raffleSelect.privateRaffle.appendChild(
                                    BuildDOM.Create( {
                                        tag: 'option',
                                        attributes: {
                                            value: conf.privateRaffle
                                        }
                                    } )
                                );

                                raffleSelect.privateRaffle.value = conf.privateRaffle;

                                // Remove the private raffle inputs

                                let privateInputs = Array.from( document.querySelectorAll( '.raffle-private-field' ) );

                                for ( let i = 0, len = privateInputs.length; i < len; i++ ) {
                                    privateInputs[ i ].style.display = "none";
                                }

                                AppendSaveBtn( "false" );
                            }

                            // Disable comments

                            raffleSelect.comments.checked = conf.nocmt;

                            /* Only privates raffle */

                            if ( conf.isPrivate ) {

                                // Twitch Raffle

                                raffleSelect.twitch.checked = conf.twitch;

                                if ( conf.twitch ) {
                                    raffleSelect.subluck.value = ( conf.subluck != 1 ) ? conf.subluck : "";
                                    raffleSelect.subluck.parentElement.style.display = "block";
                                    raffleSelect.subluck.parentElement.previousElementSibling.style.display = "block";
                                }
                            }

                            // Display the correct panel
                            document.getElementById( 'raffle-' + prefix + 'form' ).style.display = "";
                        }
                    }

                } );
            }
        }

        // Append the event

        appendBox.addEventListener( 'click', MakeMilshake );
    }
} );
