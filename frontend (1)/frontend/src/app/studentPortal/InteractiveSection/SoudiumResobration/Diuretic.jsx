import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const questions = [
  { text: 'Proximal convoluted tubule (PCT)', answers: [ 'Acetazolamide  '] },
  { text: 'Distal convoluted tubule (DCT)', answers: ['Thiazide & thiazide-like diuretics  '] },
  { text: 'Thick ascending loop of Henle(TAHL)', answers: ['Loop Diuretics'] },
  { text: 'Cortical collecting & connecting duct (CCD)', answers: ['Amiloride & triamterene  ' ,'MRA'  ] },
];

const Diuretic = () => {
  const initialQuestionState = 0;
  const initialAnswerIndexState = 0;
  const initialSelectedAnswersState = Array.from({ length: questions.length }, () => Array());
  const initialFeedbackState = '';
  const initialCompletedAnswersState = [];
  const initialQuizCompletedState = false;

  const [activeQuestion, setActiveQuestion] = useState(initialQuestionState);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(initialAnswerIndexState);
  const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswersState);
  const [feedback, setFeedback] = useState(initialFeedbackState);
  const [completedAnswers, setCompletedAnswers] = useState(initialCompletedAnswersState);
  const [quizCompleted, setQuizCompleted] = useState(initialQuizCompletedState);



  useEffect(() => {
    const currentAnswers = getStoredAnswers();
    const allCorrect = currentAnswers.every(answer => answer.trim() !== '' && answer === questions[activeQuestion].answers[currentAnswers.indexOf(answer)]);
    if (allCorrect) {
        handleNextQuestion();
    }
}, [selectedAnswers]);

const handleDragStart = (e, answer) => {
    e.dataTransfer.setData('text/plain', answer);
};

const handleDrop = (e) => {
    e.preventDefault();

    const draggedAnswer = e.dataTransfer.getData('text/plain');
    const correctAnswer = questions[activeQuestion].answers[currentAnswerIndex];

    if (draggedAnswer === correctAnswer) {
        setFeedback('Correct!');
        setSelectedAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[activeQuestion][currentAnswerIndex] = draggedAnswer;
            return newAnswers;
        });

        if (currentAnswerIndex === questions[activeQuestion].answers.length - 1) {
            setFeedback('All Correct!'); // Do not automatically advance here
        } else {
            setCurrentAnswerIndex((prevIndex) => prevIndex + 1);
        }
    } else {
        toast.error('Incorrect answer! Please try again.');
        setFeedback('Incorrect!');
    }
};

const handleInputChange = (e, index) => {
    const enteredAnswer = e.target.value;

    setSelectedAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[activeQuestion][index] = enteredAnswer;
        return newAnswers;
    });
};

const handleDragOver = (e) => {
    e.preventDefault();
};

const handleImageDrop = (e) => {
    e.preventDefault();

    const draggedAnswer = e.dataTransfer.getData('text/plain');
    const correctAnswer = questions[activeQuestion].answers[currentAnswerIndex];

    if (draggedAnswer === correctAnswer) {
        setFeedback('Correct!');
        setSelectedAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[activeQuestion][currentAnswerIndex] = draggedAnswer;
            return newAnswers;
        });

        if (currentAnswerIndex === questions[activeQuestion].answers.length - 1) {
            setFeedback('All Correct!'); // Do not automatically advance here
        } else {
            setCurrentAnswerIndex((prevIndex) => prevIndex + 1);
        }
    } else {
        setFeedback('Incorrect!');

    }
};

const handleAnswerClick = (answer) => {
    const correctAnswer = questions[activeQuestion].answers[currentAnswerIndex];

    if (answer === correctAnswer) {
        setFeedback('Correct!');
        setSelectedAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[activeQuestion][currentAnswerIndex] = answer;
            return newAnswers;
        });

        if (currentAnswerIndex === questions[activeQuestion].answers.length - 1) {
            setFeedback('All Correct!');
        } else {
            setCurrentAnswerIndex((prevIndex) => prevIndex + 1);
        }
    } else {
        setFeedback('Incorrect!');
        toast.error('Incorrect answer! Please try again.');

    }
};

