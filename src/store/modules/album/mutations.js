import {
  SET_ALBUMS,
  SET_ALBUM,
  SET_BLOG_IMAGE,
  SET_BLOG_IMAGE2,
  SET_BLOG_IMAGE3
} from "../../mutations.type";

export const mutations = {
  [SET_ALBUMS](state, albums) {
    state.albums = albums;
  },
  [SET_ALBUM](state, album) {
    state.album = album;
  },
  [SET_BLOG_IMAGE](state, { vm }) {
    state.blogFiles = vm.$refs.imgBlog.files;
  },
  [SET_BLOG_IMAGE2](state, { vm }) {
    state.blogFiles = vm.$refs.imgBlog.files;
  },
  [SET_BLOG_IMAGE3](state, { vm }) {
    state.blogFiles = vm.$refs.imgBlog.files;
  }
};
