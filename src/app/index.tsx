import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { themeChange } from "theme-change";
import { RightSideBarProvider } from "./core/context/rightSideBar";
import { Provider } from "react-redux";
import store, { persistor } from "./core/state/store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./app";
import { DashboardReportsToggleContextProvider } from "./core/context/dashboardReportsToggle";

const MainApp = () => {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <RightSideBarProvider>
                        <DashboardReportsToggleContextProvider>
                            <App />
                        </DashboardReportsToggleContextProvider>
                    </RightSideBarProvider>
                </BrowserRouter>
                <ToastContainer />
            </PersistGate>
        </Provider>
    );
};

export default MainApp;
