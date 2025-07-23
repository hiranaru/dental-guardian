import { useState } from "react";
import GameCanvas from "./GameCanvas";

export default function App() {
  const [started, setStarted] = useState(false);

  return started ? (
    <GameCanvas />
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
          cursor: "pointer"
        }}
      />
    </div>
  );
}
