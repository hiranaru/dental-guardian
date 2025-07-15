import { useEffect, useRef } from "react";
import playerImg from '../img/player_tbrush.png';

const W = 360, H = 640;

export default function GameCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d");
    cvs.width = W;
    cvs.height = H;

    // 歯ブラシ画像を読み込む
    const playerImg = new Image();
    playerImg.src = "/img/player_tbrush.png";   // ← public/img に置いたパス

    let x = W / 2 - 60;
    const y = H - 120;

    // 指・マウスに合わせて左右移動
    const move = (e) => {
      const rect = cvs.getBoundingClientRect();
      const posX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      x = posX - 60;             // 画像幅 120px の半分
    };
    cvs.addEventListener("mousemove", move);
    cvs.addEventListener("touchmove", move);

    // 画像ロード後にループ開始
    playerImg.onload = () => {
      const loop = () => {
        // 背景クリア
        ctx.fillStyle = "#f4faff";
        ctx.fillRect(0, 0, W, H);

        // プレイヤー描画
        ctx.drawImage(playerImg, x, y, 120, 120);

        requestAnimationFrame(loop);
      };
      loop();
    };

    // クリーンアップ
    return () => {
      cvs.removeEventListener("mousemove", move);
      cvs.removeEventListener("touchmove", move);
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
