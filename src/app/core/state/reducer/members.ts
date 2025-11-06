import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    GetMembersRequestActionPayload,
    CreateMemberRequestActionPayload,
    Members,
    CreateMemberMediaRequestActionPayload,
    CreateMemberLeadRequestActionPayload,
    GetGymMembersRequestActionPayload,
    UpdateMemberAvatarRequestActionPayload,
} from "../types/members";

const initialState: Members = {
    getMembers: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getGymMembers: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createMember: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMember: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteMember: {
        success: false,
        loading: false,
        error: false,
    },
    getMember: {
        success: false,
        loading: false,
        error: false,
    },
    getMemberMedia: {
        success: false,
        loading: false,
        error: false,
    },
    createMemberMedia: {
        success: false,
        loading: false,
        error: false,
    },
    createMemberLead: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMemberLead: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMemberAvatar: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    }
};

const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        getMembers(state, actions: GetMembersRequestActionPayload) {
            state.getMembers = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMembersSuccess(state, actions) {
            state.getMembers = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMembersFailure(state) {
            state.getMembers = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getGymMembers(state, actions: GetGymMembersRequestActionPayload) {
            state.getGymMembers = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymMembersSuccess(state, actions) {
            state.getGymMembers = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymMembersFailure(state) {
            state.getGymMembers = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createMember(state, actions: CreateMemberRequestActionPayload) {
            state.createMember = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createMemberSuccess(state, actions) {
            state.createMember = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getMembers.data)
                state.getMembers.data.data.unshift(actions.payload);
        },
        createMemberFailure(state) {
            state.createMember = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        deleteMember(state, actions: PayloadAction<number>) {
            state.deleteMember = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteMemberSuccess(state, actions) {
            state.deleteMember = {
                loading: false,
                success: true,
                error: false,
            };

            if (state.getMembers.data?.data) {
                state.getMembers.data.data = state.getMembers.data?.data.filter(
                    (arrow) => arrow.id !== actions.payload.id
                );
            }
        },
        deleteMemberFailure(state) {
            state.deleteMember = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateMember(state, actions: CreateMemberRequestActionPayload) {
            state.updateMember = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateMemberSuccess(state, actions) {
            state.updateMember = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getMembers.data?.data && actions.payload) {
                const updatedMember = actions.payload;
                const findIndex = state.getMembers.data?.data?.findIndex(
                    (member) => member.id == updatedMember.id
                );

                if (state?.getMembers?.data?.data?.[findIndex])
                    state.getMembers.data.data[findIndex] = updatedMember;
            }

            if (state.getMember.data)
                state.getMember.data = actions.payload
        },
        updateMemberFailure(state) {
            state.updateMember = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getMember(state, actions: PayloadAction<string>) {
            state.getMember = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberSuccess(state, actions) {
            state.getMember = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberFailure(state) {
            state.getMember = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetGetMember(state) {
            state.getMember = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },
        createMemberFile(
            state,
            actions: CreateMemberMediaRequestActionPayload
        ) {
            state.createMemberMedia = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createMemberFileSuccess(state, actions) {
            state.createMemberMedia = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getMemberMedia.data)
                state.getMemberMedia.data.unshift(actions.payload);
        },
        createMemberFileFailure(state) {
            state.createMemberMedia = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getMemberFile(state, actions: PayloadAction<number>) {
            state.getMemberMedia = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberFileSuccess(state, actions) {
            state.getMemberMedia = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberFileFailure(state) {
            state.getMemberMedia = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createMemberLead(state, actions: CreateMemberLeadRequestActionPayload) {
            state.createMemberLead = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createMemberLeadSuccess(state, actions) {
            state.createMemberLead = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getMembers.data)
                state.getMembers.data.data.unshift(actions.payload);
        },
        createMemberLeadFailure(state) {
            state.createMemberLead = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        updateMemberLead(state, actions: CreateMemberLeadRequestActionPayload) {
            state.updateMemberLead = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateMemberLeadSuccess(state, actions) {
            state.updateMemberLead = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getMembers.data?.data && actions.payload) {
                const updatedMember = actions.payload;
                const findIndex = state.getMembers.data?.data?.findIndex(
                    (member) => member.id == updatedMember.id
                );

                if (state?.getMembers?.data?.data?.[findIndex])
                    state.getMembers.data.data[findIndex] = updatedMember;
            }

            if (state.getMember.data)
                state.getMember.data = actions.payload
        },
        updateMemberLeadFailure(state) {
            state.updateMemberLead = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetCreateMemberLead(state) {
            state.createMemberLead = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },

        updateMemberAvatar(state, actions: UpdateMemberAvatarRequestActionPayload) {
            state.updateMemberAvatar = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateMemberAvatarSuccess(state, actions) {
            state.updateMemberAvatar = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getMembers.data?.data && actions.payload) {
                const updatedMember = actions.payload;
                const findIndex = state.getMembers.data?.data?.findIndex(
                    (member) => member.id == updatedMember.id
                );

                if (state?.getMembers?.data?.data?.[findIndex])
                    state.getMembers.data.data[findIndex] = updatedMember;
            }

            if(state.getMember.data && actions.payload) {
                state.getMember.data = actions.payload
            }
        },
        updateMemberAvatarFailure(state) {
            state.updateMemberAvatar = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        resetUpdateMemberAvatar(state) {
            state.updateMemberAvatar = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },
    },
});

export const {
    createMember,
    createMemberFailure,
    createMemberSuccess,
    deleteMember,
    deleteMemberFailure,
    deleteMemberSuccess,
    getMembers,
    getMembersFailure,
    getMembersSuccess,
    updateMember,
    updateMemberFailure,
    updateMemberSuccess,
    getMember,
    getMemberFailure,
    getMemberSuccess,
    resetGetMember,
    createMemberFile,
    createMemberFileFailure,
    createMemberFileSuccess,
    getMemberFile,
    getMemberFileFailure,
    getMemberFileSuccess,
    createMemberLead,
    createMemberLeadFailure,
    createMemberLeadSuccess,
    updateMemberLead,
    updateMemberLeadFailure,
    updateMemberLeadSuccess,
    resetCreateMemberLead,
    getGymMembers,
    getGymMembersFailure,
    getGymMembersSuccess,
    updateMemberAvatar,
    updateMemberAvatarFailure,
    updateMemberAvatarSuccess,
    resetUpdateMemberAvatar
} = membersSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getMembers,
            createMember,
            deleteMember,
            updateMember,
            getMember,
            resetGetMember,
            createMemberFile,
            getMemberFile,
            createMemberLead,
            updateMemberLead,
            resetCreateMemberLead,
            getGymMembers,
            updateMemberAvatar,
            resetUpdateMemberAvatar
        },
        useDispatch()
    );
};

export default membersSlice.reducer;
