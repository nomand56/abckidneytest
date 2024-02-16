// WaterDistributionInteractive1_2.js

import { useState } from 'react';
// import { WaterDistributionDnD1_2 } from './WaterDistributionDnD.jsx';  // Update the import path based on your file structure
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { NephronDnD1_1 } from '../../Nephron/NephronBox/NephronDn';
import { WaterDisributionDnD1_1 } from './WaterDistributionDnD.jsx';

const questionData = [
  {
    questionTopic: 'Drag and Drop answer to the corresponding box',
    correctAnswer: 'Plasma',
    fullAnswer: ' The interstitial fluid compartment is ¾ of the extracellular volume (28% of TBW)',
    answers: [
      { id: 1, name: 'TBW' },
      { id: 2, name: 'ICF' },
      { id: 3, name: 'ECF' },
      { id: 4, name: 'Interstitial' },
      { id: 5, name: 'Plasma' },
    ],
    img: '/waterInteractive/'
  },
  {
    questionTopic: 'Drag and Drop answer to the corresponding box',
    correctAnswer: 'Interstitial',
    fullAnswer: 'The interstitial fluid compartment is ¾ of the extracellular volume (28% of TBW)',
    answers: [
      { id: 1, name: 'TBW' },
      { id: 2, name: 'ICF' },
      { id: 3, name: 'ECF' },
      { id: 4, name: 'Interstitial' },
      { id: 5, name: 'Plasma' },
    ],
    img: '/waterInteractive/'
  },
  {
    questionTopic: 'Drag and Drop answer to the corresponding box',
    correctAnswer: 'ECF',
    fullAnswer: 'The interstitial fluid compartment is ¾ of the extracellular volume (28% of TBW)',
    answers: [
      { id: 1, name: 'TBW' },
      { id: 2, name: 'ICF' },
      { id: 3, name: 'ECF' },
      { id: 4, name: 'Interstitial' },
      { id: 5, name: 'Plasma' },
    ],
    img: '/waterInteractive/'
  },
  {
    questionTopic: 'Drag and Drop answer to the corresponding box',
    correctAnswer: 'TBW',
    fullAnswer: 'The interstitial fluid compartment is ¾ of the extracellular volume (28% of TBW)',
    answers: [
      { id: 1, name: 'TBW' },
      { id: 2, name: 'ICF' },
      { id: 3, name: 'ECF' },
      { id: 4, name: 'Interstitial' },
      { id: 5, name: 'Plasma' },
    ],
    img: '/waterInteractive/'
  },
  {
    questionTopic: 'Drag and Drop answer to the corresponding box',
    correctAnswer: 'ICF',
    fullAnswer: ' The interstitial fluid compartment is ¾ of the extracellular volume (28% of TBW)',
    answers: [
      { id: 1, name: 'TBW' },
      { id: 2, name: 'ICF' },
      { id: 3, name: 'ECF' },
      { id: 4, name: 'Interstitial' },
      { id: 5, name: 'Plasma' },
    ],
    img: '/waterInteractive/'
  },
]




const WaterDistributionInteractive1_2 = () => {
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
            {" Water Distribution"}
          </h1>
        </div>
        <div className="text-center">
          <WaterDisributionDnD1_1
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

export default WaterDistributionInteractive1_2;
