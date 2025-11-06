import React, { createContext, useState } from "react";

interface Props {
    children: React.ReactNode;
}

const defaultContext = {
    showToggleReports: false,
    setShowToggleReports: (showToggleReports: boolean) => {},
};

export const DashboardReportsToggleContext = createContext(defaultContext);

export const DashboardReportsToggleContextProvider: React.FC<Props> = ({
    children,
}) => {
    const [showToggleReports, setShowToggleReports] = useState(
        defaultContext.showToggleReports
    );

    return (
        <DashboardReportsToggleContext.Provider
            value={{
                showToggleReports,
                setShowToggleReports,
            }}
        >
            {children}
        </DashboardReportsToggleContext.Provider>
    );
};
