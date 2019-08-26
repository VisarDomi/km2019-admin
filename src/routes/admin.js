import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

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
    }
  ]
};
