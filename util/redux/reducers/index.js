import { combineReducers } from "redux";

import user from "./userReducer";
import pok from "./pokReducer";
import layout from "./layoutReducer";
import socket from "./socketReducer";

export default combineReducers({
  user,
  pok,
  layout,
  socket
});
