// Copyright 2026 Zozimus Technologies

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
 
domReady(function () {
 
    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        document.getElementById("result").innerHTML = "The result is: " + decodeText;
    }
 
    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);

    // Remove parenthesized camera IDs from the camera dropdown
    function cleanCameraLabels() {
        var selects = document.querySelectorAll('#my-qr-reader select');
        selects.forEach(function (select) {
            for (var i = 0; i < select.options.length; i++) {
                select.options[i].text = select.options[i].text.replace(/\s*\(.*?\)\s*$/, '').trim();
            }
        });
    }

    // Run periodically to catch dynamically rendered selects
    var labelInterval = setInterval(function () {
        var selects = document.querySelectorAll('#my-qr-reader select');
        if (selects.length > 0) {
            cleanCameraLabels();
            // Keep observing for changes
            selects.forEach(function (select) {
                new MutationObserver(cleanCameraLabels).observe(select, { childList: true });
            });
            clearInterval(labelInterval);
        }
    }, 500);
});
