/* Init filters */ // <= TODO add more explicit comments

class FILTER {
    constructor() {

        // For debugging the saved configuration
        this.saveVersion = 6;
        // Select allitems & classes box
        this.buyContainer = document.getElementById('buy-container');
        this.buyItems = document.querySelectorAll('#buy-container div .item');
        this.BuildSearchDatas(this.buyItems);

        // Don't add filters on the wrong page
        if (!this.buyContainer)
            return false;

        // User backpack
        this.sellContainer = document.getElementById('sell-container');
        this.classes = document.getElementById('classes');

        // Get page path
        this.filterType = window.location.pathname.split('/')[1];

        // Default classes & slot
        this.classesList = ["multi", "scout", "soldier", "pyro", "demoman", "heavy", "engineer", "medic", "sniper", "spy"];
        this.slotList = [];
        this.slotHatList = [];

        // Type of filters we need
        this.filtersAvailables = {
            "weapons": ["query", "hideDupes", "classes", "slot", "level"],
            "hats": ["query", "hideDupes", "classes", "slotHat", "level"],
            "items": ["query", "hideDupes", "classes", "slot", "level"],
            "skins": ["query", "hideDupes", "classes", "slot"],
            "stranges": ["query", "hideDupes", "classes", "slot", "level"],
            "killstreaks": ["query", "hideDupes", "classes", "slot"]
        };
        this.rmClassList = ['rm-query', 'rm-dupes', 'rm-classes', 'rm-slot', 'rm-hat-slot', 'rm-level'];

        this.currFilter = this.BuildFilterObject();
        this.filter = this.LoadSavedFilters();
        console.log('Filter loaded ', this.filterType, this.filter);

        // Items already in inventory

        this.loadingInv = document.createElement('img');
        this.loadingInv.src = LOADINGGIF;
        this.loadingInv.style.height = "30px";
        this.loadingInv.style.marginTop = "-5px";

        document.querySelector('.hide-dupes-checkbox').appendChild(this.loadingInv);

        this.maxInterval = 100;
        this.currInterval = 0;

        var CheckUserInv = setInterval(function () {

            if (ScrapTF && !Array.isArray(ScrapTF.Inventory.MyDefindexes)) {

                this.filter.myInventory = ScrapTF.Inventory.MyDefindexes;
                this.loadingInv.remove();

                if (this.filter.hideDupes) this.ApplyFilter();
                clearInterval(CheckUserInv);
            }
            // More than 12sec of retry (impossible to load inventoy)
            else if (this.currInterval >= this.maxInterval) {
                this.filter.myInventory = {};
                this.loadingInv.parentElement.style.setProperty("color", "#c0392b", "important");
                this.loadingInv.remove();

                clearInterval(CheckUserInv);
            }

            this.currInterval++;

        }.bind(this), 250);

        // List of visible items in bot inventory
        this.botItems = document.createElement('span');
        document.querySelector('#buy-container > div.inv-hint > i18n').appendChild(this.botItems);
        // List of visible items in user inventory
        this.userItems = document.createElement('span');
        document.querySelector('#sell-container > div.inv-hint > i18n').appendChild(this.userItems);

        // Inject extras buttons for filtering results
        this.InjectFilters();

        // Reset events
        this.ResetDefaultEvents();

        /* Filters execution */

        this.Exec = {
            query: function (filter, item) {

                if (item.datas['data-title'].toLowerCase().indexOf(filter.query) >= 0 || item.datas['data-content'].toLowerCase().indexOf(filter.query) >= 0) {
                    item.classList.remove('rm-query');
                    return false;
                }

                item.classList.add('rm-query');

            },
            hideDupes: function (filter, item) {
                if (filter.hideDupes && filter.myInventory[item.datas['data-defindex']]) {
                    item.classList.add('rm-dupes');
                    return false;
                }
                item.classList.remove('rm-dupes');
            },
            classes: function (filter, item) {
                for (let i = 0, len = filter.classes.length; i < len; i++) {
                    if (item.datas['data-classes'].indexOf(filter.classes[i]) >= 0) {
                        item.classList.remove('rm-classes');
                        return false;
                    }
                }
                item.classList.add('rm-classes');
            },
            slot: function (filter, item) {
                if (filter.slot.indexOf(item.datas['data-slot'].replace(/[0-9]/g, "").replace(/(building)/g, "pda")) > -1) {
                    item.classList.add('rm-slot');
                    return false;
                }
                item.classList.remove('rm-slot');
            },
            slotHat: function (filter, item) {
                if (filter.slotHat.indexOf(item.datas['data-slot']) > -1) {
                    item.classList.add('rm-hat-slot');
                    return false;
                }
                item.classList.remove('rm-hat-slot');
            },
            level: function (filter, item) {
                if (item.datas.level < filter.lvlMin || item.datas.level > filter.lvlMax) {
                    item.classList.add('rm-level');
                    return false;
                }
                item.classList.remove('rm-level');
            }
        };

        // Apply these filters
        this.ApplyFilter();
    }
    ResetDefaultEvents() {

        /* Query Search */

        var query = document.querySelector('.inventory-search');
        this.query = document.createElement('input');
        query.insertAdjacentElement("afterEnd", this.query);

        this.query.setAttribute('style', query.style.cssText);
        this.query.classList.add('form-control');

        // Set the new Input
        this.query.addEventListener("keyup", this.QuerySearch.bind(this));
        this.query.value = this.filter.query;
        // Remove & add Input
        query.style.display = "none";

        /* Hide items present in our inventory */

        var hideInv = document.getElementById('hide_dupes');
        this.hideInv = document.createElement('input');
        hideInv.insertAdjacentElement("beforeBegin", this.hideInv);

        this.hideInv.setAttribute('data-toggle', 'checkbox');
        this.hideInv.setAttribute('type', 'checkbox');
        this.hideInv.classList.add('custom-checkbox');

        this.hideInv.checked = this.filter.hideDupes;

        // Set the new Input
        this.hideInv.addEventListener("change", this.HideDupes.bind(this));
        // Remove & add Input
        hideInv.remove();

        /* Classes & slot selection */

        this.classesAndSlot = this.classes.querySelectorAll('ul li');
        for (let i = 0, len = this.classesAndSlot.length; i < len; i++) {
            // Remove default event
            this.classesAndSlot[i].removeAttribute("onclick");

            // Classes selection event
            if (i < 10) {
                this.classesAndSlot[i].addEventListener("click", this.SelectClasse.bind(this));
            }
            // Weapon slot selection
            else if (this.currFilter.slot) {
                this.classesAndSlot[i].addEventListener("click", this.SelectWeaponSlot.bind(this));
            }
            // Hat slot selection
            else if (this.currFilter.slotHat) {
                this.classesAndSlot[i].addEventListener("click", this.SelectCraftable.bind(this));
            }
        }

        // Apply css
        if (this.filter.classes.length >= 10) {
            this.classesAndSlot[0].classList.add('selected');
        } else {
            for (let i = 1; i < 10; i++) {
                if (this.filter.classes.indexOf(this.classesAndSlot[i].dataset.class) >= 0) {
                    this.classesAndSlot[i].classList.add('selected');
                }
            }
        }

        // Slot filters
        if (this.currFilter.slot) {
            for (let i = 10, len = this.classesAndSlot.length; i < len; i++) {
                if (this.filter.slot.indexOf(this.classesAndSlot[i].dataset.slot) < 0) {
                    this.classesAndSlot[i].classList.add('selected');
                }
            }
        }
        // Hat slot filter
        else if (this.currFilter.slotHat) {
            for (let i = 10, len = this.classesAndSlot.length; i < len; i++) {
                if (this.filter.slotHat.indexOf(this.classesAndSlot[i].dataset.slot) < 0) {
                    this.classesAndSlot[i].classList.add('selected');
                }
            }
        }

        /* Add the reset filters button */
        var clearbtn = document.getElementById('ClearSelectedReverse');
        this.clearbtn = clearbtn.cloneNode();
        this.clearbtn.removeAttribute('id');
        this.clearbtn.removeAttribute('onclick');
        // Edit hover box
        this.clearbtn.setAttribute('title', 'Reset Filters');
        this.clearbtn.dataset.originalTitle = "Reset filters";
        // Edit icon
        this.clearbtn.innerHTML = clearbtn.innerHTML;
        this.clearbtn.children[0].classList.remove('fa-eraser');
        this.clearbtn.children[0].classList.add('fa-ban');
        // Add clear filters event
        this.clearbtn.addEventListener('click', this.ResetFilters.bind(this));
        // Add the button
        clearbtn.insertAdjacentElement('beforeBegin', this.clearbtn);

        /* Items payement */

        this.payementBtn = document.querySelector('#reverse-header > div.rev-filters > div.row.text-center > div.pull-right.text-right > button.btn.btn-embossed.btn-primary.btn-trade.btn-stage2');
        this.payementBtn.addEventListener('click', function () {
            this.sellUserInvDisplayed = true;
            this.ApplyFilter();
        }.bind(this));

    }
    InjectFilters() {
        if (this.currFilter.level) this.AppendLevelFilter();
    }
    ApplyFilter(filter) {

        // Set what filter we are goinig to apply
        filter = (filter) ? [filter] : this.filtersAvailables[this.filterType];

        // Buy container
        if (!this.sellUserInvDisplayed) {

            let numberItems = this.buyItems.length;

            for (let i = 0, len = filter.length; i < len; i++) {

                for (let o = 0; o < numberItems; o++) {
                    this.Exec[filter[i]](this.filter, this.buyItems[o]);
                }
            }

            // Display the numbres of visibles items

            let hidden = this.buyContainer.querySelectorAll('.item.' + this.rmClassList.join(',.item.')).length;
            this.botItems.textContent = ' ( ' + (numberItems - hidden) + ' / ' + numberItems + ' )';
        }
        // Sell container
        else {
            if (!this.sellItems || this.sellItems[0]) {
                this.sellItems = this.sellContainer.querySelectorAll('#sell-container div .item');
                this.BuildSearchDatas(this.sellItems);
            }

            let numberItems = this.sellItems.length;

            for (let i = 0, len = filter.length; i < len; i++) {

                for (let o = 0; o < numberItems; o++) {
                    this.Exec[filter[i]](this.filter, this.sellItems[o]);
                }
            }

            // Display the numbres of visibles items

            let hidden = this.sellContainer.querySelectorAll('.item.' + this.rmClassList.join(',.item.')).length;
            this.userItems.textContent = ' ( ' + (numberItems - hidden) + ' / ' + numberItems + ' )';
        }

        // And Save filter
        this.SaveFilter();
    }
    BuildSearchDatas(elem) {

        /* Convert attributes list to simple object */

        for (let i = 0, len = elem.length; i < len; i++) {

            elem[i].datas = {};

            for (let o = 0, len = elem[i].attributes.length; o < len; o++) {
                let item = elem[i].attributes.item(o);
                elem[i].datas[item.name] = item.value;
            }

            elem[i].datas.level = Number(elem[i].datas['data-content'].match(/(\d+)/)[0])
        }
    }
    MultiClassListRemove(elem, arr) {
        for (let i = 0, len = arr.length; i < len; i++) {
            elem.classList.remove(arr[i])
        }
    }
    ResetFilters() {

        /* reset filter list */

        let backpack = this.filter.myInventory;
        this.filter = this.DefaultFilter();

        this.filter.myInventory = backpack;
        this.SaveFilter();

        /* Reset css Style */

        this.query.value = "";
        this.hideInv.checked = false;

        this.classesAndSlot[0].classList.add('selected');
        for (let i = 1; i < 10; i++) {
            this.classesAndSlot[i].classList.remove('selected');
        }

        // Slots filters
        for (let i = 10, len = this.classesAndSlot.length; i < len; i++) {
            this.classesAndSlot[i].classList.add('selected');
        }

        /* Extras filters */

        // Level
        if (this.currFilter.level)
            this.ResetLevelFilter();

        /* Apply the default filters */

        for (var i = 0, displayed = 0, len = this.buyItems.length; i < len; i++) {
            this.MultiClassListRemove(this.buyItems[i], this.rmClassList);
        }
        if (this.sellItems) {
            for (var i = 0, displayed = 0, len = this.sellItems.length; i < len; i++) {
                this.MultiClassListRemove(this.sellItems[i], this.rmClassList);
            }
        }

        // Buy container
        if (!this.sellUserInvDisplayed) {
            // Display the numbres of visibles items
            let numberItems = this.buyItems.length;
            this.botItems.textContent = ' ( ' + numberItems + ' / ' + numberItems + ' )';
        }
        // Sell container
        else if (this.sellItems && this.sellItems[0]) {
            // Display the numbres of visibles items
            let numberItems = this.sellItems.length;
            this.userItems.textContent = ' ( ' + numberItems + ' / ' + numberItems + ' )';
        }

    }
    LoadSavedFilters() {
        if (localStorage && localStorage.getItem(this.filterType)) {

            ScrapTF.Inventory.ToggleFilters();
            var savedConf = JSON.parse(localStorage.getItem(this.filterType));

            // Return datas
            if (savedConf.version == this.saveVersion) {
                if (!savedConf.lvlMax) savedConf.lvlMax = Infinity;
                return savedConf;
            } else {
                return this.DefaultFilter();
            }
        } else {
            return this.DefaultFilter();
        }
    }
    SaveFilter() {
        if (localStorage) {
            localStorage.setItem(this.filterType, JSON.stringify(this.filter));
        }
    }
    DefaultFilter() {
        return {
            version: this.saveVersion,
            lvlMax: Infinity,
            lvlMin: 0,
            hideDupes: false,
            classes: this.classesList.slice(),
            slot: this.slotList.slice(),
            slotHat: this.slotHatList.slice(),
            query: "",
            myInventory: {}
        };
    }
    BuildFilterObject() {
        var obj = {};

        for (let key in this.filtersAvailables[this.filterType]) {
            obj[this.filtersAvailables[this.filterType][key]] = true;
        }

        return obj;
    }
};
