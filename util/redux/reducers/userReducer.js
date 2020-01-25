import * as actionTypes from "../types/userType";

export default (
  state = {
    nama: null,
    tahun_anggaran: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        nama: action.nama,
        tahun_anggaran: action.tahun_anggaran
      };
  }
  return state;
};
