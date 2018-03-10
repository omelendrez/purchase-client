import Vue from "vue";
import Router from "vue-router";

import Header from "@/components/lib/Header";
import Home from "@/components/Home";

import Login from "@/components/Login";
import ChangePassword from "@/components/ChangePassword";

import Organizations from "@/components/Organizations";
import Organization from "@/components/Organization";

import Locations from "@/components/Locations";
import Location from "@/components/Location";

import Departments from "@/components/Departments";
import Department from "@/components/Department";

import Projects from "@/components/Projects";
import Project from "@/components/Project";

import Permissions from "@/components/Permissions";
import Permission from "@/components/Permission";

import Requisitions from "@/components/Requisitions";

import Units from "@/components/Units";
import Unit from "@/components/Unit";

import Users from "@/components/Users";
import User from "@/components/User";

import Vendors from "@/components/Vendors";
import Vendor from "@/components/Vendor";

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
      path: "/organizations",
      name: "Organizations",
      component: Organizations
    },
    {
      path: "/organization",
      name: "Organization",
      component: Organization
    },
    {
      path: "/departments",
      name: "Departments",
      component: Departments
    },
    {
      path: "/department",
      name: "Department",
      component: Department
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects
    },
    {
      path: "/project",
      name: "Project",
      component: Project
    },
    {
      path: "/permissions",
      name: "Permissions",
      component: Permissions
    },
    {
      path: "/permission",
      name: "Permission",
      component: Permission
    },
    {
      path: "/requisitions",
      name: "Requisitions",
      component: Requisitions
    },
    {
      path: "/units",
      name: "Units",
      component: Units
    },
    {
      path: "/unit",
      name: "Unit",
      component: Unit
    },
    {
      path: "/locations",
      name: "Locations",
      component: Locations
    },
    {
      path: "/location",
      name: "Location",
      component: Location
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
    },
    {
      path: "/vendors",
      name: "Vendors",
      component: Vendors
    },
    {
      path: "/vendor",
      name: "Vendor",
      component: Vendor
    }

  ]
});
