 const message = [documents.html]
        const speed = 20
        let textPosition = 0;
    function typewriter() {
        document.querySelector("#message").innerHTML = message[0].substring(0, textPosition) + '<span>\u25AE</span>'
        if (textPosition++ != message[0].length)
            setTimeout(typewriter, speed)
    }

    window.addEventListener("load", typewriter)