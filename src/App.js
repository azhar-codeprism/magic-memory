import { useState, useEffect, useCallback } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardData = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(1);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const onMatch = useCallback(() => {
    resetValues();
    setMoves(moves + 1);
  }, [moves]);

  const onUnmatch = useCallback(() => {
    resetValues();
    setMoves(moves + 1);
  }, [moves]);

  //compare cards
  useEffect(() => {
    function compare() {
      if (choiceOne !== null && choiceTwo !== null) {
        if (choiceOne.src === choiceTwo.src) {
          onMatch();
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
        } else {
          onUnmatch();
        }
      }
    }
    compare();
  }, [choiceOne, choiceTwo, onMatch, onUnmatch]);

  function shuffleCards() {
    const cardsArr = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((cd) => ({ ...cd, id: Math.floor(Math.random() * 100000) }));
    setCards(cardsArr);
    setMoves(1);
  }

  function resetValues() {
    setTimeout(() => {
      setChoiceOne(null);
      setChoiceTwo(null);
    }, 400);
  }
  function handleChoice(cardVal) {
    choiceOne ? setChoiceTwo(cardVal) : setChoiceOne(cardVal);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleFrontClick={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
