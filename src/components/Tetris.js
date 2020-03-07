import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

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
  
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  // MovePlayer function
  const movePlayer = dir => {
    if(!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0});
    }
  }

  // Start Game function
  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  }
  
  // Drop function
  const drop = () => {
    if(!checkCollision(player, stage, { x: 0, y: 1})) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game Over
      if(player.pos.y < 1) {
        console.log('Game Over');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
    
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
      // Up array on the keyboard
      } else if(keyCode === 38) {
        playerRotate(stage, 1);
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