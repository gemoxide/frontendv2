import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingResult } from ".";
import { IMetaQuery } from "../../interfaces/common.interface";
import {
    CreateSessionParam,
    ISessionResponse,
    UpdateMemberSessionParam,
    GetMemberSessionsQuery,
    ISession,
    SessionQuery,
} from "../../interfaces/sessions.interface";

export interface Sessions {
    getSessions: GetSessions;
    getMemberSessions: GetSessions;
    createSession: CreateSession;
    updateSession: UpdateSession;
    getSession: GetSession;
    updateMemberSession: UpdateMemberSession;
}

export type GetSessions = LoadingResult & {
    data?: ISessionResponse;
};

export type GetSessionsRequestActionPayload = PayloadAction<SessionQuery>;

export type GetMemberSessionsRequestActionPayload =
    PayloadAction<GetMemberSessionsQuery>;

export type CreateSession = LoadingResult & {
    data?: ISession;
};

export type CreateSessionRequestActionPayload =
    PayloadAction<CreateSessionParam>;
export type UpdateMemberSessionRequestActionPayload =
    PayloadAction<UpdateMemberSessionParam>;

export type UpdateSession = LoadingResult & {
    data?: ISession;
};

export type GetSession = LoadingResult & {
    data?: ISession;
};

export type UpdateMemberSession = LoadingResult & {
    data?: ISession;
};
