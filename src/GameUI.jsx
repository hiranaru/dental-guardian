import './GameUI.css'

export default function GameUI({ score, life, bombs, onPause }) {
  return (
    <div className="game-ui">
      {/* 上部バー */}
      <div className="ui-top-bar">
        <div className="score">
          クリーンポイント：
          {score.toLocaleString('ja-JP', { minimumIntegerDigits: 9 })}
        </div>
        <div className="life">
          🦷 歯の健康度：{life}
        </div>
        <div className="bombs">
          💣 ボム：{bombs}
        </div>
        <button className="pause-button" onClick={onPause}>⏸ ポーズ</button>
      </div>

      {/* 今後追加予定のナビウィンドウやボタン類をここに */}
      <div className="ui-bottom-bar">
        {/* ナビウィンドウ、リトライ、タイトルボタンなど予定地 */}
      </div>
    </div>
  );
}
