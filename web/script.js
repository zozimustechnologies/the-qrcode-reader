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
        var resultEl = document.getElementById("result");
        resultEl.innerHTML = '';

        var label = document.createElement('span');
        label.textContent = 'The result is: ';
        resultEl.appendChild(label);

        var isUrl = false;
        try {
            var url = new URL(decodeText);
            if (url.protocol === 'http:' || url.protocol === 'https:') {
                isUrl = true;
                var link = document.createElement('a');
                link.href = url.href;
                link.textContent = url.href;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                resultEl.appendChild(link);
            }
        } catch (e) {}

        if (!isUrl) {
            var text = document.createElement('span');
            text.textContent = decodeText;
            resultEl.appendChild(text);
        }

        var copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.title = 'Copy to clipboard';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(decodeText).then(function () {
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(function () {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 1500);
            });
        });
        resultEl.appendChild(copyBtn);
    }
 
    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbox: 250 }
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
