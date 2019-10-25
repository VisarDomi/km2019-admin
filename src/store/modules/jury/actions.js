import { ApiService } from "../../services/api";
import { LIST_JURY, GET_JURY } from "../../actions.type";
import { SET_JURYS, SET_JURY } from "../../mutations.type";

export const actions = {
  async [LIST_JURY](context, payload) {
    const { data } = await ApiService.get(payload);
    if ("Items" in data) {
      // console.log("Artist list (data.Items of the response)", data.Items);
      context.commit(SET_JURYS, data.Items);
    } else {
      // console.log("There is no Items in the response object");
    }
  },
  async [GET_JURY](context, payload) {
    const { data } = await ApiService.get(payload);
    if ("Item" in data) {
      // console.log("Artist (data.Item of the response)", data.Item);
      context.commit(SET_JURY, data.Item);
    } else {
      // console.log("There is no Item in the response object");
    }
  }
};
