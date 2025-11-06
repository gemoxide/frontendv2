import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../core/layouts/AuthLayout";
import SidebarLayout from "../core/layouts/SidebarLayout";
import { RouteItem, UserRoles } from "../core/interfaces/routes.interface";
import { authRoutes } from "../core/services/routes/auth-routes";
import { adminRoutes } from "../core/services/routes/admin-routes";
import { userRoutes } from "../core/services/routes/user-routes";
import { sharedRoutes } from "../core/services/routes/shared-routes";
import { useSelector } from "react-redux";
import { RootState } from "../core/state/reducer";

export type ChildRoutesProps = {
    Layout: any;
    routes: RouteItem[];
};

const childRoutes: FC<ChildRoutesProps> = ({ Layout, routes }): any => {
    return routes.map(
        (
            {
                component: Component,
                guard,
                path,
                index,
                roles,
                userTypes,
                props,
                permissions,
            },
            key
        ) => {
            const Guard = guard;

            return (
                <Route
                    index={index}
                    key={key}
                    path={path}
                    element={
                        <Layout>
                            {guard ? (
                                <Guard
                                    roles={roles}
                                    userTypes={userTypes}
                                    permissions={permissions}
                                >
                                    <Component {...props} />
                                </Guard>
                            ) : (
                                <Component {...props} />
                            )}
                        </Layout>
                    }
                />
            );
        }
    );
};

const AppRoutes = () => {
    return (
        <Routes>
            {childRoutes({
                routes: authRoutes,
                Layout: AuthLayout,
            })}
            {childRoutes({
                routes: userRoutes,
                Layout: SidebarLayout,
            })}
            {childRoutes({
                routes: adminRoutes,
                Layout: SidebarLayout,
            })}

            {childRoutes({
                routes: sharedRoutes,
                Layout: SidebarLayout,
            })}
            <Route path="/" element={<AuthLayout />} />
            <Route path="*" element={<AuthLayout />} />
        </Routes>
    );
};

export default AppRoutes;
