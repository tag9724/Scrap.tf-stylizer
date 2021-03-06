var defTemplate = document.getElementById( 'defTemplate' );
var saveTemplate = document.getElementById( 'saveTemplates' );

/* Generate a box of default/saved templates */

function GenViewBoxes( id, name, couleurs ) {

    let colors = [];

    for ( let k in couleurs ) {
        if ( [ "border", "btntext" ].indexOf( k ) === -1 ) {
            colors.push( {
                tag: 'div',
                classList: [ 'btn-group', 'color' ],
                attributes: {
                    style: 'background-color:' + couleurs[ k ]
                }
            } );
        }
    }

    return BuildDOM.Create( {
        tag: 'div',
        classList: [ 'box' ],
        dataset: {
            load: id
        },
        childrens: [ {
            tag: 'h4',
            textContent: name
        }, {
            tag: 'div',
            classList: [ 'form' ],
            childrens: [ {
                tag: 'button',
                classList: [ 'btn', 'btn-info', 'btn-use' ],
                innerHTML: '<i class="i-ok"></i> Use'
            }, {
                tag: 'button',
                classList: [ 'btn', 'btn-primary', 'btn-edit' ],
                innerHTML: '<i class="i-cog"></i> Edit'
            } ]
        }, {
            tag: 'div',
            classList: [ 'color-group' ],
            childrens: colors
        } ]
    } );

}

/* Load from defaults template */

function LoadDefaults() {

    var append = BuildDOM.NewDocFrag();

    for ( var i = 0, len = DEFAULT.length; i < len; i++ ) {
        append.appendChild( GenViewBoxes( DEFAULT[ i ].id, DEFAULT[ i ].name, DEFAULT[ i ].colors ) );
    }

    defTemplate.textContent = "";
    defTemplate.appendChild( append );

}

/* Load from saved */

function LoadSaved() {

    chrome.storage.local.get( [ "AvailableTemplates" ], function ( res ) {

        res = res[ 'AvailableTemplates' ];
        let append = BuildDOM.NewDocFrag();

        // Build the list of templates

        if ( res ) {
            for ( let k in res ) {
                append.appendChild( GenViewBoxes( k, res[ k ].name, res[ k ].colors ) );
            }

        } else {
            append.appendChild( BuildDOM.Create( {
                tag: 'p',
                textContent: "You don't have any saved template"
            } ) ); // TEMP next maj add the "import template" button;
        }

        // Display the list of templates
        saveTemplate.textContent = "";
        saveTemplate.appendChild( append );

    } );

}

/* Open template */

function OpenEditSection( ev ) {

    let btnUse = this.querySelectorAll( '.btn-use' ),
        btnEdit = this.querySelectorAll( '.btn-edit' ),
        box;

    // Search the .box selected

    for ( let i = 0, len = btnUse.length; i < len; i++ ) {

        // Edit button
        if ( btnEdit[ i ].contains( ev.target ) ) {

            // Default template
            if ( this.id == "defTemplate" ) {
                TemplateManage.GetDefaultTemplate( btnEdit[ i ].parentElement.parentElement.dataset.load );
            }
            // Saved template
            else {
                TemplateManage.GetSavedTemplate( btnEdit[ i ].parentElement.parentElement.dataset.load );
            }

            return false;
        }
        // Use button
        else if ( btnUse[ i ].contains( ev.target ) ) {

            // Default template
            if ( this.id == "defTemplate" ) {
                TemplateManage.ConstructDefaultTemplate( btnUse[ i ].parentElement.parentElement.dataset.load );
            }
            // Saved template
            else {
                TemplateManage.ConstructSavedTemplate( btnUse[ i ].parentElement.parentElement.dataset.load );
            }

        }
    }
}

/* Launch */

var TemplateManage;

function StartLoading() {

    TemplateManage = new TemplatesManage();

    LoadDefaults();
    LoadSaved();

    defTemplate.addEventListener( 'click', OpenEditSection );
    saveTemplate.addEventListener( 'click', OpenEditSection );
}
/* Execute */

if ( document.readyState == "interactive" || document.readyState == "complete" ) {
    StartLoading();
} else {
    document.addEventListener( "DOMContentLoaded", StartLoading );
}
