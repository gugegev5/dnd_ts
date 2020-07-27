import React, { Dispatch } from "react";
import { Input, Select } from "antd";
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
  const dispatch = useDispatch<
    Dispatch<CompositionsActionTypesI | ItemsActionTypesI>
  >();

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
      console.log("drag ", compositionActionName);
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
      //drop when not nested
      if (!monitor.didDrop()) {
        if (item.compositionActionName === CompositionsActionNames.INSERT) {
          dispatch({
            type: CompositionsActionNames.INSERT,
            targetItemKey: itemKey,
            sourceItemType: item.type,
            sourceItemKey: item.itemKey,
          });
        } else {
          //update
          const delta = monitor.getDifferenceFromInitialOffset() as {
            x: number;
            y: number;
          };
          let left = Math.round(
            parseInt((styles.left as string) || "0", 10) + delta.x
          );
          let top = Math.round(
            parseInt((styles.top as string) || "0", 10) + delta.y
          );
          dispatch({
            type: ItemsActionNames.UPDATE,
            sourceItemKey: item.itemKey,
            sourceItemType: item.type,
            styles: { top, left },
          });
          console.log("relative", delta);
        }
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
      data-itemKey={itemKey}
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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            flex: "1 0 70px",
            textAlignLast: "right",
          }}
        >
          宽：
        </span>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            flex: "1 0 70px",
            textAlignLast: "right",
          }}
        >
          高：
        </span>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            flex: "1 0 70px",
            textAlignLast: "right",
          }}
        >
          背景颜色：
        </span>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            flex: "1 0 70px",
            textAlignLast: "right",
          }}
        >
          背景图：
        </span>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            flex: "1 0 70px",
            textAlignLast: "right",
          }}
        >
          position：
        </span>
        {/* todotodo */}
        <Select
          style={{ width: "100%" }}
          defaultValue="static"
          onChange={(value) => {
            dispatch({
              type: ItemsActionNames.UPDATE,
              sourceItemKey: itemKey,
              sourceItemType: ItemTypes.Background,
              styles: { position: value as "relative" },
            });
          }}
        >
          <Select.Option value="static">static</Select.Option>
          <Select.Option value="relative">relative</Select.Option>
        </Select>
      </div>
    </div>
  );
};

const LeftAttr: React.FC<BoxProps> = ({ itemKey, compositionActionName }) => {
  return (
    <>
      <Background
        itemKey={itemKey}
        compositionActionName={compositionActionName}
      />
      <UpdateBoard itemKey={itemKey} />
    </>
  );
};
export default LeftAttr;
