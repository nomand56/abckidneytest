  import React, { useState } from 'react';

  export function DragAndDropText (questionTopic, fullAnswer, answers, setAnswers, correctAnswer, imgPath, imgIndex, setImg,setUserScore) {
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
    const handleAnswerClick = (clickedAnswer) => {
      setImg(imgPath + imgIndex + "/" + clickedAnswer.id + ".png");
    
      const targetIndex = sentence.indexOf(blank);
      const newSentence =
        sentence.slice(0, targetIndex) +
        clickedAnswer.name +
        sentence.slice(targetIndex + blank.length);
    
      setUserAnswer(clickedAnswer.name);
      setSentence(newSentence);
      setFeedback('');
      setAnswerDropped(true);
      setDraggedItem(clickedAnswer);
    };
    

    window.handleSentenceDrop = e => {
      setImg(imgPath + imgIndex + "/" + draggedItem.id + ".png");
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

    const handleSubmit = (e) => {
      e.preventDefault();
      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        // Update the score when the answer is correct
        setUserScore((prevScore) => prevScore + 1);
        setFeedback(fullAnswer);
      } else {
        setFeedback('Incorrect. Correct Answer is : ' + fullAnswer);
      }
    };
    return (
      <div className="font-sans align-middle justify-center">
      <h1 className="m-8 text-xl">{questionTopic}</h1>

    <div className="m-8 text-lg hidden" id="sentence" onDragOver={handleDragOver} onDrop={window.handleSentenceDrop}>
    {sentence}
  </div>



  {answers.map(answer => (
    <div
  key={answer.id}
  data-id={answer.id}
  draggable="true"
  onClick={() => handleAnswerClick(answer)}
  onDragStart={(e) => handleDragStart(e, answer)}
  onDragOver={handleDragOver}
  onDrop={(e) => handleDrop(e, answer)}
  className="border-solid border-black cursor-pointer font-bold pb-10 bg-blue-200 p-4 m-4 text-xs inline-block shadow-md transition-transform transform hover:scale-105"
  style={{ width: '150px', height: '50px' }} 
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


  export default DragAndDropText;