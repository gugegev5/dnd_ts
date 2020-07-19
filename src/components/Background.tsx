import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export interface BoxProps {
  styles: React.CSSProperties;
}
const dragType = ItemTypes.Background;
export const Background: React.FC<BoxProps> = ({ styles, children }) => {
  const [{ opacity }, drag] = useDrag({
    item: { type: dragType },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div ref={drag} style={{ ...styles, opacity }}>
      {children}
    </div>
  );
};

export default Background;
