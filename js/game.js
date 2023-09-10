
const cards = document.querySelector(".cards");
const spanPlayer = document.querySelector(".player")
const timer = document.querySelector(".timer")

let firstCard = "";
let secondCard = "";

const characters = [
  "beth",
  "jerry",
  "jessica",  
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];

const checkEndGame = ()=>{
  const disabledCards = document.querySelectorAll(".disabled-card");
  if(disabledCards.length === 20){
    clearInterval(this.loop)
    alert(`Parabén, ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML} segundos`)
  }
}


const createElements = (tag, className)=>{
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const checkCards = ()=>{
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if(firstCharacter === secondCharacter){

    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();

  }else{

    setTimeout(()=>{      
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";

    },500)
  }
}

const revealCard = ({target})=>{
  if(target.parentNode.className.includes("reveal-card")){
    return;
  }

  if(firstCard === ""){
    
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;

  } else if(secondCard === ""){

    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards()

  }
}

const createCards = (character)=>{
  const card = createElements("div", "card");
  const front = createElements("div", "face front");
  const back = createElements("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;
  
  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character)
  return card;
}

const loadGame = () => {

  const duplicateCharacters = [ ...characters, ...characters ];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() -0.5)

  shuffledArray.forEach((character) => {
    const card = createCards(character);
    cards.appendChild(card);
  });
}

const startTimer = ()=>{
  this.loop = setInterval(()=>{
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime +1;
  },1000);
}

window.onload = ()=>{

  const playerName = localStorage.getItem("player")
  spanPlayer.innerHTML = playerName;
  loadGame();
  startTimer()
}

