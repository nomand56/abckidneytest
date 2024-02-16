
import NephronMC from './NephronMC'
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const products = [
    { left: '3%', top: '22%', width: '23%', height: '8%', id: 1 , statement: "Filters components of blood", answer: "Correct, the glomerulus filters the blood, which becomes the filtrate in bowman’s capsule!"},
    { left: '3%', top: '41%', width: '34%', height: '5%', id: 2 , statement: "The major site of reabsorption", answer: "Correct, the proximal convoluted tubule, which is responsible for 65% water, sodium, Chloride reabsorption!"},
    { left: '3%', top: '41%', width: '34%', height: '5%', id: 2 , statement: "Reabsorbs 65% of water and NaCl from filtrate", answer: "Correct, the proximal convoluted tubule is responsible for 65% water, sodium, Chloride reabsorption! This increases when there is decreased perfusion to the kidney."},
    { left: '3%', top: '41%', width: '34%', height: '5%', id: 2 , statement: "The only site of amino acid and glucose reabsorption", answer: "Correct, the proximal convoluted tubule is the only site in the nephron where glucose and amino acids are reabsorbed"},
    { left: '19%', top: '61%', width: '20%', height: '5%', id: 3 , statement: "Responsible for creating the medullary concentration gradient", answer: "Correct, the through sequential filtrate concentration and insterstitium concentration activities of the Loop of Henle and vasa recta, a medullary concentration is created, which enables distal water reabsorption!"},
    { left: '44%', top: '25%', width: '24%', height: '8%', id: 4 , statement: "Regions of fine-tuning filtrate featuring the NaCl thiazide sensitive channel", answer: "Correct, the distal convoluted tubule (DCT) is the site fine tuning of the filtrate and features the NaCl thiazide sensitive channel (NCC)"},
    { left: '74%', top: '38%', width: '25%', height: '8%', id: 5 , statement: "Regions of fine-tuning filtrate & sensitive to ADH & aldosterone", answer: "Correct,the connecting tubule & collecting duct fine tune the filtrate! They also participate in water handling with ADH responsiveness and BP control through aldosterone regulation."},
    { left: '27%', top: '77%', width: '23%', height: '4%', id: 6 , statement: "Impermeable to NaCl", answer: "Correct, the thin descending loop of henle is impermeable to NaCl!"},
    { left: '57%', top: '62%', width: '10%', height: '10%', id: 8 , statement: "Impermeable to water", answer: "Correct, the thick ascending loop of henle is impermeable to water, it is also the site of action of loop diuretics!"},
    { left: '57%', top: '62%', width: '10%', height: '10%', id: 8 , statement: "Site of action of loop diuretics", answer: "Correct, the thick ascending loop of henle is the site of action of loop diuretics! Loop diuretics inhibit reabsorption of sodium, potassium and chloride through the NKCC2 channel."},
];


const order = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10];
const NephronFunctionInteractive1 = () => {
    const [idx, setIdx] = useState(0);
    const [question, setQuestion] = useState(products[idx]?.statement);
    const [answerMsg, setAnswerMsg] = useState(null);
    const [score, setScore] = useState(0);
    const totalQuestions = order.length;
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

    const checkAnswer = (selectedId) => {
        if (products[idx]?.id === selectedId) {
            setAnswerMsg(products[idx]?.answer || '');
            setScore(score + 1);
        } else {
            setAnswerMsg('Try again');
        }
    };

    const nextQuestion = () => {
        if (idx < totalQuestions - 1) {
            setIdx(idx + 1);
            setQuestion(products[idx + 1]?.statement || '');
            setAnswerMsg('');
        } else {
            // User has answered all questions
            setAnswerMsg(`Congratulations! You answered all questions correctly. Your final score is ${score} out of ${totalQuestions}.`);
            setAllQuestionsAnswered(true);
        }
    };

    const previousQuestion = () => {
        if (idx > 0) {
            setIdx(idx - 1);
            setQuestion(products[idx - 1]?.statement || '');
            setAnswerMsg('');
            setAllQuestionsAnswered(false); 
        }
    };

    if (idx === totalQuestions) {
        return (
            <div className="grid grid-cols-1 gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-12 my-2">
                <div className="p-4 rounded bg-white text-center">
                    <p className="text-xl font-semibold mb-4">
                        Your Score: {score} / {totalQuestions}
                    </p>
                    {answerMsg && <p className="text-green-500 text-xl font-semibold">{answerMsg}</p>}
                </div>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-12 my-2">
            <div className="p-4 rounded">
                <div className="text-center text-2xl font-bold">Nephron Function</div>
            </div>

            <div className="p-4 rounded bg-white text-center">
              
                <NephronMC answermsg={answerMsg} question={question} idx={idx} setidx={setIdx} products={products} checkAnswer={checkAnswer} />
            </div>

            {/* Section 3 */}
            <div className="flex flex-col max-lg:flex-row sm:flex-row justify-between">
                <div className="  mb-2 sm:mb-0">
                    <button
                        className="bg-gradient-to-r from-blue-400 to-blue-600 flex items-center text-white shadow-md rounded-md px-4 py-2 "
                        onClick={previousQuestion}
                    >
                        <FaArrowLeft className="mr-2" /> Previous
                    </button>
                </div>
                <div className="">
                    <button
                        className="your-tailwind-class-for-button bg-gradient-to-r flex items-center from-blue-400 to-blue-600 text-white shadow-md rounded-md px-4 py-2"
                        onClick={nextQuestion}
                        disabled={allQuestionsAnswered}
                    >
                        Next <FaArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NephronFunctionInteractive1;