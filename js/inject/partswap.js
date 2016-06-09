/* You need to become an astronaut if you want to understand this function */
function Put(elem) {
    elem.parentElement.querySelector('input').value = "2000";
    // Update the total
    ScrapTF.Parts.Recompute();
}

/* Edit all input element & add our wanted button */
var tds = document.querySelectorAll('#buyparts > div.panel-body > div.buyparts-second > table tr td:nth-child(2)');

for (let i = 0, len = tds.length, elem; i < len; i++) {
    // need explicit comment here
    tds[i].style.width = "100%";
    // Edit the input tag
    elem = tds[i].querySelector('input');
    elem.style.width = "calc(100% - 35px)";
    elem.insertAdjacentHTML("beforeBegin", "<i class='fa fa-shopping-cart plusBtn' onclick='Put(this)'></i>");
}
