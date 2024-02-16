
import  { useState } from 'react';
import InteractiveSlider from './InteractiveSlider.jsx';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TotalBodySaltInteractiveData = [
  {
    desc: "40-year-old patient with blood pressure of 160/90 and mild swelling up to the ankles bilaterally",
    solutions: [50, 80, 50],
    solutionfn: (ICS, ECS, ISS) => ECS > 70,
    message: "Correct! This patient’s total body sodium is high as reflected by lower extremity edema and hypertension."
  },
  {
    desc: "65-year-old patient with acute blood loss from a gastrointestinal bleed. Blood pressure is 80/40 and heart rate is 110.",
    solutions: [40, 50, 50],
    solutionfn: (ICS, ECS, ISS) => ECS < 70 && ICS < 50,
    message: "Correct! This patient’s total body sodium is low. She has lost blood causing her to be hypovolemic. She is both hypotensive and tachycardic."
  },
  {
    desc: "55-year-old patient with heart failure with LE edema, crackles in his lungs bilaterally and internal jugular venous distension (JVD).",
    solutions: [50, 80, 50],
    solutionfn: (ICS, ECS, ISS) => ECS > 70,
    message: "Correct! This patient’s total body sodium is high as suggested by signs of hypervolemia; lower extremity edema, pulmonary crackles to suggest pulmonary edema and elevated JVD to suggest elevated central venous pressures."
  },
  {
    desc: "25-year-old patient with nausea and vomiting for three days who gets lightheaded when standing and has dry mucous membranes.",
    solutions: [40, 50, 50],
    solutionfn: (ICS, ECS, ISS) => ECS < 70 && ICS < 50,
    message: "Correct!! This patient’s total body sodium is low as reflected by signs suggestive of hypovolemia; orthostatic hypotension and dry mucous membranes."
  },
  {
    desc: "55-year-old patient with decompensated cirrhosis, ascites and lower extremity edema on exam. Blood pressure 100/60 and heart rate 80.",
    solutions: [50, 80, 50],
    solutionfn: (ICS, ECS, ISS) => ECS > 70,
    message: "Correct! This patient’s total body sodium is high as reflected by signs of hypervolemia; lower extremity edema and ascites. Notice that the blood pressure is on the lower end of normal, this reflects an impaired extracellular regulatory state of cirrhosis."
  }
];
  const TotalBodySaltInteractive = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
  
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, TotalBodySaltInteractiveData.length - 1));
    };
  
    console.log('Current Index:', currentIndex);
  
    const { desc, solutions, solutionfn, message } = TotalBodySaltInteractiveData[currentIndex];
  
    const handleScoreUpdate = (isCorrect) => {
      setScore((prevScore) => isCorrect ? prevScore + 1 : prevScore);
    };
  
    const displayScore = currentIndex === TotalBodySaltInteractiveData.length - 1 && (
      <div className="text-center mt-4">
        <h1 className="text-xl max-md:text-sm text-green-600 font-bold">Congratulations You completed This Interactive: Your Score: {score} / {TotalBodySaltInteractiveData.length}</h1>
      </div>
    );
  
  return (
    
      <div className="grid grid-cols-1fr md:3fr grid-rows-3vh md:40vw auto 5vh gap-1rem m-0.5 md:2 lg:2 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br ">
        <div className="p-1">
        <div className="row-span-1  lg:mb-10 xl:mb-2 question-card bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 shadow-md rounded-md align-middle justify-center">
      <p className="text-lg  text-center" >  
      Adjust the extracellular volume level that correlates with the
      total body sodium state of the clinical scenario presented
    </p>
    </div>
  
          
  
          <div className="text-center col-span-2 md:row-span-1 bg-white p-4">
            <InteractiveSlider
              desc={desc}
              solutions={solutions}
              solutionfn={solutionfn}
              message={message}
              key={currentIndex}
              onScoreUpdate={handleScoreUpdate}
            />
          </div>
  {displayScore}
          <div className="flex flex-col max-lg:flex-row sm:flex-row justify-between max-lg:mt-2">
                <div className="">
                    <button
                        className="bg-gradient-to-r from-blue-400 to-blue-600 flex items-center text-white shadow-md rounded-md px-4 py-2 "
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                    >
                        <FaArrowLeft className="mr-2" /> Previous
                    </button>
                </div>
                <div className="">
                    <button
                        className="your-tailwind-class-for-button bg-gradient-to-r flex items-center from-blue-400 to-blue-600 text-white shadow-md rounded-md px-4 py-2"
                        onClick={handleNext}
                        disabled={currentIndex === TotalBodySaltInteractiveData.length - 1}
                    >
                        Next <FaArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  };
export default TotalBodySaltInteractive;