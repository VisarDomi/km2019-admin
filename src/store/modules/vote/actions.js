import { ApiService } from "../../services/api";
import { LIST_VOTE } from "../../actions.type";
import { SET_VOTES } from "../../mutations.type";

export const actions = {
  async [LIST_VOTE](context, payload) {
    const { data } = await ApiService.get(payload);
    console.log("data", data);
    context.commit(SET_VOTES, data);
  }
};
