import { SET_JURYS, SET_JURY } from "../../mutations.type";

export const mutations = {
  [SET_JURYS](state, jurys) {
    state.jurys = jurys;
  },
  [SET_JURY](state, jury) {
    state.jury = jury;
  }
};
