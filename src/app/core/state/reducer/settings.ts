import { createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { Settings } from "../types/settings";

const initialState: Settings = {
    getSettings: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        getSettings(state) {
            state.getSettings = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSettingsSuccess(state, actions) {
            state.getSettings = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSettingsFailure(state) {
            state.getSettings = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const { getSettings, getSettingsSuccess, getSettingsFailure } =
    settingsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getSettings,
        },
        useDispatch()
    );
};

export default settingsSlice.reducer;
