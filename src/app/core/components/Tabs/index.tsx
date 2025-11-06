import React from "react";
import { Tab } from "../../state/types";
import classNames from "classnames";

interface Props {
    current: number;
    tabs: Tab[];
    onChangeTab?: (key: number) => void;
    tabsListClassName?: string;
    orientation?: "horizontal" | "vertical";
    hasNoShadow?: boolean;
    currentTabClass?: string;
    tabClassName?: string;
    tabNavClassName?: string;
    isCustomized?: boolean;
}

const Tabs: React.FC<Props> = ({
    tabs,
    current,
    currentTabClass = "text-secondary underline decoration-secondary",
    onChangeTab,
    orientation = "horizontal",
    hasNoShadow = false,
    tabsListClassName,
    tabClassName,
    tabNavClassName: propsTabNavClassName,
    isCustomized = false,
}) => {
    const tabRootClassName = classNames("md:flex relative", tabsListClassName, {
        "flex-col": orientation === "vertical",
        "flex-row": orientation === "horizontal",
    });

    const tabItemsClassName = classNames("bg-white rounded-lg mr-4 h-full", {
        "w-full": orientation === "vertical",
        "w-1/4": orientation === "horizontal",
        "shadow-none": hasNoShadow,
        "shadow-lg": !hasNoShadow,
        "overflow-x-auto overflow-y-hidden": !isCustomized,
    });

    const tabNavClassName = classNames(
        "-mb-px flex p-4 flex-wrap",
        propsTabNavClassName,
        {
            "flex-row": orientation === "vertical",
            "flex-col": orientation === "horizontal",
            "flex-wrap": !isCustomized,
        }
    );

    return (
        <div className={tabRootClassName}>
            <div className="md:hidden mb-4 p-8 bg-white rounded-lg shadow-lg ">
                <select
                    id="tabs"
                    name="tabs"
                    className="input input-primary w-full rounded-lg p-2"
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
            <div className={tabItemsClassName}>
                <div className="hidden md:block">
                    <nav className={tabNavClassName} aria-label="Tabs">
                        {tabs.map((tab, idx) => {
                            const tabClass = classNames(
                                "py-2 text-grey-secondary hover:text-secondary cursor-pointer font-bold",
                                tabClassName,
                                idx === current ? currentTabClass : "",
                                {
                                    "mr-8": orientation === "vertical",
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
                                    {tab.tabElement ? tab.tabElement : tab.name}
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

export default Tabs;
