import React, { Dispatch } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes, defaultItemKeys } from "../components/ItemTypes";
import { Background } from "../components/Background";
import {
  CompositionItemI,
  CompositionsActionTypesI,
  CompositionsActionNames,
} from "../store/Compositions";
import { useSelector, useDispatch } from "react-redux";
import { RootStatesI } from "../store";
import { List } from "immutable";
import ItemKeyGen from "../utils/ItemKeyGen";

const style: React.CSSProperties = {
  textAlign: "center",
  width: "60%",
  border: "red solid",
};

export interface BgProps {
  // accept: string[];
  // onDrop: (item: any) => void;
}

function getComponent(type: ItemTypes): React.FC<any> {
  if (type === ItemTypes.Background) {
    return Background;
  } else {
    return () => <div />;
  }
}

function renderRecursion(compositions: List<CompositionItemI>): any {
  return compositions.map((composition) => {
    return /*#__PURE__*/ React.createElement(
      getComponent(composition.get("itemType")),
      { itemKey: composition.get("itemKey") },
      ...(composition.get("childrens").size
        ? renderRecursion(composition.get("childrens"))
        : [])
    );
  });
}

function RenderCompositions({
  compositions,
}: {
  compositions: List<CompositionItemI>;
}): any {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    ...renderRecursion(compositions)
  );
}

const accept = [ItemTypes.Background];
const RightDisplay: React.FC<BgProps> = () => {
  const dispatch = useDispatch<Dispatch<CompositionsActionTypesI>>();
  const [{ backgroundColor = "#222" }, drop] = useDrop({
    accept,
    drop: () => {
      dispatch({
        type: CompositionsActionNames.INSERT,
        targetItemKey: defaultItemKeys.Default,
        sourceItemType: ItemTypes.Background,
        sourceItemKey: ItemKeyGen(),
      });
    },
    collect: (monitor) => {
      const isOver = monitor.isOver(),
        canDrop = monitor.canDrop();
      const isActive = isOver && canDrop;
      let bgColor;
      if (isActive) {
        bgColor = "darkgreen";
      } else if (canDrop) {
        bgColor = "darkkhaki";
      }
      return { backgroundColor: bgColor };
    },
  });

  const compositions = useSelector((state: RootStatesI) => {
    return state.Compositions.get("childrens");
  });
  console.log(compositions.toJS());
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <RenderCompositions compositions={compositions} />
    </div>
  );
};

export default RightDisplay;
