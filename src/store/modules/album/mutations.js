import { SET_ALBUMS, SET_ALBUM, SET_ALBUM_FILES } from "../../mutations.type";

export const mutations = {
  [SET_ALBUMS](state, albums) {
    state.albums = albums;
  },
  [SET_ALBUM](state, album) {
    state.album = album;
  },
  [SET_ALBUM_FILES](state, { vm }) {
    state.albumFiles = vm.$refs.album.files;
  },
};
