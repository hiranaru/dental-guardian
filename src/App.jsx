import { useState } from "react";
import GameCanvas from "./GameCanvas";
import GameUI from "./GameUI.jsx";
import "./GameUI.css"; // CSSも忘れずに読み込む

export default function App() {
  const [started, setStarted] = useState(false);

  return started ? (
    <div className="game-wrapper">
      <GameCanvas />
      <GameUI />
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: "5vh" }}>
      <img
        src="/img/start.png"
        alt="Start"
        onClick={() => setStarted(true)}
        style={{
          maxHeight: "600px",
          width: "auto",
          height: "auto",
          cursor: "pointer",
        }}
      />
    </div>
  );
}
