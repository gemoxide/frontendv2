export const adminBasePath = "/admin";
export const authBasePath = "/auth";

export const ROUTES = {
  AUTH: {
    login: {
      key: authBasePath + "/",
    },
    register: {
      key: authBasePath + "/register",
    },
    register_with_otp: {
      key: authBasePath + "/register-with-otp",
    },
    forgot_password: {
      key: authBasePath + "/forgot-password",
    },
  },
  ADMIN: {
    dashboard: {
      key: adminBasePath + "/dashboard",
    },
    products: {
      key: adminBasePath + "/products",
    },
  },
  USER: {
    dashboard: {
      key: "/dashboard",
    },
  },
  SHARED: {
    profile: {
      key: "/profile",
    },
  },
};
