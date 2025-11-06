import httpClient from "../../clients/httpClient";
import { IMetaQuery } from "../../interfaces/common.interface";
import {
    CreateMemberPresentationDecksParam,
    GetMemberPresentationDeckParam,
    MemberPresentationDeckParam,
    UpdateMemberPresentationDeckCurrentSlideParam,
} from "../../interfaces/member-presentation-decks.interface";

export const getMemberPresentationDecksRequest = (
    member_id: string,
    query: IMetaQuery
) => {
    return httpClient.get(
        `/api/v1/members/${member_id}/presentation-decks?include=presentationDeck`,
        {
            params: query,
        }
    );
};

export const getMemberPresentationDeckRequest = (
    body: GetMemberPresentationDeckParam
) => {
    return httpClient.get(
        `/api/v1/members/${body.member_id}/presentation-decks/${body.member_presentation_deck_id}?include=answers,presentationDeck,presentationDeckSlides,form,fields,contact_field,growSlideAnswer`
    );
};

export const createMemberPresentationDecksRequest = (
    body: CreateMemberPresentationDecksParam
) => {
    return httpClient.post(
        `/api/v1/members/${body?.member_id}/presentation-decks?include=presentationDeck,presentationDeckSlides,form,fields,contact_field,growSlideAnswer`,
        body
    );
};

export const updateMemberPresentationDecksRequest = (
    body: CreateMemberPresentationDecksParam
) => {
    return httpClient.patch(
        `/api/v1/members/${body?.member_id}/presentation-decks/${body.id}?include=presentationDeck,growSlideAnswer`,
        body
    );
};

export const updateMemberPresentationDeckCurrentSlideRequest = (
    body: UpdateMemberPresentationDeckCurrentSlideParam
) => {
    return httpClient.patch(
        `/api/v1/members/${body?.member_id}/presentation-decks/${body.id}/current-slide?include=presentationDeck`,
        body
    );
};

export const completeMemberPresentationDeckRequest = (
    body: MemberPresentationDeckParam
) => {
    return httpClient.patch(
        `/api/v1/members/${body?.member_id}/presentation-decks/${body.id}/complete?include=presentationDeck`
    );
};

export const updateMemberPresentationDeckUserRequest = (
    body: MemberPresentationDeckParam
) => {
    return httpClient.patch(
        `/api/v1/members/${body?.member_id}/presentation-decks/${body.id}/update-user?include=presentationDeck`
    );
};

export const deleteMemberPresentationDecksRequest = (
    member_id: string,
    id: string
) => {
    return httpClient.delete(
        `/api/v1/members/${member_id}/presentation-decks/${id}`
    );
};
