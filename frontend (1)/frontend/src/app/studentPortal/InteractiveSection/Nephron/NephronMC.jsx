/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const MCbutton = ({ mc, checkAnswer }) => {
    const [opac, setOpac] = useState(0);

    return (
        <div
            className="bg-lightblue absolute"
            onMouseEnter={() => setOpac(50)}
            onMouseLeave={() => setOpac(0)}
            onClick={() => checkAnswer(mc?.id)} // Added null check for mc.id
            style={{
                opacity: `${opac}%`,
                left: mc?.left || '0%', // Added null check and default value
                top: mc?.top || '0%', // Added null check and default value
                width: mc?.width || '100%', // Added null check and default value
                height: mc?.height || '100%', // Added null check and default value
                backgroundColor: 'blue',
                cursor: 'pointer',
                borderRadius: '20px',
            }}
        />
    );
};

const NephronMC = ({ answermsg, question, idx, setidx, products, checkAnswer }) => {
    console.log(answermsg)
    useEffect(() => {
        setidx(idx);
    }, [idx, setidx]);

    const listItems = products?.map((mc) => <MCbutton key={mc?.id} mc={mc} checkAnswer={checkAnswer} />) || null; // Added null check

    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:w-fit-content relative">
                <img src="/nephronMC.png" alt="Nephron" className="h-full w-auto" />
                {listItems}
            </div>
            <div className="w-full md:w-1/2 p-4 relative">
                <h3 className="my-8 border-2 px-2 py-2 text-lg font-bold border-black">Click the part of the nephron that corresponds to each statement</h3>
                <h3 className="border border-black px-2 py-2">{question}</h3>

                <div className={`rounded-lg mt-10 ${
  answermsg === "Try again"
    ? 'bg-gradient-to-r from-red-500 to-red-700 text-white py-2'
    : answermsg !== ""
    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white  '
    : ''
}`}>
  <p>
    {answermsg}
  </p>
</div>
         
                   </div>
        </div>
    );
};

export default NephronMC;