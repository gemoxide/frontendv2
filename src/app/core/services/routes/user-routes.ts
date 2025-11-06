import { ChartPieIcon as ChartPieIconSolid } from "@heroicons/react/24/solid";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import {
  RouteItem,
  UserRoles,
  UserTypes,
} from "../../interfaces/routes.interface";
import AuthGuard from "../../layouts/AuthGuard";
import OrganizationDashboard from "../../../modules/organization/dashboard";
import { ROUTES } from "../../constants/routes";

const userTypes = [UserTypes.user];

export const overview: RouteItem = {
  name: "Dashboard",
  id: ROUTES.USER.dashboard.key,
  path: ROUTES.USER.dashboard.key,
  component: OrganizationDashboard,
  guard: AuthGuard,
  userTypes,
  roles: [UserRoles.user, UserRoles.staff],
  icon: ChartPieIcon,
  iconActive: ChartPieIconSolid,
};

export const userRoutes: RouteItem[] = [overview];
