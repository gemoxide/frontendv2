import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingResult } from "../../interfaces/common.interface";
import { CreatePresentationDeckParam, GetPresentationDecksQuery, IPresentationDeck, IPresentationDeckResponse, UpdatePresentationDeckStatusParam } from "../../interfaces/presentation-decks.interface";
import { CreatePresentationDeckSlidesParam } from "../../interfaces/presentation-deck-slide.interface";


export interface PresentationDecks {
	getPresentationDecks: GetPresentationDecks;
	createPresentationDeck: CreatePresentationDeck;
	clonePresentationDeck: CreatePresentationDeck;
	deletePresentationDeck: DeletePresentationDeck;
	updatePresentationDeck: UpdatePresentationDeck;
	getPresentationDeck: GetPresentationDeck;
	updatePresentationDeckStatus: LoadingResult;
	updateAdminPresentationDeckStatus: LoadingResult;
	createPresentationDeckSlides: CreatePresentationDeckSlides;
}

export type GetPresentationDecks = LoadingResult & {
	data?: IPresentationDeckResponse;
}

export type GetPresentationDecksRequestActionPayload = PayloadAction<GetPresentationDecksQuery>;

export type CreatePresentationDeck = LoadingResult & {
	data?: IPresentationDeck;
};

export type CreatePresentationDeckSlides = LoadingResult & {
	data?: IPresentationDeck;
};

export type CreatePresentationDeckRequestActionPayload = PayloadAction<CreatePresentationDeckParam>;
export type CreatePresentationDeckSlidesRequestActionPayload = PayloadAction<CreatePresentationDeckSlidesParam>;
export type UpdatePresentationDeckStatusRequestActionPayload = PayloadAction<UpdatePresentationDeckStatusParam>;

export type UpdatePresentationDeck = LoadingResult & {
	data?: IPresentationDeck;
};

export type DeletePresentationDeck = LoadingResult;

export type GetPresentationDeck = LoadingResult & {
	data?: IPresentationDeck;
};