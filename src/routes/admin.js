import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
import Blog from "@/pages/Dashboard/Pages/Blog.vue";
import CreateBlog from "@/pages/Dashboard/Pages/CreateBlog.vue";
import Artists from "@/pages/Dashboard/Pages/Artists.vue";

import { setMeta } from "./common";

export const admin = {
  path: "/",
  component: DashboardLayout,
  children: [

    {
      path: "dashboard",
      name: "Dashboard",
      components: { default: Dashboard },
      meta: setMeta("Dashboard")
    },

    {
      path: "blog",
      name: "Blog",
      components: { default: Blog },
      meta: setMeta("Blog")
    },
    {
      path: "createblog",
      name: "CreateBlog",
      components: { default: CreateBlog },
      meta: setMeta("Create Blog")
    },

    {
      path: "artists",
      name: "Artists",
      components: { default: Artists },
      meta: setMeta("Artists")
    }
  ]
};
