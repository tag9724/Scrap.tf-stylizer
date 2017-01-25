function Inject( ...urls ) {

    let i = 0;

    function LoadNext( url ) {
        let s = document.createElement( 'script' );
        s.src = chrome.extension.getURL( 'js/inject/' + url );
        ( document.head || document.documentElement ).appendChild( s );
        s.onload = function () {
            //  s.parentNode.removeChild(s);
            // Load next script
            i++;
            if ( i < urls.length ) LoadNext( urls[ i ] );
        };
    }

    LoadNext( urls[ i ] );
};
