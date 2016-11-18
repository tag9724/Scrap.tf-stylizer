chrome.storage.local.get(["profileStats"], function (res) {

    /* Get Informations on the profile */

    let STATS = document.querySelectorAll('.profile-stats-sidebar .profile-stat');
    let stats = [],
        iElem = BuildDOM.Create({
            tag: 'i',
            classList: ['fa', 'fa-star', 'pull-right']
        });

    for (let i = 0, len = STATS.length; i < len; i++) {
        stats[i] = STATS[i].cloneNode(true);
        stats[i].querySelector('div').remove();
        stats[i] = stats[i].innerHTML.replace(/(\n|\s|,|[$])/g, "");
    }

    /* Compare with saved stats */

    if (stats[1]) {

        // First config

        if (!res['profileStats']) {
            res['profileStats'] = ["This is an Easter Egg"];
            res['profileStats'][1] = {
                value: Infinity,
                id: stats[0]
            };

            for (let i = 2, len = stats.length; i < len; i++) {
                res['profileStats'][i] = {
                    value: 0,
                    id: stats[0]
                };
            }
        }

        // Oldest user

        stats[1] = Date.parse(stats[1].replace(/([a-z]+)/ig, "$1 ").replace(/[0-9].([st|th|rd]+)/gi, ""));
        if (stats[1] <= res['profileStats'][1].value) {
            res['profileStats'][1].value = stats[1];
            res['profileStats'][1].id = stats[0];

            STATS[1].appendChild(iElem);
        };

        // Check other stats

        for (let i = 2, len = stats.length; i < len; i++) {
            stats[i] = Number(stats[i]);
            if (stats[i] >= res['profileStats'][i].value) {
                res['profileStats'][i].value = stats[i];
                res['profileStats'][i].id = stats[0];

                STATS[i].appendChild(iElem);
            }

            /* Next update */

            /* STATS[i].innerHTML = `<a href="/profile/` + res['profileStats'][i].id + `">
                          ` + STATS[i].innerHTML + `
                        </a>`;*/
        }

        /* Save new Datas */

        chrome.storage.local.set({
            profileStats: res['profileStats']
        });

    }
});
