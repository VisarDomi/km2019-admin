import { ApiService } from "../../services/api";
import { LIST_BLOGS, GET_BLOG } from "../../actions.type";
import { SET_BLOGS, SET_BLOG } from "../../mutations.type";

export const actions = {
  async [LIST_BLOGS](context, payload) {
    const { data } = await ApiService.get(payload);
    if ("Items" in data) {
      // // console.log("Artist list (data.Items of the response)", data.Items);
      context.commit(SET_BLOGS, data.Items);
    } else {
      // // console.log("There is no Items in the response object");
    }
  },
  async [GET_BLOG](context, payload) {
    const { data } = await ApiService.get(payload);
    if ("Item" in data) {
      // // console.log("Artist (data.Item of the response)", data.Item);
      context.commit(SET_BLOG, data.Item);
    } else {
      // // console.log("There is no Item in the response object");
    }
  }
};
