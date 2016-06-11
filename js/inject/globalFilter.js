/* Init filters */

class FILTER {
    constructor() {
        // Select allitems & classes box
        this.items = document.querySelectorAll('#buy-container div .item');
        this.classes = document.getElementById('classes');

        // Get page path
        this.filterType = window.location.pathname.split('/')[1];

        // Default classes & slot
        this.classesList = ["scout", "soldier", "pyro", "demoman", "heavy", "engineer", "medic", "sniper", "spy"];
        this.slotList = ["primary", "secondary", "melee", "pda"];

        // Type of filters we need
        this.filtersAvailables = {
            "weapons": ["level"],
            "hats": ["level"],
            "items": ["level"],
            "skins": [],
            "stranges": ["levels"]
        };

        //Define and get current filters
        this.defaultFilter = {
            lvlMax: 100,
            lvlMin: 0,
            hideDupes: false,
            classes: this.classesList,
            slot: this.slotList,
            query: ""
        };

        this.filter = this.LoadSavedFilters();

        // Items already in inventory

        this.myInventory = {};
        var CheckUserInv = setInterval(function() {
            if (!Array.isArray(ScrapTF.Inventory.MyDefindexes)) {
                this.myInventory = ScrapTF.Inventory.MyDefindexes;
                if (this.filter.hideDupes) this.ApplyFilter();
                clearInterval(CheckUserInv);
            }
        }.bind(this), 250);

        // List of visible items
        this.botItems = document.createElement('span');
        document.querySelector('#buy-container > div.inv-hint > i18n').appendChild(this.botItems);

        // Ineject extras buttons for filtering results
        this.InjectFilters();

        // Reset events
        this.ResetDefaultEvents();

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
            else {
                this.classesAndSlot[i].addEventListener("click", this.SelectWeaponSlot.bind(this));
            }
        }

        // Apply css
        if (this.filter.classes.length >= 9) {
            this.classesAndSlot[0].classList.add('selected');
        } else {
            for (let i = 0; i < 10; i++) {

                if (this.filter.classes.indexOf(this.classesAndSlot[i].dataset.class) >= 0) {
                    this.classesAndSlot[i].classList.add('selected');
                }
            }
        }

        if (this.filter.slot.length < 4) {
            for (let i = 10; i < 14; i++) {
                if (this.filter.slot.indexOf(this.classesAndSlot[i].dataset.slot) >= 0) {
                    this.classesAndSlot[i].classList.add('selected');
                }
            }
        }

        /* Add the reset filters bun */
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

    }
    InjectFilters() {
        // TODO
    }
    Filters(item) {

        // Query Search
        if (!new RegExp("(" + this.filter.query + ")", "i").test(item.dataset.title)) {
            item.classList.add('rm');
            return 0;
        }

        // Hide items in my inventory
        if (this.filter.hideDupes && this.myInventory[item.dataset.defindex]) {
            item.classList.add('rm');
            return 0;
        }

        //Classes search
        if (this.filter.classes.indexOf(item.dataset.classes) < 0) {
            item.classList.add('rm');
            return 0;
        }

        //Slot search
        if (this.filter.slot.indexOf(item.dataset.slot.replace(/[0-9]/g, "")) < 0) {
            item.classList.add('rm');
            return 0;
        }

        // This item must be displayed
        item.classList.remove('rm');
        return true;
    }
    ApplyFilter() {
        for (var i = 0, displayed = 0, len = this.items.length; i < len; i++) {
            displayed += this.Filters(this.items[i]);
        }
        // Display the number of available items
        this.botItems.innerHTML = '(' + displayed + ')';
        // And Save filter
        this.SaveFilter();
    }
    ResetFilters() {
        // reset filter list
        this.filter = Object.assign({}, this.defaultFilter);

        // Reset css Style
        this.query.value = "";
        this.hideInv.checked = false;

        this.classesAndSlot[0].classList.add('selected');
        for (let i = 1, len = this.classesAndSlot.length; i < len; i++) {
            this.classesAndSlot[i].classList.remove('selected');
        }

        this.ApplyFilter();
    }
    LoadSavedFilters() {
        if (localStorage && localStorage.getItem(this.filterType)) {
            ScrapTF.Inventory.ToggleFilters();
            // Return datas
            return JSON.parse(localStorage.getItem(this.filterType));
        } else {
            return Object.assign({}, this.defaultFilter);
        }
    }
    SaveFilter() {
        if (localStorage) {
            localStorage.setItem(this.filterType, JSON.stringify(this.filter));
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    TEMP = new FILTER();
});
