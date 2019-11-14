
import { admin } from "./admin";
import Login from "@/pages/Dashboard/Pages/Login.vue";
const routes = [
  {  
    path: "login",
    name: "Login",
    components: { default: Login },
  // meta: {
  //   requiresAuth: false
  // }
},
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  admin
];

export default routes;
