// Drawer.js
import React from "react";

const Drawer = ({ subtopics, onSubtopicClick }) => {
  return (
    <div className="md:col-span-1 bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Subtopics</h2>
      <ul>
        {subtopics.map((subtopic, index) => (
          <li key={index} className="cursor-pointer" onClick={() => onSubtopicClick(subtopic)}>
            {subtopic}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drawer;
