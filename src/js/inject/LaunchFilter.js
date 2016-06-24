if (document.readyState == "interactive") {
    console.log('DOM interactive');
    TEMP = new FILTER();
} else if (document.readyState == "complete") {
    console.log('DOM complete');
    TEMP = new FILTER();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded');
        TEMP = new FILTER();
    });
}
