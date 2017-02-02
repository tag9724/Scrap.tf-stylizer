const notifSound = document.getElementById( 'notifSound' );

function ChangeSound( src ) {
    notifSound.setAttribute( 'src', src );
}

function UpdateVolume( vol ) {
    notifSound.volume = vol;
}

/* Change notification sound url */

chrome.storage.local.get( [ "sound", "soundVolume" ], function ( res ) {
    // Set the trade sound
    if ( res.sound && res.sound != "" )
        ChangeSound( res.sound );
    // Load trade sound volume from config
    if ( res.soundVolume && res.soundVolume != "" )
        UpdateVolume( res.soundVolume );
} );

/* Play sound & modify volume */

chrome.runtime.onMessage.addListener(
    function ( request, sender, sendResponse ) {
        // Play the trade sound
        if ( request.playNotifSound ) {
            notifSound.play();
        }
        // Change the current sound url
        else if ( request.updateSound ) {
            ChangeSound( request.updateSound );
        }
        // Update the trade sound volume
        else if ( request.soundVolume ) {
            UpdateVolume( request.soundVolume );
        }
    }
);

chrome.browserAction.onClicked.addListener( function ( tab ) {
    chrome.tabs.create( {
        'url': chrome.extension.getURL( 'config/settings.html' )
    }, function ( tab ) {
        // Tab opened.
    } );
} );
