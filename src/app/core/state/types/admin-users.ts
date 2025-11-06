import { PayloadAction } from "@reduxjs/toolkit";
import {
    IUser,
    IUsersResponse,
    GetUsersQuery,
    CreateAdminUserParam,
} from "../../interfaces/user.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface AdminUsers {
    getAdminUsers: GetAdminUsers;
    getAdminOrganizationUsers: GetAdminOrganizationUsers;
    createAdminUser: CreateAdminUser;
    deleteAdminUser: DeleteAdminUser;
    updateAdminUser: UpdateAdminUser;
}

export type GetAdminUsers = LoadingResult & {
    data?: IUsersResponse;
};

export type GetAdminOrganizationUsers = LoadingResult & {
    data?: IUsersResponse;
};

export type CreateAdminUser = LoadingResult & {
    data?: IUser;
};

export type UpdateAdminUser = LoadingResult & {
    data?: IUser;
};

export type DeleteAdminUser = LoadingResult;

export type GetAdminUsersRequestActionPayload = PayloadAction<GetUsersQuery>;

export type CreateAdminUserRequestActionPayload =
    PayloadAction<CreateAdminUserParam>;
