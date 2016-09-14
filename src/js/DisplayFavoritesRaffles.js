function AppendAllSavedRaffle() {

    // Display Datas saved

    if (window.location.pathname == '/raffles/favorites') {

        console.log('Location checked');

        /* Init the container */

        var container = document.querySelector('#pid-raffles > div.container');
        container.style.display = "none";
        container.textContent = "";

        var newContent = document.createElement('div');
        newContent.classList.add('container', 'container-margins', 'favorites-raffles-container');
        newContent.innerHTML = '<div class="panel panel-info favorites-raffles">' +
            '<div class="panel-heading"><h3 class="panel-title"><i18n>Favorites Raffles</i18n></h3></div>' +
            '<div class="panel-bg"><div id="favs-raffles-list"></div><div class="panel-body load">Load More</div>' +
            '</div></div>';

        container.insertAdjacentElement('afterend', newContent);

        /* Display more raffle */

        const MAXDISPLAY = 25;

        function DisplayMore(ev) {
            var hiddens = document.querySelectorAll('.panel-raffle.hidden');
            for (let i = 0, len = hiddens.length; i < MAXDISPLAY && i < len; i++) {
                hiddens[i].classList.remove('hidden');
            }

            if (hiddens.length <= MAXDISPLAY) {
                load.textContent = "That's all no more !";
            }
        }

        var load = newContent.querySelector('.panel-body.load');
        load.addEventListener('click', DisplayMore);

        /* Export btn */

        let panelHead = newContent.querySelector('.panel-heading');

        let aBtn = document.createElement('a');
        aBtn.classList.add('btn', 'btn-info', 'btn-embossed', 'cust-btn');
        aBtn.download = 'FavoritesRaffles.scraptf';
        aBtn.textContent = 'Export';

        panelHead.appendChild(aBtn);

        function exportRefresh(obj) {
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
            aBtn.href = 'data:' + data;
        }

        /* Import btn */

        let iBtn = document.createElement('a');
        iBtn.classList.add('btn', 'btn-info', 'btn-embossed', 'cust-btn');
        iBtn.textContent = "Import";

        let importBtn = document.createElement('input');
        importBtn.setAttribute('type', 'file');
        importBtn.setAttribute('accept', '.scraptf');

        // Add import event

        function Confirm(files) {

        };

        Confirm();

        // Modal import confirmation

        var Modal = new class ModalConfirm {
            constructor() {

                // List of current raffles saved
                this.currentSave = [];

                // Create the modal

                this.modal = document.createElement('div');
                this.modal.classList.add('modal', 'fade', 'in');
                this.modal.innerHTML = `<div class="modal-backdrop fade in full"></div>
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h4 class="modal-title">Import save</h4>
                            </div>
                            <div class="modal-body">
                              <p class="saveContain">
                                You are going to change your list of favorites raffle.<br>
                                You have <span>?</span> favorites raffles and this save contain <span>?</span> raffles.<br/>
                                Continue ?
                              </p>
                              <p class="errorMsg">
                                Sorry but your save cannot be imported, she's broken
                              </p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" id="close" class="btn btn-default btn-embossed">Cancel</button>
                              <button type="button" id="confirm" class="btn btn-primary btn-embossed">Replace my current save</button>
                            </div>
                          </div>
                        </div>`;
                document.body.appendChild(this.modal);

                // Modal dynamic content
                this.nbSaved = this.modal.querySelectorAll('.saveContain span');
                this.modal.querySelector('#close').addEventListener('click', this.CloseModal.bind(this));
                this.modal.querySelector('#confirm').addEventListener('click', this.SaveImported.bind(this));

                importBtn.addEventListener('change', this.OpenModal.bind(this));
            }
            UpdateNbSaved(current, arrive) {
                this.nbSaved[0].textContent = current;
                this.nbSaved[1].textContent = arrive;
            }
            OpenModal(ev) {

                var reader = new FileReader();
                reader.readAsText(ev.target.files[0], 'utf-8');

                reader.onload = function (e) {
                    var obj = reader.result;

                    // Parse and check the JSON

                    obj = JSON.parse(obj);

                    if (Array.isArray(obj)) {

                        this.NewSave = [];
                        let JSONFormat = {
                            add: "boolean",
                            date: "number",
                            items: "string",
                            owner: "object",
                            raffleID: "string",
                            title: "string"
                        };

                        // Check the JSON imported save and create a new obj

                        for (let i = 0, len = obj.length; i < len; i++) {

                            this.NewSave[i] = {};

                            for (let k in obj[i]) {
                                if (typeof obj[i][k] == JSONFormat[k]) {
                                    this.NewSave[i][k] = obj[i][k];
                                }
                                // Malformed imported save
                                else {
                                    // Display the error modal
                                    this.DisplayModal(true);
                                    // And stop this loop ^^
                                    return false;
                                }
                            }
                        }

                        // Display the modal
                        this.DisplayModal(false);
                    }
                }.bind(this);

            }
            CloseModal() {
                this.modal.style.display = "none";
            }
            SaveImported() {

                chrome.storage.local.set({
                    favoritesRaffles: this.NewSave
                });

                // Clear and update the list of saved raffles

                rafflesList.textContent = "";
                DisplayAllFavorites({
                    favoritesRaffles: this.NewSave
                });

                // Close the modal
                this.CloseModal();
            }
            UpdateSave(arr) {
                this.currentSave = arr;
            }
            DisplayModal(error) {

                this.modal.style.display = "block";

                // Display an error modal if the imported JSON is broken

                if (error) {
                    this.modal.classList.add('error');
                } else {
                    this.UpdateNbSaved(this.currentSave.length, this.NewSave.length);
                    this.modal.classList.remove('error');
                }
            }
        }

        // Append the btn
        iBtn.appendChild(importBtn);
        panelHead.appendChild(iBtn);

        /* Search saved raffles */

        var rafflesList = document.getElementById('favs-raffles-list');

        function DisplayAllFavorites(res) {
            // Debug
            res.favoritesRaffles = res.favoritesRaffles || [];
            let needUpdate = false,
                append = BuildDOM.NewDocFrag();

            for (let i = res.favoritesRaffles.length - 1, len = res.favoritesRaffles.length; i >= 0; i--) {

                /* Updated the saved content ( Firefox update v1.2.4 ) */

                if (typeof res.favoritesRaffles[i].items === 'string') {

                    // Parse HTML string

                    let e = document.createElement('div');
                    e.innerHTML = res.favoritesRaffles[i].items;
                    res.favoritesRaffles[i].items = [];

                    // Convert into BuildDOM object

                    for (let o = 0, len = e.children.length; o < len; o++) {
                        res.favoritesRaffles[i].items.push({
                            tag: 'div',
                            classList: Array.from(e.children[o].classList),
                            attributes: {
                                style: e.children[o].getAttribute('style') || ""
                            },
                            dataset: {
                                content: e.children[o].dataset.content,
                                title: e.children[o].dataset.title
                            }
                        });
                    }

                    // Update the save later
                    needUpdate = true;
                }

                console.log(res.favoritesRaffles[i].items);

                /* Create a new Box for this saved raffle  */

                append.appendChild(BuildDOM.Create({
                    tag: 'div',
                    classList: ['panel-raffle', 'hidden'],
                    childrens: [{
                        tag: 'div',
                        classList: ['panel-heading'],
                        childrens: [{
                            tag: 'div',
                            classList: ['raffle-name'],
                            childrens: [{
                                tag: 'a',
                                attributes: {
                                    href: '/raffles/' + res.favoritesRaffles[i].raffleID
                                },
                                textContent: res.favoritesRaffles[i].title
                            }]
                        }, {
                            tag: 'div',
                            classList: ['pull-right'],
                            textContent: 'Added: ',
                            childrens: [{
                                tag: 'span',
                                classList: ['raffle-time-left'],
                                textContent: new Date(res.favoritesRaffles[i].date).toDateString()
                            }, {
                                tag: 'i',
                                classList: ['fa', 'fa-fw', 'fa-trash', 'remove'],
                                dataset: {
                                    rid: res.favoritesRaffles[i].raffleID
                                }
                            }]
                        }]
                    }, {
                        tag: 'div',
                        classList: ['panel-left'],
                        childrens: [{
                            tag: 'div',
                            classList: ['panel-body'],
                            childrens: [{
                                tag: 'div',
                                classList: ['avatar-container'],
                                attributes: {
                                    style: "height: 60px; width: 60px"
                                },
                                childrens: [{
                                    tag: 'img',
                                    attributes: {
                                        style: 'border-color: ' + res.favoritesRaffles[i].owner.color + '; border-width: 2px',
                                        src: res.favoritesRaffles[i].owner.avatar
                                    }
                                }]
                            }, {
                                tag: 'div',
                                classList: ['raffle-username'],
                                childrens: [{
                                    tag: 'span',
                                    childrens: [{
                                        tag: 'a',
                                        classList: ['username'],
                                        attributes: {
                                            href: res.favoritesRaffles[i].owner.url,
                                            style: 'color:' + res.favoritesRaffles[i].owner.color
                                        }
                                    }]
                                }]
                            }]
                        }]
                    }, {
                        tag: 'div',
                        classList: ['panel-right'],
                        childrens: [{
                            tag: 'div',
                            classList: ['panel-raffle-items'],
                            childrens: res.favoritesRaffles[i].items
                        }]
                    }]
                }));

            }

            // Append the result and display the first raffles

            rafflesList.appendChild(append);
            DisplayMore();

            // Refresh the export btn
            exportRefresh(res.favoritesRaffles);

            // Update the list of current raffle for import
            Modal.UpdateSave(res.favoritesRaffles);

            // And update the items on save
            if (needUpdate) {
                chrome.storage.local.set({
                    favoritesRaffles: res.favoritesRaffles
                }, function () {
                    console.log('UPDATE DONE');
                });
            }
        }

        chrome.storage.local.get(["favoritesRaffles"], DisplayAllFavorites);

        /* Add remove form favorite event */

        function RemoveFavorite(ev) {
            if (ev.target.classList.contains('remove')) {

                chrome.storage.local.get(["favoritesRaffles"], function (res) {

                    // Search and remove

                    for (let i = 0, len = res.favoritesRaffles.length; i < len; i++) {
                        if (res.favoritesRaffles[i].raffleID == ev.target.dataset.rid) {
                            res.favoritesRaffles.splice(i, 1);
                            break;
                        }
                    }

                    chrome.storage.local.set({
                        favoritesRaffles: res.favoritesRaffles
                    }, function (err, msg) {
                        // And finally remove this element from the list
                        ev.target.parentElement.parentElement.parentElement.remove();
                        // Refresh the export btn
                        exportRefresh(res.favoritesRaffles);

                        // Update the list of current raffle for import
                        Modal.UpdateSave(res.favoritesRaffles);
                    });

                });
            }
        }

        rafflesList.addEventListener('click', RemoveFavorite);
    }
}

/* Execute */

if (document.readyState == "interactive" || document.readyState == "complete") {
    AppendAllSavedRaffle();
} else {
    document.addEventListener("DOMContentLoaded", AppendAllSavedRaffle);
}
