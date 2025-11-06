import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import { GetUserRolesRequestActionPayload, UserRoles } from "../types/roles";
import { useDispatch } from "react-redux";

const initialState: UserRoles = {
	getUserRoles: {
		data: undefined,
		success: false,
		loading: false,
		error: false,
	}
}

const userRolesSlice = createSlice({
	name: "userRoles",
	initialState,
	reducers: {
		getUserRoles(state, actions: GetUserRolesRequestActionPayload) {
			state.getUserRoles = {
				data: undefined,
				loading: true,
				success: false,
				error: false,
			};
		},
		getUserRolesSuccess(state, actions) {
			state.getUserRoles = {
				data: actions.payload,
				loading: false,
				success: true,
				error: false,
			};
		},
		getUserRolesFailure(state) {
			state.getUserRoles = {
				data: undefined,
				loading: false,
				success: false,
				error: true,
			};
		},
	}
})

export const {
	getUserRoles,
	getUserRolesFailure,
	getUserRolesSuccess
} = userRolesSlice.actions

export const mapDispatchToProps = () => {
	return bindActionCreators(
		{
			getUserRoles
		},
		useDispatch()
	);
};

export default userRolesSlice.reducer;