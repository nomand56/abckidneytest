import React, { useState } from 'react';

export function DragAndDropTextwater (questionTopic, fullAnswer, answers, setAnswers, correctAnswer, imgPath, imgIndex, setImg) {
  const [draggedItem, setDraggedItem] = useState(null);
  const blank = '______';
  const blankSentence = fullAnswer.slice(0, fullAnswer.indexOf(correctAnswer)) + blank + fullAnswer.slice(correctAnswer.length + fullAnswer.indexOf(correctAnswer));

  const [sentence, setSentence] = useState(blankSentence);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerDropped, setAnswerDropped] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, targetArray) => {
    const targetId = parseInt(e.target.getAttribute('data-id'));
    const targetIndex = targetArray.findIndex(item => item.id === targetId);
    const draggedIndex = draggedItem.id - 1;
    const newTargetArray = [...targetArray];
    newTargetArray.splice(targetIndex, 0, draggedItem);
    newTargetArray.splice(draggedIndex, 1);
    setDraggedItem(null);
    setFeedback('');
    if (targetArray === answers) {
      setAnswers(newTargetArray);
    }
  };

  window.handleSentenceDrop = e => {
    setImg(imgPath + imgIndex + "/" + draggedItem.id + ".png")
    // const sentence = e.target;
    const sentence = document.getElementById("sentence");
    if (draggedItem && !userAnswer && !answerDropped) {
      const targetIndex = sentence.textContent.indexOf(blank);
      const newSentence = sentence.textContent.slice(0, targetIndex) + draggedItem.name + sentence.textContent.slice(targetIndex + blank.length);
      setSentence(newSentence);
    }else if(draggedItem && userAnswer && answerDropped){
      const targetIndex = sentence.textContent.indexOf(userAnswer);
      const newSentence = sentence.textContent.slice(0, targetIndex) + draggedItem.name + sentence.textContent.slice(targetIndex + userAnswer.length);
      setSentence(newSentence);
    }

    setUserAnswer(draggedItem.name)
    setFeedback('');
    setAnswerDropped(true);
    setDraggedItem(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect. Try again.');
    }
  };

  return (
    <div className="font-sans">
    <h1 className="m-8 text-xl">{questionTopic}</h1>

    <div className="m-8 text-lg" id="sentence" onDragOver={handleDragOver} onDrop={window.handleSentenceDrop}>
      {sentence}
    </div>

    <h2 className="m-4 text-base">Answer Bank</h2>

    {answers.map(answer => (
      <div
        key={answer.id}
        data-id={answer.id}
        draggable="true"
        onDragStart={e => handleDragStart(e, answer)}
        onDragOver={handleDragOver}
        onDrop={e => handleDrop(e, answer)}
        className="border-solid border-black cursor-pointer bg-gray-300 p-4 m-4 text-xs inline-block shadow-md"
      >
        {answer.name}
      </div>
    ))}

    <form onSubmit={handleSubmit}>
      <button
        className="text-white cursor-pointer bg-primary rounded-lg p-4 mx-auto content-center"
        type="submit"
        disabled={!userAnswer}
      >
        Submit
      </button>
    </form>

    <h3 className="m-2 text-lg p-1">{feedback}</h3>
  </div>
);
}


export default DragAndDropTextwater;