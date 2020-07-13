import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Order from "./views/Order.vue";
import Me from "./views/Me.vue";
import Address from "./views/Address.vue";
import City from "./views/City.vue";
import Search from "./views/Search.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
     // name: "index",
      component: Index,
      children: [
        {
          path: "",
          // name: "home",
          component: Home
        },
        {
          path: "/home",
          name: "home",
          component: Home
        },
        {
          path: "/order",
          name: "order",
          component: Order
        },
        {
          path: "/me",
          name: "me",
          component: Me
        },
        {
          path: "/address",
          name: "address",
          component: Address
        },
        {
          path: "/city",
          name: "city",
          component: City
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    ,
    {
      path: "/myaddress",
      name: "myaddress",
      component: ()=>import("./views/Orders/MyAddress")
    },
    {
      path: "/addaddress",
      name: "addaddress",
      component: ()=>import("./views/Orders/AddAddress"),
    },
    {
      path: "/settlement",
      name: "settlement",
      component: ()=>import("./views/Orders/Settlement"),
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/remark",
      name: "remark",
      component: ()=>import('./views/Orders/Remark')
    },
    {
      path: "/pay",
      name: "pay",
      component: () => {
        return import("@/views/Orders/Pay.vue");
      }
    },
    {
      path: "/orderinfo",
      name: "orderinfo",
      component: () => {
        return import("@/views/Orders/OrderInfo.vue");
      }
    },
    {
      path: "/shop",
      name: "shop",
      component: () => {
        return import("./views/Shops/Shop.vue");
      },
      redirect: "/goods",
      children: [
        {
          path: "/goods",
          name: "goods",
          component: () => {
            return import("./views/Shops/Goods.vue");
          }
        },
        {
          path: "/comments",
          name: "comments",
          component: () => {
            return import("./views/Shops/Comments.vue");
          }
        },
        {
          path: "/seller",
          name: "seller",
          component: () => {
            return import("./views/Shops/Seller.vue");
          }
        },
       
      ]
    }
  ]
});
