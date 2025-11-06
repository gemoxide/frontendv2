import classNames from "classnames";
import { ErrorMessage, Field } from "formik";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
import searchSvg from "../../../../../../assets/icons/search-normal.svg";

type Props = {
    label?: React.ReactNode | string;
    prefix?: string;
    subtitle?: string;
    type?:
        | "email"
        | "password"
        | "text"
        | "number"
        | "date"
        | "tel"
        | "month"
        | "datetime-local";
    name: string;
    placeHolder?: string;
    autoComplete?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    isNotFormHook?: boolean;
    inputClassName?: string;
    className?: string;
    variant?: "primary" | "default" | "secondary";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string) => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onInput?: React.FormEventHandler<HTMLInputElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    value?: any;
    size?: "small" | "medium" | "large" | "custom";
    icon?: "search";
    min?: string;
    max?: string;
    step?: string;
    defaultValue?: any;
    decimalPlaces?: number;
};

const Input: React.FC<Props> = ({
    label,
    prefix,
    subtitle,
    type = "text",
    name,
    placeHolder,
    disabled,
    readonly,
    isNotFormHook = false,
    inputClassName,
    variant = "primary",
    onChange,
    onValueChange,
    value,
    size = "small",
    icon,
    className,
    min,
    max,
    step,
    onKeyDown,
    onInput,
    onKeyUp,
    onBlur,
    defaultValue,
    decimalPlaces,
}) => {
    const inputClassNameRoot = classNames(
        `block w-full border-0 py-1.5 p-4 pr-10 text-secondary placeholder:text-grey-tertiary ring-1 ring-inset focus:ring-primary  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${inputClassName}`,
        {
            "ring-primary rounded-lg": variant === "primary",
            "ring-transparent rounded-lg": variant === "default",
            "h-12": size === "small",
            "h-16": size === "medium",
            "h-20": size === "large",
            "!w-16 !pr-1 text-center h-8": size === "custom",
            "bg-slate-100 text-slate-500 border-slate-200 shadow-none":
                disabled,
            "rounded-full ring-grey-secondary": variant === "secondary",
        }
    );

    const phoneMask = createDefaultMaskGenerator("(999) 999-9999");

    let inputField = <></>;

    if (type === "tel") {
        inputField = (
            <>
                <MaskedInput
                    className={inputClassNameRoot}
                    placeholder={placeHolder}
                    name={name}
                    disabled={disabled}
                    readOnly={readonly}
                    maskGenerator={phoneMask}
                    value={value}
                    onChange={(val: string) => {
                        onValueChange && onValueChange(val);
                    }}
                    keepMask
                />
                {!isNotFormHook && (
                    <ErrorMessage
                        name={name}
                        component={"div"}
                        className="text-error text-xs ml-4"
                    />
                )}
            </>
        );
    } else if (isNotFormHook) {
        const handleDecimalInput = (e: React.FormEvent<HTMLInputElement>) => {
            const input = e.currentTarget;
            let value = input.value.replace(/[^0-9.]/g, "");

            const parts = value.split(".");
            if (parts.length > 2) {
                parts.pop();
                value = parts.join(".");
            }

            if (
                decimalPlaces !== undefined &&
                parts[1] &&
                parts[1].length > decimalPlaces
            ) {
                parts[1] = parts[1].slice(0, decimalPlaces);
                value = parts.join(".");
            }

            input.value = value;
            onInput && onInput(e);
        };

        inputField = (
            <div className="flex items-center">
                {prefix && (
                    <span className="absolute left-2 text-grey-secondary">
                        {prefix}
                    </span>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={inputClassNameRoot}
                    placeholder={placeHolder}
                    min={min}
                    max={max}
                    step={step}
                    onKeyDown={onKeyDown}
                    onInput={
                        decimalPlaces !== undefined
                            ? handleDecimalInput
                            : onInput
                    }
                    onKeyUp={onKeyUp}
                    onBlur={onBlur}
                    disabled={disabled}
                    readOnly={readonly}
                    defaultValue={defaultValue}
                />
            </div>
        );
    } else {
        const handleDecimalInput = (e: React.FormEvent<HTMLInputElement>) => {
            const input = e.currentTarget;
            let value = input.value.replace(/[^0-9.]/g, "");

            const parts = value.split(".");
            if (parts.length > 2) {
                parts.pop();
                value = parts.join(".");
            }

            if (
                decimalPlaces !== undefined &&
                parts[1] &&
                parts[1].length > decimalPlaces
            ) {
                parts[1] = parts[1].slice(0, decimalPlaces);
                value = parts.join(".");
            }

            input.value = value;
            onInput && onInput(e);
        };

        inputField = (
            <>
                <div className="flex items-center justify-end">
                    {prefix && (
                        <span className="absolute left-2 text-grey-secondary">
                            {prefix}
                        </span>
                    )}
                    <Field
                        className={inputClassNameRoot}
                        type={type}
                        name={name}
                        placeholder={placeHolder}
                        disabled={disabled}
                        min={min}
                        max={max}
                        step={step}
                        onKeyDown={onKeyDown}
                        onInput={
                            decimalPlaces !== undefined
                                ? handleDecimalInput
                                : onInput
                        }
                        onKeyUp={onKeyUp}
                        onBlur={onBlur}
                        readOnly={readonly}
                    />
                </div>

                <ErrorMessage
                    name={name}
                    component={"div"}
                    className="text-error text-xs ml-4"
                />
            </>
        );
    }

    return (
        <div className={`space-y-1 ${className || ""}`}>
            {label &&
                (typeof label === "string" ? (
                    <label className="text-sm text-secondary font-bold">
                        {label}
                    </label>
                ) : (
                    label
                ))}

            <div className="relative w-full">
                {inputField}
                {icon === "search" && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <img src={searchSvg} />
                    </div>
                )}
            </div>
            {subtitle && (
                <p className="text-xs text-secondary font-light">{subtitle}</p>
            )}
        </div>
    );
};

export default Input;
