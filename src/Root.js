import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setGameBoard as setGameBoardAction,
  setCurrentColor as setCurrentColorAction,
  resetGameClicks as resetGameClicksAction,
  setUserClicks as setUserClicksAction,
} from "./actions";
import "./Root.scss";
import ColorButton from "./components/ColorButton/ColorButton";
import ColorSquare from "./components/ColorSquare/ColorSquare";

const Root = ({
  boardSize,
  colors,
  setGameBoard,
  setCurrentColor,
  resetGameClicks,
  gameBoard,
  currentColor,
  userClicks,
  setUserClicks,
}) => {
  const generateColorGameBoard = () => {
    const tempGameBoardSize = boardSize;
    const tempGameBoard = [];
    let id = 1;

    for (let i = 0; i < tempGameBoardSize * tempGameBoardSize; i++) {
      const randomColor = Math.floor(Math.random() * colors.length);
      tempGameBoard.push({
        color: colors[randomColor],
        id,
        absorbedColor: false,
      });
      id++;
    }
    setGameBoard(tempGameBoard);
    setCurrentColor(tempGameBoard[0].color);
    resetGameClicks();
  };

  useEffect(() => {
    generateColorGameBoard();
  }, []);

  const getAbsorbedColor = () => {
    const tempGameBoardSize = boardSize;
    let currentSquare = [];

    const startAbsorbing = () => {
      gameBoard.forEach((item, index) => {
        if (
          ((item.color === currentColor &&
            ((index % tempGameBoardSize !== 0 &&
              currentSquare.includes(gameBoard[index - 1])) ||
              ((index + 1) % tempGameBoardSize !== 0 &&
                currentSquare.includes(gameBoard[index + 1])) ||
              (gameBoard[index + tempGameBoardSize] &&
                currentSquare.includes(gameBoard[index + tempGameBoardSize])) ||
              (gameBoard[index - tempGameBoardSize] &&
                currentSquare.includes(
                  gameBoard[index - tempGameBoardSize]
                )))) ||
            index === 0) &&
          !currentSquare.includes(item)
        ) {
          currentSquare.push(item);
          startAbsorbing();
        }
      });
    };

    startAbsorbing();
    return currentSquare;
  };

  const expand = (e, array) => {
    const tempGameBoardSize = boardSize;
    const color = e ? e.target.style.backgroundColor : this.state.currentColor;
    const startAbsorbing = () => {
      gameBoard.forEach((item, index) => {
        if (
          ((item.color.rgb === color &&
            ((index % tempGameBoardSize !== 0 &&
              array.includes(gameBoard[index - 1])) ||
              ((index + 1) % tempGameBoardSize !== 0 &&
                array.includes(gameBoard[index + 1])) ||
              (gameBoard[index + tempGameBoardSize] &&
                array.includes(gameBoard[index + tempGameBoardSize])) ||
              (gameBoard[index - tempGameBoardSize] &&
                array.includes(gameBoard[index - tempGameBoardSize])))) ||
            index === 0) &&
          !array.includes(item)
        ) {
          array.push(item);
          startAbsorbing();
        }
      });
    };
    startAbsorbing();
    return array;
  };

  const handleColorButtonClickFn = (e) => {
    const clickedColor = e ? e.target.style.backgroundColor : currentColor;
    if (clickedColor !== currentColor || !e) {
      const prevSquare = getAbsorbedColor();
      const currentSquare = expand(e, prevSquare);

      const newBoard = gameBoard.map((item) => {
        if (currentSquare.includes(item)) {
          return {
            color: clickedColor,
            id: item.id,
            absorbedColor: true,
          };
        } else {
          return item;
        }
      });

      setGameBoard(newBoard);
      setCurrentColor(clickedColor);
      setUserClicks(userClicks + 1);

      endgameCheck();
    } else {
      alert("Square already has this color");
    }
  };

  const endgameCheck = () => {
    const tempGameBoardSize = boardSize;
    setTimeout(() => {
      const absorbedColor = gameBoard.filter((item) => {
        if (item.color === currentColor) {
          return item.color;
        }
      });
      if (absorbedColor.length === tempGameBoardSize * tempGameBoardSize) {
        alert(
          `You won a ${tempGameBoardSize}x${tempGameBoardSize} board in ${userClicks} clicks!`
        );
      }
    }, 200);
  };

  const rootStyle = {
    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
    gridTemplateRows: `repeat(${boardSize}, 1fr)`,
  };
  return (
    <>
      <div className="app">
        <h2 style={{ textAlign: "center" }}>{userClicks}</h2>
        <div className="gameBoard" style={rootStyle}>
          {gameBoard.map((item) => {
            const { color, id, currentColor, absorbedColor } = item;
            return (
              <ColorSquare
                color={color}
                key={id}
                tileKey={id}
                currentColor={currentColor}
                absorbed={absorbedColor}
              />
            );
          })}
        </div>
        <div className="buttonBoard">
          {colors.map((color) => {
            return (
              <ColorButton
                color={color}
                handleButtonClick={handleColorButtonClickFn}
                key={color}
                size={boardSize}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  boardSize: state.gameBoardSize,
  colors: state.colors,
  gameBoard: state.gameBoard,
  currentColor: state.currentColor,
  userClicks: state.userClicks,
});

const mapDispatchToProps = (dispatch) => ({
  setGameBoard: (gameBoard) => dispatch(setGameBoardAction(gameBoard)),
  setCurrentColor: (currentColor) =>
    dispatch(setCurrentColorAction(currentColor)),
  resetGameClicks: () => dispatch(resetGameClicksAction()),
  setUserClicks: (clicks) => dispatch(setUserClicksAction(clicks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
