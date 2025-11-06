import { useContext, useEffect, useState } from "react";
import { IMainNavigation } from "../interfaces/navigation.interface";
import { RightSideBarContext } from "../context/rightSideBar";
import { getUserNavigation } from "../../core/services/routes/index";
import SideBarItem from "../components/SideBarItem";
import Header from "../components/TopNavBar";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducer";
import ToggleSidebar from "../components/ToggleSidebar";
import ToggleReportsForm from "../../modules/organization/dashboard/ToggleReportsForm";
import { DashboardReportsToggleContext } from "../context/dashboardReportsToggle";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { state: rightSideBarState } = useContext(RightSideBarContext);
  const { showToggleReports, setShowToggleReports } = useContext(
    DashboardReportsToggleContext
  );
  const { data: currentUser, loading: getUserLoading } = useSelector(
    (state: RootState) => state.auth.user
  );

  const location = useLocation();

  useEffect(() => {
    setShowToggleReports(false);
  }, [location.pathname]);

  const [navigation, setNavigation] = useState<IMainNavigation>({
    primary: [],
    secondary: [],
  });

  useEffect(() => {
    if (rightSideBarState?.refresh) {
      document.getElementById("rightSideDrawer")?.click();
    }
  }, [rightSideBarState?.refresh]);

  useEffect(() => {
    if (!getUserLoading && currentUser) {
      const permissionsList =
        currentUser?.relationships?.roles?.[0]?.relationships?.permissions?.map(
          (permission) => permission?.attributes?.name
        ) || [];

      const userRole =
        currentUser?.relationships?.roles?.[0]?.attributes?.name || "";

      setNavigation(
        getUserNavigation(
          userRole,
          permissionsList,
          currentUser?.relationships?.user_gyms?.length || 0
        ) as any
      );
    }
  }, [currentUser, getUserLoading]);

  return (
    <>
      <Header />
      <div
        className={`drawer xl:drawer-open z-10 ${
          location.pathname === ROUTES.USER.dashboard.key ? "static" : ""
        }`}
      >
        <input id="leftSideDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-screen w-full overflow-x-scroll">
          <section className="flex-1 w-full">
            {getUserLoading && (
              <div className="flex justify-center h-full">
                <Loader />
              </div>
            )}

            {!getUserLoading && (
              <div
                className={
                  location.pathname === ROUTES.USER.dashboard.key
                    ? "pl-6 pr-20"
                    : "px-6"
                }
              >
                {children}
              </div>
            )}
          </section>
        </div>
        <ToggleSidebar show={showToggleReports}>
          <ToggleReportsForm />
        </ToggleSidebar>
        <div className="drawer-side rounded-tr-xl shadow-lg text-secondary z-50">
          <label htmlFor="leftSideDrawer" className="drawer-overlay" />
          <nav className="bg-white space-y-2 overflow-y-auto w-80 md:w-72 text-base-content flex flex-col  justify-between h-screen">
            <ul className="menu w-full">
              {navigation.primary.map((item, idx) => (
                <SideBarItem
                  icon={item.icon as any}
                  name={item?.name}
                  iconActive={item.iconActive}
                  path={item?.path}
                  key={idx}
                />
              ))}
            </ul>
            <ul className="menu mb-12">
              {navigation.secondary.map((item, idx) => (
                <SideBarItem
                  icon={item.icon}
                  name={item?.name}
                  iconActive={item.iconActive}
                  path={item?.path}
                  key={idx}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* 
            todo right side bar component
               <div className="drawer-side">

                    <label
                        htmlFor="rightSideDrawer"
                        className="drawer-overlay"
                    />
                    <div className="p-10 overflow-y-auto w-1/4 bg-base-100 text-base-content">
                        {rightSideBarState?.component}
                    </div>
                </div> 
            */}
    </>
  );
};

export default SidebarLayout;
