import { useEffect, useState } from "react";
import SaltDistributionMCgif from "./SaltDistrubribution.jsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gif from "../../../../core/assets/extracellular space_2.gif";

const saltDistributionData = [
  {
    desc: 'Extracellular space expansion',
    solutions: 0,
    img: gif,
    message:
      'Good Job! The addition of 2L of isotonic crystalloid will be distributed evenly throughout the extracellular compartment. Based on normal distribution ¼ of which or 500ml will go into the intravascular space and ¾ of which or 1500ml into the interstitial space. Water from the intracellular compartment will move into the extracellular compartment until osmotic equilibrium is reached.',
  },
  {
    desc: 'Intracellular compartment expansion',
    solutions: 1,
    img: gif,
    message: 'Good Job! Administering water intravenously in the form of dextrose 5 water will have a greatest effect on the intracellular volume as it is twice that of the extracellular volume. Here, 1320ml will distribute intracellularly and only 140ml (7%) into the intravascular space.',
  },
  {
    desc: 'Intravascular compartment expansion',
    solutions: 2,
    img: gif,
    message: 'Excellent! Plasma infusion will expand the intravascular space most effectively. Plasma is the acellular portion of the blood that not only carries water and electrolytes, it also carries proteins like albumin, clotting factors and immunoglobulins which remain in the intravascular space.',
  },
];

const SaltDistributionInteractive = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [resetComponent, setResetComponent] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (resetComponent) {
      setShowCorrect(false);
      setShowTryAgain(false);
      setUserAnswer(null);
      setResetComponent(false);
    }
  }, [resetComponent]);

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = saltDistributionData[currentIndex].solutions;

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setShowCorrect(true);
      setShowTryAgain(false);
    } else {
      setShowCorrect(false);
      setShowTryAgain(true);
    }

    setUserAnswer(selectedAnswer);
  };

 
  const handleNext = () => {
    setResetComponent(true);

    if (currentIndex === saltDistributionData.length - 1) {
      setShowScore(true);
      setQuizCompleted(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    setResetComponent(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? saltDistributionData.length - 1 : prevIndex - 1
    );
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
    setQuizCompleted(false);
  };

  const isQuizCompleted = showScore || quizCompleted;
  return (
    <div className="grid grid-cols-1 grid-rows-[3vh, auto, 5vh] gap-1em m-0.5 sm:m-2 lg:m-2rem">
      <div className="col-span-1 row-span-1 title text-center  p-4">
        <h1 className="text-2xl font-bold"> Sodium Distribution</h1>
      </div>
      <div className="col-span-1 lg:col-span-2 row-span-1 content text-center bg-white p-4 shadow-md rounded-md">
        <div className="grid grid-rows-[auto, auto, auto] gap-4">
          
          <div className="row-span-1 question-card bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 shadow-md rounded-md">
            <p className="text-lg">
              Select the intravenous fluid that will cause the change in body
              compartment as described below
            </p>
            
          </div>
          {showScore && (
        <div className="col-span-1 row-span-1 content text-center bg-white p-4 shadow-md rounded-md mt-4">
          <h2 className="text-2xl font-bold">
            Congratulations! Your Score: {score} /{" "}
            {saltDistributionData.length}
          </h2>
        </div>
      )}
          <div className="lg:h-96 md:h-auto ">
            <div className="lg:h-96 md:h-auto ">
              <SaltDistributionMCgif
                description={saltDistributionData[currentIndex].desc}
                currentIndex={currentIndex}
                answer={saltDistributionData[currentIndex].solutions}
                message={saltDistributionData[currentIndex].message}
                gif={saltDistributionData[currentIndex].img}
                reset={resetComponent}
                checkAnswer={handleAnswer}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-lg:flex-row sm:flex-row justify-between mt-4">
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
            className="cursor-pointer bg-gradient-to-r flex items-center from-blue-400 to-blue-600 text-white shadow-md rounded-md px-4 py-2"
            onClick={handleNext}
            // disabled={showScore || !userAnswer}
            disabled={isQuizCompleted}
          >
            Next <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default SaltDistributionInteractive;