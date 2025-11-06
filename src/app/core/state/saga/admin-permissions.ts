import { takeLatest, call, put } from "redux-saga/effects";
import {
    getAdminPermissionsByType,
    getAdminPermissionsByTypeFailure,
    getAdminPermissionsByTypeSuccess,
    sortAdminPermissions,
    sortAdminPermissionsFailure,
    sortAdminPermissionsSuccess,
} from "../reducer/admin-permissions";
import { getAdminPermissionsByTypeRequest, sortPermissionsRequest } from "../../services/permissions/permissions.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getAdminPermissionsByTypeSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getAdminPermissionsByTypeRequest,
            actions.payload
        );
        yield put(getAdminPermissionsByTypeSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getAdminPermissionsByTypeFailure.type
        );
    }
}

function* sortAdminPermissionsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            sortPermissionsRequest,
            actions.payload.type,
            actions.payload.body
        );
        yield put(sortAdminPermissionsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            sortAdminPermissionsFailure.type
        );
    }
}

export function* rootSaga() {
    yield takeLatest(
        getAdminPermissionsByType.type,
        getAdminPermissionsByTypeSaga
    );
    yield takeLatest(
        sortAdminPermissions.type,
        sortAdminPermissionsSaga
    );
}
