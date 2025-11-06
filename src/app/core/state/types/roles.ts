import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingResult } from "../../interfaces/common.interface";
import { GetRolesQuery, IRolesResponse } from "../../interfaces/roles.interface";

export interface UserRoles {
    getUserRoles: GetUserRoles;
}

export type GetUserRoles = LoadingResult & {
    data?: IRolesResponse;
};


export type GetUserRolesRequestActionPayload = PayloadAction<GetRolesQuery>;