import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateGroupRequestActionPayload,
    GetGroupsRequestActionPayload,
    Groups,
} from "../types/groups";

const initialState: Groups = {
    getGroups: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createGroup: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateGroup: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteGroup: {
        success: false,
        loading: false,
        error: false,
    },
};

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        getGroups(state, actions: GetGroupsRequestActionPayload) {
            state.getGroups = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGroupsSuccess(state, actions) {
            state.getGroups = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGroupsFailure(state) {
            state.getGroups = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createGroup(state, actions: CreateGroupRequestActionPayload) {
            state.createGroup = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createGroupSuccess(state, actions) {
            state.createGroup = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createGroupFailure(state) {
            state.createGroup = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteGroup(state, actions: PayloadAction<number>) {
            state.deleteGroup = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteGroupSuccess(state) {
            state.deleteGroup = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteGroupFailure(state) {
            state.deleteGroup = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateGroup(state, actions: CreateGroupRequestActionPayload) {
            state.updateGroup = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateGroupSuccess(state, actions) {
            state.updateGroup = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateGroupFailure(state) {
            state.updateGroup = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getGroups,
    getGroupsFailure,
    getGroupsSuccess,
    createGroup,
    createGroupFailure,
    createGroupSuccess,
    deleteGroup,
    deleteGroupFailure,
    deleteGroupSuccess,
    updateGroupFailure,
    updateGroupSuccess,
    updateGroup,
} = groupsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getGroups,
            createGroup,
            deleteGroup,
            updateGroup,
        },
        useDispatch()
    );
};

export default groupsSlice.reducer;
