import { useState } from "react";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

type Props = {
    isToggled?: boolean;
    onChange?: (changeVal: boolean) => void;
    label?: string;
};
const ToggleSwitch: React.FC<Props> = ({
    isToggled = false,
    onChange,
    label,
}) => {
    const rootClass = classNames(
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isToggled ? "bg-primary" : "bg-gray-200"
    );

    return (
        <div className="flex items-center">
            {label && (
                <label className="text-lg text-secondary pl-4 font-bold mr-4">
                    {label}
                </label>
            )}
            <Switch
                checked={isToggled}
                onChange={onChange && onChange}
                className={rootClass}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={classNames(
                        isToggled ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                />
            </Switch>
        </div>
    );
};
export default ToggleSwitch;
