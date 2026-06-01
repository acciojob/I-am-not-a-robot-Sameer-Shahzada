//your code here
// Images
const images = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5"
];

// Random duplicate
const duplicate = images[Math.floor(Math.random() * images.length)];

let allImages = [...images, duplicate];

// Shuffle
allImages.sort(() => Math.random() - 0.5);

const container = document.getElementById("image-container");
const heading = document.getElementById("h");

heading.innerText =
  "Please click on the identical tiles to verify that you are not a robot.";

let selected = [];

// Render images
allImages.forEach((imgName, index) => {
  const img = document.createElement("img");

  img.src = `${imgName}.jpg`;
  img.dataset.value = imgName;

  // Required classes
  img.classList.add("img");

  if (index === 0) img.classList.add("img1");
  if (index === 1) img.classList.add("img2");
  if (index === 2) img.classList.add("img3");
  if (index === 3) img.classList.add("img4");
  if (index === 4) img.classList.add("img5");
  if (index === 5) img.classList.add("img6");

  img.addEventListener("click", function () {
    if (selected.includes(this) || selected.length === 2) return;

    this.classList.add("selected");
    selected.push(this);

    showReset();

    if (selected.length === 2) {
      showVerify();
    }
  });

  container.appendChild(img);
});

function showReset() {
  if (document.getElementById("reset")) return;

  const btn = document.createElement("button");
  btn.id = "reset";
  btn.innerText = "Reset";

  btn.addEventListener("click", () => {
    location.reload();
  });

  document.body.appendChild(btn);
}

function showVerify() {
  if (document.getElementById("verify")) return;

  const btn = document.createElement("button");
  btn.id = "verify";
  btn.innerText = "Verify";

  btn.addEventListener("click", verifyTiles);

  document.body.appendChild(btn);
}

function verifyTiles() {
  const result = document.createElement("p");
  result.id = "para";

  if (
    selected[0].dataset.value ===
    selected[1].dataset.value
  ) {
    result.innerText =
      "You are a human. Congratulations!";
  } else {
    result.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  document.body.appendChild(result);

  const verifyBtn = document.getElementById("verify");
  if (verifyBtn) verifyBtn.remove();
}