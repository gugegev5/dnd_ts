import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../components/ItemTypes";
import { Background } from "../components/Background";
import { CompositionItemI } from "../store/Compositions";
import { useSelector } from "react-redux";
import { RootStatesI } from "../store";
import { List } from "immutable";

const style: React.CSSProperties = {
  padding: 24,
  textAlign: "center",
  width: "60%",
  border: "red solid",
};

export interface BgProps {
  accept: string[];
  onDrop: (item: any) => void;
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
    const a = composition.get("itemType");
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

const RightDisplay: React.FC<BgProps> = ({ accept, onDrop }) => {
  const [{ backgroundColor = "#222" }, drop] = useDrop({
    accept,
    drop: onDrop,
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
    return state.Compositions;
  });
  console.log(compositions);
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <RenderCompositions compositions={compositions} />
    </div>
  );
};

export default RightDisplay;