const handleNextQuestion = () => {
    const currentAnswers = getStoredAnswers();

    if (currentAnswers.every(answer => answer.trim() !== '')) {
        if (feedback === 'All Correct!') {
            setCompletedAnswers((prevCompletedAnswers) => [
                ...prevCompletedAnswers,
                { question: questions[activeQuestion].text, answers: currentAnswers },
            ]);

            if (activeQuestion < questions.length - 1) {
                setActiveQuestion((prevQuestion) => prevQuestion + 1);
                setCurrentAnswerIndex(initialAnswerIndexState);
                setFeedback(initialFeedbackState);
            } else {
                setQuizCompleted(true);
            }
        } else {
            setFeedback('Please fill in all answers correctly before moving to the next question.');
        }
    } else {
        setFeedback('Please fill in all answers before moving to the next question.');
    }
};


  const handleRestartQuiz = () => {
    setActiveQuestion(initialQuestionState);
    setCurrentAnswerIndex(initialAnswerIndexState);
    setSelectedAnswers(initialSelectedAnswersState);
    setFeedback(initialFeedbackState);
    setCompletedAnswers(initialCompletedAnswersState);
    setQuizCompleted(initialQuizCompletedState);
  };

   
  
  

  const getInputPosition = (questionIndex) => {
    const position = questionIndex % 4;
    switch (position) {
      case 0: // Top Left
        return 'top-56 left-10';
      case 1: // Top Right
        return 'top-48 right-16';
      case 2: // Bottom Left
        return 'bottom-24 left-6';
      case 3: // Bottom Right
        return 'bottom-20 right-16 ';
      default:
        return '';
    }
  };

  const getStoredAnswers = () => {
    return selectedAnswers[activeQuestion] || Array(questions[activeQuestion].answers.length).fill('');
  };
  console.log(getStoredAnswers());
  const getDivPostions = (questionIndex) => {
    const position = questionIndex % 4;
    switch (position) {
      case 0: // Top Left
        return 'top-80 left-96 ';
      case 1: // Top Right
        return 'bottom-44  right-16';
      case 2: // Bottom Left
        return '-bottom-24 left-96';
      case 3: // Bottom Right
        return 'top-1/2 right-16 ';
      default:
        return '';
    }
  };
  return (
    <div className="flex flex-col items-center mt-8 ">
        {/* <div>{getStoredAnswers().join(', ')}</div> */}
        {quizCompleted ? (
        <>
          <div className="mt-4 text-green-500  font-bold">Congratulations! Quiz completed!</div>
          <button onClick={handleRestartQuiz} className="mt-4 flex p-2 bg-blue-500 text-white rounded-md">
            Restart Quiz
          </button>
        </>
      ) : (

        <>
        <div className="grid grid-rows-[auto, auto, auto] gap-4 lg:mb-4  align-middle justify-center">
    <div className="row-span-1    question-card bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 shadow-md rounded-md align-middle justify-center">
      <p className="text-lg align-middle justify-center">Drag and drop the diuretic to the correct segment of the nephron

</p>
    </div>
    </div>
      <div className="relative">
        <img
          src="/dragimage3.png"
          alt="Central Image"
          className="w-auto h-auto mb-4"
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
        />
        <div className={`absolute max-lg:relative flex flex-col justify-center items-center ${getInputPosition(activeQuestion)}`}>
        {getStoredAnswers().map((answer, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                disabled
                value={answer || ''}
                onChange={(e) => handleInputChange(e, index)}
                className={` p-2 font-bold ${
                  feedback === 'Correct!' ? 'bg-green-200' : feedback === 'Incorrect!' ? 'bg-red-200' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="question-container">
        <div className='text-center text-xl font-bold mb-2'>Answer</div>

        {questions.map((question, index) => (
          <div key={index} className="question">
            {index === activeQuestion && (
              <div className="bg-blue-500  p-2 text-white rounded-md mb-4">
                {question.text}
              </div>
            )}
          <div className="answer-container flex flex-1 max-lg:grid max-lg:flex-row">
  {question.answers.map((answer, ansIndex) => (
    <div
      key={ansIndex}
      className="m-2 answer shadow-md px-2 py-2 cursor-pointer flex-1"
      draggable
      onDragStart={(e) => handleDragStart(e, answer)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => handleAnswerClick(answer)}
    >
      {answer}
    </div>
  ))}
</div>

          </div>
        ))}
      </div>
      <div className="completed-answers-container mt-4">
        <h2 className="text-xl font-bold mb-2">Completed Answers</h2>
        {completedAnswers.map((completedAnswer, index) => (
          <div
            key={index}
            className={`absolute max-lg:hidden w-72 bg-green-200 rounded-lg flex flex-col  justify-center items-center ${getDivPostions(index)}`}
          >
            <form>
              {completedAnswer.answers.map((answer, ansIndex) => (
                <div key={ansIndex} className="completed-answer-item">
                  <label htmlFor={`question_${index}_answer_${ansIndex}`} className="sr-only">
                    Answer:
                  </label>
                  <input
              disabled

                    type="text"
                    id={`question_${index}_answer_${ansIndex}`}
                    value={answer}
                    readOnly
                    className="completed-answer-input bg-green-200  py-2"
                  />
                </div>
              ))}
            </form>
          </div>
        ))}
      </div>

      <button onClick={handleNextQuestion} className="mt-4 flex p-2 right-0 bg-blue-500 text-white rounded-md">
      Next  <FaArrowRight className="ml-2" />
  
</button>
</>
      )}

    </div>
  );
};

export default Diuretic;
