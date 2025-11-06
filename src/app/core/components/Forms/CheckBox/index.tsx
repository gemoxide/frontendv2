import classNames from "classnames";
import { ErrorMessage, Field } from "formik";

type Props = {
    label?: string;
    name: string;
    checked?: boolean;
    defaultChecked?: boolean;
    isNotFormHook?: boolean;
    labelPosition?: "left" | "right";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: "primary" | "default" | "success";
    value?: any;
    size?: "small" | "medium" | "large";
    inputClassName?: string;
    containerClassName?: string;
    readOnly?: boolean;
};

const Checkbox: React.FC<Props> = ({
    label,
    name,
    checked,
    defaultChecked,
    isNotFormHook = false,
    onChange,
    variant = "primary",
    size = "small",
    inputClassName,
    containerClassName = "flex items-center my-4 gap-x-4",
    readOnly = false,
    labelPosition = "right",
    value,
}) => {
    const inputClassNameRoot = classNames(`${inputClassName}`, {
        "h-6 w-6": size === "small",
        "h-8 w-8": size === "medium",
        "h-12 w-12": size === "large",
        "rounded border-primary text-primary": variant === "primary",
        "rounded-full bg-transparent checked:text-green border border-grey":
            variant === "success",
    });

    const labelClassName = classNames("font-bold truncate", {
        "text-sm": size === "small",
        "text-md": size === "medium",
        "text-lg": size === "large",
    });

    return (
        <div className="space-y-1">
            <div className={containerClassName}>
                {labelPosition === "left" && (
                    <label className={labelClassName}>{label}</label>
                )}
                {isNotFormHook ? (
                    <input
                        type="checkbox"
                        name={name}
                        className={inputClassNameRoot}
                        checked={checked}
                        onChange={onChange}
                        readOnly={readOnly}
                        defaultChecked={defaultChecked}
                        value={value}
                    />
                ) : (
                    <Field
                        type={"checkbox"}
                        name={name}
                        checked={checked}
                        className={inputClassNameRoot}
                        readOnly={readOnly}
                        defaultChecked={defaultChecked}
                        value={value}
                    />
                )}
                {labelPosition === "right" && (
                    <label className={labelClassName}>{label}</label>
                )}
            </div>
            {!isNotFormHook && (
                <ErrorMessage
                    name={name}
                    component={"div"}
                    className="text-error"
                />
            )}
        </div>
    );
};

export default Checkbox;
