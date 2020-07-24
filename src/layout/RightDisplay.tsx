import React, { Dispatch } from "react";
import { useDrop } from "react-dnd";
import {
  ItemTypes,
  defaultItemKeys,
  CommonDragItemI,
} from "../components/ItemTypes";
import { Background } from "../components/Background";
import {
  CompositionItemStateI,
  CompositionsActionTypesI,
  CompositionsActionNames,
} from "../store/Compositions";
import { useSelector, useDispatch } from "react-redux";
import { RootStateI } from "../store";
import { List, is } from "immutable";
import { dropColorHandler } from "../utils/Interact";

const style: React.CSSProperties = {
  textAlign: "center",
  width: "50%",
  border: "red solid",
};

export interface BgProps {}

function getComponent(type: ItemTypes): React.FC<any> {
  if (type === ItemTypes.Background) {
    return Background;
  } else {
    return () => <div />;
  }
}

function renderRecursion(compositions: List<CompositionItemStateI>): any {
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
  compositions: List<CompositionItemStateI>;
}): any {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    ...renderRecursion(compositions)
  );
}

const accept = [ItemTypes.Background];
const RightDisplay: React.FC<BgProps> = () => {
  const itemKey = defaultItemKeys.Default;
  const dispatch = useDispatch<Dispatch<CompositionsActionTypesI>>();

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
      return { dropStyles: { ...dropColorHandler(monitor, style) } };
    },
  });

  const compositions = useSelector(
    (state: RootStateI) => {
      return state.Compositions.get("childrens");
    },
    (a, b) => is(a, b)
  );
  // console.log(compositions.toJS());
  return (
    <div ref={drop} style={{ ...style, ...dropStyles }}>
      <RenderCompositions compositions={compositions} />
    </div>
  );
};

export default RightDisplay;
