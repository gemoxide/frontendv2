import { PayloadAction } from "@reduxjs/toolkit";
import {
    IPermissionsResponse,
    GetPermissionsQuery,
    GetPermissionsByTypeQuery,
    SortPermissionsParam,
} from "../../interfaces/permissions.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface AdminPermissions {
    getAdminPermissions: GetAdminPermissions;
    getAdminPermissionsByType: GetAdminPermissions;
    sortAdminPermissions: GetAdminPermissions;
}

export type GetAdminPermissions = LoadingResult & {
    data?: IPermissionsResponse;
};

export type GetAdminPermissionsRequestActionPayload =
    PayloadAction<GetPermissionsQuery>;

export type GetAdminPermissionsByTypeRequestActionPayload =
    PayloadAction<GetPermissionsByTypeQuery>;

export type SortAdminPermissionsRequestActionPayload = PayloadAction<{ type: string; body: SortPermissionsParam }>
