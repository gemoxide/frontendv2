import { RouteItem, UserRoles, UserTypes } from "../../interfaces/routes.interface";
import AuthGuard from "../../layouts/AuthGuard";
import Profile from "../../../modules/shared/profile";
import { ROUTES } from "../../constants/routes";

const userTypes = [] as any;
const roles = [] as any;

export const profile: RouteItem = {
    name: "Profile",
    id: ROUTES.SHARED.profile.key,
    path: ROUTES.SHARED.profile.key,
    component: Profile,
    guard: AuthGuard,
    userTypes,
    roles: [UserRoles.staff, UserRoles.admin, UserRoles.user],
};
export const sharedRoutes: RouteItem[] = [profile];
