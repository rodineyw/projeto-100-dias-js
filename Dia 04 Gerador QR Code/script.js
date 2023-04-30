const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const ligth = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizer = document.querySelector(".sizer");

dark.addEventListener("input", handleDarkColor);
ligth.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("input", handleSize);
shareBtn.addEventListener("input", hendleSahre);

const defaultUrl = "https://youtube.com/roodart_";
let colorLight = "#fff",
    colorDark = "#000",
    size = 300;

function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}    

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}

async function generateQRCode() {
    qrContainer.innerHTML = "";
    new generateQRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await revolveDataUrl() ;
}

async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolvedataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Seu navegador não tem suporte para Compartilhar.");
        }
    }, 100);
}

function handleSize(e) {
    size = e.target.value;
    generateQRCode();
}

function resolvedataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
generateQRCode();