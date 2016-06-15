document.addEventListener('DOMContentLoaded', function() {
  
    // Append FavoriteRaffle li tag in nav bar

    var navUL = document.querySelector('#navbar-collapse-01 > ul:nth-child(1) > li.dropdown:nth-child(2) ul');
    navUL.innerHTML += '<li><a href="/raffles/favorites"><i class="fa fa-fw fa-star"></i> <i18n>Favorites Raffles</i18n></a></li>';

    // Display Datas saved

    if (window.location.pathname == '/raffles/favorites') {

        /* Init the container */

        var container = document.querySelector('#pid-raffles > div.container.container-margins');
        container.style.display = "none";

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

        /* Search saved raffles */

        var rafflesList = document.getElementById('favs-raffles-list');

        chrome.storage.local.get(["favoritesRaffles"], function(res) {
            // Debug
            res.favoritesRaffles = res.favoritesRaffles || [];

            for (let i = res.favoritesRaffles.length - 1, len = res.favoritesRaffles.length; i >= 0; i--) {

                rafflesList.innerHTML += '<div class="panel-raffle hidden">' +
                    '<div class="panel-heading"><div class="raffle-name"><a href="/raffles/' + res.favoritesRaffles[i].raffleID + '">' +
                    res.favoritesRaffles[i].title +
                    '</a></div>' +
                    '<span class="pull-right"><i18n>Added</i18n>: <span class="raffle-time-left">' +
                    new Date(res.favoritesRaffles[i].date).toDateString() +
                    '</span> <i class="fa fa-fw fa-trash remove" data-rid="' + res.favoritesRaffles[i].raffleID + '"></i></span></div>' +
                    '<div class="panel-left">' +
                    '<div class="panel-body">' +
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
                    '</div>' +
                    '</div>' +
                    '<div class="panel-right">' +
                    '<div class="panel-raffle-items">' +
                    res.favoritesRaffles[i].items +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            DisplayMore();
        });

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
                    });

                });
            }
        }

        rafflesList.addEventListener('click', RemoveFavorite);
    }
});
