// src/components/NaviWindow.jsx
import "./NaviWindow.css";

export default function NaviWindow({ onClose }) {
  return (
    <div className="navi-overlay">
      <div className="navi-window">
        <img src="/img/player_tbrush.png" alt="キャラクター" className="navi-character" />
        <div className="navi-text">
          キミの力でお口の中をきれいにしてくれ！
        </div>
        <button className="navi-close" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}
