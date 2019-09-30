import { SET_VOTES } from "../../mutations.type";

export const mutations = {
  [SET_VOTES](state, votes) {
    state.votes = votes;
  }
};
