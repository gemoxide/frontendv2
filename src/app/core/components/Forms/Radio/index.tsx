import classNames from "classnames";
import { ErrorMessage, Field } from "formik";

type option = {
    value: any;
    label: string;
    disabled?: boolean;
};

type Props = {
    name: string;
    disabled?: boolean;
    inputClassName?: string;
    orientation?: "vertical" | "horizontal";
    options: option[];
    size?: "small" | "medium" | "large";
    value?: any;
    isNotFormHook?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio: React.FC<Props> = ({
    orientation = "vertical",
    isNotFormHook = true,
    options,
    value,
    name,
    size = "small",
    inputClassName,
    onChange,
}) => {
    const inputClassNameRoot = classNames(
        `block  rounded-full border-0 ring-primary ring-2 ring-inset 
         focus:bg-secondary focus:ring-inset focus:ring-primary 
         checked:bg-secondary checked:ring-inset checked:ring-primary mr-2 ${inputClassName}`,
        {
            "focus:ring-4 h-6 w-6": size === "small",
            "focus:ring-6 h-8 w-8": size === "medium",
            "focus:ring-8 h-12 w-12": size === "large",
        }
    );

    const labelClassName = classNames(`font-bold`, {
        "text-sm": size === "small",
        "text-lg": size === "medium",
        "text-xl": size === "large",
    });

    return (
        <div className="flex flex-col gap-y-2">
            {" "}
            <div
                className={`flex ${
                    orientation === "vertical" ? "flex-col gap-y-2" : "gap-x-2"
                } `}
            >
                {options.map((item, index) => (
                    <div className="flex items-center" key={index}>
                        {isNotFormHook ? (
                            <input
                                disabled={item?.disabled}
                                className={inputClassNameRoot}
                                name={name}
                                type="radio"
                                value={item?.value}
                                checked={Boolean(value == item?.value)}
                                onChange={onChange}
                            />
                        ) : (
                            <>
                                <Field
                                    className={inputClassNameRoot}
                                    disabled={item?.disabled}
                                    type="radio"
                                    name={name}
                                    value={item?.value}
                                />
                            </>
                        )}
                        <label className={labelClassName}>{item?.label}</label>
                    </div>
                ))}
            </div>
            <ErrorMessage
                name={name}
                component={"div"}
                className="text-error text-xs ml-4"
            />
        </div>
    );
};

export default Radio;
