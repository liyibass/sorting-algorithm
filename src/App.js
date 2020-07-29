import React, { useEffect, useState } from "react";
import "./styles/base/overall.scss";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer.component";

function App() {
  const barNumber = Math.floor(Math.random() * 50);

  const [width, setWidth] = useState(document.body.clientWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const screenSize = document.body.clientWidth;
      setWidth(screenSize);
    });
  }, []);
  return (
    <div className="App">
      <SortingVisualizer />
    </div>
  );
}

export default App;
