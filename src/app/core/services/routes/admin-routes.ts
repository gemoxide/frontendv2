import { ChartPieIcon } from "@heroicons/react/24/outline";
import { ChartPieIcon as ChartPieIconSolid } from "@heroicons/react/24/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon as ShoppingBagIconSolid } from "@heroicons/react/24/solid";

import {
  RouteItem,
  UserRoles,
  UserTypes,
} from "../../interfaces/routes.interface";
import AuthGuard from "../../layouts/AuthGuard";
import AdminDashboard from "../../../modules/admin/dashboard";
import { ROUTES } from "../../constants/routes";
import AdminProducts from "../../../modules/admin/products";

const userTypes = [UserTypes.admin];
const roles = [] as any;

export const overview: RouteItem = {
  name: "Dashboard",
  id: ROUTES.ADMIN.dashboard.key,
  path: ROUTES.ADMIN.dashboard.key,
  component: AdminDashboard,
  guard: AuthGuard,
  userTypes,
  icon: ChartPieIcon,
  roles: [UserRoles.admin],
  iconActive: ChartPieIconSolid,
};

export const products: RouteItem = {
  name: "Products",
  id: ROUTES.ADMIN.products.key,
  path: ROUTES.ADMIN.products.key,
  component: AdminProducts,
  guard: AuthGuard,
  userTypes,
  roles: [UserRoles.admin],
  icon: ShoppingBagIcon,
  iconActive: ShoppingBagIconSolid,
};

export const adminRoutes: RouteItem[] = [overview, products];
