function BuildUsedTemplate() {
    chrome.storage.local.get('UsedTemplate', function (res) {

        let UsedTemplate = res.UsedTemplate;

        if (UsedTemplate) {

            chrome.storage.local.get(res.UsedTemplate, function (res) {

                res = res[UsedTemplate];

                if (res) {
                    let build = "";

                    /* Fonts & start root build */

                    for (let k in res.fonts.fontList) {

                        for (let i = 0, len = res.fonts.fontList[k].style.length; i < len; i++) {
                            build += "@font-face" + res.fonts.fontList[k].style[i] + "\n";
                        }
                    }

                    build += ":root{";
                    build += "--globalFont:'" + ((res.fonts.global !== "") ? res.fonts.global + "';" : "Lato';");
                    build += (res.fonts.title !== "") ? "--titleFont:'" + res.fonts.title + "';" : "";

                    /* Colors */

                    for (let k in res.colors) {
                        build += "--" + k + ":" + res.colors[k] + ";";
                    }

                    // buttons
                    for (let k in res.buttons) {
                        build += "--" + k + ":" + res.buttons[k] + ((k === "radius") ? "em;" : ";");
                    }

                    // Avatars borders
                    build += "--avatarBorders:" +
                        res.avatarBorders[0] + "em " + res.avatarBorders[1] + "em " +
                        res.avatarBorders[3] + "em " + res.avatarBorders[2] + "em;";

                    /* Background  & end of root build */

                    if (res.background.image !== "") {

                        // end of root
                        build += "--back-attachment:" + ((res.background.fixed) ? "fixed;" : "scroll;") +
                            "--back-size:" + ((res.background.size !== "") ? res.background.size + ";" : ";") +
                            "--back-image:url(" + res.background.image + ");}";

                        // Add custom background
                        build += "body{" +
                            "background-image:var(--back-image)!important;" +
                            "background-attachment:var(--back-attachment)!important;" +
                            "background-size: var(--back-size)!important;}";

                    } else {
                        // end of root
                        build += "}";
                    }

                    /* customCSS */

                    build += res.customCSS.replace(/\n/g, "");

                    /* get colors for the logo */
                    let save = {
                        style: build,
                        color: {
                            btn1: res.buttons.btn1,
                            btn2: res.buttons.btn2
                        }
                    };

                    chrome.storage.local.set({
                        'CurrentTemplate': save
                    });
                }
            });

        }
    });
}
