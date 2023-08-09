const generateButton = document.getElementById("generateButton");
const colorPalette = document.getElementById("colorPalette");
const colorInfo = document.getElementById("colorInfo");

generateButton.addEventListener("click", generatePalette);

function generatePalette() {
  colorPalette.innerHTML = "";
  colorInfo.innerHTML = "";
  for (let i = 0; i < 5; i++) {
      const color = generateRandomColor();
      const colorBox = document.createElement("div");
      colorBox.style.backgroundColor = color;
      colorBox.className = "color-box";
      colorBox.addEventListener("click", () => displayColorInfo(color));
      colorPalette.appendChild(colorBox);
  }
  colorInfo.innerHTML = "";
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function displayColorInfo(color) {
  const hexCode = color;
  const rgbCode = hexToRgb(color);
  const cmykCode = rgbToCmyk(...rgbCode);
  
  colorInfo.innerHTML = `
      <div class="color-card">
          <div class="color-box" style="background-color: ${color};"></div>
          <div class="color-details">
              <p><strong>Hex:</strong> <span class="clickable" onclick="copyToClipboard('${hexCode}')">${hexCode}</span></p>
              <p><strong>RGB:</strong> <span class="clickable" onclick="copyToClipboard('${rgbCode.join(', ')}')">${rgbCode.join(", ")}</span></p>
              <p><strong>CMYK:</strong> <span class="clickable" onclick="copyToClipboard('${cmykCode.join(', ')}')">${cmykCode.join(", ")}</span></p>
          </div>
      </div>
  `;
}

function copyToClipboard(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // Agrega un alert para indicar que el texto se ha copiado
  alert("Código copiado al portapapeles: " + text);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function rgbToCmyk(r, g, b) {
    const c = 1 - r / 255;
    const m = 1 - g / 255;
    const y = 1 - b / 255;
    const k = Math.min(c, m, y);
    return [
        Math.round(c * 100),
        Math.round(m * 100),
        Math.round(y * 100),
        Math.round(k * 100)
    ];
}