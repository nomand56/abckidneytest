/* eslint-disable react/prop-types */
import { useState } from 'react';
import DragAndDropText from './DragAndDrop.jsx';
import nephron from "../../../../../core/assets/nephron1DnD.jpg"


const NephronDnD1_1 = ({
    questionTopic,
    correctAnswer,
    fullAnswer,
    answers: answer,
    imgPath,
    imgIndex,
    setUserScore
}) => {
console.log("questionTopic", questionTopic)
console.log("correctAnswer", correctAnswer)
console.log("fullAnswer", fullAnswer)
console.log("answer", answer)

    const [answers, setAnswers] = useState(answer)
    const [img, setImg] = useState(imgPath + imgIndex + "/0.png")

    const page = DragAndDropText(questionTopic, fullAnswer, answers, setAnswers, correctAnswer, imgPath, imgIndex, setImg,setUserScore);

    return (
      <div className="flex flex-col-reverse lg:flex-row">
      <div className="lg:w-3/4 p-4 order-2 lg:order-1 align-middle justify-center">
        {/* Your page content */}
        {page}
      </div>
      <div className="lg:w-2/3 order-1 lg:order-1">
  <div className="h-full w-full block p-4 justify-center items-center">
    <img
      src={img}
      alt=""
      className="w-full h-auto lg:max-w-full lg:h-auto xl:max-w-full xl:h-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={window.handleSentenceDrop}
    />
  </div>
</div>

    </div>
  );
};


export { NephronDnD1_1, };