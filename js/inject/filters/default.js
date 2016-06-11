FILTER.prototype.QuerySearch = function(ev) {
    this.filter.query = ev.target.value;
    this.ApplyFilter();
};
FILTER.prototype.HideDupes = function(ev) {
    this.filter.hideDupes = ev.target.checked;
    this.ApplyFilter();
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
        for (let i = 1, len = this.classesAndSlot.length; i < len; i++) {
            this.classesAndSlot[i].classList.remove('selected');
        }
        // Reset this filter (all classes)
        this.filter.classes = this.classesList;
    } else {
        // Remove the element
        if (target.classList.contains('selected') > 0) {
            // Remove this filter
            this.filter.classes.splice(this.filter.classes.indexOf(selected), 1);
            target.classList.remove('selected');
            // no classes selected
            if (!this.filter.classes[0]) {
                this.classesAndSlot[0].classList.add('selected');
                // Reset this filter (all classes)
                this.filter.classes = this.classesList;
            }
        }
        // Add this element
        else {
            target.classList.add('selected');
            this.classesAndSlot[0].classList.remove('selected');
            if (this.filter.classes.length >= 9) {
                this.filter.classes = [selected];
            } else {
                this.filter.classes.push(selected);
            }
        }
    }
    // Apply changes
    this.ApplyFilter();
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
    if (target.classList.contains('selected') > 0) {
        target.classList.remove('selected');
        this.filter.slot.splice(this.filter.slot.indexOf(selected), 1);

        // No slot selected
        if (this.filter.slot.length == 0) {
            this.filter.slot = this.slotList;
        }
    }
    // Add the element
    else {
        if (this.filter.slot.length >= 4) {
            this.filter.slot = [selected];
        } else {
            this.filter.slot.push(selected);
        }
        // display css
        target.classList.add('selected');
    }
    // Apply changes
    this.ApplyFilter();
};
console.log('FILTER Default');
