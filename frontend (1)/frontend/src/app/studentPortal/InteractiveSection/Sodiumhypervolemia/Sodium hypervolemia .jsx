import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Sodiumhypervolemia = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [slicingIndex, setSlicingIndex] = useState(0);

  const questions = [
    {
      id: 1,
      correctAnswer: "down",
      bottom: "60%",
      left: "3%",
    },
    {
      id: 2,
      correctAnswer: "up",
      left: "9%",
      bottom: "12%",
    },
    {
      id: 3,
      correctAnswer: "down",
      bottom: "55%",
      left: "29%",
    },
    {
      id: 4,
      correctAnswer: "up",
      bottom: "25%",
      left: "35%",
    },
    {
      id: 5,
      correctAnswer: "down",
      bottom: "70%",
      left: "42%",
    },
    {
      id: 6,
      correctAnswer: "down",
      bottom: "60%",
      left: "53%",
    },
    {
      id: 7,
      correctAnswer: "up",
      bottom: "35%",
      left: "60%",
    },
    {
      id: 8,
      correctAnswer: "up",
      bottom: "70%",
      left: "80%",
    },
    {
      id: 9,
      correctAnswer: "down",
      bottom: "12%",
      left: "80%",
    },
  ];
  
  const slicedArray = questions.slice(0, slicingIndex);
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();

  };



  const handleDrop = (e, question) => {
    e.preventDefault();
    setSlicingIndex((prevIndex) => prevIndex + 1);
    console.log(slicingIndex);
    if (draggedItem) {
      const isCorrectAnswer = draggedItem === question.correctAnswer;


      if (isCorrectAnswer) {
        setFeedback('Correct!');

      } else {
        setFeedback('Incorrect!');

      }
      setDraggedItem(null);
    }
  };


  const handleNextQuestion = () => {
    // Increment the current question index
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    // Reset feedback for the new question
    setFeedback('');
  };

  return (
    <div className="flex flex-col ">
      <h1>Drag and Drop Icons</h1>
      {questions.map((question, index) => (
        index === currentQuestionIndex && (
          <div
            key={question.id}
            className="relative"
          >   <div
            className="flex  items-center"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, question)}
          >
              <div className='relative '>
                <img className='relative mb-4  p-4 border border-gray-300 my-4' src="/dragimage6.png" alt="" />
                {
                  slicedArray.map((question, index) => (
        <div key={index} >
          {question.correctAnswer === 'up' && (
            <div
              className={`flex flex-col items-center absolute `} style={{
                bottom: question.bottom,
                left: question.left,
              }}
            >
              <FontAwesomeIcon icon={faArrowUp} size="" className='text-green-600 text-4xl max-lg:text-lg' />

            </div>
          )}
          {question.correctAnswer === 'down' && (
            <div
              className={`flex flex-col items-center absolute `} style={{
                bottom: question.bottom,
                left: question.left,
              }}
            >
              <FontAwesomeIcon icon={faArrowDown} size="" className='text-red-600 text-4xl max-lg:text-lg' />

            </div>
          )}
        </div>
      ))
      }

              </div>
            </div>
            <div className='flex px-2 py-2 '>
              <div
                className="cursor-pointer flex ml-2"
                draggable
                onDragStart={(e) => handleDragStart(e, 'up')}
              >
                <FontAwesomeIcon icon={faArrowUp} size="2x" />
              </div>
              <div
                className="cursor-pointer flex"
                draggable
                onDragStart={(e) => handleDragStart(e, 'down')}
              >
    
                <FontAwesomeIcon icon={faArrowDown} size="2x" />

              </div>
            </div>
            {feedback && <p className="text-green-500">{feedback}</p>}

          </div>
        )
      ))}
    
      {/* Render Next button only if there are more questions */}
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion} className="bg-blue-500 text-white p-2 mx-auto right-0 rounded-md px-8 py-2">
          Next
        </button>
      )}
    </div>
  );
};

export default Sodiumhypervolemia;