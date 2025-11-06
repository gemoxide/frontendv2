import { PayloadAction } from "@reduxjs/toolkit";
import {
    IInvitationResponse,
    GetInvitationsQuery,
    IInvitation,
    CreateInvitationParam,
} from "../../interfaces/invitation.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Invitations {
    getOrganizationInvitedUsers: GetInvitations;
    getGymsInvitations: GetInvitations;
    getInvitations: GetInvitations;
    createOrganizationInvitation: CreateInvitation;
    createInvitation: CreateInvitation;
    resendOrganizationInvitation: ResendInvitation;
    resendInvitation: ResendInvitation;
    updateInvitation: UpdateInvitation;
    deleteInvitation: DeleteInvitation;
}

export type GetInvitations = LoadingResult & {
    data?: IInvitationResponse;
};

export type GetInvitationsRequestActionPayload =
    PayloadAction<GetInvitationsQuery>;

export type CreateInvitation = LoadingResult & {
    data?: IInvitation;
};

export type ResendInvitation = LoadingResult & {
    data?: IInvitation;
};

export type UpdateInvitation = LoadingResult & {
    data?: IInvitation;
};

export type CreateInvitationRequestActionPayload =
    PayloadAction<CreateInvitationParam>;

export type DeleteInvitation = LoadingResult;
