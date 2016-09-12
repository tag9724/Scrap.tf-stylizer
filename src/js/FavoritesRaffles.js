/* Favorites raffles */

chrome.storage.local.get(["favoritesRaffles"], function (res) {

    function FavoriteRaffle() {
        // This element need to enter in the top raffles
        if (newBtn.dataset.infav == "false") {

            // Select informations
            let userContainer = document.querySelector('.raffle-box-row .raffle-username a');

            /* Build Item list to JSON */

            let e = document.querySelector('.raffle-items');
            let itemsArr = [];

            // Convert into BuildDOM object

            for (let o = 0, len = e.children.length; o < len; o++) {
                itemsArr.push({
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

            /* Build JSON save */

            var datas = {
                raffleID: window.location.pathname.replace('/raffles/', ""),
                title: document.querySelector('.raffle-well .subtitle').innerHTML,
                owner: {
                    avatar: document.querySelector('.raffle-box-row .avatar-container img').src,
                    url: userContainer.href,
                    name: userContainer.innerHTML,
                    color: userContainer.style.color

                },
                items: itemsArr,
                date: Date.now(),
                add: true
            };

            newBtn.dataset.infav = true;
        }
        // Or he need to be removed
        else {
            var datas = {
                raffleID: window.location.pathname.replace('/raffles/', ""),
                add: false
            };

            newBtn.dataset.infav = false;
        }

        // save informations

        chrome.storage.local.get(["favoritesRaffles"], function (res) {

            // First configuration

            if (!res.favoritesRaffles) {
                res.favoritesRaffles = [];
            }

            // Delete item
            if (datas.add == false) {
                for (let i = 0, len = res.favoritesRaffles.length; i < len; i++) {
                    if (res.favoritesRaffles[i].raffleID == datas.raffleID) {
                        res.favoritesRaffles.splice(i, 1);
                        break;
                    }
                }
            }
            // Add item
            else {
                res.favoritesRaffles.push(datas);
            };

            chrome.storage.local.set({
                favoritesRaffles: res.favoritesRaffles
            });

        });

    }

    // Append the button

    var btnBox = document.querySelector('#pid-viewraffle > div.container > div.welcome-overlay-container > div > div.row.raffle-opts-row > div.col-xs-5');
    if (btnBox) {

        var infav = false;
        res.favoritesRaffles = res.favoritesRaffles || [];

        for (let i = 0, len = res.favoritesRaffles.length; i < len; i++) {
            if (res.favoritesRaffles[i].raffleID == window.location.pathname.replace('/raffles/', "")) {
                infav = true;
                break;
            }
        }

        var newBtn = document.createElement('button');

        newBtn.innerHTML = '<i class="fa fa-star"></i>';
        newBtn.classList.add('btn', 'btn-embossed', 'btn-info');
        newBtn.dataset.infav = infav;

        newBtn.addEventListener('click', FavoriteRaffle);
        btnBox.appendChild(newBtn);
    }
});
