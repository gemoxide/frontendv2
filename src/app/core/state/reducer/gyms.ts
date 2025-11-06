import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateGymRequestActionPayload,
    GetGymsRequestActionPayload,
    Gyms,
    UpdateDefaultsRequestActionPayload,
} from "../types/gyms";

const initialState: Gyms = {
    getGyms: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getOrganizationGyms: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createOrganizationGym: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createGym: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateGym: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteGym: {
        success: false,
        loading: false,
        error: false,
    },
    getGym: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateDefaults: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateWig: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    leadMeasures: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMembersByGym: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const gymsSlice = createSlice({
    name: "gyms",
    initialState,
    reducers: {
        getGyms(state, actions: GetGymsRequestActionPayload) {
            state.getGyms = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymsSuccess(state, actions) {
            state.getGyms = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymsFailure(state) {
            state.getGyms = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getOrganizationGyms(state, actions: GetGymsRequestActionPayload) {
            state.getOrganizationGyms = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getOrganizationGymSuccess(state, actions) {
            state.getOrganizationGyms = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getOrganizationGymsFailure(state) {
            state.getOrganizationGyms = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createGym(state, actions: CreateGymRequestActionPayload) {
            state.createGym = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createGymSuccess(state, actions) {
            state.createGym = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createGymFailure(state) {
            state.createGym = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createOrganizationGym(state, actions: CreateGymRequestActionPayload) {
            state.createOrganizationGym = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createOrganizationGymSuccess(state, actions) {
            state.createOrganizationGym = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createOrganizationGymFailure(state) {
            state.createOrganizationGym = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteGym(state, actions: PayloadAction<number>) {
            state.deleteGym = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteGymSuccess(state, actions) {
            state.deleteGym = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteGymFailure(state) {
            state.deleteGym = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateGym(state, actions: CreateGymRequestActionPayload) {
            state.updateGym = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateGymSuccess(state, actions) {
            state.updateGym = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getGym.data?.attributes)
                state.getGym.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        updateGymFailure(state) {
            state.updateGym = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getGym(state, actions: PayloadAction<number>) {
            state.getGym = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymSuccess(state, actions) {
            state.getGym = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymFailure(state) {
            state.getGym = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateDefaults(state, actions: UpdateDefaultsRequestActionPayload) {
            state.updateDefaults = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateDefaultsSuccess(state, actions) {
            state.updateDefaults = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getGym.data?.attributes)
                state.getGym.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        updateDefaultsFailure(state) {
            state.updateDefaults = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        updateWig(state, actions: PayloadAction<number>) {
            state.updateWig = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateWigSuccess(state, actions) {
            state.updateWig = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateWigFailure(state) {
            state.updateWig = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getMembersByGym(state) {
            state.getMembersByGym = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getMembersByGymSuccess(state, actions) {
            state.getMembersByGym = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMembersByGymFailure(state) {
            state.getMembersByGym = {
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getGyms,
    getGymsFailure,
    getGymsSuccess,
    createGym,
    createGymFailure,
    createGymSuccess,
    createOrganizationGym,
    createOrganizationGymSuccess,
    createOrganizationGymFailure,
    deleteGym,
    deleteGymFailure,
    deleteGymSuccess,
    updateGym,
    updateGymFailure,
    updateGymSuccess,
    getGym,
    getGymFailure,
    getGymSuccess,
    getOrganizationGyms,
    getOrganizationGymsFailure,
    getOrganizationGymSuccess,
    updateDefaults,
    updateDefaultsFailure,
    updateDefaultsSuccess,
    updateWig,
    updateWigFailure,
    updateWigSuccess,
    getMembersByGym,
    getMembersByGymSuccess,
    getMembersByGymFailure,
} = gymsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getOrganizationGyms,
            getGyms,
            createGym,
            createOrganizationGym,
            deleteGym,
            updateGym,
            getGym,
            updateDefaults,
            updateWig,
            getMembersByGym,
        },
        useDispatch()
    );
};

export default gymsSlice.reducer;
