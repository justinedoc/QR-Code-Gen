"use strict";
const mainSection = document.querySelector("main");
const loadingEl = document.querySelector(".loading");
const codeEl = document.querySelector(".code");
let counter = 0;

const startGen = (input, btn, btnDownload) => {
  const inputBox = document.getElementById(input);
  const generateBtn = document.getElementById(btn);
  const downloadBtn = document.getElementById(btnDownload);

  inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sliderAnim();
      generateCode(inputBox.value);
    }
  });

  generateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    sliderAnim();
    generateCode(inputBox.value);
  });

  downloadBtn.addEventListener("click", () => {
    downloadCode(inputBox.value);
  });
};
startGen("inputBox", "generateBtn", "downloadBtn");

const sliderAnim = () => {
  mainSection.classList.add("generating");

  const loading = setInterval(() => {
    counter++;
    if (counter === 80) {
      loadingEl.classList.add("hidden");
      clearInterval(loading);
      counter = 0;
      codeEl.classList.remove("hidden");
    }
  }, 50);
};

const generateCode = (value) => {
  const link = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${value}`;
  document.getElementById("QR_CODE").src = link;
};

const downloadCode = (value) => {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${value}`;

  fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      let downloadLink = URL.createObjectURL(data);
      let aTag = document.createElement("a");
      aTag.href = downloadLink;
      let filename = prompt("save file as?");
      filename
        ? (aTag.download = filename)
        : (aTag.download = `${value}_QR_Code`);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    })
    .catch((err) => {
      console.log(err);
      document.querySelector(".error").style.display = "block";
    });
};
