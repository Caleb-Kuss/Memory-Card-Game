`use strict`;
//elements taken from the HTML
const section = document.querySelector(`section`);
const playerLivesCount = document.querySelector(`span`);
let playerLives = 6;

//Linking text
playerLivesCount.textContent = playerLives;

//generating data for cards
const getData = () => [
  { imgSrc: `./img/lake.webp`, name: "lake" },
  { imgSrc: `./img/mountains.webp`, name: "mountains" },
  { imgSrc: `./img/sea.webp`, name: "sea" },
  { imgSrc: `./img/sky.jpg`, name: "sky" },
  { imgSrc: `./img/tree.webp`, name: "tree" },
  { imgSrc: `./img/waterfall.webp`, name: "waterfall" },
  { imgSrc: `./img/lake.webp`, name: "lake" },
  { imgSrc: `./img/mountains.webp`, name: "mountains" },
  { imgSrc: `./img/sea.webp`, name: "sea" },
  { imgSrc: `./img/sky.jpg`, name: "sky" },
  { imgSrc: `./img/tree.webp`, name: "tree" },
  { imgSrc: `./img/waterfall.webp`, name: "waterfall" },
];

//randomize cards
const randomize = () => {
  const cardData = getData();
  //function that randomizes the cards
  cardData.sort(() => Math.random() - 0.5);
  //------------------------------------
  return cardData;
};
//generating cards function
const cardGenerator = () => {
  const cardData = randomize();
  //generate HTML
  cardData.forEach((item) => {
    const card = document.createElement(`div`);
    const face = document.createElement(`img`);
    const back = document.createElement(`div`);
    card.classList = `card`;
    face.classList = `face`;
    back.classList = `back`;
    //attach pictures to the cards
    face.src = item.imgSrc;
    card.setAttribute(`name`, item.name);
    // attaching cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener(`click`, (e) => {
      card.classList.toggle(`toggleCard`);
      checkCards(e);
    });
  });
  console.log(cardData);
};

//checking cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add(`flipped`);
  const flippedCards = document.querySelectorAll(`.flipped`);
  const toggledCard = document.querySelectorAll(`.toggleCard`);
  console.log(clickedCard);
  //logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log(`Match`);
      flippedCards.forEach((card) => {
        card.classList.remove(`flipped`);
        card.style.pointerEvents = `none`;
      });
    } else {
      console.log(`Wrong`);
      flippedCards.forEach((card) => {
        card.classList.remove(`flipped`);
        setTimeout(() => card.classList.remove(`toggleCard`), 1000);
      });
      playerLives--;
      setTimeout(() => (playerLivesCount.textContent = playerLives), 1000);
      if (playerLives === 0) {
        setTimeout(() => restart(`☹ Better luck next time ☹`), 999);
      }
    }
    if (toggledCard.length === 12) {
      setTimeout(() => restart(`🎉 You have Won!! 🥳`), 999);
    }
  }
};

//restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(`.face`);
  let cards = document.querySelectorAll(`.card`);
  section.style.pointerEvents = `none`;
  cardData.forEach((item, index) => {
    cards[index].classList.remove(`toggleCard`);
    //re-randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = `all`;
      faces[index].src = item.imgSrc;
      cards[index].setAttribute(`name`, item.name);
      section.style.pointerEvents = `all`;
    }, 3500);
  });
  setTimeout(
    () => ((playerLives = 6), (playerLivesCount.textContent = playerLives)),
    2050
  );
  setTimeout(() => window.alert(text));
};

cardGenerator();
