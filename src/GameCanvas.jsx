import { useEffect, useRef } from "react";

const W = 360, H = 640;

export default function GameCanvas() {
  const cvsRef = useRef(null);

  useEffect(() => {
    const cvs = cvsRef.current;
    const ctx = cvs.getContext("2d");
    cvs.width = W;
    cvs.height = H;

    /* === 画像 === */
    const bgImg     = new Image();
    const playerImg = new Image();
    const bulletImg = new Image();
    const enemyImg  = new Image();

    bgImg.src     = "/img/bg_tooth_surface.png";   // 背景（大きなお口）
    playerImg.src = "/img/player_tbrush.png";
    bulletImg.src = "/img/weapon_brush_shot.png";
    enemyImg.src  = "/img/enemy_cavity_a.png";

    /* === 状態 === */
    let px = W / 2 - 60,
      py = H - 120;
    const bullets = [],
      enemies = [];
    let score = 0,
      frame = 0;

    /* ★ 追加: 背景ズーム用の状態 */
    let bgScale = 1.0;          // 拡大倍率
    const ZOOM_SPEED = 0.00003; // 1フレームあたりの倍率増分（超ゆっくり）

    /* === 入力 === */
    const move = (e) => {
      const r = cvs.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      px = Math.max(0, Math.min(x - 60, W - 120));
    };
    cvs.addEventListener("mousemove", move);
    cvs.addEventListener("touchmove", move);

    const shoot = () => bullets.push({ x: px + 44, y: py - 10 });
    window.addEventListener("keydown", (e) => e.code === "Space" && shoot());
    cvs.addEventListener("click", shoot);

    /* === メインループ === */
    enemyImg.onload = () => {
      const loop = () => {
        frame++;

        /* 更新 ---------- */
        // 背景倍率をほんの少しずつ上げる
        bgScale += ZOOM_SPEED;

        bullets.forEach((b) => (b.y -= 8));
        if (frame % 60 === 0)
          enemies.push({ x: Math.random() * (W - 100), y: -100 });
        enemies.forEach((e) => (e.y += 2));

        // 当たり判定
        bullets.forEach((b, bi) => {
          enemies.forEach((e, ei) => {
            if (
              b.x < e.x + 100 &&
              b.x + 32 > e.x &&
              b.y < e.y + 100 &&
              b.y + 32 > e.y
            ) {
              bullets.splice(bi, 1);
              enemies.splice(ei, 1);
              score++;
            }
          });
        });

        /* 描画 ---------- */
        // 背景：拡大画像をキャンバス中央に描画
        ctx.fillStyle = "#000"; // 余白を黒で塗り潰し
        ctx.fillRect(0, 0, W, H);

        const bw = bgImg.width * bgScale;
        const bh = bgImg.height * bgScale;
        ctx.drawImage(bgImg, (W - bw) / 2, (H - bh) / 2, bw, bh);

        // そのほかオブジェクト
        ctx.drawImage(playerImg, px, py, 120, 120);
        bullets.forEach((b) => ctx.drawImage(bulletImg, b.x, b.y, 32, 32));
        enemies.forEach((e) => ctx.drawImage(enemyImg, e.x, e.y, 100, 100));

        // スコア
        ctx.fillStyle = "#000";
        ctx.font = "20px sans-serif";
        ctx.fillText("Score: " + score, 10, 30);

        requestAnimationFrame(loop);
      };
      loop();
    };

    /* クリーンアップ */
    return () => {
      cvs.removeEventListener("mousemove", move);
      cvs.removeEventListener("touchmove", move);
      cvs.removeEventListener("click", shoot);
      window.removeEventListener("keydown", shoot);
    };
  }, []);

  return <canvas ref={cvsRef}></canvas>;
}
