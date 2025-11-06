import httpClient from "../../clients/httpClient";
import {
  RegisterUserParam,
  UpdateUserAvatarParam,
  UpdateUserParam,
  UpdateUserPasswordParam,
} from "../../interfaces/auth.interface";
import { apiClientId, apiClientSecret } from "../variables";

// export const loginRequest = (payload: any) => {
//     return httpClient.post("/oauth/token", {
//         ...payload,
//         client_id: apiClientId,
//         client_secret: apiClientSecret,
//         grant_type: "password",
//         scope: "",
//     });
// };

export const loginRequest = (payload: any) => {
  return httpClient.post("/api/v1/auth/login", payload);
};

export const getLoggedInUserRequest = () => {
  return httpClient.get("/api/v1/auth/user");
};

// export const getLoggedInUserRequest = () => {
//   return httpClient.get(
//     "/api/v1/user?include=roles,user_gyms,groups,gyms,organization"
//   );
// };

export const registerRequest = (payload: any) => {
  return httpClient.post("/api/v1/register", { ...payload });
};

export const forgotPasswordRequest = (email: string) => {
  return httpClient.post("/api/v1/password/email", { email });
};

export const updateUserRequest = (payload: UpdateUserParam) => {
  return httpClient.post("/api/v1/users/profile", payload);
};

export const updateUserAvatarRequest = (payload: UpdateUserAvatarParam) => {
  const formData = new FormData();
  formData.append("avatar", payload.file);
  return httpClient.post("/api/v1/users/avatar", formData);
};

export const updateUserPasswordRequest = (payload: UpdateUserPasswordParam) => {
  return httpClient.post("/api/v1/users/password", payload);
};

export const registerUserRequest = (payload: RegisterUserParam) => {
  return httpClient.post("/api/v1/register", payload);
};

export const impersonateUserRequest = (user_id: number) => {
  return httpClient.post(`/api/v1/admin/users/${user_id}/impersonate`);
};

export const updateUserSignatureRequest = (payload: string) => {
  return httpClient.post("/api/v1/auth/signature", { signature: payload });
};
