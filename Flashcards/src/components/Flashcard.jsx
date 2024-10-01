import React from 'react';

const Flashcard = ({ question, answer, showAnswer, onClick }) => {
  return (
    <div className="flashcard" onClick={onClick}>
      {showAnswer ? <p>{answer}</p> : <p>{question}</p>}
    </div>
  );
};

export default Flashcard;
