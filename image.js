const prompt = document.getElementById("prompt");
const preview = document.getElementById("preview");
const loader = document.getElementById("loader");
const size = document.getElementById("size");
const model = document.getElementById("model");

const generateBtn = document.getElementById("generateBtn");
const regenBtn = document.getElementById("regenBtn");
const downloadBtn = document.getElementById("downloadBtn");

let lastPrompt = "";

function getImageUrl() {

    const imageSize = size.value;
    const selectedModel = model.value;

    return "https://image.pollinations.ai/prompt/" +
        encodeURIComponent(lastPrompt) +
        "?width=" + imageSize +
        "&height=" + imageSize +
        "&model=" + selectedModel;
}

function generateImage() {

    const text = prompt.value.trim();

    if (text === "") {

        alert("Please enter a prompt.");
        return;

    }

    lastPrompt = text;

    loader.style.display = "block";
    loader.innerHTML = "Generating Image...";

    preview.style.display = "none";

    const url = getImageUrl();

    const img = new Image();

    img.onload = function () {

        loader.style.display = "none";

        preview.src = url;
        preview.style.display = "block";

        downloadBtn.href = url;

    };

    img.onerror = function () {

        loader.innerHTML = "❌ Failed to generate image.";

    };

    img.src = url;

}

generateBtn.addEventListener("click", generateImage);

regenBtn.addEventListener("click", function () {

    if (lastPrompt !== "") {

        generateImage();

    }

});

prompt.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        generateImage();

    }

});

preview.addEventListener("click", function () {

    if (!preview.src) return;

    window.open(preview.src, "_blank");

});