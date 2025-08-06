import { useState } from "react";
import GameCanvas from "./GameCanvas";
import GameUI from "./GameUI.jsx";
import "./GameUI.css"; // UI用CSS
import "../App.css";   // グローバルCSS

export default function App() {
  const [started, setStarted] = useState(false);

  // ゲーム中のステータス管理
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(5);
  const [bombs, setBombs] = useState(3);
  const [paused, setPaused] = useState(false); // ポーズ状態

  // ポーズボタン押下時の処理
  const handlePause = () => {
    setPaused(prev => !prev);
  };

  return started ? (
    <div className="game-wrapper">
      <GameCanvas
        setScore={setScore}
        setLife={setLife}
        setBombs={setBombs}
        paused={paused}
        setPaused={setPaused}
      />
      <GameUI
        score={score}
        life={life}
        bombs={bombs}
        onPause={handlePause}
      />
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
