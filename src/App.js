import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards)
    setTurns(0)
  }

// choice handlers 
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
}

// compare 2 selected cards
useEffect(() => {
  if(choiceOne && choiceTwo){
    if(choiceOne.src === choiceTwo.src){
      console.log('those cards match')
      resetTurn();
    } else {
      console.log('those cards do not match')
      resetTurn();
    }
  } 
}, [choiceOne, choiceTwo])

// Reset choices & increase return
const resetTurn = () => {
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prevTurns => prevTurns + 1)
}


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards} >New Game</button>
      <div className="card-grid">
            {cards.map(card => (
              <SingleCard 
                card={card} 
                key={card.id}
                handleChoice={handleChoice} 
              />
            ))}
      </div>     
    </div>
  );
}

export default App