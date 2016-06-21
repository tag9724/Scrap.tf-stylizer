function DateFormat(d) {
    if (d < 3600) {
        return d / 60 + " mins"
    } else if (d < 3600 * 24) {
        return d / 3600 + " hours";
    } else {
        return d / (3600 * 24) + " days";
    }
}

var typeRaffle = ["Public Raffle", "Secret Link", "Secret Link & Password",
    "My Friend Only", "Password Per Entry", "Twitch Followers Only", "Twitch Subscribers Only",
    "Puzzle Raffle", "Steam Group Only"
];
var coloredType = ["btn-success", "btn-info", "btn-info", "btn-primary", "btn-info", "btn-primary", "btn-primary", "btn-success", "btn-primary"];

/* Load All saved raffles */

chrome.storage.local.get(["savedCreateRaffle"], function(res) {

    if (res.savedCreateRaffle && res.savedCreateRaffle[0]) {

        // Append The load Box

        document.querySelector('.panel.panel-info').insertAdjacentHTML('afterend',
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

        var appendBox = document.getElementById('appendHere');

        for (let i = 0, nextStep, len = res.savedCreateRaffle.length; i < len; i++) {
            console.log(res.savedCreateRaffle[i]);

            nextStep = (res.savedCreateRaffle[i].privateRaffle == 0 || res.savedCreateRaffle[i].privateRaffle == 7) ? false : true;
            nextStep = 'ScrapTF.Raffles.NextStep(' + nextStep + ')';

            appendBox.insertAdjacentHTML('beforeend',
                '<div class="form-group" data-k="' + res.savedCreateRaffle[i].raffleID + '">' +
                '   <div class="form-control" onclick="' + nextStep + '">' +
                '      <span class="form-control-static"><i class="fa ' + (res.savedCreateRaffle[i].type ? 'fa-users' : 'fa-user') + '"></i> <i18n>' + res.savedCreateRaffle[i].savedName + '</i18n></span>' +
                '      <div class="pull-right">' +
                '         <span class="btn btn-xs ' + (res.savedCreateRaffle[i].nocmt ? 'btn-danger' : 'btn-default') + '"><i class="fa fa-comments-o "></i></span>' +
                '         <span class="btn btn-xs ' + coloredType[res.savedCreateRaffle[i].privateRaffle] + '">' + typeRaffle[res.savedCreateRaffle[i].privateRaffle] + '</span>' +
                '         <span class="btn btn-xs btn-default">' + DateFormat(res.savedCreateRaffle[i].length) + '</span>' +
                '         <span class="btn btn-xs btn-default"><i class="fa fa-user"></i> ' + res.savedCreateRaffle[i].maxentries + '</span>' +
                '      </div>' +
                '   </div>' +
                '   <div class="pull-right btnDel">' +
                '      <button class="btn btn-xs btn-danger rm"><i class="fa fa-remove rm"></i></button>' +
                '   </div>' +
                '</div>'
            );
        }

        // Event Add and Delete

        function MakeMilshake(ev) {

            // Search the main div

            var target = ev.target;
            for (let i = 0, c, len = appendBox.children.length; i < len; i++) {
                if (appendBox.children[i].contains(target)) {
                    target = appendBox.children[i];
                    break;
                }
            }

            /* Remove from the save list the element */

            if (ev.target.matches('.rm')) {

                chrome.storage.local.get(["savedCreateRaffle"], function(res) {

                    // First configuration
                    if (!res.savedCreateRaffle) {
                        console.log("Construct config");
                        res.savedCreateRaffle = [];
                    }

                    for (let i = 0, dataset = target.dataset.k, len = res.savedCreateRaffle.length; i < len; i++) {
                        if (res.savedCreateRaffle[i].raffleID == dataset) {
                            res.savedCreateRaffle.splice(i, 1);
                            break;
                        }
                    }

                    // Remove the element
                    target.remove();

                    // Save the new config
                    chrome.storage.local.set({
                        savedCreateRaffle: res.savedCreateRaffle
                    }, function(err, msg) {
                        console.log("Config saved", err, msg);
                    });

                });

            }

            /* Or open this element */
            else {

                // Remove The load box
                document.getElementById('PonyPanel').remove();

                // And ... continue

                chrome.storage.local.get(["savedCreateRaffle"], function(res) {

                    if (res.savedCreateRaffle) {

                        // load configuration

                        var conf;

                        for (let i = 0, dataset = target.dataset.k, len = res.savedCreateRaffle.length; i < len; i++) {
                            if (res.savedCreateRaffle[i].raffleID == dataset) {
                                conf = res.savedCreateRaffle[i];
                                break;
                            }
                        }

                        /* Display saved informations */

                        if (conf) {

                            // Name content & enter msgs

                            document.getElementById('rafflename').value = conf.name;
                            document.getElementById('rafflemessage').value = conf.message;
                            document.getElementById('enteredmessage').value = conf.entmsg;

                            // Poll entries solution & password

                            document.getElementById('raffle-poll').value = conf.poll;
                            document.getElementById('raffle-maxentries').value = conf.maxentries;
                            document.getElementById('raffle-password').value = conf.pwd;
                            document.getElementById('puzzlesolution').value = (conf.solution) ? conf.solution : "";

                            // Raffle time

                            document.getElementById('raffle-length').value = conf.length;
                            document.getElementById('select2-chosen-1').innerHTML = DateFormat(conf.length);

                            // Number of winners

                            document.getElementById('raffle-method').value = conf.type ? "2" : "1";
                            document.getElementById('select2-chosen-2').innerHTML = conf.type ? "Multiple winners" : "One winner";

                            document.getElementById(conf.isPrivate ? "raffle-private" : "raffle-public").value = conf.privateRaffle;
                            document.getElementById('select2-chosen-3').innerHTML = typeRaffle[conf.privateRaffle];
                            document.getElementById('select2-chosen-4').innerHTML = typeRaffle[conf.privateRaffle];

                            // Disable comments

                            document.getElementById('disable-comments').checked = conf.nocmt;

                            /* Only privates raffle */

                            if (conf.isPrivate) {

                                // Twitch Raffle

                                document.getElementById('make-twitch-raffle').checked = conf.twitch;

                                if (conf.twitch) {
                                    var subLuck = document.getElementById('raffle-sub-luck');

                                    subLuck.value = (conf.subluck != 1) ? conf.subluck : "";
                                    subLuck.parentElement.style.display = "block";
                                    subLuck.parentElement.previousElementSibling.style.display = "block";
                                }
                            }
                        }
                    }

                });
            }
        }

        // Append the event

        appendBox.addEventListener('click', MakeMilshake);
    }
});
