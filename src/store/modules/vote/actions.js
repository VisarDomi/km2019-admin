import { ApiService } from "../../services/api";
import { LIST_VOTE } from "../../actions.type";
import { SET_VOTES } from "../../mutations.type";

export const actions = {
  async [LIST_VOTE](context, payload) {
    const { data } = await ApiService.get(payload);
    if ("Items" in data) {
      // console.log("Artist list (data.Items of the response)", data.Items);
      context.commit(SET_VOTES, data.Items);
    } else {
      // console.log("There is no Items in the response object");
    }
  }
};
