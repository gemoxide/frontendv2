import { IGym } from "../../interfaces/gyms.interface";
import { IRole } from "../../interfaces/roles.interface";
import { UserRoles } from "../../interfaces/routes.interface";
import { adminRoutes } from "./admin-routes";
import { userRoutes } from "./user-routes";

export const getUserNavigation = (
  type: string,
  permissionsList: string[],
  userGymsCount: number
) => {
  const adminSideBarPrimary = adminRoutes?.filter(
    (val) => !val.hidden && !val.isSecondaryItem
  );

  const adminSideBarSecondary = adminRoutes?.filter(
    (val) => !val.hidden && val.isSecondaryItem
  );

  const userSideBarItemsPrimary = userRoutes?.filter((val) => {
    if (val.hidden) {
      return false;
    }

    if (val.permissions && val.permissions?.length > 0) {
      const checkIfHasPermission = val?.permissions?.some(
        (permission: string) => {
          return permissionsList?.includes(permission);
        }
      );

      if (!checkIfHasPermission) {
        return false;
      }
    }

    if (val.roles?.includes(UserRoles.user)) {
      if (type === "user" && !userGymsCount) {
        return !val.isSecondaryItem;
      }
    }

    if (val.roles?.includes(UserRoles.staff)) {
      if (type === "user" && userGymsCount) {
        return !val.isSecondaryItem;
      }
    }

    return false;
  });

  const userSideBarItemsSecondary = userRoutes?.filter((val) => {
    if (val.hidden) {
      return false;
    }

    if (val.permissions && val.permissions?.length > 0) {
      const checkIfHasPermission = val?.permissions?.some(
        (permission: string) => {
          return permissionsList?.includes(permission);
        }
      );

      return !val.hidden && val.isSecondaryItem && checkIfHasPermission;
    }

    if (val.roles?.includes(UserRoles.user)) {
      if (type === "user" && !userGymsCount) {
        return val.isSecondaryItem;
      }
    }

    if (val.roles?.includes(UserRoles.staff)) {
      if (type === "user" && userGymsCount) {
        return val.isSecondaryItem;
      }
    }

    return false;
  });

  if (type === "Administrator") {
    return {
      primary: adminSideBarPrimary,
      secondary: adminSideBarSecondary,
    };
  } else {
    return {
      primary: userSideBarItemsPrimary,
      secondary: userSideBarItemsSecondary,
    };
  }
};
