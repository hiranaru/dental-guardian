import { useEffect, useRef } from "react";

const W = 360, H = 640;

export default function GameCanvas() {
  const cvsRef = useRef(null);

  useEffect(() => {
    const cvs = cvsRef.current;
    const ctx = cvs.getContext("2d");
    cvs.width = W; cvs.height = H;

    /* === 画像 === */
    const bgImg      = new Image();            /* ★背景画像 */
    const playerImg  = new Image();
    const bulletImg  = new Image();
    const enemyImg   = new Image();

    bgImg.src      = "/img/bg_tooth_surface.png";   /* ★ */
    playerImg.src  = "/img/player_tbrush.png";
    bulletImg.src  = "/img/weapon_brush_shot.png";
    enemyImg.src   = "/img/enemy_cavity_a.png";

    /* === 状態 === */
    let px = W/2-60, py = H-120;
    const bullets = [], enemies = [];
    let score = 0, frame = 0;
    let bgY = 0;                                   /* ★背景のスクロール位置 */

    /* === 入力 === */
    const move = e=>{
      const r=cvs.getBoundingClientRect();
      const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;
      px=Math.max(0,Math.min(x-60,W-120));
    };
    cvs.addEventListener("mousemove",move);
    cvs.addEventListener("touchmove",move);

    const shoot=()=>bullets.push({x:px+44,y:py-10});
    window.addEventListener("keydown",e=>e.code==="Space"&&shoot());
    cvs.addEventListener("click",shoot);

    /* === メインループ === */
    enemyImg.onload=()=>{          // 全画像ロード完了とみなす
      const loop=()=>{
        frame++;

        /* 更新 ---------- */
        bgY += 2;                         /* ★毎フレーム下へ2px */
        if(bgY >= H) bgY -= H;            /* ★ループさせる */

        bullets.forEach(b=>b.y-=8);
        if(frame%60===0) enemies.push({x:Math.random()*(W-100),y:-100});
        enemies.forEach(e=>e.y+=2);

        bullets.forEach((b,bi)=>{
          enemies.forEach((e,ei)=>{
            if(b.x<e.x+100 && b.x+32>e.x && b.y<e.y+100 && b.y+32>e.y){
              bullets.splice(bi,1); enemies.splice(ei,1); score++;
            }
          });
        });

        /* 描画 ---------- */
        // ★ 背景を2枚描画して無限ループ
        ctx.drawImage(bgImg,0,bgY-H,W,H);
        ctx.drawImage(bgImg,0,bgY,  W,H);

        ctx.drawImage(playerImg,px,py,120,120);
        bullets.forEach(b=>ctx.drawImage(bulletImg,b.x,b.y,32,32));
        enemies.forEach(e=>ctx.drawImage(enemyImg,e.x,e.y,100,100));

        ctx.fillStyle="#000";
        ctx.font="20px sans-serif";
        ctx.fillText("Score: "+score,10,30);

        requestAnimationFrame(loop);
      };
      loop();
    };

    return ()=>{ cvs.removeEventListener("mousemove",move);
      cvs.removeEventListener("touchmove",move);
      cvs.removeEventListener("click",shoot);};
  }, []);

  return <canvas ref={cvsRef}></canvas>;
}
