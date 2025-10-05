const adContainer = document.getElementById("meu-anuncio");
adContainer.innerHTML = ""; // limpa o anterior

const ad = document.createElement("ins");
ad.className = "adsbygoogle";
ad.style.display = "block";
ad.setAttribute("data-ad-client", "ca-pub-7246422966217785");
ad.setAttribute("data-ad-slot", "1234567890");

adContainer.appendChild(ad);
(adsbygoogle = window.adsbygoogle || []).push({});

const main = document.querySelector("main")
const ciclo = document.querySelector("#ciclo")
const seletor = document.querySelector(".seletor")

const primeiroGrau = document.createElement("div")
const grau1 = document.createElement("span")
grau1.innerText = "1°"
grau1.style = "position:absolute; top: 11rem; left: 1.5rem; font-size: 4rem; font-weight: 600;"
primeiroGrau.style = "width: 20rem; height: 20rem; border-radius: 10rem; border: solid .5rem black; position: absolute; top: -9.5rem; left: 20.1rem;"
primeiroGrau.appendChild(grau1)
seletor.appendChild(primeiroGrau)

let degreesUpdate = 0
let startX = 0
let endX = 0

function girar(sentido) {
    if (sentido === "Esquerda") {
        degreesUpdate -= 30
    } else if (sentido === "Direita") {
        degreesUpdate += 30
    }

    ciclo.style.transform = `rotate(${degreesUpdate}deg)`
}

// --- CONTROLES POR TOQUE (MOBILE) ---
document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].screenX
})

document.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].screenX
    const diff = endX - startX
    const threshold = 50

    if (diff < -threshold) {
        girar("Esquerda")
    } else if (diff > threshold) {
        girar("Direita")
    }
})

// --- CONTROLES POR TECLADO (PC) ---
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        girar("Esquerda")
    } else if (e.key === "ArrowRight") {
        girar("Direita")
    }
})

// --- BOTÕES DE CONTROLE (OPCIONAL) ---
const btns = document.createElement("div")
btns.style = "width: 100%; height: 9rem; padding: 2rem; display: flex; align-items: center; justify-content: space-between; position:absolute; bottom: 0;"

const btnEsquerda = document.createElement("button")
btnEsquerda.textContent = "◀"
btnEsquerda.style = "transform: scale(3); font-size:2rem; border: none; background: none;"

const btnDireita = document.createElement("button")
btnDireita.textContent = "▶"
btnDireita.style = "transform: scale(3); font-size:2rem; border: none; background: none;"

btns.appendChild(btnEsquerda)
btns.appendChild(btnDireita)
main.appendChild(btns)

btnEsquerda.addEventListener("click", () => girar("Esquerda"))
btnDireita.addEventListener("click", () => girar("Direita"))