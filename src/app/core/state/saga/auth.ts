import { takeLatest, call, put } from "redux-saga/effects";
import {
  login,
  loginSuccess,
  loginFailure,
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
  updateUserAvatar,
  updateUserAvatarFailure,
  updateUserAvatarSuccess,
  updateUserPassword,
  updateUserPasswordSuccess,
  updateUserPasswordFailure,
  registerUser,
  registerUserFailure,
  registerUserSuccess,
  impersonateUser,
  impersonateUserSuccess,
  impersonateUserFailure,
  addFavoriteReportSuccess,
  addFavoriteReportFailure,
  removeFavoriteReportSuccess,
  removeFavoriteReportFailure,
  addFavoriteReport,
  removeFavoriteReport,
  updateDashboardReportsSuccess,
  updateDashboardReportsFailure,
  updateDashboardReports,
} from "../reducer/auth";
import {
  getLoggedInUserRequest,
  loginRequest,
  updateUserRequest,
  updateUserAvatarRequest,
  updateUserPasswordRequest,
  registerUserRequest,
  impersonateUserRequest,
} from "../../services/auth/auth.service";
import { AxiosResponse } from "axios";
import {
  LoginRequestActionPayload,
  UpdateUserAvatarRequestActionPayload,
  UpdateUserPasswordRequestActionPayload,
  UpdateUserRequestActionPayload,
} from "../types/auth";
import { handleServerException } from "../../services/utils/utils.service";
import { persistor } from "../store";
import {
  DashboardReportsRequestActionPayload,
  FavoriteReportsRequestActionPayload,
} from "../types/reports";
import {
  addFavoriteReportRequest,
  removeFavoriteReportRequest,
  updateDashboardReportsRequest,
} from "../../services/reports/reports.service";

function* loginRequestSaga(actions: LoginRequestActionPayload) {
  try {
    const data: AxiosResponse = yield call(loginRequest, actions.payload);
    yield put(loginSuccess(data));
    persistor.flush();
  } catch (err: any) {
    yield call(handleServerException, err, loginFailure.type, true);
  }
}

function* getCurrentUserSaga() {
  try {
    const { data }: AxiosResponse = yield call(getLoggedInUserRequest);
    yield put(getCurrentUserSuccess(data));
  } catch (err: any) {
    yield call(handleServerException, err, getCurrentUserFailure.type, true);
  }
}

function* updateUserSaga(actions: UpdateUserRequestActionPayload) {
  try {
    const { data }: AxiosResponse = yield call(
      updateUserRequest,
      actions.payload
    );

    yield put(updateUserSuccess(data));
  } catch (err: any) {
    yield call(handleServerException, err, updateUserFailure.type, true);
  }
}

function* updateUserAvatarSaga(actions: UpdateUserAvatarRequestActionPayload) {
  try {
    const { data }: AxiosResponse = yield call(
      updateUserAvatarRequest,
      actions.payload
    );
    yield put(updateUserAvatarSuccess(data));
  } catch (err: any) {
    yield call(handleServerException, err, updateUserAvatarFailure.type, true);
  }
}

function* updateUserPasswordSaga(
  actions: UpdateUserPasswordRequestActionPayload
) {
  try {
    const { data }: AxiosResponse = yield call(
      updateUserPasswordRequest,
      actions.payload
    );
    yield put(updateUserPasswordSuccess(data));
  } catch (err: any) {
    yield call(
      handleServerException,
      err,
      updateUserPasswordFailure.type,
      true
    );
  }
}

function* registerUserSaga(actions: any) {
  try {
    const { data }: AxiosResponse = yield call(
      registerUserRequest,
      actions.payload
    );
    yield put(registerUserSuccess(data));
  } catch (err: any) {
    yield call(handleServerException, err, registerUserFailure.type, true);
  }
}

function* impersonateUserSaga(actions: any) {
  try {
    const { data }: AxiosResponse = yield call(
      impersonateUserRequest,
      actions.payload
    );
    yield put(impersonateUserSuccess(data));
    persistor.flush();
  } catch (err: any) {
    yield call(handleServerException, err, impersonateUserFailure.type, true);
  }
}

function* updateDashboardReportsSaga(
  actions: DashboardReportsRequestActionPayload
) {
  try {
    const { data }: AxiosResponse = yield call(
      updateDashboardReportsRequest,
      actions.payload
    );

    yield put(updateDashboardReportsSuccess(data));
  } catch (err: any) {
    yield call(
      handleServerException,
      err,
      updateDashboardReportsFailure.type,
      true
    );
  }
}

function* addFavoriteReportSaga(actions: FavoriteReportsRequestActionPayload) {
  try {
    const { data }: AxiosResponse = yield call(
      addFavoriteReportRequest,
      actions.payload
    );

    yield put(addFavoriteReportSuccess(data));
  } catch (err: any) {
    yield call(handleServerException, err, addFavoriteReportFailure.type, true);
  }
}

function* removeFavoriteReportSaga(
  actions: FavoriteReportsRequestActionPayload
) {
  try {
    const { data }: AxiosResponse = yield call(
      removeFavoriteReportRequest,
      actions.payload
    );

    yield put(removeFavoriteReportSuccess(data));
  } catch (err: any) {
    yield call(
      handleServerException,
      err,
      removeFavoriteReportFailure.type,
      true
    );
  }
}

export function* rootSaga() {
  yield takeLatest(login.type, loginRequestSaga);
  yield takeLatest(getCurrentUser.type, getCurrentUserSaga);
  yield takeLatest(updateUser.type, updateUserSaga);
  yield takeLatest(updateUserAvatar.type, updateUserAvatarSaga);
  yield takeLatest(updateUserPassword.type, updateUserPasswordSaga);
  yield takeLatest(registerUser.type, registerUserSaga);
  yield takeLatest(impersonateUser.type, impersonateUserSaga);
  yield takeLatest(addFavoriteReport.type, addFavoriteReportSaga);
  yield takeLatest(removeFavoriteReport.type, removeFavoriteReportSaga);
  yield takeLatest(updateDashboardReports.type, updateDashboardReportsSaga);
}
