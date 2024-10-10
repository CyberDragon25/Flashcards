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
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const currentCard = cardData[currentCardIndex];

  const checkAnswer = () => {
    const correctAnswer = currentCard.answer.trim().toLowerCase();
    const guessedAnswer = userGuess.trim().toLowerCase();

    // Fuzzy matching: accept answer if it's close enough
    if (correctAnswer === guessedAnswer) {
      setFeedback('Correct!');
      setStreak(streak + 1);
      if (streak + 1 > longestStreak) {
        setLongestStreak(streak + 1);
      }
    } else {
      setFeedback('Incorrect!');
      setStreak(0); // reset streak on incorrect answer
    }
    setShowAnswer(true);
  };

  const displayNextCard = () => {
    if (currentCardIndex < cardData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // loop back to the start
    }
    setShowAnswer(false);
    setFeedback('');
    setUserGuess('');
  };

  const displayPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(cardData.length - 1); // go to last card
    }
    setShowAnswer(false);
    setFeedback('');
    setUserGuess('');
  };

  const displayRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    setCurrentCardIndex(randomIndex);
    setShowAnswer(false);
    setFeedback('');
    setUserGuess('');
  };

  const markAsMastered = () => {
    setMasteredCards([...masteredCards, currentCard]);
    // Remove the card from the list of cards
    const remainingCards = cardData.filter((_, index) => index !== currentCardIndex);
    setCurrentCardIndex(0); // Go back to the start of the remaining cards
    setShowAnswer(false);
    setFeedback('');
    setUserGuess('');
  };

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

      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={checkAnswer}>Submit</button>

      <p>{feedback}</p>

      <button onClick={displayPreviousCard}>Back</button>
      <button onClick={displayNextCard}>Next</button>
      <button onClick={displayRandomCard}>Shuffle</button>

      <button onClick={markAsMastered}>Mark as Mastered</button>

      <p>Current Streak: {streak}</p>
      <p>Longest Streak: {longestStreak}</p>

      <h2>Mastered Cards</h2>
      <ul>
        {masteredCards.map((card, index) => (
          <li key={index}>{card.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardApp;
