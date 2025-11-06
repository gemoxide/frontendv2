import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    AuthState,
    LoginRequestActionPayload,
    UpdateUserAvatarRequestActionPayload,
    UpdateUserRequestActionPayload,
    UpdateUserPasswordRequestActionPayload,
    RegisterUserRequestActionPayload,
} from "../types/auth";
import { DashboardReportsRequestActionPayload, FavoriteReportsRequestActionPayload } from "../types/reports";


const initialState: AuthState = {
    login: {
        data: {
            access_token: "",
            expires_in: 0,
            refresh_token: "",
            token_type: "",
        },
        loading: false,
        success: false,
        error: false,
    },
    user: {
        data: undefined,
        loading: false,
        success: false,
        error: false,
    },
    updateUser: {
        data: undefined,
        loading: false,
        success: false,
        error: false,
    },
    updateUserAvatar: {
        data: undefined,
        loading: false,
        success: false,
        error: false,
    },
    updateUserPassword: {
        data: undefined,
        loading: false,
        success: false,
        error: false,
    },
    registerUser: {
        data: undefined,
        loading: false,
        success: false,
        error: false,
    },
    impersonateUser: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateDashboardReports: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },

    addFavoriteReport: {
		data: undefined,
		success: false,
		loading: false,
		error: false,
	},
	removeFavoriteReport: {
		data: undefined,
		success: false,
		loading: false,
		error: false,
	}
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, actions: LoginRequestActionPayload) {
            state.login = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        loginSuccess(state, actions) {
            state.login = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        loginFailure(state) {
            state.login = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        /* Get current user*/
        getCurrentUser(state) {
            state.user = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getCurrentUserSuccess(state, actions) {
            state.user = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getCurrentUserFailure(state) {
            state.user = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        updateUser(state, actions: UpdateUserRequestActionPayload) {
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
            if (state.user.data?.attributes)
                state.user.data.attributes = {
                    ...actions.payload.attributes,
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

        updateUserAvatar(state, actions: UpdateUserAvatarRequestActionPayload) {
            state.updateUserAvatar = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateUserAvatarSuccess(state, actions) {
            state.updateUserAvatar = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.user.data?.attributes)
                state.user.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        updateUserAvatarFailure(state) {
            state.updateUserAvatar = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        resetUpdateUserAvatar(state) {
            state.updateUserAvatar = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },

        updateUserPassword(
            state,
            actions: UpdateUserPasswordRequestActionPayload
        ) {
            state.updateUserPassword = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateUserPasswordSuccess(state, actions) {
            state.updateUserPassword = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateUserPasswordFailure(state) {
            state.updateUserPassword = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        resetUpdateUserPassword(state) {
            state.updateUserPassword = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },
        registerUser(state, actions: RegisterUserRequestActionPayload) {
            state.registerUser = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        registerUserSuccess(state, actions) {
            state.registerUser = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        registerUserFailure(state) {
            state.registerUser = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetRegisterUser(state) {
            state.registerUser = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },
        impersonateUser(state, actions: PayloadAction<number>) {
            state.impersonateUser = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        impersonateUserSuccess(state, actions) {
            state.impersonateUser = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        impersonateUserFailure(state) {
            state.impersonateUser = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        updateDashboardReports(state, actions: DashboardReportsRequestActionPayload) {
            state.updateDashboardReports = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateDashboardReportsSuccess(state, actions) {
            state.updateDashboardReports = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.user.data?.attributes)
                state.user.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        updateDashboardReportsFailure(state) {
            state.updateDashboardReports = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        addFavoriteReport(state, actions: FavoriteReportsRequestActionPayload) {
            state.addFavoriteReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        addFavoriteReportSuccess(state, actions) {
            state.addFavoriteReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.user.data?.attributes)
                state.user.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        addFavoriteReportFailure(state) {
            state.addFavoriteReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        removeFavoriteReport(state, actions: FavoriteReportsRequestActionPayload) {
            state.addFavoriteReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        removeFavoriteReportSuccess(state, actions) {
            state.addFavoriteReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.user.data?.attributes)
                state.user.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        removeFavoriteReportFailure(state) {
            state.addFavoriteReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

    },
});

export const {
    login,
    loginFailure,
    loginSuccess,
    getCurrentUser,
    getCurrentUserSuccess,
    getCurrentUserFailure,
    updateUser,
    updateUserFailure,
    updateUserSuccess,
    updateUserAvatar,
    updateUserAvatarFailure,
    updateUserAvatarSuccess,
    resetUpdateUserAvatar,
    updateUserPassword,
    updateUserPasswordFailure,
    updateUserPasswordSuccess,
    resetUpdateUserPassword,
    registerUser,
    registerUserFailure,
    registerUserSuccess,
    resetRegisterUser,
    impersonateUser,
    impersonateUserFailure,
    impersonateUserSuccess,
    addFavoriteReport,
    addFavoriteReportFailure,
    addFavoriteReportSuccess,
    removeFavoriteReport,
    removeFavoriteReportFailure,
    removeFavoriteReportSuccess,
    updateDashboardReports,
    updateDashboardReportsFailure,
    updateDashboardReportsSuccess
} = authSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            login,
            getCurrentUser,
            updateUser,
            updateUserAvatar,
            resetUpdateUserAvatar,
            resetUpdateUserPassword,
            updateUserPassword,
            registerUser,
            resetRegisterUser,
            impersonateUser,
            addFavoriteReport,
            removeFavoriteReport,
            updateDashboardReports
        },
        useDispatch()
    );
};

export default authSlice.reducer;
