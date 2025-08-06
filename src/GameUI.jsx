import './GameUI.css'

export default function GameUI({ score, life, bombs, onPause }) {
  return (
    <div className="game-ui">
      <div className="ui-top">
        <div className="score">クリーンポイント：{score.toLocaleString('ja-JP', { minimumIntegerDigits: 9 })}</div>
        <div className="life">🦷 歯の健康度：{life}</div>
        <div className="bombs">💣 ボム：{bombs}</div>
        <button className="pause-button" onClick={onPause}>⏸ ポーズ</button>
      </div>
      {/* ナビウィンドウやその他UIは後で追加 */}
    </div>
  )
}
