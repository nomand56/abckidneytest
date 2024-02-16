import { useState } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NephronDnD1_1 } from "../NephronBox/NephronDn.jsx";
const questionData = [
    {
        questionTopic: "Drag and Drop answer to the corresponding box",
        correctAnswer: "Proximal Convoluted Tubule",
        fullAnswer: "this is the proximal convoluted tubule (PCT)",
        answers: [
            { id: 1, name: 'Cortical Collecting Duct' },
            { id: 2, name: 'Medullary Collecting Duct' },
            { id: 3, name: 'Proximal Convoluted Tubule' },
            { id: 4, name: 'Distal Convoluted Tubule' },
            { id: 5, name: 'Thin Descending Loop of Henle' },
            { id: 6, name: 'Thick Ascending Loop of Henle' }
        ],
        img: "/nephron2Dnd/",
    },
    {
        questionTopic: "Drag and Drop answer to the corresponding box",
        correctAnswer: "Distal Convoluted Tubule",
        fullAnswer: "this is the distal convoluted tubule (DCT) ",
        answers: [
            { id: 1, name: 'Cortical Collecting Duct' },
            { id: 2, name: 'Medullary Collecting Duct' },
            { id: 3, name: 'Proximal Convoluted Tubule' },
            { id: 4, name: 'Distal Convoluted Tubule' },
            { id: 5, name: 'Thin Descending Loop of Henle' },
            { id: 6, name: 'Thick Ascending Loop of Henle' }
        ],
        img: "/nephron2Dnd/",
    },
    {
        questionTopic: "Drag and Drop answer to the corresponding box",
        correctAnswer: 'Cortical Collecting Duct',
        fullAnswer: " Cortical collecting duct (CCD)",
        answers: [
            { id: 1, name: 'Cortical Collecting Duct' },
            { id: 2, name: 'Medullary Collecting Duct' },
            { id: 3, name: 'Proximal Convoluted Tubule' },
            { id: 4, name: 'Distal Convoluted Tubule' },
            { id: 5, name: 'Thin Descending Loop of Henle' },
            { id: 6, name: 'Thick Ascending Loop of Henle' }


        ],
        img: "/nephron2Dnd/",
    },
    {
        questionTopic: "Drag and Drop answer to the corresponding box",
        correctAnswer: 'Medullary Collecting Duct',
        fullAnswer: ' this is the medullary collecting duct',
        answers: [
            { id: 1, name: 'Cortical Collecting Duct' },
            { id: 2, name: 'Medullary Collecting Duct' },
            { id: 3, name: 'Proximal Convoluted Tubule' },
            { id: 4, name: 'Distal Convoluted Tubule' },
            { id: 5, name: 'Thin Descending Loop of Henle' },
            { id: 6, name: 'Thick Ascending Loop of Henle' }],
        img: "/nephron2Dnd/",
    },
    {
        questionTopic: "Drag and Drop answer to the corresponding box",
        correctAnswer: 'Thick Ascending Loop of Henle',
        fullAnswer: ' This is the thick ascending loop of Henle (TALH)',
        answers: [
            {id: 1,name: 'Cortical Collecting Duct',},
            {id: 2,name: 'Medullary Collecting Duct',},
            {id: 3,name: 'Proximal Convoluted Tubule',},
            {id: 4,name: 'Distal Convoluted Tubule',},
            {id: 5,name: 'Thin Descending Loop of Henle',},
            {id: 6,name: 'Thick Ascending Loop of Henle',},
        ],
        img: "/nephron2Dnd/"
    },
    {
        questionTopic: "Drag and Drop answer to the corresponding box",
        correctAnswer: 'Thin Descending Loop of Henle',
        fullAnswer: " This is the thin descending loop of Henle",
        answers: [
            { id: 1, name: 'Cortical Collecting Duct' },
            { id: 2, name: 'Medullary Collecting Duct' },
            { id: 3, name: 'Proximal Convoluted Tubule' },
            { id: 4, name: 'Distal Convoluted Tubule' },
            { id: 5, name: 'Thin Descending Loop of Henle' },
            { id: 6, name: 'Thick Ascending Loop of Henle' }
        ],
        img: "/nephron2Dnd/",
    },

];

const NephronMicroanatomyInteractiv2 = () => {
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
            <h1 className="text-2xl font-bold">{"Practice: Nephron Microanatomy"}</h1>
          </div>
          {showCongrats && (
              <div className="text-green-500 font-bold">
                Congratulations! You scored {userScore}
              </div>
            )}
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
          <div className="bg-lightgray p-4 hidden">
         
            User Score: {userScore}
          </div>
          <div className="flex flex-col max-lg:flex-row sm:flex-row justify-between">
            <div className="mb-2 sm:mb-0">
              <button
                className="bg-gradient-to-r from-blue-400 to-blue-600 flex items-center text-white shadow-md rounded-md px-4 py-2 "
                onClick={handlePrevious}
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>
            </div>
            <div className="">
              <button
                className={`your-tailwind-class-for-button bg-gradient-to-r flex items-center from-blue-400 to-blue-600 text-white shadow-md rounded-md px-4 py-2 ${
                  quizCompleted ? 'cursor-not-allowed opacity-50' : ''
                }`}
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
  
  export default NephronMicroanatomyInteractiv2;