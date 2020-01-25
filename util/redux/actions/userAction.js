import * as actionTypes from "../types/userType";

export const setUser = ( nama, tahun_anggaran ) => dispatch => {
  return dispatch({ type: actionTypes.SET_USER, nama, tahun_anggaran });
};