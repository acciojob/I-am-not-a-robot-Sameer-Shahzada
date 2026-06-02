const images = ["img1", "img2", "img3", "img4", "img5"];

// Pick one image to duplicate
const duplicate = images[Math.floor(Math.random() * images.length)];
const allImages = [...images, duplicate];

// Shuffle
allImages.sort(() => Math.random() - 0.5);

const container = document.getElementById("image-container");

let selectedTiles = [];

// Create images
allImages.forEach((imgClass) => {
  const img = document.createElement("img");

  img.classList.add(imgClass);
  img.dataset.value = imgClass;

  img.addEventListener("click", () => {
    if (
      selectedTiles.includes(img) ||
      selectedTiles.length >= 2
    ) {
      return;
    }

    img.classList.add("selected");
    selectedTiles.push(img);

    showResetButton();

    if (selectedTiles.length === 2) {
      showVerifyButton();
    }
  });

  container.appendChild(img);
});

function showResetButton() {
  if (document.getElementById("reset")) return;

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset";
  resetBtn.textContent = "Reset";

  resetBtn.addEventListener("click", resetSelection);

  document.querySelector("main").appendChild(resetBtn);
}

function showVerifyButton() {
  if (document.getElementById("verify")) return;

  const verifyBtn = document.createElement("button");
  verifyBtn.id = "verify";
  verifyBtn.textContent = "Verify";

  verifyBtn.addEventListener("click", verifySelection);

  document.querySelector("main").appendChild(verifyBtn);
}

function verifySelection() {
  let para = document.getElementById("para");

  if (!para) {
    para = document.createElement("p");
    para.id = "para";
    document.querySelector("main").appendChild(para);
  }

  if (
    selectedTiles[0].dataset.value ===
    selectedTiles[1].dataset.value
  ) {
    para.textContent =
      "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  const verifyBtn = document.getElementById("verify");
  if (verifyBtn) {
    verifyBtn.remove();
  }
}

function resetSelection() {
  selectedTiles.forEach((img) =>
    img.classList.remove("selected")
  );

  selectedTiles = [];

  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const para = document.getElementById("para");

  if (resetBtn) resetBtn.remove();
  if (verifyBtn) verifyBtn.remove();
  if (para) para.remove();
}