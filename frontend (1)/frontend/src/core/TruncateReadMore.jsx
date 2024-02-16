/* eslint-disable react/prop-types */

import { useState } from "react";

const TruncateReadMore = ({ text, maxLength,key }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    const displayText = isTruncated ? text.slice(0, maxLength) : text;

    return (
        <div key={key} >
            <p className="text-lightgray text-justify">{isTruncated ? `${displayText}...` : displayText }</p>
            {text?.length > maxLength && (
                <button onClick={toggleTruncate} style={{ color: "darkblue" }}>
                    {isTruncated ? 'Read more' : 'Show less'}
                </button>
            )}
        </div>
    );
};

export default TruncateReadMore;
