import * as actionTypes from "../types/layoutType";

export const setDefaultOpenKeys = ( defaultOpenKeys ) => dispatch => {
  return dispatch({ type: actionTypes.SET_DEFAULT_OPEN_KEYS, defaultOpenKeys });
};
export const setSidebarCollapsed = ( menuCollapsed ) => dispatch => {
  return dispatch({ type: actionTypes.SET_SIDEBAR_COLLAPSED, menuCollapsed });
};
export const setLoading = ( loading ) => dispatch => {
  return dispatch({ type: actionTypes.SET_LOADING, loading });
};