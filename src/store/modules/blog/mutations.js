import { SET_BLOGS, SET_BLOG } from "../../mutations.type";

export const mutations = {
  [SET_BLOGS](state, blogs) {
    state.blogs = blogs;
  },
  [SET_BLOG](state, blog) {
    state.blog = blog;
  }
};
