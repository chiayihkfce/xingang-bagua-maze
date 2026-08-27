import React, { useState } from 'react';
import RotationGame from '../MiniGames/RotationGame';
import MazeGame from '../MiniGames/MazeGame';
import MatchGame from '../MiniGames/MatchGame';
import './MiniGames.css';
import { useAppContext } from '../../context/AppContext';

interface MiniGamesProps {
  onClose: () => void;
}

const MiniGames: React.FC<MiniGamesProps> = ({ onClose }) => {
  const { setHasFlashlight, t } = useAppContext();
  const [activeGame, setActiveGame] = useState<'rotation' | 'maze' | 'match'>(
    'rotation'
  );
  const [isWin, setIsWin] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleWin = () => {
    setIsWin(true);
    setHasFlashlight(true);
  };

  const handleRestart = () => {
    setIsWin(false);
    setGameKey((prev) => prev + 1);
  };

  return (
    <div className="game-overlay">
      <div className="game-container" onClick={(e) => e.stopPropagation()}>
        {/* 頂部選單 */}
        <div className="game-header">
          <div className="game-tabs">
            <button
              className={activeGame === 'rotation' ? 'active' : ''}
              onClick={() => {
                setActiveGame('rotation');
                setIsWin(false);
                setGameKey((k) => k + 1);
              }}
            >
              {t.gameTabRotation}
            </button>
            <button
              className={activeGame === 'maze' ? 'active' : ''}
              onClick={() => {
                setActiveGame('maze');
                setIsWin(false);
                setGameKey((k) => k + 1);
              }}
            >
              {t.gameTabMaze}
            </button>
            <button
              className={activeGame === 'match' ? 'active' : ''}
              onClick={() => {
                setActiveGame('match');
                setIsWin(false);
                setGameKey((k) => k + 1);
              }}
            >
              {t.gameTabMatch}
            </button>
          </div>
          <button className="game-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* 遊戲內容區 */}
        <div className="game-content">
          {activeGame === 'rotation' && (
            <RotationGame key={`rot-${gameKey}`} onWin={handleWin} />
          )}
          {activeGame === 'maze' && (
            <MazeGame key={`maze-${gameKey}`} onWin={handleWin} />
          )}
          {activeGame === 'match' && (
            <MatchGame key={`match-${gameKey}`} onWin={handleWin} />
          )}
        </div>

        {/* 勝利提示 */}
        {isWin && (
          <div className="win-overlay">
            <div className="win-card">
              <h3>
                🎉{' '}
                {activeGame === 'rotation'
                  ? t.winRotationTitle
                  : activeGame === 'maze'
                    ? t.winMazeTitle
                    : t.winMatchTitle}
              </h3>
              <p>
                {activeGame === 'rotation' && t.winRotationMsg}
                {activeGame === 'maze' && t.winMazeMsg}
                {activeGame === 'match' && t.winMatchMsg}
              </p>
              <div
                style={{
                  color: 'var(--primary-gold)',
                  fontWeight: 'bold',
                  margin: '10px 0',
                  fontSize: '0.9rem'
                }}
              >
                {t.gameRewardText}
              </div>
              <button onClick={handleRestart}>{t.gamePlayAgain}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGames;
