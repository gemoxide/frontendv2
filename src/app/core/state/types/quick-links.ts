import { PayloadAction } from "@reduxjs/toolkit";
import {
    CreateQuickLinkParam,
    GetQuickLinksQuery,
    IQuickLink,
    IQuickLinkResponse,
} from "../../interfaces/quick-links.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface QuickLinks {
    getQuickLinks: GetQuickLinks;
    createQuickLink: CreateNote;
    deleteQuickLink: DeleteQuickLink;
    updateQuickLink: UpdateQuickLink;
}

export type GetQuickLinks = LoadingResult & {
    data?: IQuickLinkResponse;
};

export type GetQuickLinksRequestActionPayload =
    PayloadAction<GetQuickLinksQuery>;

export type CreateNote = LoadingResult & {
    data?: IQuickLink;
};

export type CreateQuickLinkRequestActionPayload =
    PayloadAction<CreateQuickLinkParam>;

export type UpdateQuickLink = LoadingResult & {
    data?: IQuickLink;
};

export type DeleteQuickLink = LoadingResult;
