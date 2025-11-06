import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateQuickLinkRequestActionPayload,
    GetQuickLinksRequestActionPayload,
    QuickLinks,
} from "../types/quick-links";

const initialState: QuickLinks = {
    getQuickLinks: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createQuickLink: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateQuickLink: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteQuickLink: {
        success: false,
        loading: false,
        error: false,
    },
};

const QuickLinksSlice = createSlice({
    name: "quickLinks",
    initialState,
    reducers: {
        getQuickLinks(state, actions: GetQuickLinksRequestActionPayload) {
            state.getQuickLinks = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getQuickLinksSuccess(state, actions) {
            state.getQuickLinks = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getQuickLinksFailure(state) {
            state.getQuickLinks = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createQuickLink(state, actions: CreateQuickLinkRequestActionPayload) {
            state.createQuickLink = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createQuickLinkSuccess(state, actions) {
            state.createQuickLink = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getQuickLinks.data)
                state.getQuickLinks.data.data.unshift(actions.payload);
        },
        createQuickLinkFailure(state) {
            state.createQuickLink = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteQuickLink(
            state,
            actions: PayloadAction<{ organization_id: string; id: string }>
        ) {
            state.deleteQuickLink = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteQuickLinkSuccess(state, actions) {
            state.deleteQuickLink = {
                loading: false,
                success: true,
                error: false,
            };
            if (state.getQuickLinks.data?.data) {
                state.getQuickLinks.data.data =
                    state.getQuickLinks.data?.data.filter(
                        (arrow) => arrow.id !== actions.payload.id
                    );
            }
        },
        deleteQuickLinkFailure(state) {
            state.deleteQuickLink = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateQuickLink(state, actions: CreateQuickLinkRequestActionPayload) {
            state.updateQuickLink = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateQuickLinkSuccess(state, actions) {
            state.updateQuickLink = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getQuickLinks.data?.data && actions.payload) {
                const updateQuickLink = actions.payload;
                const findIndex = state.getQuickLinks.data?.data?.findIndex(
                    (quickLink) => quickLink.id == updateQuickLink.id
                );

                if (state?.getQuickLinks?.data?.data?.[findIndex])
                    state.getQuickLinks.data.data[findIndex] = updateQuickLink;
            }
        },
        updateQuickLinkFailure(state) {
            state.updateQuickLink = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getQuickLinks,
    getQuickLinksFailure,
    getQuickLinksSuccess,
    createQuickLink,
    createQuickLinkFailure,
    createQuickLinkSuccess,
    deleteQuickLink,
    deleteQuickLinkFailure,
    deleteQuickLinkSuccess,
    updateQuickLinkFailure,
    updateQuickLink,
    updateQuickLinkSuccess,
} = QuickLinksSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getQuickLinks,
            createQuickLink,
            deleteQuickLink,
            updateQuickLink,
        },
        useDispatch()
    );
};

export default QuickLinksSlice.reducer;
