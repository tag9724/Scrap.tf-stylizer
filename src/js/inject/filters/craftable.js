/* Search item per level */

FILTER.prototype.SelectCraftable = function(ev) {

    var selected = ev.target.dataset.slot.replace(/[0-9]/g, "");
    var target = ev.target;

    // Remove the element
    if (target.classList.contains('selected')) {
        target.classList.remove('selected');
    }
    // Add the element
    else {
        target.classList.add('selected');
    }

    this.filter.slotHat = [];

    for (let i = 10, len = this.classesAndSlot.length; i < len; i++) {
        if (!this.classesAndSlot[i].classList.contains('selected')) {
            this.filter.slotHat.push(this.classesAndSlot[i].dataset.slot);
        }
    }

    // Apply changes
    this.ApplyFilter();
};
console.log('FILTER Craftables');
