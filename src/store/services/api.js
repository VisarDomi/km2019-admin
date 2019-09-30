import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { myError } from "@/common/functions";
const API_URL =
  "https://fw9cy4j1y6.execute-api.eu-west-1.amazonaws.com/Dev/api";

export const ApiService = {
  init() {
    axios.defaults.headers.common = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },
  async put(payload) {
    // console.log(`put payload is:`, payload);
    try {
      return Vue.axios.put(``, payload);
    } catch (error) {
      throw myError(error);
    }
  },
  async get(params) {
    // console.log(`get params is:`, params);
    try {
      return Vue.axios.get(``, { params });
    } catch (error) {
      throw myError(error);
    }
  },
  async delete(payload) {
    // console.log(`delete payload is:`, payload);
    try {
      return Vue.axios.delete(``, { data: payload });
    } catch (error) {
      throw myError(error);
    }
  }
};
