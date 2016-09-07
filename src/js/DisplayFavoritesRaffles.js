document.addEventListener('DOMContentLoaded', function() {

    // Append FavoriteRaffle and polls history li tag in nav bar

    var navUL = document.querySelector('#navbar-collapse-01 > ul:nth-child(1) > li.dropdown:nth-child(2) ul');
    navUL.innerHTML += '<li><a href="/raffles/favorites"><i class="fa fa-fw fa-star"></i><i18n>Favorites Raffles</i18n></a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="/polls/history"><i class="fa fa-fw fa-pie-chart"></i><i18n>Polls History</i18n></a></li>' +
        '<li><a href="/announcement"><i class="fa fa-fw fa-bullhorn"></i><i18n>Announcement</i18n></a></li>';

    // Display Datas saved

    if (window.location.pathname == '/raffles/favorites') {

        /* Init the container */

        var container = document.querySelector('#pid-raffles > div.container');
        container.style.display = "none";
        container.innerHTML = "";

        var newContent = document.createElement('div');
        newContent.classList.add('container', 'container-margins', 'favorites-raffles-container');
        newContent.innerHTML = '<div class="panel panel-info favorites-raffles">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title"><i18n>Favorites Raffles</i18n></h3>' +
            '</div>' +
            '<div class="panel-bg">' +
            '<div id="favs-raffles-list"></div>' +
            '<div class="panel-body load">Load More</div>' +
            '</div>' +
            '</div>';

        container.insertAdjacentElement('afterend', newContent);

        /* Display more raffle */

        const MAXDISPLAY = 25;

        function DisplayMore(ev) {
            var hiddens = document.querySelectorAll('.panel-raffle.hidden');
            for (let i = 0, len = hiddens.length; i < MAXDISPLAY && i < len; i++) {
                hiddens[i].classList.remove('hidden');
            }

            if (hiddens.length <= MAXDISPLAY) {
                load.innerHTML = "That's all no more !";
            }
        }

        var load = newContent.querySelector('.panel-body.load');
        load.addEventListener('click', DisplayMore);

        /* Export btn */

        let panelHead = newContent.querySelector('.panel-heading');

        let aBtn = document.createElement('a');
        aBtn.classList.add('btn', 'btn-info', 'btn-embossed', 'cust-btn');
        aBtn.download = 'FavoritesRaffles.scraptf';
        aBtn.innerHTML = 'Export';

        panelHead.appendChild(aBtn);

        function exportRefresh(obj) {
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
            aBtn.href = 'data:' + data;
        }

        /* Import btn */

        let iBtn = document.createElement('a');
        iBtn.classList.add('btn', 'btn-info', 'btn-embossed', 'cust-btn');
        iBtn.innerHTML = "Import";

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
                this.nbSaved[0].innerHTML = current;
                this.nbSaved[1].innerHTML = arrive;
            }
            OpenModal(ev) {

                var reader = new FileReader();
                reader.readAsText(ev.target.files[0], 'utf-8');

                reader.onload = function(e) {
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

                rafflesList.innerHTML = "";
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

            for (let i = res.favoritesRaffles.length - 1, len = res.favoritesRaffles.length; i >= 0; i--) {

                rafflesList.innerHTML += '<div class="panel-raffle hidden">' +
                    '<div class="panel-heading"><div class="raffle-name"><a href="/raffles/' + res.favoritesRaffles[i].raffleID + '">' +
                    res.favoritesRaffles[i].title +
                    '</a></div>' +
                    '<span class="pull-right"><i18n>Added</i18n>: <span class="raffle-time-left">' +
                    new Date(res.favoritesRaffles[i].date).toDateString() +
                    '</span><i class="fa fa-fw fa-trash remove" data-rid="' + res.favoritesRaffles[i].raffleID + '"></i></span></div>' +
                    '<div class="panel-left"><div class="panel-body">' +
                    '<div class="avatar-container " style="height: 60px; width: 60px;"><img style="border-color: ' +
                    res.favoritesRaffles[i].owner.color +
                    '; border-width: 2px;" src="' +
                    res.favoritesRaffles[i].owner.avatar +
                    '" alt="Avatar"></div>' +
                    '<div class="raffle-username"><span><a href="' +
                    res.favoritesRaffles[i].owner.url +
                    '" class="username" style="color:' +
                    res.favoritesRaffles[i].owner.color +
                    '">' +
                    res.favoritesRaffles[i].owner.name +
                    '</a></span></div>' +
                    '</div></div>' +
                    '<div class="panel-right">' +
                    '<div class="panel-raffle-items">' +
                    res.favoritesRaffles[i].items +
                    '</div></div></div></div>';
            }

            DisplayMore();

            // Refresh the export btn
            exportRefresh(res.favoritesRaffles);

            // Update the list of current raffle for import
            Modal.UpdateSave(res.favoritesRaffles);
        }

        chrome.storage.local.get(["favoritesRaffles"], DisplayAllFavorites);

        /* Add remove form favorite event */

        function RemoveFavorite(ev) {
            if (ev.target.classList.contains('remove')) {

                chrome.storage.local.get(["favoritesRaffles"], function(res) {

                    // Search and remove

                    for (let i = 0, len = res.favoritesRaffles.length; i < len; i++) {
                        if (res.favoritesRaffles[i].raffleID == ev.target.dataset.rid) {
                            res.favoritesRaffles.splice(i, 1);
                            break;
                        }
                    }

                    chrome.storage.local.set({
                        favoritesRaffles: res.favoritesRaffles
                    }, function(err, msg) {
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
});
