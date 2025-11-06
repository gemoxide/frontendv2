import { AxiosResponse } from "axios";
import { getUserRolesRequest } from "../../services/roles/roles.service";
import { call, put, takeLatest } from "redux-saga/effects";
import { getUserRoles, getUserRolesFailure, getUserRolesSuccess } from "../reducer/roles";
import { handleServerException } from "../../services/utils/utils.service";

function* getUserRolesSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getUserRolesRequest,
			actions.payload
        );
        yield put(getUserRolesSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getUserRolesFailure.type);
    }
}

export function* rootSaga() {
    yield takeLatest(getUserRoles.type, getUserRolesSaga);
}
