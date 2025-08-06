import { useState } from "react";
import GameCanvas from "./GameCanvas";
import GameUI from "./GameUI.jsx";
import "./GameUI.css"; // CSSの読み込み

export default function App() {
  const [started, setStarted] = useState(false);

  // ゲーム中のステート（初期値は例）
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(5);
  const [bombs, setBombs] = useState(3);

  const handlePause = () => {
    console.log("ポーズ処理（今後追加）");
    // ここで一時停止処理などを追加予定
  };

  return started ? (
    <div className="game-wrapper">
      {/* GameCanvasにスコア更新用関数を渡す */}
      <GameCanvas
        setScore={setScore}
        setLife={setLife}
        setBombs={setBombs}
      />

      {/* UIに現在のステータスとイベント処理を渡す */}
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
