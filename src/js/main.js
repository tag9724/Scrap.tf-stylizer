function Extras() {

    // Append FavoriteRaffle, Announcement and polls history li tag in nav bar

    var navUL = document.querySelector( '#navbar-collapse-01 > ul:nth-child(1) > li.dropdown:nth-child(2) ul' );
    navUL.innerHTML += '<li><a href="/raffles/favorites"><i class="fa fa-fw fa-star"></i><i18n>Favorites Raffles</i18n></a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="/polls/history"><i class="fa fa-fw fa-pie-chart"></i><i18n>Polls History</i18n></a></li>' +
        '<li><a href="/announcement"><i class="fa fa-fw fa-bullhorn"></i><i18n>Announcement</i18n></a></li>';
}

if ( document.readyState == "interactive" || document.readyState == "complete" ) {
    Extras();
} else {
    document.addEventListener( "DOMContentLoaded", Extras );
}

/* Append the sound */

function AppendCustomSound( res ) {

    function AppendSound() {
        if ( res.sound && res.sound != "" ) {
            let notifSound = document.getElementById( 'chatBeep' );
            notifSound.textContent = '';
            notifSound.setAttribute( 'src', res.sound );
        }
    }

    if ( document.readyState == "interactive" || document.readyState == "complete" ) {
        AppendSound();
    } else {
        document.addEventListener( "DOMContentLoaded", AppendSound );
    }
}

chrome.storage.local.get( "sound", AppendCustomSound );

/* The background can't no longer be saved in the sync storage */

