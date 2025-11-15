(function(){

    // --- WebViewer LOCK ---
    if (!navigator.userAgent.includes("AndroidWebView") &&
        !navigator.userAgent.includes("Kodular") &&
        !navigator.userAgent.includes("AppInventor")) {

        document.body.innerHTML = "";
        alert("Unauthorized environment.");
        return;
    }

    // --- AES simple decrypt (custom lightweight method) ---
    window.decryptData = function(encoded, key="PX19!@#LOCK") {
        let data = atob(encoded);
        let out = "";
        for(let i=0;i<data.length;i++){
            out += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return out;
    };

    // Fetch encrypted puzzles
    window.loadEncryptedPuzzles = async function() {
        let res = await fetch("puzzles.enc");
        let txt = await res.text();
        let decrypted = decryptData(txt);
        return JSON.parse(decrypted);
    };

})();
