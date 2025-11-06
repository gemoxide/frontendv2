import { PayloadAction, bindActionCreators, createSlice } from "@reduxjs/toolkit";
import { CreateMemberSalesAgreementFreezeRequestActionPayload, MemberSalesAgreementFreeze } from "../types/member-sales-agreement-freezes";
import { useDispatch } from "react-redux";
import { DeleteMemberSalesAgreementFreezeParam } from "../../interfaces/member-sales-agreement-freeze.interface";

const initialState: MemberSalesAgreementFreeze = {
	createMemberSalesAgreementFreeze: {
		data: undefined,
		success: false,
		loading: false,
		error: false,
	},
	deleteMemberSalesAgreementFreeze: {
		success: false,
		loading: false,
		error: false,
	}
}

const memberSalesAgreementFreezeSlice = createSlice({
	name: "memberSalesAgreementFreezes",
	initialState,
	reducers: {
		createMemberSalesAgreementFreeze(state, actions: CreateMemberSalesAgreementFreezeRequestActionPayload) {
			state.createMemberSalesAgreementFreeze = {
				data: undefined,
				loading: true,
				success: false,
				error: false,
			};
		},
		createMemberSalesAgreementFreezeSuccess(state, actions) {
			state.createMemberSalesAgreementFreeze = {
				data: actions.payload,
				loading: false,
				success: true,
				error: false,
			};
		},
		createMemberSalesAgreementFreezeFailure(state) {
			state.createMemberSalesAgreementFreeze = {
				data: undefined,
				loading: false,
				success: false,
				error: true,
			};
		},

		deleteMemberSalesAgreementFreeze(state, actions: PayloadAction<DeleteMemberSalesAgreementFreezeParam>) {
			state.deleteMemberSalesAgreementFreeze = {
				loading: true,
				success: false,
				error: false,
			};
		},
		deleteMemberSalesAgreementFreezeSuccess(state, actions) {
			state.deleteMemberSalesAgreementFreeze = {
				loading: false,
				success: true,
				error: false,
			};
		},
		deleteMemberSalesAgreementFreezeFailure(state) {
			state.deleteMemberSalesAgreementFreeze = {
				loading: false,
				success: false,
				error: true,
			};
		},
	}
})

export const {
	createMemberSalesAgreementFreeze,
	createMemberSalesAgreementFreezeFailure,
	createMemberSalesAgreementFreezeSuccess,
	deleteMemberSalesAgreementFreeze,
	deleteMemberSalesAgreementFreezeFailure,
	deleteMemberSalesAgreementFreezeSuccess
} = memberSalesAgreementFreezeSlice.actions;

export const mapDispatchToProps = () => {
	return bindActionCreators(
		{
			createMemberSalesAgreementFreeze,
			deleteMemberSalesAgreementFreeze
		},
		useDispatch()
	)
};

export default memberSalesAgreementFreezeSlice.reducer;