chrome.storage.local.get( 'CurrentTemplate', function ( res ) {

    if ( res.CurrentTemplate ) {

        let templateBox = document.createElement( 'style' );
        templateBox.textContent = res.CurrentTemplate.style;

        let customTemplate = document.createElement( 'link' );
        customTemplate.setAttribute( 'rel', 'stylesheet' );
        customTemplate.setAttribute( 'href', chrome.extension.getURL( 'css/template.css' ) );

        /* Append <style> */

        document.head.appendChild( customTemplate );
        document.head.appendChild( templateBox );

        /* Update Logo */

        function ColorLuminance( hex, lum ) {

            // validate hex string
            hex = String( hex ).replace( /[^0-9a-f]/gi, '' );
            if ( hex.length < 6 ) {
                hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ];
            }
            lum = lum || 0;

            // convert to decimal and change luminosity
            var rgb = "#",
                c, i;
            for ( i = 0; i < 3; i++ ) {
                c = parseInt( hex.substr( i * 2, 2 ), 16 );
                c = Math.round( Math.min( Math.max( 0, c + ( c * lum ) ), 255 ) ).toString( 16 );
                rgb += ( "00" + c ).substr( c.length );
            }

            return rgb;
        }

        let svg = `<svg class="svg" viewBox="0 0 1205.13 303.75"><defs><style>.a,.f{fill:var(--btn2);}.b{fill:${ ColorLuminance(BuildDOM.escapeHtml(res.CurrentTemplate.color.btn2), 0.2)};}.c{fill:var(--btn1);}.d{fill:${ ColorLuminance(BuildDOM.escapeHtml(res.CurrentTemplate.color.btn1), 0.2)};}.e{fill:var(--text);}.e,.f{fill-rule:evenodd;}</style></defs><title>Scrap.TF Logo v3</title><path class="a" d="M11,47.1C-6.5,36.68-2.4,5.09,18.12.95,32.59-.2,47.89-1.38,61.6,4.41,80.17,11,94.64,24.76,110.39,36c13.61,9.71,25.87,22.64,43,25.6C131,63.28,109.63,72.87,92.6,87.46c-15.33-10.35-29-23.1-44.88-32.61C36.57,47.37,21.83,55.26,11,47.1Z" transform="translate(0 0)"/><path class="b" d="M92.6,87.46c17-14.59,38.38-24.18,60.83-25.85,15.6,0.81,33-3.58,47.12,4.88,16.83,10.92,12.62,39.83-6.54,45.76-13.24,2.4-26.9,1.52-40.29.93-22.89-1.15-44-11.2-61.58-25.38Z" transform="translate(0 0)"/><path class="a" d="M47.23,120.59c15.89-9.54,29.82-22,44.91-32.79C109.72,102,130.83,112,153.72,113.18c-7.32,2.55-15.08,4.51-21.32,9.34q-23,17.29-46,34.68C70.35,169,50.77,177.06,30.5,175.69c-11.67,1-24.47-4.34-28.79-15.84-3-11-1.8-25.31,9.11-31.69C21.56,120.12,36.1,127.75,47.23,120.59Z" transform="translate(0 0)"/><path class="c" d="M83.86,252.88l-3.66-2.75c-5-3.58-10.81-5.69-16.29-8.36,20-5.1,40.31-11.5,55.62-26-15.65-16.11-38-23.57-59.85-26.41,18.23-3.61,31-17.83,45.67-28,19.48-14.91,39.78-31.86,65.35-33.89,12.33-.69,27.54-1.89,36.21,8.85,10.27,11.53,7.17,31.68-6.44,39.26-11.69,7.38-27.07-.42-38.22,8.51-14.23,10.08-28.62,20.18-41.62,31.78,15.45,10.3,29,23.39,45.18,32.56,11.18,6.84,25.92-.93,36.41,7.73,16.7,10.61,13.07,38.89-5.58,45.29-23,6.45-47.93-1.11-67.21-14.27C114.12,275.88,99.05,264.3,83.86,252.88Z" transform="translate(0 0)"/><path class="d" d="M1.54,216.86c-1.58-13.56,10-27.12,23.8-27.12,11.45-.17,22.9,0,34.34-0.42,21.82,2.84,44.2,10.3,59.85,26.41-15.31,14.54-35.62,20.94-55.62,26-12-.69-24-0.64-36-0.64C14.51,241.82,1.71,230.37,1.54,216.86Z" transform="translate(0 0)"/><path class="e" d="M952.19,117.08c-21.74,7.75-31.77,35.88-20.86,56,8.68,18.7,34,27.2,51.69,16.08,21.54-13.19,23.53-46.89,6.18-64.29A36,36,0,0,0,952.19,117.08ZM926.87,85.69c13-15.29,34.63-19.24,53.75-17,23.5,2.28,45.32,16.67,57,37.18,10.12,17.79,13.16,38.89,11.71,59.11-1.49,17.77-7.4,35.73-19.41,49.24-12.85,14.85-32.13,23.23-51.52,24.58-18.51,2-38.6-2.77-51.52-16.86,0.15,20.83.07,41.68,0.05,62.54q-24.19,0-48.38,0,0-106.9,0-213.76c16.13-.14,32.28-0.07,48.46-0.07C926.94,75.69,926.92,80.69,926.87,85.69Zm-505.39,15.1c29.09-40.12,94.83-43.58,128.94-8.14,13.07,12.84,20.47,30.44,22.58,48.48q-24.12.06-48.19,0c-3.53-9.61-9.53-18.85-19.14-23.16-16.91-8.85-40.37-1.33-48.31,16.17-10.42,20.42-1.57,50.27,21.77,56.78,19.16,6.57,40.34-6.24,45.66-25.24,16.08,0,32.15-.05,48.23,0-2.2,18.83-10.32,37.08-24.26,50.14-32,30.89-88.29,29.66-119.76-1.34C399.93,185,397.6,134,421.48,100.79Zm341.81,13.52c-19.68,6.08-28.87,30-23.43,48.82,3.26,16.11,18.43,29.39,35.17,28.38,24.36,0.89,42.62-26.1,36.2-48.79C807.21,121.89,783.66,107.06,763.29,114.31ZM712,89.71C729.91,71,757.85,64.47,782.83,69c11.64,2,21.88,8.65,29.7,17.35-0.12-5.2-.19-10.39-0.22-15.61,16.15-.08,32.3,0,48.46,0V236.12c-16.16,0-32.31,0-48.46,0,0-5,.07-10,0.17-15-12.91,14.73-33.7,19.12-52.47,17a73,73,0,0,1-47.45-22.89c-16.57-17-23-41.44-23-64.65C689.79,128.65,696.13,105.59,712,89.71ZM632.14,80.2C646.87,66.82,668,64.32,686.75,69.32c0.29,15.32-1.08,30.61-.57,45.93-14.16-3.9-31.05-3.36-42.33,7.15-6.69,5.69-9.38,14.63-9.19,23.19q0,45.25,0,90.5c-16.15.05-32.28,0-48.43,0V70.69q21.94,0,43.87,0C630.79,73.85,631.45,77,632.14,80.2Zm-332.57-10c22.55-6.22,48.28-5.61,68.87,6.4,16.3,9.38,25.46,28.18,25.07,46.76q-22.76.08-45.51,0c-2.33-14.46-19.78-15.17-31.1-12.5-6,1.45-11.33,8.7-6.89,14.41,6.79,5.07,15.73,3.87,23.65,4.75,18,1.21,36.94,6.15,49.75,19.59,15.2,15.34,16.65,40.14,8.68,59.35-8.53,19.22-29.7,28.56-49.56,30.69-21.62,2.13-45.61,1.12-63.75-12.33-14.61-10.73-21.35-29.26-21.17-47,15.93,0,31.86,0,47.79-.05,1.18,6.35,5.39,12,11.84,13.63,9.46,2.57,21.66,3.46,29.24-3.92,4.26-3.65,1.15-10.37-3.41-12.11-8.43-3.45-17.82-1.91-26.64-3.4-17.67-2.16-36.47-8.16-47.77-22.77-9.66-12.06-9.8-28.75-7-43.23C265.52,89.71,281.4,75.15,299.57,70.2Z" transform="translate(0 0)"/><path class="f" d="M1142,61.53q31.51-.07,63.06,0c0,7.77,0,15.51,0,23.28-13.07,0-26.1,0-39.12-.05-0.07,5.52-.12,11.06-0.1,16.6h36.77v22.05h-36.74c-0.05,11.64,0,23.28-.1,35q-11.91,0-23.8,0Q1142,109.89,1142,61.53Zm-82.72,0h76V84.17h-25.72c-0.12,24.73.15,49.46-.14,74.18q-12.14-.1-24.27,0c-0.29-24.72,0-49.45-.14-74.18H1059.3C1059.27,76.62,1059.27,69,1059.32,61.5Z" transform="translate(0 0)"/></svg>`;

        /* Raffle transition ( puzzle ) & logo */

        function AppendOnReady() {

            let isRaffle = document.querySelector( ".raffle-message" );
            let puzzleCheck = document.querySelector( 'div.welcome-overlay-container > ol > li:nth-child(1) > a > i18n' );

            // Raffle message transition

            if ( isRaffle ) {
                isRaffle.style.opacity = 1;

                if ( puzzleCheck && puzzleCheck.innerHTML.indexOf( "Puzzle" ) >= 0 ) {
                    document.querySelector( ".raffle-message" ).classList.add( 'puzzle' );
                }
            }

            // Logo

            document.querySelector( '.navbar-brand.big-logo' ).outerHTML = svg;

        }

        if ( document.readyState == "interactive" ) {
            AppendOnReady();
        } else {
            document.onreadystatechange = function () {
                if ( document.readyState == "interactive" )
                    AppendOnReady();
            };
        }

    }
} );
