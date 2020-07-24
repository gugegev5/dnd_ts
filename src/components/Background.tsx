import React, { Dispatch } from "react";
import { Input } from "antd";
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
import { ItemsActionTypesI, ItemsActionNames } from "../store/Items";

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

  const styles = useSelector(
    (state: RootStateI) => {
      const itemProps = state.Items[itemKey];
      return itemProps?.styles || defaultStyles;
    },
    (left, right) => {
      return false;
    }
  );

  const [{ opacity }, drag] = useDrag<
    CommonDragItemI,
    any,
    CommonDragCollectedPropsI
  >({
    item: { type: dragType, itemKey, compositionActionName },
    end: (item, monitor) => {
      //delete
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

const UpdateBoard: React.FC<{ itemKey: string }> = ({ itemKey }) => {
  const dispatch = useDispatch<Dispatch<ItemsActionTypesI>>();
  const styles = useSelector((state: RootStateI) => {
    const itemProps = state.Items[itemKey];
    return itemProps?.styles || defaultStyles;
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div>宽：</div>
      <div>
        <Input
          value={styles.width || "100px"}
          onChange={(e) => {
            dispatch({
              type: ItemsActionNames.UPDATE,
              sourceItemKey: itemKey,
              sourceItemType: ItemTypes.Background,
              styles: { width: e.target.value },
            });
          }}
        />
      </div>
      <div>高：</div>
      <div>
        <Input
          value={styles.height || "200px"}
          onChange={(e) => {
            dispatch({
              type: ItemsActionNames.UPDATE,
              sourceItemKey: itemKey,
              sourceItemType: ItemTypes.Background,
              styles: { height: e.target.value },
            });
          }}
        />
      </div>
      <div>背景颜色：</div>
      <div>
        <Input
          value={styles.backgroundColor || "#FFFFFF"}
          onChange={(e) => {
            dispatch({
              type: ItemsActionNames.UPDATE,
              sourceItemKey: itemKey,
              sourceItemType: ItemTypes.Background,
              styles: { backgroundColor: e.target.value },
            });
          }}
        />
      </div>
      <div>背景图：</div>
      <div>
        <Input
          value={styles.backgroundImage}
          onChange={(e) => {
            dispatch({
              type: ItemsActionNames.UPDATE,
              sourceItemKey: itemKey,
              sourceItemType: ItemTypes.Background,
              styles: { backgroundImage: e.target.value },
            });
          }}
        />
      </div>
    </div>
  );
};

const LeftAttr: React.FC<BoxProps> = ({ itemKey }) => {
  return (
    <>
      <Background itemKey={itemKey} />
      <UpdateBoard itemKey={itemKey} />
    </>
  );
};
export default LeftAttr;
