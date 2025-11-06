import { useState } from "react";
import Tabs from "../../../../core/components/Tabs";
import ProgressReport from "./ProgressReport";
import Tasks from "./Tasks";
import Assessments from "./Assessments";

const TableList = () => {
    const [tab, setTab] = useState(0);

    const tabs = [
        {
            name: "Progress Report",
            component: <ProgressReport />,
        },
        {
            name: "Assessment",
            component: <Assessments />,
        },
        {
            name: "Tasks",
            component: <Tasks />,
        },
    ];

    return (
        <div className="rounded-xl w-full bg-white shadow-lg py-4 px-2 mt-4">
            {tabs && (
                <Tabs
                    tabNavClassName="pb-0"
                    hasNoShadow
                    orientation="vertical"
                    tabs={tabs}
                    current={tab || 0}
                    onChangeTab={(key) => setTab(key)}
                />
            )}
        </div>
    );
};

export default TableList;
