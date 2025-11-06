import { PayloadAction } from "@reduxjs/toolkit";
import {
    CreateMemberPresentationDecksParam,
    GetMemberPresentationDeckParam,
    GetMemberPresentationDecksQuery,
    IMemberPresentationDeck,
    IMemberPresentationDecksResponse,
    MemberPresentationDeckParam,
    UpdateMemberPresentationDeckCurrentSlideParam,
} from "../../interfaces/member-presentation-decks.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface MemberPresentationDecks {
    getMemberPresentationDecks: GetMemberPresentationDecks;
    getMemberPresentationDeck: GetMemberPresentationDeck;
    createMemberPresentationDeck: GetMemberPresentationDeck;
    deleteMemberPresentationDeck: DeleteMemberPresentationDeck;
    updateMemberPresentationDeck: GetMemberPresentationDeck;
    updateMemberPresentationDeckCurrentSlide: GetMemberPresentationDeck;
    completeMemberPresentationDeck: GetMemberPresentationDeck;
    updateMemberPresentationDeckUser: GetMemberPresentationDeck;
    createGrowPresentationAnswer: GetMemberPresentationDeck;
}

export type GetMemberPresentationDecks = LoadingResult & {
    data?: IMemberPresentationDecksResponse;
};

export type GetMemberPresentationDecksRequestActionPayload =
    PayloadAction<GetMemberPresentationDecksQuery>;

export type GetMemberPresentationDeckRequestActionPayload = PayloadAction<GetMemberPresentationDeckParam>


export type GetMemberPresentationDeck = LoadingResult & {
    data?: IMemberPresentationDeck;
};

export type CreateMemberPresentationDeckRequestActionPayload =
    PayloadAction<CreateMemberPresentationDecksParam>;

export type UpdateMemberPresentationDeckCurrentSlideRequestActionPayload =
    PayloadAction<UpdateMemberPresentationDeckCurrentSlideParam>;

export type MemberPresentationDeckRequestActionPayload = PayloadAction<MemberPresentationDeckParam>



export type DeleteMemberPresentationDeck = LoadingResult;
