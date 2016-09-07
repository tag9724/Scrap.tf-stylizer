var TEMP; // Actually not finished

if (document.readyState == "interactive" || document.readyState == "complete") {
    TEMP = new FILTER();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        TEMP = new FILTER();
    });
}
