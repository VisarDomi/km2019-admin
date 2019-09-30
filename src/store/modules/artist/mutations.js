import { SET_ARTISTS, SET_ARTIST } from "../../mutations.type";

export const mutations = {
  [SET_ARTISTS](state, artists) {
    state.artists = artists;
  },
  [SET_ARTIST](state, artist) {
    state.artist = artist;
  }
};
