import { useEffect, useRef, useState } from "react";

const W = 360;
const H = 640;
const MAX_LIFE = 3;

// スコア整形関数（000,000,000形式）
function formatScore(num) {
  return num.toString().padStart(9, "0").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default function GameCanvas({ setScore, setLife, setBombs, paused }) {
  const cvsRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const cvs = cvsRef.current;
    const ctx = cvs.getContext("2d");
    cvs.width = W;
    cvs.height = H;

    const bgImg = new Image();
    const playerImg = new Image();
    const bulletImg = new Image();
    const enemyImg = new Image();

    bgImg.src = "/img/bg_tooth_surface.png";
    playerImg.src = "/img/player_tbrush.png";
    bulletImg.src = "/img/weapon_brush_shot.png";
    enemyImg.src = "/img/enemy_cavity_a.png";

    let px = W / 2 - 60,
      py = H - 120;
    const bullets = [],
      enemies = [];
    let score = 0,
      frame = 0,
      life = MAX_LIFE;

    const move = (e) => {
      const r = cvs.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      px = Math.max(0, Math.min(x - 60, W - 120));
    };
    cvs.addEventListener("mousemove", move);
    cvs.addEventListener("touchmove", move);

    const shoot = () => {
      if (!paused) {
        bullets.push({ x: px + 44, y: py - 10 });
      }
    };
    window.addEventListener("keydown", (e) => e.code === "Space" && shoot());
    cvs.addEventListener("click", shoot);

    let animationId;

    enemyImg.onload = () => {
      const loop = () => {
        if (paused || gameOver) {
          animationId = requestAnimationFrame(loop);
          return;
        }

        frame++;

        bullets.forEach((b) => (b.y -= 8));
        if (frame % 60 === 0)
          enemies.push({ x: Math.random() * (W - 100), y: -100 });
        enemies.forEach((e) => (e.y += 2));

        bullets.forEach((b, bi) => {
          enemies.forEach((e, ei) => {
            if (hit(b.x, b.y, 32, 32, e.x, e.y, 100, 100)) {
              bullets.splice(bi, 1);
              enemies.splice(ei, 1);
              score++;
              setScore(score);
            }
          });
        });

        enemies.forEach((e, ei) => {
          if (hit(px, py, 120, 120, e.x, e.y, 100, 100)) {
            enemies.splice(ei, 1);
            life--;
            setLife(life);
            if (life <= 0) setGameOver(true);
          }
        });

        ctx.drawImage(bgImg, 0, 0, W, H);
        ctx.drawImage(playerImg, px, py, 120, 120);
        bullets.forEach((b) => ctx.drawImage(bulletImg, b.x, b.y, 32, 32));
        enemies.forEach((e) => ctx.drawImage(enemyImg, e.x, e.y, 100, 100));

        // スコア表示（子供向けフォント＆カラー）
        ctx.font = "18px 'Rounded Mplus 1c', sans-serif";
        ctx.fillStyle = "#007ACC";
        ctx.fillText(`クリーンポイント: ${formatScore(score)}`, 10, 30);

        // HP表示
        ctx.fillStyle = "#e60039";
        ctx.fillText(`歯の健康度: ${"❤️".repeat(life)}`, 10, 55);

        animationId = requestAnimationFrame(loop);
      };
      loop();
    };

    return () => {
      cvs.removeEventListener("mousemove", move);
      cvs.removeEventListener("touchmove", move);
      cvs.removeEventListener("click", shoot);
      window.removeEventListener("keydown", shoot);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver, setScore, setLife, paused]);

  const hit = (x1, y1, w1, h1, x2, y2, w2, h2) =>
    x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;

return (
  <div className="game-wrapper">
    {!gameOver && (
      <button
        className="pause-button"
        onClick={() => setPaused((prev) => !prev)}
        aria-label="Pause"
      ></button>
    )}
    {gameOver ? (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
          color: "#fff",
        }}
      >
        <h1>GAME OVER</h1>
        <button onClick={() => window.location.reload()}>TRY AGAIN</button>
      </div>
    ) : (
      <canvas ref={cvsRef}></canvas>
    )}
  </div>
);
}
