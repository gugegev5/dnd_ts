import React, { Dispatch } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ItemTypes,
  CommonDragItemI,
  CommonDragCollectedPropsI,
} from "./ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootStateI } from "../store";
import {
  CompositionsActionTypesI,
  CompositionsActionNames,
} from "../store/Compositions";
import { dropColorHandler } from "../utils/Interact";

type BoxProps = Pick<CommonDragItemI, "itemKey"> &
  Partial<Pick<CommonDragItemI, "compositionActionName">>;

const defaultStyles = {
  backgroundColor: "white",
  width: "100px",
  height: "100px",
};
const dragType = ItemTypes.Background;
const accept = [ItemTypes.Background];
export const Background: React.FC<BoxProps> = ({
  itemKey,
  compositionActionName = CompositionsActionNames.UPDATE,
  children,
}) => {
  const dispatch = useDispatch<Dispatch<CompositionsActionTypesI>>();

  const styles = useSelector((state: RootStateI) => {
    const itemProps = state.Items[itemKey];
    return itemProps?.styles || defaultStyles;
  });

  const [{ opacity }, drag] = useDrag<
    CommonDragItemI,
    any,
    CommonDragCollectedPropsI
  >({
    item: { type: dragType, itemKey, compositionActionName },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        dispatch({
          type: CompositionsActionNames.DELETE,
          targetItemKey: itemKey,
          sourceItemType: dragType,
        });
        console.log("bg delete itemKey", itemKey);
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const [{ dropStyles }, drop] = useDrop<CommonDragItemI, any, any>({
    accept,
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        //drop when not nested
        dispatch({
          type: CompositionsActionNames.INSERT,
          targetItemKey: itemKey,
          sourceItemType: item.type,
          sourceItemKey: item.itemKey,
        });
      }
    },
    collect: (monitor) => {
      return { dropStyles: { ...dropColorHandler(monitor, styles) } };
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ ...styles, opacity, ...dropStyles }}
    >
      {children}
    </div>
  );
};

export default Background;
