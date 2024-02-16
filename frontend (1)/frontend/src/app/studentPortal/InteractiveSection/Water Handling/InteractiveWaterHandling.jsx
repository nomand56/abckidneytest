/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaArrowRight } from "react-icons/fa";

const quizData = [
  {
    question:
      "57-year-old patient with nausea and vomiting, unable eat or drink for the last 48 hours.",
    answer:
      "Correct!! This patient is hypernatremic and hypovolemic (Low EABV) with low blood pressures, both of which are strong stimuli for ADH release. ADH will stimulate the reabsorption of water at the cortical collecting duct, which will dilute the plasma (low serum osmolarity) and concentrate the urine (high urine osmolality). The low EABV results in upregulated sodium reabsorption at the proximal convoluted tubule resulting in low serum sodium.",
    extra: {
      plasmaADH: 50,
      urineOsmolality: 60,
      urineSodiumConcentration: 30,
      PlasmaOsmolarity: 80,
    },
  },
  {
    question:
      "15-year-old patient was participating in a water guzzling Tik Tok challenge and began seizing. At the emergency department, BP was normal. Serum [Na+] = 113 mEq/L",
    answer:
      "Correct!! Because this serum osmolarity is low due to the hyponatremia, there should be no circulating plasma ADH. There will be no stimulus for water reabsorption in the cortical collecting duct resulting in a robust aquaresis with very dilute urine. The aquaresis will allow the plasma osmolarity to rise rapidly. Urine sodium concentration will be low due to dilution.",
    extra: {
      PlasmaOsmolarity: 30,
      plasmaADH: 50,
      urineOsmolality: 60,
      urineSodiumConcentration: 30,
    },
  },
  {
    question:
      "43-year-old patient found unconscious for an unknown period of time, BP within normal range. Serum [Na+] = 152mEq/L",
    answer:
      "Correct!! Being unconscious for a prolonged period of time, for whatever reason, has limited this person’s access to water causing hypernatremia and increased plasma osmolarity. As a result, they will increase circulating ADH to signal the kidneys to reabsorb water, thereby returning plasma osmolarity and serum sodium concentration back to normal by concentrating the urine. Therefore, urine osmolality and urine sodium concentrations will be high due to concentrated urine.",
    extra: {
      PlasmaOsmolarity: 30,
      plasmaADH: 50,
      urineOsmolality: 60,
      urineSodiumConcentration: 30,
    },
  },
  {
    question:
      "18-year-old patient has been trying to ‘hydrate’ during a marathon & begins seizing. At the hospital they are found to have a BP 75/54 and a serum [Na+] = 108mEq/L",
    answer:
      "Correct!! This patient just ran a marathon and probably drank a large volume of water for ‘hydration’. This person also has a low effective arterial blood volume, likely from sodium and water losses with sweating, which results in continued stimulus for ADH release and water reabsorption by the kidney, thereby maintaining hyponatremia, dilute plasma, and concentrated urine. The urine sodium concentration remains low due to low effective arterial blood volume.",
    extra: {
      PlasmaOsmolarity: 30,
      plasmaADH: 50,
      urineOsmolality: 60,
      urineSodiumConcentration: 30,
    },
  },
  {
    question:
      "20-year-old patient sedated and intubated following a motor vehicle accident with traumatic brain injury. They have normal vitals and a serum [Na+] = 165mEq/L",
    answer:
      "Correct! This patient had a traumatic brain injury and, as a result, suffers from central diabetes insipidus, which means they cannot release ADH in response to hyperosmolarity. In this case, the brain cannot signal the kidney to reabsorb water. Therefore, the patient will inappropriately pee out water, which results in dilute urine with low urine osmolality and low urine sodium concentration. Since they are sedated and intubated, they do not have access to water.",
    extra: {
      PlasmaOsmolarity: 30,
      plasmaADH: 50,
      urineOsmolality: 60,
      urineSodiumConcentration: 30,
    },
  },
  {
    question:
      "20-year-old patient on an antidepressant medication sertraline, a selective serotonin reuptake inhibitor (SSRI), presents with confusion, nausea, vomiting and serum [Na+] = 108mEq/L",
    answer:
      "Correct!! This patient is on an SSRI, which has a side effect profile of causing syndrome of inappropriate antidiuretic hormone (SIADH), which results in ADH being released in the absence of hyperosmolar or low EABV stimuli. Here, ADH stimulates water reabsorption at the cortical collecting duct thereby concentrating the urine and inappropriately diluting the serum resulting in hyponatremia.",
    extra: {
      PlasmaOsmolarity: 30,
      plasmaADH: 50,
      urineOsmolality: 60,
      urineSodiumConcentration: 30,
    },
  },
];

