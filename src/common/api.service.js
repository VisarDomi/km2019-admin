import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

export const ApiService = {
  init() {
    axios.defaults.headers.common = {
      "Secure-Api-Key": "asdfasdfetye1a2",
      "Content-Type": "application/json"
    };
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },
  setHeader() {
    let token = JwtService.getToken();
    Vue.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  setHeaderMultipart() {
    Vue.axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  },
  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  get(resource) {
    console.log(`get resource is:`, resource);
    return Vue.axios.get(`${resource}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  post(resource, params) {
    console.log(`post resource and params are:`, resource, params);
    return Vue.axios.post(`${resource}`, params);
  },
  login(resource, params) {
    console.log(`login resource and params are:`, resource, params);
    return Vue.axios.post(`${resource}`, {}, params);
  },
  put(resource, params) {
    console.log(`put params are:`, params);
    console.log(`put resource is:`, resource);
    return Vue.axios.put(`${resource}`, params);
  },
  delete(resource) {
    console.log(`delete resource is:`, resource);
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export const ProfileService = {
  getProfile(userId) {
    return ApiService.get(`user/${userId}`);
  },
  searchUser(name) {
    return ApiService.post("user/search", name);
  },
  putProfile(userId, profile) {
    return ApiService.put(`user/${userId}`, profile);
  },
  getAllUsers() {
    return ApiService.get(`user/all`);
  }
};
