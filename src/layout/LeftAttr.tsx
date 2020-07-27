import React from "react";
import Background from "../components/Background";
import { RootStateI } from "../store";
import { useSelector } from "react-redux";
import { CompositionsActionNames } from "../store/Compositions";

export default function () {
  const newItemKey = useSelector((state: RootStateI) => {
    return state.ItemKey.newItemKey;
  });
  return (
    <div
      className="left"
      style={{
        // padding: "0 24px",
        margin: "0 10px",
        textAlign: "center",
        width: "50%",
      }}
    >
      <Background
        itemKey={newItemKey}
        compositionActionName={CompositionsActionNames.INSERT}
      />
    </div>
  );
}
