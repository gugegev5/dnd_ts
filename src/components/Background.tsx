import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { useSelector } from "react-redux";
import { RootStatesI } from "../store";

export interface BoxProps {
  itemKey: string;
}
const dragType = ItemTypes.Background;

export const Background: React.FC<BoxProps> = ({ itemKey, children }) => {
  const [{ opacity }, drag] = useDrag({
    item: { type: dragType },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const styles = useSelector((state: RootStatesI) => {
    const itemProps = state.Items[itemKey];
    return itemProps.styles;
  });

  return (
    <div ref={drag} style={{ ...styles, opacity }}>
      {children}
    </div>
  );
};

export default Background;
