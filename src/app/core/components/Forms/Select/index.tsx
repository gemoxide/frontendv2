import { ErrorMessage, Field } from "formik";
import classNames from "classnames";
import Tooltip from "../../Tooltip";

type option = {
    value: string | number;
    label: string;
};

type Props = {
    label?: string;
    name: string;
    placeHolder?: string;
    autoComplete?: boolean;
    disabled?: boolean;
    inputClassName?: string;
    variant?: "primary" | "default" | "secondary";
    options?: option[];
    size?: "small" | "medium" | "large";
    isNotFormHook?: boolean;
    value?: any;
    defaultValue?: any;
    className?: string;
    tooltip?: React.ReactNode;
    tooltipPosition?: "left" | "right";
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<Props> = ({
    label,
    name,
    placeHolder,
    disabled,
    inputClassName,
    variant = "primary",
    options,
    size = "small",
    isNotFormHook = false,
    value,
    defaultValue,
    onChange,
    tooltip,
    className,
    tooltipPosition = "right",
}) => {
    const inputClassNameRoot = classNames(
        `block w-full  border-0 py-1.5 pr-10 text-secondary placeholder:text-grey-tertiary ring-1 ring-inset focus:ring-primary  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${inputClassName}`,
        {
            "ring-primary rounded-lg": variant === "primary",
            "ring-transparent rounded-lg": variant === "default",
            "h-12": size === "small",
            "h-16": size === "medium",
            "h-20": size === "large",
            "rounded-full ring-grey-secondary  ": variant === "secondary",
        }
    );

    return (
        <div className={`space-y-1 ${className} flex flex-col justify-between`}>
            <div className="flex gap-x-2 relative">
                {label && (
                    <label className="text-sm text-secondary font-bold">
                        {label}
                    </label>
                )}
                {tooltip && (
                    <Tooltip position={tooltipPosition}>{tooltip}</Tooltip>
                )}
            </div>

            {!isNotFormHook ? (
                <>
                    <Field
                        name={name}
                        placeholder={placeHolder}
                        disabled={disabled}
                        className={inputClassNameRoot}
                        as={"select"}
                    >
                        <option value="">{placeHolder}</option>
                        {options?.map((option) => (
                            <option value={option.value} key={option.value}>
                                {option?.label}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name={name}
                        component={"div"}
                        className="text-error text-xs ml-4"
                    />
                </>
            ) : (
                <select
                    name={name}
                    placeholder={placeHolder}
                    disabled={disabled}
                    className={inputClassNameRoot}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange && onChange}
                >
                    <option value="">{placeHolder}</option>
                    {options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option?.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default Select;
