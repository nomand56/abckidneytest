import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSpring, animated } from 'react-spring';

const ItemTypes = {
  CARD: 'CARD',
};

const actions = [
  'ANp',
  'ADH activity at the V2 receptor',
  'Aquaresis',
  'ADH',
  'Renin',
  'Aldosterone activity',
  'Afferent & efferent renal artery vasodilation',
  'Angiotensin II',
  'Natriuresis',
];

const DraggableCard = ({ id, text, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const style = useSpring({
    opacity: isDragging ? 0.5 : 1,
    scale: isDragging ? 1.1 : 1,
  });

  return (
    <animated.div
      ref={drag}
      style={{
        ...style,
        cursor: 'move',
        padding: '10px',
        margin: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    >
      {text}
    </animated.div>
  );
};

const DroppableContainer = () => {
  const [cards, setCards] = useState(actions);

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCard = cards[dragIndex];

    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, draggedCard);
      return newCards;
    });
  };

  return (
    <div>
      {cards.map((action, index) => (
        <DroppableCard
          key={index}
          index={index}
          text={action}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

const DroppableCard = ({ index, text, moveCard }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={drop} style={{ marginBottom: '20px' }}>
      <DraggableCard id={index} index={index} text={text} moveCard={moveCard} />
    </div>
  );
};

const InteractiveSection = () => {
  return (
    <div>
      <h3>Arrange the actions: Up or Down</h3>
      <DroppableContainer />
    </div>
  );
};

export default InteractiveSection;
