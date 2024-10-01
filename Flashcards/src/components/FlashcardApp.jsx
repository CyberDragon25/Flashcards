import React, { useState } from 'react';
import Flashcard from './Flashcard';
import '../assets/styles.css';


const FlashcardApp = () => {
  const cardData = [
    { question: "Who is the main character of 'Naruto'?", answer: "Naruto Uzumaki" },
    { question: "What is the name of Luffy's pirate crew?", answer: "Straw Hat Pirates" },
    { question: "Which anime features the character Goku?", answer: "Dragon Ball" },
    { question: "What is the highest-ranked Hunter in 'Hunter x Hunter'?", answer: "Triple Star Hunter" },
    // Add more anime trivia questions here
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Display a random card
  const displayRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    setCurrentCardIndex(randomIndex);
    setShowAnswer(false);
  };

  const currentCard = cardData[currentCardIndex];

  return (
    <div className="app-container">
      <h1>Anime Trivia Flashcards</h1>
      <p>Total Questions: {cardData.length}</p>

      <Flashcard
        question={currentCard.question}
        answer={currentCard.answer}
        showAnswer={showAnswer}
        onClick={() => setShowAnswer(!showAnswer)}
      />

      <button onClick={displayRandomCard}>Next</button>
    </div>
  );
};

export default FlashcardApp;
