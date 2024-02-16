/* eslint-disable react/prop-types */
import { useState } from 'react';
import DragAndDropText from '../../Nephron/NephronBox/DragAndDrop.jsx';

const WaterDisributionDnD1_1 =( {
  questionTopic,
  correctAnswer,
  fullAnswer,
  answers: answer,
  imgPath,
  imgIndex,
  setUserScore
}) => {
  const [answers, setAnswers] = useState(answer)
  const [img, setImg] = useState(imgPath + imgIndex + "/0.png")
console.log("questionTopic", img)
  const page = DragAndDropText(questionTopic, fullAnswer, answers, setAnswers, correctAnswer, imgPath, imgIndex, setImg,setUserScore);

  return (
      
<div className="flex flex-col-reverse lg:flex-row"> 
  <div className='lg:w-1/2 p-4 order-2 lg:order-1'>
    {/* Adjust the width as needed */}
    {page}
  </div>
  <div className="lg:w-1/2 order-1 lg:order-2"> {/* Set width to 1/2 to arrange two boxes in one line */}
    <div className="h-full w-full block p-4 justify-center items-center">
      <img
        src={img}
        alt='Nephron Microanatomy 1'
        className="w-full h-auto"
        onDragOver={e => e.preventDefault()}
        onDrop={window.handleSentenceDrop}
      />
    </div>
  </div>
</div>
  )}


export { WaterDisributionDnD1_1, };