/* Add the level filter input */

FILTER.prototype.AppendLevelFilter = function(min, max) {
    var appendBox = document.querySelector('.hide-dupes-checkbox');

    this.levelBox = document.createElement('label');
    this.levelBox.classList.add('form-inline');

    this.levelBox.innerHTML = 'Level : ' +
        '<input type="number" min="0" value="' + ((this.filter.lvlMin != 0) ? this.filter.lvlMin : "") + '" placeholder="min" class="levelInput form-control input-sm"> | ' +
        '<input type="number" min="0" value="' + ((this.filter.lvlMax != Infinity) ? this.filter.lvlMax : "") + '" placeholder="max" class="levelInput form-control input-sm">';

    this.levelBox.addEventListener('keyup', this.Level.bind(this));
    appendBox.insertAdjacentElement('afterEnd', this.levelBox);
};

FILTER.prototype.ResetLevelFilter = function(min, max) {
    this.levelBox.children[0].value = "";
    this.levelBox.children[1].value = "";
};

/* Search item per level */

FILTER.prototype.Level = function(ev) {

    var max = (this.levelBox.children[1].value == "") ? Infinity : Number(this.levelBox.children[1].value);
    var min = Number(this.levelBox.children[0].value);

    // Auto set the max based to the min input
    if (min > max) {
        max = min;
    }

    // Refrsh the filters
    this.filter.lvlMin = min;
    this.filter.lvlMax = max;

    // And apply the result
    this.ApplyFilter();
};
console.log('FILTER Levels');
