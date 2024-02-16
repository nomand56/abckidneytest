import React from 'react';
import { Clipboard, Play, ChartBar, CheckCircle,  TrendingUp } from 'heroicons-react';
import { MdListAlt } from 'react-icons/md';

const cardData = [
  {
    icon: Clipboard,
    heading: 'What is ABC Kidney?',
    description: 'ABC Kidney is an open-access, dynamic and interactive kidney physiology educational tool designed to simplify concepts and make kidney physiology approachable in familiar virtual formats ',
  },
  {
    icon: Play,

    heading: 'Tutorials',
    description: 'We use simple animated models to illustrate complex kidney physiology topics while integrating clinical vignettes to blend physiology with key clinical concepts.',
  },
  {
    icon: CheckCircle,

    heading: 'Interactive quizzes',
    description: 'Interactive modules encourage the learner to  apply key learned concepts through interactive physiology quizzes.',
  },
  {
    icon: MdListAlt,

    heading: 'Multiple choice questions',
    description: 'Quiz yourself on current or learned knowledge, receive immediate feedback and track your progress!',
  },
  {
    icon: ChartBar,
    heading: 'Optimized for self-directed learning ',
    description: 'Easy to navigate with learning objectives at your fingertips to identify learning needs. ',
  },
  {
    icon: TrendingUp,

    heading: 'Track your progress!',
    description: 'As you progress through the educational modules, track your progress and directly observe your improvement with multiple types of quizzes.',
  },
];

const CardGrid = () => {
  return (
<div className="flex flex-wrap">
  {cardData.map((card, index) => (
    <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-4">
      <div className="flex flex-col h-full">
        <div className="bg-white text-black rounded-lg shadow-lg flex-grow transition-transform duration-300 transform hover:-translate-y-1">
          <div className="text-center bg-primary p-7 rounded-t-lg shadow-lg border-b-2 border-black">
            {React.createElement(card.icon, { size: 68, className: 'text-white transition-height duration-300 hover:h-12' })}
          </div>
          <h2 className="text-2xl font-semibold mt-4 text-center">{card.heading}</h2>
          <p className="mt-2 p-4 flex-grow">{card.description}</p>
        </div>
      </div>
    </div>
  ))}
</div>


  );
};

export default CardGrid;
