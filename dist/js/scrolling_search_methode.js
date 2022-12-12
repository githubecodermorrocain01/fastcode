  let alphaby = document.querySelectorAll(".alphaby")

        alphaby.forEach((alpha) => {
            alpha.addEventListener("click", GoTo)
            alpha.addEventListener("mousemove", GoTo)

            function GoTo() {
                let alphabie = document.querySelectorAll(".alphabie")
                alphabie.forEach((alphab) => {
                    if (alpha.textContent == alphab.textContent) {
                        window.scrollTo({
                            top: alphab.offsetTop,
                            behavior: 'smooth'
                        });
                    } else {
                        return false;
                    }
                })
            }
        })