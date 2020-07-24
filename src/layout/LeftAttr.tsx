import React, { useState } from "react";
import Background from "../components/Background";
import { RootStateI } from "../store";
import { useSelector } from "react-redux";

const style: React.CSSProperties = {
  backgroundColor: "yellow",
  width: "200px",
  height: "200px",
};

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
        width: "40%",
      }}
    >
      <Background itemKey={newItemKey} />
    </div>
  );
}
