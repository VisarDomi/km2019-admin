import { ApiService } from "../../services/api";
import { LIST_ARTIST, GET_ARTIST } from "../../actions.type";
import { SET_ARTISTS, SET_ARTIST } from "../../mutations.type";

export const actions = {
  async [LIST_ARTIST](context, payload) {
    const { data } = await ApiService.get(payload);
    if ("Items" in data) {
      // console.log("Artist list (data.Items of the response)", data.Items);
      context.commit(SET_ARTISTS, data.Items);
    } else {
      // console.log("There is no Items in the response object");
    }
  },
  async [GET_ARTIST](context, payload) {
    const { data } = await ApiService.get(payload);
    if ("Item" in data) {
      // console.log("Artist (data.Item of the response)", data.Item);
      context.commit(SET_ARTIST, data.Item);
    } else {
      // console.log("There is no Item in the response object");
    }
  }
};
