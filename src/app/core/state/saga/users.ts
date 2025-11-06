import { takeLatest, call, put } from "redux-saga/effects";
import {
    getUsers,
    getUsersFailure,
    getUsersSuccess,
    createUser,
    createUserFailure,
    createUserSuccess,
    deleteUserSuccess,
    deleteUserFailure,
    deleteUser,
    updateUser,
    updateUserFailure,
    updateUserSuccess,
    getGymUsersSuccess,
    getGymUsersFailure,
    getGymUsers,
    getUser,
    getUserSuccess,
    getUserFailure,
} from "../reducer/users";
import {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest,
    updateUserRequest,
    getGymUsersRequest,
    getUserRequest,
} from "../../services/users/users.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getUsersSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getUsersRequest,
            actions.payload
        );
        yield put(getUsersSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getUsersFailure.type);
    }
}

function* getGymUsersSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGymUsersRequest,
            actions.payload
        );
        yield put(getGymUsersSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getGymUsersFailure.type);
    }
}

function* createUserSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            createUserRequest,
            actions.payload
        );
        yield put(createUserSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createUserFailure.type, true);
    }
}

function* deleteUserSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            deleteUserRequest,
            actions.payload
        );
        yield put(deleteUserSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, deleteUserFailure.type, true);
    }
}

function* updateUserSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            updateUserRequest,
            actions.payload
        );
        yield put(updateUserSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateUserFailure.type, true);
    }
}

function* getUserSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getUserRequest,
            actions.payload
        );
        yield put(getUserSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getUserFailure.type, false);
    }
}

export function* rootSaga() {
    yield takeLatest(getUsers.type, getUsersSaga);
    yield takeLatest(createUser.type, createUserSaga);
    yield takeLatest(deleteUser.type, deleteUserSaga);
    yield takeLatest(updateUser.type, updateUserSaga);
    yield takeLatest(getGymUsers.type, getGymUsersSaga);
    yield takeLatest(getUser.type, getUserSaga);
}
