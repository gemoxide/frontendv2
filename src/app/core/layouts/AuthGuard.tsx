import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Loader from "../components/Loader";
import { UserRoles, UserTypes } from "../interfaces/routes.interface";
import { RootState } from "../state/reducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AuthGuard = ({ children, permissions, userTypes, roles }: any) => {
  const navigate = useNavigate();

  const {
    data: currentUser,
    loading: getUserLoading,
    success: getUserSuccess,
  } = useSelector((state: RootState) => state.auth.user);
  const { data: auth } = useSelector((state: RootState) => state.auth.login);

  const isAuthenticated = useMemo(() => {
    return (
      !getUserLoading && getUserSuccess && currentUser && auth?.access_token
    );
  }, [getUserLoading, currentUser, getUserSuccess, auth?.access_token]);

  useEffect(() => {
    if (!getUserLoading) {
      if (isAuthenticated) {
        const permissionsList =
          currentUser?.relationships?.roles?.[0]?.relationships?.permissions?.map(
            (permission) => permission?.attributes?.name
          );

        if (permissions && permissions.length > 0) {
          const checkIfHasPermission = permissions?.some(
            (permission: string) => {
              return permissionsList?.includes(permission);
            }
          );
          if (!checkIfHasPermission) {
            handleUserNavigation(currentUser?.attributes?.type as UserTypes);
          }
        }

        if (!roles?.length) {
          return;
        }
        if (currentUser?.relationships?.roles) {
          if (roles?.includes(UserRoles.admin)) {
            if (
              currentUser?.relationships?.roles[0].attributes.type === "admin"
            ) {
              return;
            }
          }

          if (roles?.includes(UserRoles.user)) {
            if (
              currentUser?.relationships?.roles[0].attributes.type === "user" &&
              !currentUser.relationships.user_gyms?.length
            ) {
              return;
            }
          }

          if (roles?.includes(UserRoles.staff)) {
            if (
              currentUser?.relationships?.roles[0].attributes.type === "user" &&
              currentUser.relationships.user_gyms?.length
            ) {
              return;
            }
          }
        }
        handleUserNavigation(currentUser?.attributes?.type as UserTypes);
      } else {
        navigate(ROUTES.AUTH.login.key);
      }
    }
  }, [isAuthenticated, permissions]);

  const handleUserNavigation = (userType: UserTypes) => {
    // const parsedPersistedAuth = JSON.parse(
    //     localStorage.getItem("persist:auth") || "{}"
    // );
    // const impersonateToken = JSON.parse(
    //     parsedPersistedAuth?.impersonateUser
    // )?.data?.access_token;
    // if (!impersonateToken) {
    //     toast.error(
    //         "You don't have permission to go to this page, you will redirected to the dashboard"
    //     );
    // }

    if (userType === UserTypes.admin) {
      navigate(ROUTES.ADMIN.dashboard.key);
    }
    if (userType === UserTypes.user) {
      navigate(ROUTES.USER.dashboard.key);
    }
  };

  return (
    <>
      {getUserLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <> {children}</>
      )}
    </>
  );
};

export default AuthGuard;
