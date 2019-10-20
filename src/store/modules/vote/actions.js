import { ApiService } from "../../services/api";
import { LIST_VOTE, LIST_TOTAL_VOTES } from "../../actions.type";
import { SET_VOTES, SET_TOTAL_VOTES } from "../../mutations.type";

export const actions = {
  async [LIST_VOTE](context, payload) {
    const { data } = await ApiService.get(payload);
    console.log("data", data);
    context.commit(SET_VOTES, data);
  },
  async [LIST_TOTAL_VOTES](context) {
    const TableName = "KM2019-Vote";
    const Limit = "1000000";
    const params = {
      TableName,
      Limit
    };
    const { data } = await ApiService.get(params);
    context.commit(SET_TOTAL_VOTES, data.totalVotes)
  }
};
