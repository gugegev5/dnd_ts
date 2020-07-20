import React from "react";
import Background from "../components/Background";

const style: React.CSSProperties = {
  backgroundColor: "yellow",
  width: "200px",
  height: "200px",
};

export default function a() {
  return (
    <div
      className="left"
      style={{
        padding: 24,
        textAlign: "center",
        borderRight: "black solid 1px",
        width: "40%",
      }}
    >
      <Background itemKey={'1'} />
    </div>
  );
}
