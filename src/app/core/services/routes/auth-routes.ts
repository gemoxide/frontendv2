import ForgotPassword from "../../../modules/shared/auth/ForgotPassword/index";
import Login from "../../../modules/shared/auth/Login/index";
import Register from "../../../modules/shared/auth/Register/index";
import RegisterWithOTP from "../../../modules/shared/auth/RegisterWithOTP/index";
import { RouteItem } from "../../../core/interfaces/routes.interface";
import { ROUTES } from "../../../core/constants/routes";

const login: RouteItem = {
    id: ROUTES.AUTH.login.key,
    path: ROUTES.AUTH.login.key,
    component: Login,
    index: true,
};

const register: RouteItem = {
    id: ROUTES.AUTH.register.key,
    path: ROUTES.AUTH.register.key,
    component: Register,
};

const registerWithOtp: RouteItem = {
    id: ROUTES.AUTH.register_with_otp.key,
    path: ROUTES.AUTH.register_with_otp.key,
    component: RegisterWithOTP,
};

const forgotPassword: RouteItem = {
    id: ROUTES.AUTH.forgot_password.key,
    path: ROUTES.AUTH.forgot_password.key,
    component: ForgotPassword,
};

export const authRoutes: RouteItem[] = [
    login,
    register,
    registerWithOtp,
    forgotPassword,
];
