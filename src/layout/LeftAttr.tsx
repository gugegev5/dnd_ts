import React from "react";
import Background from "../components/Background";
import { RootStateI } from "../store";
import { useSelector } from "react-redux";

export default function () {
  const newItemKey = useSelector((state: RootStateI) => {
    return state.ItemKey.newItemKey;
  });
  return (
    <div
      className="left"
      style={{
        padding: 24,
        textAlign: "center",
        width: "50%",
      }}
    >
      <Background itemKey={newItemKey} />
    </div>
  );
}
