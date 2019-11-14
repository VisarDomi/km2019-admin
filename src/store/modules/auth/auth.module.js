import JwtService from "@/common/jwt.service";
import UserService from "@/common/userstorage.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER
} from "../../actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "../../mutations.type";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    console.log("credentials coming in: ", credentials);
    console.log("credentials coming in: ", credentials.username+"");
    if(credentials.username==="admin@kengamagjike.al" && credentials.password==="KM2019.login();"){
      console.log("creds correct")
     var data = {
        token: "203lksdfoiu3#$klsdo03#4"
      }
      context.commit(SET_AUTH, data);
    }

  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      context.commit(SET_AUTH, UserService.getUser());
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  async [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    JwtService.saveToken(user.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
    UserService.destroyUser();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
