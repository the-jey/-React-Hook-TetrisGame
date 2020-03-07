import React, { useState } from 'react';

import { createStage } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('re-render');

  // MovePlayer function
  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0});
  }

  // Start Game function
  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();

  }
  
  // Drop function
  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false })
    
  }

  // DropPlayer function
  const dropPlayer = () => {
    drop();
  }

  // Move function
  const move = ({ keyCode }) => {
    if(!gameOver) {
      // Left arrow on the keyboard
      if(keyCode === 37) {
        movePlayer(-1);
      // Right arrow on the keyboard
      } else if(keyCode === 39) {
        movePlayer(1);
      // Down arrow on the keyboard
      } else if(keyCode === 40) {
        dropPlayer();
      }
    }
  }




  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          { gameOver ? (
            <Display gameOver= {gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );

}


export default Tetris;