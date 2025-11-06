import { PayloadAction } from "@reduxjs/toolkit";
import {
  IOauth,
  UpdateUserAvatarParam,
  UpdateUserParam,
  UpdateUserPasswordParam,
  RegisterUserParam,
} from "../../interfaces/auth.interface";
import { LoadingResult } from "../../interfaces/common.interface";
import {
  IImpersonateUserResponse,
  IUser,
} from "../../interfaces/user.interface";
import { DashboardReports } from "./reports";
import { FavoriteReports } from "./reports";

export interface AuthState {
  login: LoginRequest;
  user: User;
  updateUser: User;
  updateUserAvatar: UpdateUserAvatar;
  updateUserPassword: UpdateUserPassword;
  registerUser: RegisterUser;
  impersonateUser: ImpersonateUser;
  updateDashboardReports: DashboardReports;
  addFavoriteReport: FavoriteReports;
  removeFavoriteReport: FavoriteReports;
}

export type LoginRequest = LoadingResult & {
  data?: IOauth;
};

export type LoginRequestActionPayload = PayloadAction<LoginPayload>;

export type LoginPayload = {
  email: string;
  password: string;
};

export type User = LoadingResult & {
  data?: IUser;
};

export type UpdateUserAvatar = LoadingResult & {
  data?: IUser;
};

export type UpdateUserPassword = LoadingResult & {
  data?: IUser;
};

export type UpdateUserRequestActionPayload = PayloadAction<UpdateUserParam>;

export type UpdateUserAvatarRequestActionPayload =
  PayloadAction<UpdateUserAvatarParam>;

export type UpdateUserPasswordRequestActionPayload =
  PayloadAction<UpdateUserPasswordParam>;

export type RegisterUser = LoadingResult & {
  data?: IUser;
};

export type RegisterUserRequestActionPayload = PayloadAction<RegisterUserParam>;

export type ImpersonateUser = LoadingResult & {
  data?: IImpersonateUserResponse;
};
