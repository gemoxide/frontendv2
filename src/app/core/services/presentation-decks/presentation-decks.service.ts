import httpClient from "../../clients/httpClient";
import { CreatePresentationDeckSlidesParam } from "../../interfaces/presentation-deck-slide.interface";
import { CreatePresentationDeckParam, GetPresentationDeckParam, GetPresentationDecksQuery, UpdatePresentationDeckStatusParam } from "../../interfaces/presentation-decks.interface";

export const getPresentationDecksRequest = (query: GetPresentationDecksQuery) => {
	return httpClient.get("/api/v1/presentation-decks", {
		params: query,
	});
};

export const createPresentationDeckRequest = (body: CreatePresentationDeckParam) => {
	return httpClient.post("/api/v1/presentation-decks", body);
};

export const clonePresentationDeckRequest = (id: number) => {
	return httpClient.post(`/api/v1/presentation-decks/${id}/clone`);
};

export const deletePresentationDeckRequest = (id: number) => {
	return httpClient.delete(`/api/v1/presentation-decks/${id}`);
};

export const updatePresentationDeckRequest = (body: CreatePresentationDeckParam) => {
	return httpClient.patch(`/api/v1/presentation-decks/${body?.id}`, body);
};

export const getPresentationDeckRequest = (query: GetPresentationDeckParam) => {
	return httpClient.get(`/api/v1/presentation-decks/${query.id}`, {
		params: query.params
	});
};

export const updatePresentationDeckStatusRequest = (body: UpdatePresentationDeckStatusParam) => {
	return httpClient.patch(`/api/v1/presentation-decks/${body.id}/activate`, body);
};

export const updateAdminPresentationDeckStatusRequest = (body: UpdatePresentationDeckStatusParam) => {
	return httpClient.patch(`/api/v1/presentation-decks/${body.id}/activate-admin`, body);
};

export const createPresentationDeckSlidesRequest = (body: CreatePresentationDeckSlidesParam) => {
	return httpClient.patch(`/api/v1/presentation-decks/${body.id}/slides`, body);
};