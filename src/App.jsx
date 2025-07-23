import { useState } from "react";
import GameCanvas from "./GameCanvas";

export default function App() {
  const [started, setStarted] = useState(false);

  return started ? (
    <GameCanvas />
  ) : (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* スタート画像全体 */}
      <img
        src="/img/start.png"
        alt="Start Screen"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* スタートボタンの透明なクリック領域（画像内のボタン位置に合わせる） */}
      <div
        onClick={() => setStarted(true)}
        style={{
          position: "absolute",
          left: "50%",           // ボタンの左端
          top: "75%",            // ボタンの上端（お好みで調整）
          transform: "translateX(-50%)",
          width: "200px",        // ボタンの幅（画像に合わせて調整）
          height: "60px",        // ボタンの高さ
          cursor: "pointer",
        }}
      />
    </div>
  );
}
