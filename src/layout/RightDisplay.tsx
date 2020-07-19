import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../components/ItemTypes";
import { Background } from "../components/Background";

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

type CompositionItem = {
  type: ItemTypes;
  styles: React.CSSProperties;
  childrens: Array<CompositionItem>;
};

function getComponent(type: ItemTypes): React.FC<any> {
  if (type === ItemTypes.Background) {
    return Background;
  } else {
    return () => <div />;
  }
}

function renderRecursion(compositions: Array<CompositionItem>): any {
  return compositions.map((composition) => {
    return /*#__PURE__*/ React.createElement(
      getComponent(composition.type),
      { styles: composition.styles },
      ...(composition.childrens.length
        ? renderRecursion(composition.childrens)
        : [])
    );
  });
}

function RenderCompositions({
  compositions,
}: {
  compositions: Array<CompositionItem>;
}): any {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    ...renderRecursion(compositions)
  );
}

const RightDisplay: React.FC<BgProps> = ({ accept, onDrop }) => {
  const compositions: Array<CompositionItem> = [
    {
      type: ItemTypes.Background,
      styles: { backgroundColor: "yellow", width: "200px", height: "200px" },
      childrens: [
        {
          type: ItemTypes.Background,
          styles: { backgroundColor: "red", width: "100px", height: "100px" },
          childrens: [],
        },
      ],
    },
    {
      type: ItemTypes.Background,
      styles: { backgroundColor: "blue", width: "200px", height: "200px" },
      childrens: [
        {
          type: ItemTypes.Background,
          styles: { backgroundColor: "white", width: "100px", height: "100px" },
          childrens: [],
        },
      ],
    },
  ];

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <RenderCompositions compositions={compositions} />
    </div>
  );
};

export default RightDisplay;