const InteractiveWaterHandling = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [plasmaADH, setPlasmaADH] = useState(0);
  const [urineOsmolality, setUrineOsmolality] = useState(0);
  const [urineSodiumConcentration, setUrineSodiumConcentration] = useState(0);
  const [PlasmaOsmolarity, setPlasmaOsmolarity] = useState(0);
  const [plasmaADHPercentage, setPlasmaADHPercentage] = React.useState(0);
  const [urineOsmolalityPercentage, setUrineOsmolalityPercentage] = useState(0);
  const [feedbackColor, setFeedbackColor] = useState("")
  const [
    urineSodiumConcentrationPercentage,
    setUrineSodiumConcentrationPercentage,
  ] = useState(0);
  const [PlasmaOsmolarityPercentage, setPlasmaOsmolarityPercentage] =
    useState(0);

  const [feedback, setFeedback] = useState("");

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
      setScore(0);
    }
    setPlasmaADH(0);
    setUrineOsmolality(0);
    setUrineSodiumConcentration(0);
    setPlasmaOsmolarity(0);
    setPlasmaADHPercentage(0);
    setUrineOsmolalityPercentage(0);
    setUrineSodiumConcentrationPercentage(0);
    setPlasmaOsmolarityPercentage(0);
    setFeedback("");
  };

  const calculatePercentage = (value, max) => {
    return ((value - 0) / (max - 0)) * 100;
  };

  const checkAnswer = () => {
    const correctValues = quizData[currentQuestion].extra;
  
    if (
      plasmaADH === correctValues.plasmaADH &&
      PlasmaOsmolarity === correctValues.PlasmaOsmolarity &&
      urineOsmolality === correctValues.urineOsmolality &&
      urineSodiumConcentration === correctValues.urineSodiumConcentration
    ) {
      setFeedback("Correct!"); // Step 2
      setFeedbackColor("bg-blue-500 text-white font-bold text-xl w-32 mx-10 my-10"); // Step 2
      setScore(score + 1);
    } else {
      setFeedback("Incorrect! Try again."); // Step 2
      setFeedbackColor("bg-red-400 text-white font-bold text-xl w-32 mx-10 my-10"); // Step 2
    }
  };
  const numberOfDots = Math.ceil((10 * plasmaADHPercentage) / 100);
  console.log(numberOfDots);
  const tubeHeight = 200; 
  const fillHeight = (PlasmaOsmolarityPercentage / 100) * tubeHeight;

  const getColor = () => {
    if (urineSodiumConcentrationPercentage >= 100) {
      return "#3498db";
    } else {
      return "#134872";
    }
  };

  const pathFill = getColor();
  const currentQuizItem = quizData[currentQuestion];

  return (
    <div>
        <h2 className="w-4/5 max-lg:w-auto max-lg:ml-0 text-xl font-bold ml-28 mt-10 row-span-1    question-card bg-gradient-to-r from-blue-500 to-blue-900 text-white p-6 shadow-md rounded-md align-middle justify-center">
        In each clinical scenario, toggle each slider up or down to represent
        change in ADH release & resultant plasma osmolarity, urine osmolality
        & urine sodium concentration
      </h2>
      <div className="w-2/3 max-lg:w-auto justify-center align-middle max-lg:ml-0 ml-48 mt-1 text-center text-lg row-span-1  lg:mb-10 xl:mb-16 question-card bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 shadow-md rounded-md">
        <h2 className="font-bold text-xl">Questions</h2>
        <p className="mt-4 font-bold">{currentQuizItem.question}</p>
      </div>
    <div className="flex bg-white ounded-lg max-lg:flex-col">
      
    <div className="w-full md:w-1/2 p-4 mb-96">
    <div className="mb-4 h-1/4 ">
    
    
    
        <div className="absolute px-1 py-1">
          <p className="mt-2  text-center font-bold text-lg mb-8">
            Plasma osmolarity
          </p>
          <div className="flex flex-auto px-2  ">
            <div>
              <p className="w-24">{PlasmaOsmolarityPercentage.toFixed(2)}%</p>

              <Slider
                vertical
                className="h-40"
                value={PlasmaOsmolarity}
                onChange={(value) => {
                  setPlasmaOsmolarity(value);
                  setPlasmaOsmolarityPercentage(
                    calculatePercentage(value, 100)
                  );
                }}
              />
            </div>
            <div className="relative inline-block">
              <svg
                width="100"
                height={tubeHeight}
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Tube */}
                <rect
                  x="45"
                  y="0"
                  width="10"
                  height={tubeHeight}
                  fill="#e0e0e0"
                />

                <rect
                  x="45"
                  y={tubeHeight - fillHeight}
                  width="10"
                  height={fillHeight}
                  fill="#3498db"
                />
              </svg>
              <img
                src="/tubeblank.png"
                height="100px"
                width="100px"
                className="absolute inset-0 m-auto"
                style={{ height: "260px", width: "100px", zIndex: 2 }}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="w-1/2 p-4 max-lg:w-auto">
        <div className="mb-4">
          <p className="mt-2 font-bold text-xl max-lg:text-sm mb-10 text-center">Circulating plasma ADH</p>
          <div className="flex flex-auto items-center ">
            <div className="flex">
              <Slider
                vertical
                className="h-40"
                value={plasmaADH}
                onChange={(value) => {
                  setPlasmaADH(value);
                  setPlasmaADHPercentage(calculatePercentage(value, 100));
                }}
              />
              <p className="flex mb-44 w-14">
                {" "}
                {plasmaADHPercentage.toFixed(2)}%
              </p>
            </div>
            <img src="/slider27.png" alt="Slider 22" className="h-1/2 w-96 " />
            <div className="flex flex-col items-center ml-48 max-md:ml-32 absolute">
              {[...Array(numberOfDots)].map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-green-800 rounded-full mb-3 max-md:translate(15px)"
                  style={{
                    position: "absolute",
                    transform: `rotate(${
                      (360 / numberOfDots) * index
                    }deg) translate(15px) rotate(-${
                      (360 / numberOfDots) * index
                    }deg)`,
                    transformOrigin: "50% 50%",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4 w-auto">
          <p className="mt-2 font-bold text-xl max-lg:text-sm mb-10 text-center">Urine osmolality</p>
          <div className="flex flex-auto">
            <Slider
              vertical
              className="h-40"
              value={urineOsmolality}
              onChange={(value) => {
                setUrineOsmolality(value);
                setUrineOsmolalityPercentage(calculatePercentage(value, 100));
              }}
            />
            <p className="w-24">{urineOsmolalityPercentage.toFixed(2)}%</p>
            <svg
              width="350"
              height="250"
              version="1.1"
              className=""
              viewBox="0 0 1200 1200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="cut-edge">
                  <rect
                    width="38%"
                    height="26%"
                    x="322"
                    y="350"
                    transform="rotate(180, 570, 633.5)"
                  />
                </clipPath>
              </defs>
              <g>
                <rect
                  width="38%"
                  height="26%"
                  x="380"
                  y="620"
                  fill="#30528f"
                  clipPath="url(#cut-edge)"
                />
                <rect
                  width="38%"
                  height={`${urineSodiumConcentrationPercentage.toFixed(2)}%`}
                  x="380"
                  y={`${
                    620 + (26 - urineSodiumConcentrationPercentage).toFixed(2)
                  }%`}
                  fill="#134872"
                  clipPath="url(#cut-edge)"
                />

                <rect
                  width="38%"
                  height={`${urineOsmolalityPercentage.toFixed(2)}%`}
                  x="380"
                  y={`${620 + (26 - urineOsmolalityPercentage).toFixed(2)}%`}
                  fill="#3498db"
                  className="z-99"
                  clipPath="url(#cut-edge)"
                />
                <path
                  fill={pathFill}
                  d="m337.67 469.84 54.191 450.61v-0.003907c0.86328 7.1484 4.3164 13.734 9.7031 18.508 5.3867 4.7773 12.336 7.4141 19.535 7.418h357.85-0.003906c7.1992-0.003906 14.148-2.6406 19.535-7.418 5.3867-4.7734 8.8398-11.359 9.7031-18.508l54.191-450.61zm146.62 168.94c29.316 0.88672 57.828 9.8203 82.406 25.828 13.418 8.7305 28.355 14.863 44.035 18.082 65.754 13.535 134.06 7.0117 196.06-18.727l-30.164 250.43h-353.28l-30.102-250.43c27.117-17.375 58.855-26.156 91.047-25.184z"
                />
                <path
                  fill={pathFill}
                  d="m292.5 253.63c-7.8125 0-15.305 3.1016-20.832 8.625-5.5234 5.5273-8.625 13.02-8.625 20.832v146.09c0 7.8125 3.1016 15.305 8.625 20.832 5.5273 5.5234 13.02 8.625 20.832 8.625h614.98c7.8203 0.011719 15.32-3.0898 20.852-8.6133 5.5312-5.5273 8.6406-13.027 8.6367-20.844v-146.09c0.003906-7.8164-3.1055-15.316-8.6367-20.84-5.5312-5.5273-13.031-8.6289-20.852-8.6172zm558.73 54.336h-0.003906c4.0195-0.12109 7.9141 1.3867 10.801 4.1875 2.8867 2.7969 4.5156 6.6445 4.5195 10.664v66.637-0.003906c0 5.3164-2.8359 10.227-7.4375 12.887-4.6055 2.6562-10.277 2.6562-14.879 0-4.6055-2.6602-7.4414-7.5703-7.4414-12.887v-66.637 0.003906c0.003906-3.8672 1.5156-7.582 4.2109-10.352 2.6953-2.7734 6.3633-4.3867 10.227-4.5zm-503.53 0.17969v-0.003907c4.0156-0.16797 7.9258 1.2969 10.844 4.0586 2.918 2.7656 4.5938 6.5898 4.6484 10.609v66.637c-0.18359 5.1875-3.0547 9.9023-7.5781 12.445-4.5234 2.543-10.047 2.543-14.57 0-4.5234-2.543-7.3984-7.2578-7.5781-12.445v-66.637c0.050781-3.8008 1.5508-7.4375 4.1992-10.164 2.6445-2.7305 6.3633-4.3398 10.035-4.5039zm100.71 0v-0.003907c4.0078-0.16016 7.9141 1.3086 10.824 4.0703 2.9102 2.7656 4.582 6.5859 4.6367 10.598v66.637c-0.066406 5.2695-2.9141 10.109-7.4883 12.723-4.5742 2.6172-10.191 2.6172-14.766 0-4.5742-2.6133-7.4219-7.4531-7.4883-12.723v-66.637c0.046875-3.8047 1.5547-7.4453 4.207-10.176 2.6562-2.7305 6.2383-4.3398 10.227-4.5zm100.67 0-0.003906-0.003907c4.0117-0.16016 7.918 1.3086 10.828 4.0703 2.9102 2.7656 4.582 6.5859 4.6328 10.598v66.637c-0.17969 5.1875-3.0508 9.9023-7.5742 12.445-4.5234 2.543-10.047 2.543-14.57 0-4.5273-2.543-7.3984-7.2578-7.5781-12.445v-66.637c0.046875-3.8047 1.5547-7.4531 4.2148-10.18 2.6562-2.7305 6.2539-4.3359 10.055-4.4922zm100.65 0-0.003906-0.003907c4.0117-0.16016 7.9141 1.3086 10.828 4.0703 2.9102 2.7656 4.582 6.5859 4.6328 10.598v66.637c-0.066406 5.2695-2.9141 10.109-7.4883 12.723-4.5742 2.6172-10.188 2.6172-14.762 0-4.5742-2.6133-7.4219-7.4531-7.4883-12.723v-66.637c0.046875-3.8086 1.5547-7.4531 4.2148-10.18 2.6562-2.7305 6.2578-4.3359 10.066-4.4883zm100.67 0-0.003906-0.003907c4.0195-0.17188 7.9375 1.2891 10.859 4.0547 2.9219 2.7617 4.5977 6.5938 4.6484 10.613v66.637c0 5.3164-2.8359 10.23-7.4414 12.891-4.6055 2.6602-10.281 2.6602-14.887 0s-7.4414-7.5742-7.4414-12.891v-66.637c0.046875-3.8047 1.5547-7.4453 4.207-10.176s6.2539-4.3359 10.055-4.4922z"
                />
              </g>
            </svg>

            <div className="">
              <Slider
                vertical
                className="h-40"
                value={urineSodiumConcentration}
                onChange={(value) => {
                  setUrineSodiumConcentration(value);
                  setUrineSodiumConcentrationPercentage(
                    calculatePercentage(value, 100)
                  );
                }}
              />
              <p className="w-24">
                {urineSodiumConcentrationPercentage.toFixed(2)}%
              </p>
              <p className="mt-2 flex">Urine sodium concentration</p>
            </div>
          </div>

        {feedback && (
    <p className={`px-4 py-2 rounded-lg ${feedbackColor}`}>
      {feedback}
    </p>
      )}  
    </div>
<div className="flex align-middle text flex-col  mt-10 justify-center">
<button
              className="shadow-lg mx-10 my-10 w-28 px-4 bg-primary text-white rounded-lg py-4"
              onClick={checkAnswer}
              
              >
              Submit
            </button>
        <div
          className="cursor-pointer w-28   ml-10 bg-gradient-to-r flex items-center from-blue-400 to-blue-600 text-white shadow-md rounded-lg px-4 py-2 "
          onClick={handleNext}
        >
          <button className="">Next</button>
          <FaArrowRight className="ml-2" />
        </div>
               

        
          </div>
        </div>
    </div>
    
  </div>
  
  );
};

export default InteractiveWaterHandling;
