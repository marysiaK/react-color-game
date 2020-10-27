import { actionTypes } from "../actions/actionTypes";

const initialState = {
  gameBoardSize: 12,
  gameBoard: [],
  userClicks: 0,
  colors: ["pink", "red", "orange", "blue"],
  currentColor: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.setGameBoard:
      return {
        ...state,
        gameBoard: payload,
      };

    case actionTypes.setCurrentColor:
      return {
        ...state,
        currentColor: payload,
      };
    case actionTypes.resetClicks:
      return {
        ...state,
        userClicks: 0,
      };

    case actionTypes.setUserClicks:
      return {
        ...state,
        userClicks: payload,
      };
    default:
      return state;
  }
};

export default reducer;
