import React from "react";
import { Tab } from "../../state/types";
import classNames from "classnames";

interface Props {
    current: number;
    tabs: Tab[];
    onChangeTab?: (key: number) => void;
    tabsListClassName?: string;
}

const UnderLineTabs: React.FC<Props> = ({ tabs, current, onChangeTab }) => {
    return (
        <div className="md:flex relative flex-col">
            <div className="md:hidden mb-4 p-8 bg-white rounded-lg shadow-lg">
                <select
                    id="tabs"
                    name="tabs"
                    className="input input-primary  block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    value={current}
                    onChange={(e) =>
                        onChangeTab && onChangeTab(parseInt(e?.target?.value))
                    }
                >
                    {tabs.map((tab, idx) => (
                        <option key={idx} value={idx}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div
                className={` bg-white rounded-lg mr-4 w-full h-full shadow-lg mb-2`}
            >
                <div className="hidden md:block">
                    <nav
                        className="-mb-px flex flex-row gap-4 p-4"
                        aria-label="Tabs"
                    >
                        {tabs.map((tab, idx) => {
                            const tabClass = classNames(
                                "py-2 text-grey-secondary hover:text-secondary cursor-pointer font-bold",
                                {
                                    "text-secondary underline decoration-secondary":
                                        idx === current,
                                }
                            );
                            return (
                                <a
                                    key={idx}
                                    className={tabClass}
                                    onClick={() =>
                                        onChangeTab && onChangeTab(idx)
                                    }
                                >
                                    {tab.name}
                                </a>
                            );
                        })}
                    </nav>
                </div>
            </div>
            <div className="w-full h-full">{tabs?.[current]?.component}</div>
        </div>
    );
};

export default UnderLineTabs;
