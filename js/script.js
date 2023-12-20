document.addEventListener("DOMContentLoaded", function () {
  let btnStart = document.querySelector(".btnStart");
  let btnStop = document.querySelector(".btnStop");
  let btnReset = document.querySelector(".btnReset");
  let contenu = document.querySelector(".container");
  let numberOfPoints = 0;

  btnStart.addEventListener("click", function () {
    Game();
  });

  btnStop.addEventListener("click", function () {
    let images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.remove();
    });
    let points = document.querySelector(".points");
    points.innerHTML = "";
    numberOfPoints = 0;
  });

  btnReset.addEventListener("click", function () {
    if (contenu.innerHTML !== "") {
      Game();
      numberOfPoints = 0;
    } else {
      alert("Vous avez meme pas commencé à jouer vous voulez deja reset !");
    }
  });

  function Game() {
    if (contenu.innerHTML !== "") {
      contenu.innerHTML = "";
    }
    let points = document.querySelector(".points");
    points.innerHTML = numberOfPoints + " points";
    drawRandomCard();

    let cards = document.querySelectorAll("img");
    let firstCard = null;
    let secondCard = null;

    cards.forEach((card) => {
      card.addEventListener("click", function () {
        if (card.classList.contains("found")) {
          return;
        }
        if (firstCard === null) {
          firstCard = card;
          firstCard.classList.remove("hidden");
          firstCard.classList.add("active");
        } else if (secondCard === null) {
          secondCard = card;
          secondCard.classList.remove("hidden");
          secondCard.classList.add("active");
        }
        if (firstCard !== null && secondCard !== null) {
          if (firstCard.src === secondCard.src) {
            firstCard.classList.add("found");
            secondCard.classList.add("found");
            firstCard.classList.remove("active");
            secondCard.classList.remove("active");
            firstCard = null;
            secondCard = null;
            numberOfPoints += 100;
            points.innerHTML = numberOfPoints + " points";
          } else {
            setTimeout(function () {
              firstCard.classList.remove("active");
              secondCard.classList.remove("active");
              firstCard.classList.add("hidden");
              secondCard.classList.add("hidden");
              firstCard = null;
              secondCard = null;
            }, 1000);
          }
        }
      });
    });
  }

  function drawRandomCard() {
    const cardTypes = [
      "../asset/img/1.webp",
      "../asset/img/2.webp",
      "../asset/img/3.png",
      "../asset/img/4.png",
      "../asset/img/5.png",
      "../asset/img/6.png",
    ];

    let cards = [];

    for (let i = 0; i < 2; i++) {
      cards = cards.concat(cardTypes);
    }

    cards = melangeCard(cards);

    for (let i = 0; i < 12; i++) {
      let image = document.createElement("img");
      image.src = cards[i];
      image.classList.add(`image${i}`);
      contenu.appendChild(image);
      setTimeout(function () {
        image.classList.add("hidden");
      }, 2000);
    }
  }

  function melangeCard(cards) {
    let currentIndex = cards.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
    return cards;
  }
});
