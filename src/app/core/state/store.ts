import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./reducer/index";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/index";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];
const store = configureStore({
    reducer: rootReducer,
    middleware,
});

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
