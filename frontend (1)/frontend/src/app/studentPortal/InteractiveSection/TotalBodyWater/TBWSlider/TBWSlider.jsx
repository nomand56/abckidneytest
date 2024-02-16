/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from "./TBSSlider.module.css";
import waterImg from "../../../../../core/assets/femalBlackwater.png"
import womenImage from "../../../../../core/assets/femaleBlack.png"
import saltImage from "../../../../../core/assets/femalBlacksalt.png"
export default function TBWSlider({
  waterValue: water,
  saltValue: salt,
  description,
  solutionfn,
  message,
}) {
  const [messages, setMessages] = useState("");
  const [saltValue, setSaltValue] = useState(salt);
  const [waterValue, setWaterValue] = useState(water);

  function handleSubmit() {
    if (solutionfn(waterValue, saltValue)) {
      setMessages(message);
    } else {
      setMessages('Try again');
    }
  }

  return (
    <div className="flex items-center h-full " style={{display:'flex', flexWrap:'wrap',height:'150%'}}>
      <div className={styles.middlepng}>
        <svg className={styles.svgdiv} viewBox="0 0 150 500">
          <rect y={"0%"} fill="#eed2ac" width="100%" height="100%" />
          <rect
            y={100 - waterValue + "%"}
            fill="#134872"
            width="100%"
            height="100%"
          />
          <text x="29%" y="53%" fontSize={'smaller'} fill="white">
            Euvolemia
          </text>
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="black"
            strokeWidth="2px"
          />
        </svg>


        <img src='/blank_maledark.png' alt="Person" className={styles.personimg} />
        <img src={waterImg} alt="WaterIcon" className={styles.icon} />
        <input
          type="range"
          className={styles.slider}
          min={1}
          max={100}
          defaultValue={water}
          id="waterRange"
          onChange={(e) => {
            setWaterValue(e.target.value)
            console.log("water rane here", e.target.value)
          }}
        />
      </div>
      <div className={styles.middlepng}>
        <svg className={styles.svgdiv} viewBox="0 0 150 500">
          <rect y={"0%"} fill="#eed2ac" width="100%" height="100%" />
          <rect
            y={100 - saltValue + "%"}
            fill="#dde1e4"
            width="100%"
            height="100%"
          />
          <text x="29%" y="53%" fontSize={'smaller'}>
            Euvolemia
          </text>
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="black"
            strokeWidth="2px"
          />
        </svg>
        <img src='/blank_maledark.png' alt="Person" className={styles.personimg} />
        <img src={saltImage} alt="SaltIcon" className={styles.icon} />

        <input
          type="range"
          className={styles.slider}
          min={1}
          max={100}
          defaultValue={salt}
          id="saltRange"
          onChange={(e) => setSaltValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col shadow-md rounded-lg bg-white p-4 w-full md:w-3/4 lg:w-1/2 xl:w-3/4">
        <h2 className="text-xl font-bold mb-4">Question:</h2>
        <div className="mb-4 ">
          <h3 className="text-xl max-md:font-thin max-md:text-sm font-bold">
            {description}
          </h3>
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
