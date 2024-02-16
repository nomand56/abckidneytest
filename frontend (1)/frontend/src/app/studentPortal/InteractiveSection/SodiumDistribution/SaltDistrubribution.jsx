/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './salt.module.css';
import D5Wimg from '../../../../core/assets/SaltDistributionMC_D5W.png';
import ICimg from '../../../../core/assets/SaltDistributionMC_IC.png';
import Pimg from '../../../../core/assets/SaltDistributionMC_P.png';
import Unkimg from '../../../../core/assets/SaltDistributionMC_Unk.png';

function SaltDistributionMCgif({ answer, message, gif,description }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [leftImg, setLeftImg] = useState(Unkimg);

    const images = [ICimg, D5Wimg, Pimg, Unkimg];

    const checkAnswer = (idx) => {
        setSelectedAnswer(idx);
        setLeftImg(images[idx]);
    };

    return (
        <div className={`${styles.interactiveSliderdiv} flex flex-col md:flex-row shadow-lg bg-gradient-to-r p-6`}>
            <div className={styles.slidercontentdiv}>
                <div className={styles.middlepng}>
                    <img src={gif} alt="Woman" className={styles.persongif} />
                    <img src={leftImg} alt="Unknown"  className={styles.fluidChange} />
                </div>
                <div className={`${styles.rightslider}  max-lg:h-72`}>
                    <img src={ICimg} alt="IC" className={styles.fluidimg} onClick={() => checkAnswer(0)} />
                    <img src={D5Wimg} alt="D5W" className={styles.fluidimg} onClick={() => checkAnswer(1)} />
                    <img src={Pimg} alt="Plasma" className={styles.fluidimg} onClick={() => checkAnswer(2)} />
                </div>
            </div>

            <div className={`${styles.descdiv} mt-4 md:mt-0 md:ml-4`}>
                <h3 className="text-xl font-bold mb-2">{description}</h3>
                {selectedAnswer === answer && (
                    <h3 style={{ border: '1px solid', borderColor: 'black' }} className="  bg-gradient-to-r from-green-300 to-green-500 text-white p-6 shadow-md rounded-lg ">{message}</h3>
                )}
                {selectedAnswer !== answer && selectedAnswer !== null && (
                    <p className="font-bold mt-12row-span-1 answer-card bg-gradient-to-r from-red-300 to-red-500 text-white p-6">Try again!</p>
                )}
            </div>
        </div>
    );
}

export default SaltDistributionMCgif;