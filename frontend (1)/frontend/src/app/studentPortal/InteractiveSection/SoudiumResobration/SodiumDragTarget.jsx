import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
    TEXT: 'text',
};

const DropTarget = ({ answers, step, onCorrectDrop }) => {
    const [vibrate, setVibrate] = useState(false);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.TEXT,
        drop: (item) => {

            onCorrectDrop(item.text)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                padding: '20px',
                border: `2px ${vibrate ? 'dashed red' : 'solid black'}`,
                marginBottom: '20px',
            }}
        >
            {isOver && canDrop && <div>Release to drop</div>}
            {vibrate && <div style={{ color: 'red' }}>Incorrect! Please try again.</div>}
        </div>
    );
};
export default DropTarget;

