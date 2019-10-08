import { SET_ALBUMS, SET_ALBUM, SET_HOME_IMAGE, SET_BLOG_IMAGE } from "../../mutations.type";

export const mutations = {
  [SET_ALBUMS](state, albums) {
    state.albums = albums;
  },
  [SET_ALBUM](state, album) {
    state.album = album;
  },
  [SET_HOME_IMAGE](state, { vm }) {
    state.homeFiles = vm.$refs.imgHome.files;
  },
  [SET_BLOG_IMAGE](state, { vm }) {
    state.blogFiles = vm.$refs.imgBlog.files;
  },
};
