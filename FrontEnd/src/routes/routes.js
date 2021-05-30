import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import listContact from "@/pages/listContact.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import SalesContact from "@/pages/SalesContact.vue";
// import Icons from "@/pages/Icons.vue";
// import Maps from "@/pages/Maps.vue";
// import Notifications from "@/pages/Notifications.vue";
// import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
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
        path: "order/list",
        name: "Order List",
        component: TableList
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
      // {
      //   path: "icons",
      //   name: "Icons",
      //   component: Icons
      // },
      // {
      //   path: "maps",
      //   name: "Maps",
      //   meta: {
      //     hideFooter: true
      //   },
      //   component: Maps
      // },
      // {
      //   path: "notifications",
      //   name: "Notifications",
      //   component: Notifications
      // },
      // {
      //   path: "upgrade",
      //   name: "Upgrade to PRO",
      //   component: UpgradeToPRO
      // }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: login
  }
];

export default routes;
