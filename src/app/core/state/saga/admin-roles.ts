import { takeLatest, call, put } from "redux-saga/effects";
import {
    getAdminRoles,
    getAdminRolesSuccess,
    getAdminRolesFailure,
    createAdminRole,
    createAdminRoleFailure,
    createAdminRoleSuccess,
    deleteAdminRoleSuccess,
    deleteAdminRoleFailure,
    deleteAdminRole,
    updateAdminRole,
    updateAdminRoleFailure,
    updateAdminRoleSuccess,
    getAdminRolesByType,
    getAdminRolesByTypeSuccess,
    getAdminRolesByTypeFailure,
} from "../reducer/admin-roles";
import {
    createAdminRoleRequest,
    deleteAdminRoleRequest,
    getAdminRolesByTypeRequest,
    getAdminRolesRequest,
    updateAdminRoleRequest,
} from "../../services/roles/roles.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getAdminRolesSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getAdminRolesRequest,
            actions.payload
        );
        yield put(getAdminRolesSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getAdminRolesFailure.type);
    }
}

function* createAdminRoleSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            createAdminRoleRequest,
            actions.payload
        );
        yield put(createAdminRoleSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createAdminRoleFailure.type,
            true
        );
    }
}

function* deleteAdminRoleSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            deleteAdminRoleRequest,
            actions.payload
        );
        yield put(deleteAdminRoleSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteAdminRoleFailure.type,
            true
        );
    }
}

function* updateAdminRoleSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            updateAdminRoleRequest,
            actions.payload
        );
        yield put(updateAdminRoleSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateAdminRoleFailure.type,
            true
        );
    }
}

function* getAdminRolesByTypeSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getAdminRolesByTypeRequest,
            actions.payload
        );
        yield put(getAdminRolesByTypeSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getAdminRolesByTypeFailure.type);
    }
}
export function* rootSaga() {
    yield takeLatest(getAdminRoles.type, getAdminRolesSaga);
    yield takeLatest(createAdminRole.type, createAdminRoleSaga);
    yield takeLatest(deleteAdminRole.type, deleteAdminRoleSaga);
    yield takeLatest(updateAdminRole.type, updateAdminRoleSaga);
    yield takeLatest(getAdminRolesByType.type, getAdminRolesByTypeSaga);
}
