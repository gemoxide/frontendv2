import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateMemberPresentationDeckRequestActionPayload,
    GetMemberPresentationDeckRequestActionPayload,
    GetMemberPresentationDecksRequestActionPayload,
    MemberPresentationDeckRequestActionPayload,
    MemberPresentationDecks,
    UpdateMemberPresentationDeckCurrentSlideRequestActionPayload,
} from "../types/member-presentation-decks";
import { CreateGrowPresentationAnswersActionPayload } from "../types/answers";

const initialState: MemberPresentationDecks = {
    getMemberPresentationDecks: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMemberPresentationDeck: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createMemberPresentationDeck: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createGrowPresentationAnswer: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMemberPresentationDeck: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMemberPresentationDeckCurrentSlide: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    completeMemberPresentationDeck: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMemberPresentationDeckUser: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteMemberPresentationDeck: {
        success: false,
        loading: false,
        error: false,
    },
};

const MemberPresentationDecksSlice = createSlice({
    name: "memberPresentationDecks",
    initialState,
    reducers: {
        getMemberPresentationDecks(
            state,
            actions: GetMemberPresentationDecksRequestActionPayload
        ) {
            state.getMemberPresentationDecks = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberPresentationDecksSuccess(state, actions) {
            state.getMemberPresentationDecks = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberPresentationDecksFailure(state) {
            state.getMemberPresentationDecks = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getMemberPresentationDeck(
            state,
            actions: GetMemberPresentationDeckRequestActionPayload
        ) {
            state.getMemberPresentationDeck = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberPresentationDeckSuccess(state, actions) {
            state.getMemberPresentationDeck = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberPresentationDeckFailure(state) {
            state.getMemberPresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetGetMemberPresentationDeck(state) {
            state.getMemberPresentationDeck = {
                data: undefined,
                success: false,
                loading: false,
                error: false,
            }
        },


        createMemberPresentationDeck(
            state,
            actions: CreateMemberPresentationDeckRequestActionPayload
        ) {
            state.createMemberPresentationDeck = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createMemberPresentationDeckSuccess(state, actions) {
            state.createMemberPresentationDeck = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getMemberPresentationDecks.data)
                state.getMemberPresentationDecks.data.data.unshift(
                    actions.payload
                );
        },
        createMemberPresentationDeckFailure(state) {
            state.createMemberPresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createGrowPresentationAnswer(
            state,
            actions: CreateGrowPresentationAnswersActionPayload
        ) {
            state.createGrowPresentationAnswer = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createGrowPresentationAnswerSuccess(state, actions) {
            state.createGrowPresentationAnswer = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (actions.payload) {
                if (
                    state.getMemberPresentationDecks.data?.data

                ) {
                    const updatedMemberPresentationDeck = actions.payload;
                    const findIndex =
                        state.getMemberPresentationDecks.data?.data?.findIndex(
                            (MemberPresentationDeck) =>
                                MemberPresentationDeck.id ==
                                updatedMemberPresentationDeck.id
                        );

                    if (state?.getMemberPresentationDecks?.data?.data?.[findIndex])
                        state.getMemberPresentationDecks.data.data[findIndex] =
                            updatedMemberPresentationDeck;
                }

                if (state.createMemberPresentationDeck.data) {
                    state.createMemberPresentationDeck.data = actions.payload;
                }

                if (state.getMemberPresentationDeck.data) {
                    state.getMemberPresentationDeck.data = actions.payload;
                }
            }


        },
        createGrowPresentationAnswerFailure(state) {
            state.createGrowPresentationAnswer = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },


        resetCreateMemberPresentationDeck(state) {
            state.createMemberPresentationDeck = {
                data: undefined,
                success: false,
                loading: false,
                error: false,
            }
        },

        deleteMemberPresentationDeck(
            state,
            actions: PayloadAction<{ member_id: string; id: string }>
        ) {
            state.deleteMemberPresentationDeck = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteMemberPresentationDeckSuccess(state, actions) {
            state.deleteMemberPresentationDeck = {
                loading: false,
                success: true,
                error: false,
            };
            if (state.getMemberPresentationDecks.data?.data) {
                state.getMemberPresentationDecks.data.data =
                    state.getMemberPresentationDecks.data?.data.filter(
                        (arrow) => arrow.id !== actions.payload.id
                    );
            }
        },
        deleteMemberPresentationDeckFailure(state) {
            state.deleteMemberPresentationDeck = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateMemberPresentationDeck(
            state,
            actions: CreateMemberPresentationDeckRequestActionPayload
        ) {
            state.updateMemberPresentationDeck = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateMemberPresentationDeckSuccess(state, actions) {
            state.updateMemberPresentationDeck = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (
                state.getMemberPresentationDecks.data?.data &&
                actions.payload
            ) {
                const updatedMemberPresentationDeck = actions.payload;
                const findIndex =
                    state.getMemberPresentationDecks.data?.data?.findIndex(
                        (MemberPresentationDeck) =>
                            MemberPresentationDeck.id ==
                            updatedMemberPresentationDeck.id
                    );

                if (state?.getMemberPresentationDecks?.data?.data?.[findIndex])
                    state.getMemberPresentationDecks.data.data[findIndex] =
                        updatedMemberPresentationDeck;
            }
        },
        updateMemberPresentationDeckFailure(state) {
            state.updateMemberPresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        updateMemberPresentationDeckCurrentSlide(
            state,
            actions: UpdateMemberPresentationDeckCurrentSlideRequestActionPayload
        ) {
            state.updateMemberPresentationDeckCurrentSlide = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateMemberPresentationDeckCurrentSlideSuccess(state, actions) {
            state.updateMemberPresentationDeckCurrentSlide = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (
                state.getMemberPresentationDecks.data?.data &&
                actions.payload
            ) {
                const updatedMemberPresentationDeck = actions.payload;
                const findIndex =
                    state.getMemberPresentationDecks.data?.data?.findIndex(
                        (MemberPresentationDeck) =>
                            MemberPresentationDeck.id ==
                            updatedMemberPresentationDeck.id
                    );

                if (state?.getMemberPresentationDecks?.data?.data?.[findIndex])
                    state.getMemberPresentationDecks.data.data[findIndex] =
                        updatedMemberPresentationDeck;
            }
        },
        updateMemberPresentationDeckCurrentSlideFailure(state) {
            state.updateMemberPresentationDeckCurrentSlide = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        completeMemberPresentationDeck(
            state,
            actions: MemberPresentationDeckRequestActionPayload
        ) {
            state.completeMemberPresentationDeck = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        completeMemberPresentationDeckSuccess(state, actions) {
            state.completeMemberPresentationDeck = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (
                state.getMemberPresentationDecks.data?.data &&
                actions.payload
            ) {
                const updatedMemberPresentationDeck = actions.payload;
                const findIndex =
                    state.getMemberPresentationDecks.data?.data?.findIndex(
                        (MemberPresentationDeck) =>
                            MemberPresentationDeck.id ==
                            updatedMemberPresentationDeck.id
                    );

                if (state?.getMemberPresentationDecks?.data?.data?.[findIndex])
                    state.getMemberPresentationDecks.data.data[findIndex] =
                        updatedMemberPresentationDeck;
            }
        },
        completeMemberPresentationDeckFailure(state) {
            state.completeMemberPresentationDeck = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        updateMemberPresentationDeckUser(
            state,
            actions: MemberPresentationDeckRequestActionPayload
        ) {
            state.updateMemberPresentationDeckUser = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateMemberPresentationDeckUserSuccess(state, actions) {
            state.updateMemberPresentationDeckUser = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (
                state.getMemberPresentationDecks.data?.data &&
                actions.payload
            ) {
                const updatedMemberPresentationDeck = actions.payload;
                const findIndex =
                    state.getMemberPresentationDecks.data?.data?.findIndex(
                        (MemberPresentationDeck) =>
                            MemberPresentationDeck.id ==
                            updatedMemberPresentationDeck.id
                    );

                if (state?.getMemberPresentationDecks?.data?.data?.[findIndex])
                    state.getMemberPresentationDecks.data.data[findIndex] =
                        updatedMemberPresentationDeck;
            }
        },
        updateMemberPresentationDeckUserFailure(state) {
            state.updateMemberPresentationDeckUser = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getMemberPresentationDecks,
    getMemberPresentationDecksFailure,
    getMemberPresentationDecksSuccess,
    getMemberPresentationDeck,
    getMemberPresentationDeckFailure,
    getMemberPresentationDeckSuccess,
    createMemberPresentationDeck,
    createMemberPresentationDeckFailure,
    createMemberPresentationDeckSuccess,
    deleteMemberPresentationDeck,
    deleteMemberPresentationDeckFailure,
    deleteMemberPresentationDeckSuccess,
    updateMemberPresentationDeckFailure,
    updateMemberPresentationDeckSuccess,
    updateMemberPresentationDeck,
    completeMemberPresentationDeck,
    completeMemberPresentationDeckFailure,
    completeMemberPresentationDeckSuccess,
    updateMemberPresentationDeckCurrentSlide,
    updateMemberPresentationDeckCurrentSlideFailure,
    updateMemberPresentationDeckCurrentSlideSuccess,
    updateMemberPresentationDeckUser,
    updateMemberPresentationDeckUserFailure,
    updateMemberPresentationDeckUserSuccess,
    resetGetMemberPresentationDeck,
    resetCreateMemberPresentationDeck,
    createGrowPresentationAnswer,
    createGrowPresentationAnswerFailure,
    createGrowPresentationAnswerSuccess
} = MemberPresentationDecksSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getMemberPresentationDecks,
            getMemberPresentationDeck,
            createMemberPresentationDeck,
            deleteMemberPresentationDeck,
            updateMemberPresentationDeck,
            updateMemberPresentationDeckCurrentSlide,
            completeMemberPresentationDeck,
            updateMemberPresentationDeckUser,
            resetGetMemberPresentationDeck,
            resetCreateMemberPresentationDeck,
            createGrowPresentationAnswer
        },
        useDispatch()
    );
};

export default MemberPresentationDecksSlice.reducer;
