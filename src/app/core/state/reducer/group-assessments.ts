import {
    PayloadAction,
    bindActionCreators,
    createSlice,
} from "@reduxjs/toolkit";
import {
    CreateGroupAssessmentRequestActionPayload,
    GetGroupAssessmentsRequestActionPayload,
    GetMemberGroupAssessmentsRequestActionPayload,
    GroupAssessments,
    UpdateMemberAssessmentRequestActionPayload,
} from "../types/group-assessments";
import {
    DeleteGroupAssessmentParam,
    StartGroupAssessmentParam,
} from "../../interfaces/group-assessments.interface";
import { useDispatch } from "react-redux";

const initialState: GroupAssessments = {
    createGroupAssessment: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMemberGroupAssessments: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMemberLatestGroupAssessment: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getGroupAssessment: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getGroupAssessments: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateGroupAssessment: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMemberAssessment: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMemberProgressReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteGroupAssessment: {
        success: false,
        loading: false,
        error: false,
    },
    startGroupAssessment: {
        success: false,
        loading: false,
        error: false,
    },
};

const GroupAssessmentsSlice = createSlice({
    name: "groupAssessments",
    initialState,
    reducers: {
        getGroupAssessments(
            state,
            actions: GetGroupAssessmentsRequestActionPayload
        ) {
            state.getGroupAssessments = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGroupAssessmentsSuccess(state, actions) {
            state.getGroupAssessments = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGroupAssessmentsFailure(state) {
            state.getGroupAssessments = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getMemberGroupAssessments(
            state,
            actions: GetMemberGroupAssessmentsRequestActionPayload
        ) {
            state.getMemberGroupAssessments = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberGroupAssessmentsSuccess(state, actions) {
            state.getMemberGroupAssessments = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberGroupAssessmentsFailure(state) {
            state.getMemberGroupAssessments = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getMemberLatestGroupAssessment(
            state,
            actions: GetMemberGroupAssessmentsRequestActionPayload
        ) {
            state.getMemberLatestGroupAssessment = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberLatestGroupAssessmentSuccess(state, actions) {
            state.getMemberLatestGroupAssessment = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberLatestGroupAssessmentFailure(state) {
            state.getMemberLatestGroupAssessment = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createGroupAssessment(
            state,
            actions: CreateGroupAssessmentRequestActionPayload
        ) {
            state.createGroupAssessment = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createGroupAssessmentSuccess(state, actions) {
            state.createGroupAssessment = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getGroupAssessments.data)
                state.getGroupAssessments.data.data.unshift(actions.payload);
        },
        createGroupAssessmentFailure(state) {
            state.createGroupAssessment = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetCreateGroupAssessmentState(state) {
            state.createGroupAssessment = {
                data: undefined,
                success: false,
                loading: false,
                error: false,
            };
        },

        resetGetGroupAssessmentState(state) {
            state.getGroupAssessment = {
                data: undefined,
                success: false,
                loading: false,
                error: false,
            };
        },

        updateGroupAssessment(
            state,
            actions: CreateGroupAssessmentRequestActionPayload
        ) {
            state.updateGroupAssessment = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateGroupAssessmentSuccess(state, actions) {
            state.updateGroupAssessment = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getGroupAssessments.data?.data && actions.payload) {
                const updateGroupAssessment = actions.payload;
                const findIndex =
                    state.getGroupAssessments.data?.data?.findIndex(
                        (groupAssessment) =>
                            groupAssessment.id == updateGroupAssessment.id
                    );
                if (state?.getGroupAssessments?.data?.data?.[findIndex])
                    state.getGroupAssessments.data.data[findIndex] =
                        updateGroupAssessment;
            }
        },
        updateGroupAssessmentFailure(state) {
            state.updateGroupAssessment = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getGroupAssessment(state, actions: PayloadAction<string>) {
            state.getGroupAssessment = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getGroupAssessmentSuccess(state, actions) {
            state.getGroupAssessment = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGroupAssessmentFailure(state) {
            state.getGroupAssessment = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateMemberAssessment(
            state,
            actions: UpdateMemberAssessmentRequestActionPayload
        ) {
            state.updateMemberAssessment = {
                loading: true,
                success: false,
                error: false,
            };

        },
        updateMemberAssessmentSuccess(state, actions) {
            state.updateMemberAssessment = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getGroupAssessment)
                state.getGroupAssessment.data = actions.payload;
        },
        updateMemberAssessmentFailure(state) {
            state.updateMemberAssessment = {
                loading: false,
                success: false,
                error: true,
            };
        },

        getMemberProgressReport(state, actions: PayloadAction<string>) {
            state.getMemberProgressReport = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberProgressReportSuccess(state, actions) {
            state.getMemberProgressReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberProgressReportFailure(state) {
            state.getMemberProgressReport = {
                loading: false,
                success: false,
                error: true,
            };
        },
        deleteGroupAssessment(
            state,
            actions: PayloadAction<DeleteGroupAssessmentParam>
        ) {
            state.deleteGroupAssessment = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteGroupAssessmentSuccess(state, actions) {
            state.deleteGroupAssessment = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteGroupAssessmentFailure(state) {
            state.deleteGroupAssessment = {
                loading: false,
                success: false,
                error: true,
            };
        },
        startGroupAssessment(
            state,
            actions: PayloadAction<StartGroupAssessmentParam>
        ) {
            state.startGroupAssessment = {
                loading: true,
                success: false,
                error: false,
            };
        },
        startGroupAssessmentSuccess(state, actions) {
            state.startGroupAssessment = {
                loading: false,
                success: true,
                error: false,
            };
        },
        startGroupAssessmentFailure(state) {
            state.startGroupAssessment = {
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    createGroupAssessment,
    createGroupAssessmentFailure,
    createGroupAssessmentSuccess,
    getMemberGroupAssessments,
    getMemberGroupAssessmentsFailure,
    getMemberGroupAssessmentsSuccess,
    getGroupAssessment,
    getGroupAssessmentFailure,
    getGroupAssessmentSuccess,
    getGroupAssessments,
    getGroupAssessmentsFailure,
    getGroupAssessmentsSuccess,
    updateGroupAssessment,
    updateGroupAssessmentFailure,
    updateGroupAssessmentSuccess,
    resetCreateGroupAssessmentState,
    resetGetGroupAssessmentState,
    updateMemberAssessment,
    updateMemberAssessmentFailure,
    updateMemberAssessmentSuccess,
    getMemberProgressReport,
    getMemberProgressReportFailure,
    getMemberProgressReportSuccess,
    getMemberLatestGroupAssessment,
    getMemberLatestGroupAssessmentFailure,
    getMemberLatestGroupAssessmentSuccess,
    deleteGroupAssessment,
    deleteGroupAssessmentFailure,
    deleteGroupAssessmentSuccess,
    startGroupAssessment,
    startGroupAssessmentFailure,
    startGroupAssessmentSuccess,
} = GroupAssessmentsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            createGroupAssessment,
            getGroupAssessment,
            getGroupAssessments,
            getMemberGroupAssessments,
            updateGroupAssessment,
            resetCreateGroupAssessmentState,
            resetGetGroupAssessmentState,
            updateMemberAssessment,
            getMemberProgressReport,
            getMemberLatestGroupAssessment,
            deleteGroupAssessment,
            startGroupAssessment,
        },
        useDispatch()
    );
};

export default GroupAssessmentsSlice.reducer;
