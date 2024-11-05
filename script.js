const numberFields = document.querySelectorAll(".number-field");

// biome-ignore lint/complexity/noForEach: <explanation>
numberFields.forEach((field) => {
  const label = field.querySelector("label");
  const wrapper = field.querySelector(".input-wrapper");
  const input = field.querySelector("input");

  input.addEventListener("focus", () => {
    label.style.color = "var(--content-brand)";
    wrapper.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    label.style.color = "";
    wrapper.classList.remove("focused");
  });
});

const form = document.querySelector("form");

const formHeader = document.querySelector("form header");
const label = formHeader.querySelector("label");
const p = formHeader.querySelector("p");
const formFieldset = document.querySelector("fieldset");

const button = document.querySelector("button");
const buttonSpan = button.querySelector("span");
const buttonImg = button.querySelector("img");

const numbersDisplay = document.querySelector(".numbers-display");
numbersDisplay.style.display = "none";

let numbers = [];
let isFirstSubmit = true;
let submitCount = 0;

form.onsubmit = (event) => {
  event.preventDefault();

  submitCount++;

  const quantity = Number.parseInt(document.getElementById("quantity").value);
  const min = Number.parseInt(document.getElementById("min").value);
  const max = Number.parseInt(document.getElementById("max").value);
  const noRepeat = document.getElementById("noRepeat").checked;

  p.innerText = `${submitCount}º resultado`;

  button.style.opacity = "0";
  button.style.visibility = "hidden";

  if (noRepeat && quantity > max - min + 1) {
    seconds = (max - min + 1) * 3.2 + 0.5;

    setTimeout(() => {
      button.style.opacity = "1";
      button.style.visibility = "visible";
    }, seconds * 1000);
  } else {
    seconds = quantity * 3.2 + 0.5;

    setTimeout(() => {
      button.style.opacity = "1";
      button.style.visibility = "visible";
    }, seconds * 1000);
  }

  if (isFirstSubmit) {
    formFieldset.style.display = "none";

    buttonSpan.innerText = "SORTEAR NOVAMENTE";
    buttonImg.src = "assets/icons/replay.svg";
    button.addEventListener("mouseenter", () => {
      buttonImg.src = "assets/icons/replay-hover.svg";
    });
    button.addEventListener("mouseleave", () => {
      buttonImg.src = "assets/icons/replay.svg";
    });

    label.innerText = "RESULTADO DO SORTEIO";
    label.style.marginInline = "auto";

    p.classList.replace("paragraph-medium", "overline");
    p.style.maxWidth = "fit-content";
    p.style.marginInline = "auto";
    p.style.color = "var(--content-secondary)";

    display(quantity, min, max, noRepeat);

    isFirstSubmit = false;
  } else {
    while (numbersDisplay.firstChild) {
      numbersDisplay.firstChild.remove();
    }

    numbersDisplay.style.display = "none";

    display(quantity, min, max, noRepeat);
  }
};

function display(quantity, min, max, noRepeat) {
  numbers = generateNumbers(quantity, min, max, noRepeat);

  numbersDisplay.style.display = "grid";

  if (noRepeat) {
    const available = [];
    for (let i = 0; i < max - min + 1; i++) {
      available.push(min + i);
    }

    const iterations = Math.min(quantity, available.length);

    for (let i = 0; i < iterations; i++) {
      setTimeout(() => {
        const numberDice = document.createElement("div");
        numberDice.classList.add("number-dice");

        const sortedNumber = document.createElement("h3");
        sortedNumber.classList.add("sorted-number");
        sortedNumber.innerText = numbers[i];

        numberDice.append(sortedNumber);
        numbersDisplay.append(numberDice);
      }, i * (1000 * 3.2));
    }
  } else {
    for (let i = 0; i < numbers.length; i++) {
      setTimeout(() => {
        const numberDice = document.createElement("div");
        numberDice.classList.add("number-dice");

        const sortedNumber = document.createElement("h3");
        sortedNumber.classList.add("sorted-number");
        sortedNumber.innerText = numbers[i];

        numberDice.append(sortedNumber);
        numbersDisplay.append(numberDice);
      }, i * (1000 * 3.2));
    }
  }
}

function generateNumbers(quantity, min, max, noRepeat) {
  const numbers = [];

  if (noRepeat) {
    const available = [];
    for (let i = 0; i < max - min + 1; i++) {
      available.push(min + i);
    }

    const iterations = Math.min(quantity, available.length);
    for (let i = 0; i < iterations; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);

      numbers.push(available.splice(randomIndex, 1)[0]);
    }
  } else {
    for (let i = 0; i < quantity; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  }
  return numbers;
}
