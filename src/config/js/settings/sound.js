const volume = document.getElementById( 'volume' );
const SOUND = document.getElementById( 'soundBox' );
const SOUND_FORM = SOUND.querySelector( 'form' );
const demoSound = document.createElement( 'audio' );

function SaveSound( url, choosen ) {

    // Save in storage
    chrome.storage.local.set( {
        sound: url,
        soundSelected: choosen
    }, function () {
        StyleApply( {
            soundSelected: choosen
        } );
    } );

    // Update current live sound
    chrome.runtime.sendMessage( {
        updateSound: url
    } );
}

function PlayDemoSound( url ) {
    demoSound.setAttribute( 'src', url );
    demoSound.currentTime = 0;
    demoSound.play();
}

/* Preselected sounds */

function ChooseSound( ev ) {

    if ( ev.target.type == "button" ) {

        // Play the sound
        PlayDemoSound( chrome.extension.getURL( 'mp3/' + ev.target.name + '.mp3' ) );

        // Save the sound configuration
        SaveSound( chrome.extension.getURL( 'mp3/' + ev.target.name + '.mp3' ), ev.target.dataset.nb );
    }
}

function SubmitSound( ev ) {

    ev.preventDefault();
    var url = SOUND_FORM.querySelector( '#soundUrl' ).value;

    // Play the sound
    if ( url != "" ) {
        // Play the sound
        PlayDemoSound( url );
    }
    // Save the sound
    SaveSound( url, "" );
}

function StyleApply( res ) {

    // Remove .curr to all
    var rmAll = SOUND.querySelectorAll( 'input' );
    for ( let i = 0, len = rmAll.length; i < len; i++ ) rmAll[ i ].classList.remove( 'btn-success' );

    // Change the style of this element
    if ( res.soundSelected && res.soundSelected.indexOf( '#' ) == 0 ) {
        SOUND.querySelector( 'input[data-nb="' + res.soundSelected + '"]' ).classList.add( 'btn-success' );
    } else {
        var url = SOUND.querySelector( '#soundUrl' );
        url.classList.add( 'btn-success' );
        // Display the saved url
        ( res.sound ) ? url.value = res.sound: "";
    }
}

/* Load Current configuration */

chrome.storage.local.get( [ "sound", "soundSelected" ], StyleApply );
chrome.storage.local.get( [ "soundVolume" ], function ( res ) {
    // Load trade sound volume from config
    if ( res.soundVolume ) {
        volume.value = res.soundVolume;
        demoSound.volume = res.soundVolume;
    }
} );

/* Add event on SOUND ( children ) */

SOUND.addEventListener( "click", ChooseSound );
SOUND_FORM.addEventListener( "submit", SubmitSound );

/* Update Sound Volume */

volume.addEventListener( 'input', function () {

    let vol = Number( volume.value );
    demoSound.volume = vol;

    // Update saved conf
    chrome.storage.local.set( {
        soundVolume: vol
    } );

    // Update in background
    chrome.runtime.sendMessage( {
        soundVolume: vol
    } );
} );
