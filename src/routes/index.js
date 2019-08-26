
import { admin } from "./admin";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  admin
];

export default routes;
