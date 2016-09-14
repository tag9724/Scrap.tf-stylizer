/* Add the level filter input */

FILTER.prototype.AppendLevelFilter = function (min, max) {
    var appendBox = document.querySelector('.hide-dupes-checkbox');

    this.levelBox = BuildDOM.Create({
        tag: 'label',
        classList: ['form-inline'],
        textContent: 'Level : ',
        childrens: [{
            tag: 'input',
            classList: ['levelInput', 'form-control', 'input-sm'],
            attributes: {
                type: 'number',
                min: '0',
                value: ((this.filter.lvlMin != 0) ? this.filter.lvlMin : ""),
                placeholder: 'min'
            }
        }, {
            tag: 'input',
            classList: ['levelInput', 'form-control', 'input-sm'],
            attributes: {
                type: 'number',
                min: '0',
                value: ((this.filter.lvlMax != Infinity) ? this.filter.lvlMax : ""),
                placeholder: 'max'
            }
        }]
    });

    this.levelBox.addEventListener('input', this.Level.bind(this));
    appendBox.insertAdjacentElement('afterEnd', this.levelBox);
};

FILTER.prototype.ResetLevelFilter = function (min, max) {
    this.levelBox.children[0].value = "";
    this.levelBox.children[1].value = "";
};

/* Search item per level */

FILTER.prototype.Level = function (ev) {

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
    this.ApplyFilter('level');
};
console.log('FILTER Levels');
