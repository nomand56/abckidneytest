import { useState } from "react";
import { NephronDnD1_1 } from "./NephronBox/NephronDn.jsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import nephron from "../../../../core/assets/nephron1DnD.jpg";
import nephron1 from "../../../../core/assets/nephron2DnD.jpg";
const questionData = [
  {
    questionTopic: "Drag and Drop answer to the corresponding box",
    correctAnswer: "Efferent Arteriole",
    fullAnswer: "The part located at box 1 is the Efferent Arteriole.",
    answers: [
      { id: 1, name: "Glomerulus" },
      { id: 2, name: "Afferent Arteriole" },
      { id: 3, name: "Efferent Arteriole" },
      { id: 4, name: "Bowman’s Capsule" },
    ],
    img: "/nephron1DnD/",
  },
  {
    questionTopic:  "Drag and Drop answer to the corresponding box",
    correctAnswer: "Bowman’s Capsule",
    fullAnswer: "The part located at box 2 is the Bowman’s Capsule.",
    answers: [
      { id: 1, name: "Glomerulus" },
      { id: 2, name: "Afferent Arteriole" },
      { id: 3, name: "Efferent Arteriole" },
      { id: 4, name: "Bowman’s Capsule" },
    ],
    img: "/nephron1DnD/",
  },
  {
    questionTopic: "Drag and Drop answer to the corresponding box",
    correctAnswer: "Glomerulus",
    fullAnswer: "The part located at box 3 is the Glomerulus.",
    answers: [
      { id: 1, name: "Glomerulus" },
      { id: 2, name: "Afferent Arteriole" },
      { id: 3, name: "Efferent Arteriole" },
      { id: 4, name: "Bowman’s Capsule" },
    ],
    img: "/nephron1DnD/",
  },
  {
    questionTopic:  "Drag and Drop answer to the corresponding box",
    correctAnswer: "Afferent Arteriole",
    fullAnswer: "The part located at box 4 is the Afferent Arteriole.",
    answers: [
      { id: 1, name: "Glomerulus" },
      { id: 2, name: "Afferent Arteriole" },
      { id: 3, name: "Efferent Arteriole" },
      { id: 4, name: "Bowman’s Capsule" },
    ],
    img: "/nephron1DnD/",
  },

  //   {
  //     questionTopic: "Nephron Microanatomy 2-1",
  //     correctAnswer: "Proximal Convoluted Tubule",
  //     fullAnswer: "The part located at box 1 is the Proximal Convoluted Tubule.",
  //     answers: [
  //       { id: 1, name: "Cortical Collecting Duct" },
  //       { id: 2, name: "Medullary Collecting Duct" },
  //       { id: 3, name: "Proximal Convoluted Tubule" },
  //       { id: 4, name: "Distal Convoluted Tubule" },
  //       { id: 5, name: "Thin Descending Loop of Henle" },
  //       { id: 6, name: "Thick Ascending Loop of Henle" },
  //     ],
  //     img: nephron1,
  //   },
  //   {
  //     questionTopic: "Nephron Microanatomy 2-2",
  //     correctAnswer: "Distal Convoluted Tubule",
  //     fullAnswer: "The part located at box 2 is the Distal Convoluted Tubule.",
  //     answers: [
  //       { id: 1, name: "Cortical Collecting Duct" },
  //       { id: 2, name: "Medullary Collecting Duct" },
  //       { id: 3, name: "Proximal Convoluted Tubule" },
  //       { id: 4, name: "Distal Convoluted Tubule" },
  //       { id: 5, name: "Thin Descending Loop of Henle" },
  //       { id: 6, name: "Thick Ascending Loop of Henle" },
  //     ],
  //     img: nephron1,
  //   },
  //   {
  //     questionTopic: "Nephron Microanatomy 2-3",
  //     correctAnswer: "Proximal Convoluted Tubule",
  //     fullAnswer: "The part located at box 3 is the Proximal Convoluted Tubule",
  //     answers: [
  //       { id: 1, name: "Cortical Collecting Duct" },
  //       { id: 2, name: "Medullary Collecting Duct" },
  //       { id: 3, name: "Proximal Convoluted Tubule" },
  //       { id: 4, name: "Distal Convoluted Tubule" },
  //       { id: 5, name: "Thin Descending Loop of Henle" },
  //       { id: 6, name: "Thick Ascending Loop of Henle" },
  //     ],
  //     img: nephron1,
  //   },
  //   {
  //     questionTopic: "Nephron Microanatomy 2-4",
  //     correctAnswer: "Medullary Collecting Duct",
  //     fullAnswer: "The part located at box 4 is the Medullary Collecting Duct",
  //     answers: [
  //       { id: 1, name: "Cortical Collecting Duct" },
  //       { id: 2, name: "Medullary Collecting Duct" },
  //       { id: 3, name: "Proximal Convoluted Tubule" },
  //       { id: 4, name: "Distal Convoluted Tubule" },
  //       { id: 5, name: "Thin Descending Loop of Henle" },
  //       { id: 6, name: "Thick Ascending Loop of Henle" },
  //     ],
  //     img: nephron1,
  //   },
];

const NephronMicroanatomyInteractive = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userScore, setUserScore] = useState(0);
const[showCongrats, setShowCongrats]= useState(false)
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? questionData.length - 1 : prevIndex - 1
    );
    setQuizCompleted(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === questionData.length - 1) {
        setQuizCompleted(true);
        setShowCongrats(true)
      }
      return prevIndex < questionData.length - 1 ? prevIndex + 1 : prevIndex;
    });
  };


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 mx-2 my-4">
      <div className="col-span-2 p-4 rounded">
        <div className="text-center">
        {showCongrats && (
              <div className="text-green-500 font-bold">
                Congratulations! You scored {userScore}
              </div>
            )}
          <h1 className="text-2xl font-bold">
            {"Nephron Microanatomy"}
          </h1>
        </div>

        <div className="text-center shadow-sm">
        <NephronDnD1_1
              key={currentIndex}
              questionTopic={questionData[currentIndex].questionTopic}
              correctAnswer={questionData[currentIndex].correctAnswer}
              fullAnswer={questionData[currentIndex].fullAnswer}
              answers={questionData[currentIndex].answers}
              imgPath={questionData[currentIndex].img}
              imgIndex={currentIndex + 1}
              setQuizCompleted={setQuizCompleted}
              onAnswerSelected={(selectedAnswer) => {
                setUserScore((prevScore) =>
                  selectedAnswer.toLowerCase() ===
                  questionData[currentIndex].correctAnswer.toLowerCase()
                    ? prevScore + 1
                    : prevScore
                );
              }}
              setUserScore={setUserScore}
            />
        </div>
        <div className="bg-lightgray p-4"></div>
        <div className="flex flex-col max-lg:flex-row sm:flex-row justify-between">
                <div className="  mb-2 sm:mb-0">
                    <button
                        className="bg-gradient-to-r from-blue-400 to-blue-600 flex items-center text-white shadow-md rounded-md px-4 py-2 "
                        onClick={handlePrevious}
                    >
                        <FaArrowLeft className="mr-2" /> Previous
                    </button>
                </div>
                <div className="">
                    <button
                        className="your-tailwind-class-for-button bg-gradient-to-r flex items-center from-blue-400 to-blue-600 text-white shadow-md rounded-md px-4 py-2"
                        onClick={handleNext}
                disabled={quizCompleted}

                    >
                        Next <FaArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
      </div>
    </div>
  );
};

export default NephronMicroanatomyInteractive;
