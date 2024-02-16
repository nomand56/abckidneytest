/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

const QuizFront = ({ data }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if the selected option is correct
    if (selectedOption === data[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question
    setSelectedOption(null);
    if (currentQuestion + 1 < data.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className={classNames('bg-white bg-gradient-to-r from-blue-400 to-blue-500 p-6 rounded-md shadow-md')}>
      {quizCompleted ? (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-md shadow-md text-white">
          <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
          <p>Your Score: {score} out of {data.length}</p>
          <button
            className="bg-white text-blue-500 py-2 px-4 mt-4 rounded-md shadow-md hover:bg-blue-500 hover:text-white"
            onClick={resetQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h1>
          <p className="text-lg mb-4">{data[currentQuestion].question}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={classNames('relative py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition duration-300', {
                  'bg-blue-500 text-white': selectedOption === option,
                  'bg-gray-300': selectedOption !== option,
                })}
                onClick={() => handleOptionSelect(option)}
              >
                {selectedOption === option && (
                  <div className="absolute top-0 right-0 m-2">
                    <FaCheck />
                  </div>
                )}
                {option}
              </button>
            ))}
          </div>
          <button
            className={classNames('py-2 px-4 rounded-md shadow-md transition duration-300 my-5', {
              'bg-gray-400 cursor-not-allowed': selectedOption === null,
              'bg-blue-500 hover:bg-blue-600 text-white': selectedOption !== null,
            })}
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
          >
            {currentQuestion + 1 === data.length ? 'Finish Quiz' : 'Next'}
            <FaArrowRight className="ml-2" />
          </button>
        </>
      )}
    </div>
  );
};

QuizFront.propTypes = {
  data: PropTypes.array.isRequired,
};

export default QuizFront;
