import React from "react";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";

type Props = {
    label?: React.ReactNode | string;
    className?: string;
    name: string;
    placeHolder?: string;
    autoComplete?: boolean;
    disabled?: boolean;
    isNotFormHook?: boolean;
    inputClassName?: string;
    variant?: "primary" | "default" | "search";
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: any;
    size?: "small" | "medium" | "large";
};
const Textarea: React.FC<Props> = ({
    label,
    className,
    name,
    placeHolder,
    disabled,
    isNotFormHook = false,
    inputClassName,
    variant = "primary",
    onChange,
    value,
    size = "small",
}) => {
    const inputClassNameRoot = classNames(
        `h-40 block w-full border-0 py-1.5 p-4 pr-10 text-secondary placeholder:text-grey-tertiary ring-1 ring-inset focus:ring-primary  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${inputClassName}`,
        {
            "ring-primary rounded-lg": variant === "primary",
            "ring-transparent rounded-lg": variant === "default",
            "h-12": size === "small",
            "h-16": size === "medium",
            "h-20": size === "large",
            "bg-slate-100 text-slate-500 border-slate-200 shadow-none":
                disabled,
            "rounded-full ring-grey-secondary  ": variant === "search",
        }
    );
    return (
        <div className={`space-y-1 ${className}`}>
            {label &&
                (typeof label === "string" ? (
                    <label className="text-sm text-secondary font-bold">
                        {label}
                    </label>
                ) : (
                    label
                ))}
            <div>
                {isNotFormHook ? (
                    <textarea
                        name={name}
                        value={value}
                        className={inputClassNameRoot}
                        placeholder={placeHolder}
                        onChange={onChange}
                    />
                ) : (
                    <>
                        <Field
                            className={inputClassNameRoot}
                            as="textarea"
                            name={name}
                            placeholder={placeHolder}
                            disabled={disabled}
                            rows="4"
                        />
                        <ErrorMessage
                            name={name}
                            component={"div"}
                            className="text-error text-xs ml-4"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Textarea;
