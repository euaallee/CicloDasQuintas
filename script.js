function carregarAnuncios() {
    const adIds = ["myAdsTop", "myAdsMid", "myAdsBottom"]; // ✅ coloque aqui todos os IDs dos anúncios
    const adSlots = ["7598656207", "9689756633", "9315170356"]; // ✅ use slots reais do AdSense

    adIds.forEach((id, index) => {
        const container = document.getElementById(id);
        if (!container) return; // se o container não existe, pula

        // limpa anúncios anteriores (se houver)
        container.innerHTML = "";
        container.style = "margin: 2rem 0; width: 100%; display: flex; justify-content: center;";

        // cria novo bloco do AdSense
        const ad = document.createElement("ins");
        ad.className = "adsbygoogle";
        ad.style.display = "block";
        ad.setAttribute("data-ad-client", "ca-pub-7246422966217785");
        ad.setAttribute("data-ad-slot", adSlots[index] || adSlots[0]);
        ad.setAttribute("data-ad-format", "auto");
        ad.setAttribute("data-full-width-responsive", "true");

        container.appendChild(ad);

        // inicializa o bloco de anúncio (somente se ainda não tiver carregado)
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.warn("AdSense ainda não carregado ou já inicializado:", e.message);
        }
    });
}

// ✅ Garante que o AdSense carregou antes de tentar renderizar
window.addEventListener("load", () => {
    if (window.adsbygoogle) {
        carregarAnuncios();
    } else {
        // tenta novamente após 1 segundo, se o script ainda não tiver sido carregado
        setTimeout(carregarAnuncios, 1000);
    }
});


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
btns.style = "width: 100%; height: 9rem; padding: 2rem; display: flex; align-items: center; justify-content: space-around; position:absolute;"

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