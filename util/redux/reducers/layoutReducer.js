import * as actionTypes from "../types/layoutType";

export default (
  state = {
    defaultOpenKeys: '/',
    tittle: 'Dashboard',
    menuCollapsed: false,
    loading: true
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_DEFAULT_OPEN_KEYS:
      return {
        ...state,
        defaultOpenKeys: action.defaultOpenKeys
      };
      case actionTypes.SET_SIDEBAR_COLLAPSED:
        return {
          ...state,
          menuCollapsed: action.menuCollapsed
        }
      case actionTypes.SET_LOADING:
        return {
          ...state,
          loading: action.loading
        }
  }
  return state;
};
