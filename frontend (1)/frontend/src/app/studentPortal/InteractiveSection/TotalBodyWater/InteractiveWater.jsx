// import { Link } from 'react-router-dom';
// import SaltWaterSidebar from '../../Components/SaltWaterSidebar.jsx';
import TBWSlider from './TBWSlider/TBWSlider.jsx';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const sliderData = [
  {
    desc: '65 year-old patient admitted with CHF exacerbation, found to have LE edema, bilateral pulmonary crackles & jugular venous distension. He was intubated two days ago. His sNa is 148mEq/L.',
    message: 'Correct!! This patient’s total body sodium is high, they are hypervolemic. The serum sodium is also high, reflecting a free water deficit.',
    water: 50,
    salt: 70,
    waterLabel: 'Euvolemia',
    saltLabel: 'Euvolemia',
    answerRule:'Salt figure line MUST be higher than ‘euvolemia’ line. Water figure line must be lower than salt figure line but higher than euvolemia line.    '
  },
  {
    desc: 'Patient with diarrhea, low blood pressure and dry mucosa with a normal serum sodium',
    message: 'Correct! This patient’s total body sodium is low due to hypovolemia from diarrhea. The serum sodium is normal reflecting the water has dropped in proportion to total body sodium',
    water: 80,
    salt: 70,
    waterLabel: 'Euvolemia',
    saltLabel: 'Euvolemia',
    answerRule:'Salt figure line MUST be lower than ‘euvolemia’ line. Water figure line must be the same as the salt figure line.    '
  },

  {
    desc: "Patient experiences nausea and vomiting with no oral intake, exhibits hypotension with flat neck veins, and a serum sodium of 150mEq/L.",
    message: 'Correct!! This patient’s total body sodium and they are hypovolemic. The serum sodium is high reflecting a water deficit., ',
    water: 30,
    salt: 50,
    waterLabel: 'Euvolemia',
    saltLabel: 'Euvolemia',
    answerRule:'Salt figure line MUST be lower than ‘euvolemia’ line. Water figure line must be lower than salt figure line.    '
  },
  {
    desc: "Patient with known nephrogenic diabetes insipidus. Is intubated with no access to water with normal vitals and exam, and a serum sodium of 155mEq/L.",
    message: "Correct!! This patient is euvolemic. The nephrogenic diabetes insipidus causing excessive urination of water. Without access to water (intubation), a water deficit develops. We will discuss diabetes insipidus in later modules!!'",
    water: 20,
    salt: 30,
    waterLabel: 'Euvolemia',
    saltLabel: 'Euvolemia',
    answerRule:'Salt figure line MUST be the same as ‘euvolemia’ line. Water figure line must be lower than salt figure line.    '
  },
  {
    desc: 'A 45 year old with chronic kidney disease stage IV with BP 155/97 and bilateral pitting LE edema and a serum sodium of 125mEq/L.',
    message: 'Correct!! This patient is hypervolemic with a high total body sodium. A low serum sodium is reflective of water excess.',
    water: 30,
    salt: 30,
    waterLabel: 'Euvolemia',
    saltLabel: 'Euvolemia',
    answerRule:'Salt figure line MUST be higher than ‘euvolemia’ line. Water figure line must be higher than salt figure line'

  },
]
const TotalBodyWaterInteractive1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [score, setScore] = useState(0);

  function solutionfn(waterval, saltval) {
    const isCorrect = waterval < saltval && saltval > 50;
    setShowCorrect(isCorrect);
    setShowTryAgain(!isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  const handleNext = () => {
    setShowCorrect(false);
    setShowTryAgain(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setShowCorrect(false);
    setShowTryAgain(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShowCorrect(false);
    setShowTryAgain(false);
    setScore(0);
  };

  return (
<div className="grid grid-cols-1 grid-rows-[auto, auto, auto] gap-1em m-1 sm:m-2 lg:m-4 align-middle justify-center">
      <div className="col-span-1 row-span-1 title text-center  p-4 align-middle justify-center">
        {/* <h1 className="text-2xl font-bold">Practice: Total Body Water</h1> */}
      </div>
      <div className="col-span-1 lg:col-span-2 row-span-1 content text-center bg-white p-4 rounded-md  lg:mb-4 mb-12 align-middle justify-center">
  <div className="grid grid-rows-[auto, auto, auto] gap-4 lg:mb-4 mb-6 align-middle justify-center">
    <div className="row-span-1 mb-12 lg:mb-10 xl:mb-16 question-card bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 shadow-md rounded-md align-middle justify-center">
      <p className="text-lg align-middle justify-center">{sliderData[currentIndex].answerRule}
</p>
    </div>

          <div className='mb-4 align-middle justify-center' style={{height:'auto'}}>
            <TBWSlider
            description={sliderData[currentIndex].desc}
              solutionfn={solutionfn}
              message={sliderData[currentIndex].message}
              water={sliderData[currentIndex].water}
              salt={sliderData[currentIndex].salt}
              waterLabel={sliderData[currentIndex].waterLabel}
              saltLabel={sliderData[currentIndex].saltLabel}

            />
          </div>
          <div className='max-lg:mt-60  mt-24'>
          {showCorrect && (
            <div className="mt-12 row-span-1 answer-card bg-gradient-to-r from-green-300 to-green-500 text-white p-6 shadow-md rounded-full ">
              <p className="text-lg font-bold">{sliderData[currentIndex].message}</p>
            </div>
          )}
          {showTryAgain && (
            <div className=" mt-12row-span-1 answer-card bg-gradient-to-r from-red-300 to-red-500 text-white p-6  ">
              <p className="text-lg font-bold">Try Again</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col max-lg:flex-row sm:flex-row justify-between ">
                <div className="  mb-2 sm:mb-0">
                    <button
                        className="bg-gradient-to-r from-blue-400 to-blue-600 flex items-center text-white shadow-md rounded-md px-4 py-2 "
                        onClick={handleNext}
                    >
                        <FaArrowLeft className="mr-2" /> Previous
                    </button>
                </div>
                <div className="">
          {currentIndex === sliderData.length - 1 ? (
            <button
              className="bg-gradient-to-r from-blue-400 to-blue-600 flex items-center text-white shadow-md rounded-md px-4 py-2"
              onClick={handleReset}
            >
              Reset
            </button>
          ) : (
            <button
              className="bg-gradient-to-r flex items-center from-blue-400 to-blue-600 text-white shadow-md rounded-md px-4 py-2"
              onClick={handleNext}
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>
            </div>
            </div>
            {currentIndex === sliderData.length - 1 && (
        <div className="mt-4 text-center">
          <p className="text-lg font-bold">Congratulations You completed This Interactive: Your Score: {score} / {sliderData.length}</p>
        </div>
      )}

    </div>
  );
};

export default TotalBodyWaterInteractive1;