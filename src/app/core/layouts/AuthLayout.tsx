import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { RootState } from "../state/reducer";
import { useSelector } from "react-redux";
import { UserRoles, UserTypes } from "../interfaces/routes.interface";
import { ROUTES } from "../constants/routes";

const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
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
        const userRole =
          currentUser?.relationships?.roles?.[0]?.attributes?.name;
        if (userRole === UserRoles.admin) {
          navigate(ROUTES.ADMIN.dashboard.key);
        }
        if (userRole === UserRoles.user) {
          navigate(ROUTES.USER.dashboard.key);
        }
      } else {
        if (window.location.pathname === "/") navigate(ROUTES.AUTH.login.key);
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="w-screen h-screen grid place-items-center">
      {!getUserLoading && children && children}
      {getUserLoading && <Loader />}
    </div>
  );
};

export default AuthLayout;
