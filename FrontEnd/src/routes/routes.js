import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import listContact from "@/pages/listContact.vue";
import UserProfile from "@/pages/UserProfile.vue";
import SalesContact from "@/pages/SalesContact.vue";
import login from "@/pages/Login.vue";
import createOrder from "@/pages/createOrder.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/listContact",
    children: [
      {
        path: "listContact",
        name: "listContact",
        component: listContact
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "order/create",
        name: "createOrder",
        component: createOrder
      },
      {
        path: "salesReport",
        name: "salesReport",
        component: SalesContact
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: login
  }
];

export default routes;
