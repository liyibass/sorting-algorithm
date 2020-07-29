import React from "react";
import "./DiagramBar.style.scss";

function DiagramBar({ value }) {
  return <div className="DiagramBar" style={{ height: `${value}%` }}></div>;
}

export default DiagramBar;
