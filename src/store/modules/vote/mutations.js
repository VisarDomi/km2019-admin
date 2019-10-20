import { SET_VOTES, SET_TOTAL_VOTES } from "../../mutations.type";

export const mutations = {
  [SET_VOTES](state, votes) {
    state.votes = votes;
  },
  [SET_TOTAL_VOTES](state, totalVotes) {
    state.totalVotes = totalVotes
  }
};
