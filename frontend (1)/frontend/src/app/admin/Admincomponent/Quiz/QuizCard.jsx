/* eslint-disable react/prop-types */

const QuizCard = ({
  quizData,
  selectedOption,
  onOptionChange,
  onNext,
  showAnswer,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-lg font-semibold">{quizData.name}</h2>
      <p className="text-gray-600">{quizData.difficult}</p>
      <p className="mt-2">{quizData.question}</p>
      <p className="font-semibold mt-2">Options:</p>

      <ul>
        {quizData.options.map((option, index) => (
          <li key={index}>
            <label
              className={`block ${selectedOption === option ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={onOptionChange}
                disabled={showAnswer}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>

      {showAnswer && (
        <div>
          <p className="font-semibold mt-4">Correct Answer:</p>
          <p>{quizData.answer}</p>
        </div>
      )}
      {!showAnswer && (
        <button
          onClick={onNext}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default QuizCard;
