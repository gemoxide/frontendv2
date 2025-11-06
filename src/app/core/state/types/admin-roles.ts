import { PayloadAction } from "@reduxjs/toolkit";
import {
    IRolesResponse,
    IRole,
    CreateAdminRoleParam,
    GetRolesQuery,
    GetRolesByTypeQuery,
} from "../../interfaces/roles.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface AdminRoles {
    getAdminRoles: GetAdminRoles;
    createAdminRole: CreateAdminRole;
    deleteAdminRole: DeleteAdminRole;
    updateAdminRole: UpdateAdminRole;
    getAdminRolesByType: GetAdminRolesByTpe;
}

export type GetAdminRoles = LoadingResult & {
    data?: IRolesResponse;
};

export type GetAdminRolesByTpe = LoadingResult & {
    data?: IRolesResponse;
};

export type CreateAdminRole = LoadingResult & {
    data?: IRole;
};

export type UpdateAdminRole = LoadingResult & {
    data?: IRole;
};

export type DeleteAdminRole = LoadingResult;

export type GetAdminRolesRequestActionPayload = PayloadAction<GetRolesQuery>;
export type GetAdminRolesByTypeRequestActionPayload =
    PayloadAction<GetRolesByTypeQuery>;

export type CreateAdminRequestActionPayload =
    PayloadAction<CreateAdminRoleParam>;
