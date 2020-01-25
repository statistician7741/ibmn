import * as actionTypes from "../types/pokType";

export default (
  state = {
    pok: []
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_POK:
      return {
        ...state,
        pok: action.pok
      };
  }
  return state;
};
