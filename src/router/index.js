import Vue from "vue";
import Router from "vue-router";

import Header from "@/components/lib/Header";
import Home from "@/components/Home";

import Login from "@/components/Login";
import ChangePassword from "@/components/ChangePassword";

import Locations from "@/components/Locations";
import Location from "@/components/Location";

import Positions from "@/components/Positions";
import Position from "@/components/Position";

import Users from "@/components/Users";
import User from "@/components/User";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/change_password",
      name: "ChangePassword",
      component: ChangePassword
    },
    {
      path: "/header",
      name: "Header",
      component: Header
    },
    {
      path: "/Locations",
      name: "Locations",
      component: Locations
    },
    {
      path: "/location",
      name: "Location",
      component: Location
    },
    {
      path: "/positions",
      name: "Positions",
      component: Positions
    },
    {
      path: "/position",
      name: "Position",
      component: Position
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/user",
      name: "User",
      component: User
    }
  ]
});
