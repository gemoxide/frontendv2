import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreatePresentationDeckRequestActionPayload,
    CreatePresentationDeckSlidesRequestActionPayload,
    GetPresentationDecksRequestActionPayload,
    PresentationDecks,
    UpdatePresentationDeckStatusRequestActionPayload,
} from "../types/presentation-decks";
import { GetPresentationDeckParam } from "../../interfaces/presentation-decks.interface";

const initialState: PresentationDecks = {
    getPresentationDecks: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createPresentationDeck: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    clonePresentationDeck: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updatePresentationDeck: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deletePresentationDeck: {
        success: false,
        loading: false,
        error: false,
    },
    getPresentationDeck: {
        success: false,
        loading: false,
        error: false,
    },
    updatePresentationDeckStatus: {
        success: false,
        loading: false,
        error: false,
    },
    updateAdminPresentationDeckStatus: {
        success: false,
        loading: false,
        error: false,
    },
    createPresentationDeckSlides: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const presentationDecksSlice = createSlice({
    name: "presentationDecks",
    initialState,
    reducers: {
        getPresentationDecks(
            state,
            actions: GetPresentationDecksRequestActionPayload
        ) {
            state.getPresentationDecks = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getPresentationDecksSuccess(state, actions) {
            state.getPresentationDecks = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getPresentationDecksFailure(state) {
            state.getPresentationDecks = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createPresentationDeck(
            state,
            actions: CreatePresentationDeckRequestActionPayload
        ) {
            state.createPresentationDeck = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createPresentationDeckSuccess(state, actions) {
            state.createPresentationDeck = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createPresentationDeckFailure(state) {
            state.createPresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetCreatePresentationDeck(state) {
            state.createPresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },

        clonePresentationDeck(state, actions: PayloadAction<number>) {
            state.clonePresentationDeck = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        clonePresentationDeckSuccess(state, actions) {
            state.clonePresentationDeck = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getPresentationDecks.data)
                state.getPresentationDecks.data.data.unshift(actions.payload);
        },
        clonePresentationDeckFailure(state) {
            state.clonePresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },


        deletePresentationDeck(state, actions: PayloadAction<number>) {
            state.deletePresentationDeck = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deletePresentationDeckSuccess(state) {
            state.deletePresentationDeck = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deletePresentationDeckFailure(state) {
            state.deletePresentationDeck = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updatePresentationDeck(
            state,
            actions: CreatePresentationDeckRequestActionPayload
        ) {
            state.updatePresentationDeck = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updatePresentationDeckSuccess(state, actions) {
            state.updatePresentationDeck = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updatePresentationDeckFailure(state) {
            state.updatePresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        updatePresentationDeckStatus(
            state,
            actions: UpdatePresentationDeckStatusRequestActionPayload
        ) {
            state.updatePresentationDeckStatus = {
                loading: true,
                success: false,
                error: false,
            };
        },
        updatePresentationDeckStatusSuccess(state, actions) {
            state.updatePresentationDeckStatus = {
                loading: false,
                success: true,
                error: false,
            };
        },
        updatePresentationDeckStatusFailure(state) {
            state.updatePresentationDeckStatus = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateAdminPresentationDeckStatus(
            state,
            actions: UpdatePresentationDeckStatusRequestActionPayload
        ) {
            state.updateAdminPresentationDeckStatus = {
                loading: true,
                success: false,
                error: false,
            };
        },
        updateAdminPresentationDeckStatusSuccess(state, actions) {
            state.updateAdminPresentationDeckStatus = {
                loading: false,
                success: true,
                error: false,
            };
        },
        updateAdminPresentationDeckStatusFailure(state) {
            state.updateAdminPresentationDeckStatus = {
                loading: false,
                success: false,
                error: true,
            };
        },

        createPresentationDeckSlides(
            state,
            actions: CreatePresentationDeckSlidesRequestActionPayload
        ) {
            state.createPresentationDeckSlides = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createPresentationDeckSlidesSuccess(state, actions) {
            state.createPresentationDeckSlides = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createPresentationDeckSlidesFailure(state) {
            state.createPresentationDeckSlides = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getPresentationDeck(
            state,
            actions: PayloadAction<GetPresentationDeckParam>
        ) {
            state.getPresentationDeck = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getPresentationDeckSuccess(state, actions) {
            state.getPresentationDeck = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getPresentationDeckFailure(state) {
            state.getPresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetGetPresentationDeck(state) {
            state.getPresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },
    },
});

export const {
    createPresentationDeck,
    createPresentationDeckFailure,
    createPresentationDeckSuccess,
    deletePresentationDeck,
    deletePresentationDeckFailure,
    deletePresentationDeckSuccess,
    getPresentationDeck,
    getPresentationDeckFailure,
    getPresentationDeckSuccess,
    getPresentationDecks,
    getPresentationDecksFailure,
    getPresentationDecksSuccess,
    resetGetPresentationDeck,
    updatePresentationDeck,
    updatePresentationDeckFailure,
    updatePresentationDeckStatus,
    updatePresentationDeckStatusFailure,
    updatePresentationDeckStatusSuccess,
    updatePresentationDeckSuccess,
    createPresentationDeckSlides,
    createPresentationDeckSlidesFailure,
    createPresentationDeckSlidesSuccess,
    resetCreatePresentationDeck,
    updateAdminPresentationDeckStatus,
    updateAdminPresentationDeckStatusFailure,
    updateAdminPresentationDeckStatusSuccess,
    clonePresentationDeck,
    clonePresentationDeckFailure,
    clonePresentationDeckSuccess
} = presentationDecksSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getPresentationDecks,
            createPresentationDeck,
            deletePresentationDeck,
            updatePresentationDeck,
            getPresentationDeck,
            updatePresentationDeckStatus,
            resetGetPresentationDeck,
            createPresentationDeckSlides,
            resetCreatePresentationDeck,
            updateAdminPresentationDeckStatus,
            clonePresentationDeck
        },
        useDispatch()
    );
};

export default presentationDecksSlice.reducer;
