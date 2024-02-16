import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const ItemTypes = {
    TEXT: 'text',
};
const DraggableText = ({ text }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TEXT,
        item: { text },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        

        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                padding: '2px',
                border: '1px solid grey',
                borderRadius: '5px',
                
            }}
            >
            {text}
        </div>
            
    );
};
export default DraggableText;