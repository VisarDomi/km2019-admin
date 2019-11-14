import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
import Blogs from "@/pages/Dashboard/Pages/Blogs.vue";
import CreateBlog from "@/pages/Dashboard/Pages/CreateBlog.vue";
import EditBlog from "@/pages/Dashboard/Pages/EditBlog.vue";
import EditArtist from "@/pages/Dashboard/Pages/EditArtist.vue";
import Artists from "@/pages/Dashboard/Pages/Artists.vue";
import CreateArtist from "@/pages/Dashboard/Pages/CreateArtist.vue";
import EditJury from "@/pages/Dashboard/Pages/EditJury.vue";
import Jurys from "@/pages/Dashboard/Pages/Jurys.vue";
import CreateJury from "@/pages/Dashboard/Pages/CreateJury.vue";
import Submissions from "@/pages/Dashboard/Pages/Submissions.vue";
import Votes from "@/pages/Dashboard/Pages/Votes.vue";
import Login from "@/pages/Dashboard/Pages/Login.vue";

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
      path: "blogs",
      name: "Blogs",
      components: { default: Blogs },
      meta: setMeta("Blogs")
    },
    {
      path: "createblog",
      name: "CreateBlog",
      components: { default: CreateBlog },
      meta: setMeta("Create Blog")
    },
    {
      path: "blog/:id",
      name: "EditBlog",
      components: { default: EditBlog },
      meta: setMeta("Edit Blog")
    },
    {
      path: "artists",
      name: "Artists",
      components: { default: Artists },
      meta: setMeta("Artists")
    },
    {
      path: "artist/:id",
      name: "EditArtist",
      components: { default: EditArtist },
      meta: setMeta("Artist Detail")
    },
    {
      path: "createartist",
      name: "CreateArtist",
      components: { default: CreateArtist },
      meta: setMeta("CreateArtist")
    },
    {
      path: "jurys",
      name: "Jurys",
      components: { default: Jurys },
      meta: setMeta("Jurys")
    },
    {
      path: "jury/:id",
      name: "EditJury",
      components: { default: EditJury },
      meta: setMeta("Jury Detail")
    },
    {
      path: "createjury",
      name: "CreateJury",
      components: { default: CreateJury },
      meta: setMeta("CreateJury")
    },

    {
      path: "submissions",
      name: "Submissions",
      components: { default: Submissions },
      meta: setMeta("Submissions")
    },

    {
      path: "votes",
      name: "Votes",
      components: { default: Votes },
      meta: setMeta("Votes")
    },
    {
      path: "login",
      name: "Login",
      components: { default: Login },
    },
  ],
  // meta: {
  //   requiresAuth: true
  // }


};

