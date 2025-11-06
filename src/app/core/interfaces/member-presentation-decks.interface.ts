import { IGrowSlideAnswer } from "./answers.interface";
import { IMeta, IMetaQuery } from "./common.interface";
import { IMember } from "./members.interface";
import { IPresentationDeck } from "./presentation-decks.interface";

export interface IMemberPresentationDeck {
    type: string;
    id: any;
    attributes: {
        completed_at?: string;
        current_slide: number;
        custom_deck?: string;
    };
    relationships: {
        presentation_deck?: IPresentationDeck;
        grow_slide_answer?: IGrowSlideAnswer;
        member?: IMember;
    };
}

export interface IMemberPresentationDecksResponse {
    data: IMemberPresentationDeck[];
    meta: IMeta;
}

export type GetMemberPresentationDeckParam = {
    member_id: string,
    member_presentation_deck_id: string
}

export type GetMemberPresentationDecksQuery = {
    member_id: string;
    query: IMetaQuery;
};

export type MemberPresentationDeckParam = {
    member_id?: string;
    id?: string;
}

export type CreateMemberPresentationDecksParam = MemberPresentationDeckParam & {
    custom_deck?: string;
    presentation_deck_id?: string;
};

export type UpdateMemberPresentationDeckCurrentSlideParam = MemberPresentationDeckParam & {
    current_slide: number;
}
