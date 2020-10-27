import { actionTypes } from "./actionTypes";

export const setGameBoard = (gameBoard) => ({
  type: actionTypes.setGameBoard,
  payload: gameBoard,
});

export const setCurrentColor = (currentColor) => ({
  type: actionTypes.setCurrentColor,
  payload: currentColor,
});

export const resetGameClicks = () => ({
  type: actionTypes.resetClicks,
});

export const setUserClicks = (clicks) => ({
  type: actionTypes.setUserClicks,
  payload: clicks,
});
