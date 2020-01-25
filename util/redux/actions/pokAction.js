import * as actionTypes from "../types/pokType";

export const setPOK = ( pok ) => dispatch => {
  return dispatch({ type: actionTypes.SET_POK, pok });
};