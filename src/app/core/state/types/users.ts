import { PayloadAction } from "@reduxjs/toolkit";
import {
    IUser,
    IUsersResponse,
    GetUsersQuery,
    CreateAdminUserParam,
} from "../../interfaces/user.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Users {
    getGymUsers: GetUsers;
    getUsers: GetUsers;
    createUser: CreateUser;
    deleteUser: DeleteUser;
    updateUser: UpdateUser;
    getUser: GetUser;
}

export type GetUsers = LoadingResult & {
    data?: IUsersResponse;
};

export type CreateUser = LoadingResult & {
    data?: IUser;
};

export type UpdateUser = LoadingResult & {
    data?: IUser;
};

export type DeleteUser = LoadingResult;

export type GetUser = LoadingResult & {
    data?: IUser;
};

export type GetUsersRequestActionPayload = PayloadAction<GetUsersQuery>;

export type CreateUserRequestActionPayload =
    PayloadAction<CreateAdminUserParam>;
