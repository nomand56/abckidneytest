import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Link } from "react-router-dom";
import "./styles.css";

// eslint-disable-next-line react/prop-types
export default function InteractiveSlider({ desc, solutions, solutionfn, message, onScoreUpdate }){
  const [percentage, setPercentage] = useState(50);
  const [values, setValues] = useState([50, 70]);
  const [description, setDescription] = useState(desc);
  const [messages, setMessages] = useState('');

  function log(value) {
    setValues(value);
  }

  function singlelog(value) {
    setPercentage(value);
  }

  function passedfn() {
    const isCorrect = solutionfn(values[0], values[1], percentage);

    if (isCorrect) {
      setMessages(
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded">
          <div className="message-box">
            <p className="text-base">{message}</p>
          </div>
        </div>
      );
    } else {
      setMessages(
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-4 rounded">
          <div className="message-box">
            <p className="text-base">Try again</p>
          </div>
        </div>
      );
    }

    onScoreUpdate(isCorrect);
  }
  return (
<div className="interactiveSliderdiv ">
  <div className="slidercontentdiv">
    
    <div className="leftslider">
      <Slider
        vertical
        range
        allowCross={false}
        defaultValue={values}
        onChange={log}
        className="range2"
      />
    </div>
    <div className="middlepng">
      <svg className="svgdiv" viewBox="0 0 175 500">
        <rect y={"0%"} fill="#836740" width="100%" height="100%" />
        <rect
          y={100 - values[1] + "%"}
          fill="#2281cd"
          width="100%"
          height="100%"
        />
        <rect
          y={
            100 -
            (values[0] + (percentage / 100) * (values[1] - values[0])) +
            "%"
          }
          fill="#cfe1f0"
          width="100%"
          height="100%"
        />
        <rect
          y={100 - values[0] + "%"}
          fill="#134872"
          width="100%"
          height="100%"
        />
      </svg>
      <img src="/blank_maledark.png" className="personimg " />
    </div>
    <div className="rightslider">
      <Slider
        vertical
        defautValue={percentage}
        style={{
          top: 100 - values[1] + "%",
          left: 0,
          width: "100%",
          height: values[1] - values[0] + "%",
        }}
        className="range1"
        max={100}
        id="myRange"
        onChange={singlelog}
      />
    </div>
   
  
    <div className="flex flex-col">
      <p className="textfont text-base xl:text-2xl my-8 font-bold">{description}</p>
      <h3 className="text-lg xl:text-xl ">{messages}</h3>
    </div>
  </div>
  <div className="button-container">
    <button className="submitbutton " onClick={passedfn}>
      Submit
    </button>
  </div>
</div>


  
  );
}
