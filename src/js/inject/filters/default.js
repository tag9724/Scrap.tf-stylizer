FILTER.prototype.QuerySearch = function(ev) {
    this.filter.query = ev.target.value.toLowerCase();
    this.ApplyFilter('query');
};
FILTER.prototype.HideDupes = function(ev) {
    this.filter.hideDupes = ev.target.checked;
    this.ApplyFilter('hideDupes');
};
FILTER.prototype.SelectClasse = function(ev) {

    if (ev.target.dataset.class) {
        var selected = ev.target.dataset.class;
        var target = ev.target;
    } else {
        var selected = ev.target.parentElement.dataset.class;
        var target = ev.target.parentElement;
    }

    if (selected == "multi") {
        // Want to show all classes
        this.classesAndSlot[0].classList.add('selected');
        for (let i = 1; i < 10; i++) {
            this.classesAndSlot[i].classList.remove('selected');
        }
        // Reset this filter (all classes)
        this.filter.classes = this.classesList.slice();
    } else {
        // Remove the element
        if (target.classList.contains('selected') > 0) {
            // Remove this filter
            this.filter.classes.splice(this.filter.classes.indexOf(selected), 1);
            target.classList.remove('selected');
            // no classes selected
            if (!this.filter.classes[1]) {
                this.classesAndSlot[0].classList.add('selected');
                // Reset this filter (all classes)
                this.filter.classes = this.classesList.slice();
            }
        }
        // Add this element
        else {
            target.classList.add('selected');
            this.classesAndSlot[0].classList.remove('selected');
            if (this.filter.classes.length >= 10) {
                this.filter.classes = ["multi", selected];
            } else {
                this.filter.classes.push(selected);
            }
        }
    }

    // Apply changes
    this.ApplyFilter('classes');
};
FILTER.prototype.SelectWeaponSlot = function(ev) {

    if (ev.target.dataset.class) {
        var selected = ev.target.dataset.slot.replace(/[0-9]/g, "");
        var target = ev.target;
    } else {
        var selected = ev.target.parentElement.dataset.slot.replace(/[0-9]/g, "");
        var target = ev.target.parentElement;
    }

    // Remove the element
    if (target.classList.contains('selected')) {
        target.classList.remove('selected');
    }
    // Add the element
    else {
        target.classList.add('selected');
    }

    this.filter.slot = [];

    for (let i = 10, len = this.classesAndSlot.length; i < len; i++) {
        if (!this.classesAndSlot[i].classList.contains('selected')) {
            this.filter.slot.push(this.classesAndSlot[i].dataset.slot);
        }
    }

    // Apply changes
    this.ApplyFilter('slot');
};
console.log('FILTER Default');
