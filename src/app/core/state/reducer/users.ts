import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateUserRequestActionPayload,
    GetUsersRequestActionPayload,
    Users,
} from "../types/users";

const initialState: Users = {
    getGymUsers: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getUsers: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createUser: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteUser: {
        success: false,
        loading: false,
        error: false,
    },
    updateUser: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getUser: {
        success: false,
        loading: false,
        error: false,
    },
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getGymUsers(state, actions: GetUsersRequestActionPayload) {
            state.getGymUsers = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymUsersSuccess(state, actions) {
            state.getGymUsers = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymUsersFailure(state) {
            state.getGymUsers = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getUsers(state, actions: GetUsersRequestActionPayload) {
            state.getUsers = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getUsersSuccess(state, actions) {
            state.getUsers = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getUsersFailure(state) {
            state.getUsers = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createUser(state, actions: CreateUserRequestActionPayload) {
            state.createUser = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createUserSuccess(state, actions) {
            state.createUser = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createUserFailure(state) {
            state.createUser = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteUser(state, actions: PayloadAction<number>) {
            state.deleteUser = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteUserSuccess(state, actions) {
            state.deleteUser = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteUserFailure(state) {
            state.deleteUser = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateUser(state, actions: CreateUserRequestActionPayload) {
            state.updateUser = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateUserSuccess(state, actions) {
            state.updateUser = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateUserFailure(state) {
            state.updateUser = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getUser(state, actions: PayloadAction<string>) {
            state.getUser = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getUserSuccess(state, actions) {
            state.getUser = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getUserFailure(state) {
            state.getUser = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetGetUsers(state) {
            state.getUsers = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },
        resetGetUser(state) {
            state.getUser = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },
    },
});

export const {
    getUsers,
    getUsersSuccess,
    getUsersFailure,
    createUser,
    createUserSuccess,
    createUserFailure,
    deleteUser,
    deleteUserFailure,
    deleteUserSuccess,
    updateUser,
    updateUserSuccess,
    updateUserFailure,
    getGymUsers,
    getGymUsersSuccess,
    getGymUsersFailure,
    resetGetUsers,
    getUser,
    getUserSuccess,
    getUserFailure,
    resetGetUser,
} = userSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getUsers,
            getGymUsers,
            createUser,
            deleteUser,
            updateUser,
            resetGetUsers,
            getUser,
            resetGetUser,
        },
        useDispatch()
    );
};

export default userSlice.reducer;
