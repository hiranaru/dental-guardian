import './GameUI.css'

export default function GameUI({ score, life, bombs, onPause }) {
  return (
    <div className="game-ui">
      {/* 上部バー */}
      <div className="ui-top-bar">
        <button className="pause-button" onClick={onPause}> </button>
      </div>

      {/* 今後追加予定のナビウィンドウやボタン類をここに */}
      <div className="ui-bottom-bar">
        {/* ナビウィンドウ、リトライ、タイトルボタンなど予定地 */}
      </div>
    </div>
  );
}
