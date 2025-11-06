import classNames from "classnames";
type Props = {
    label?: string;
    variant?: "primary" | "success" | "warning" | "danger" | "initial" | "gray";
    className?: string;
    style?: "rounded" | "default";
};

const TextBadge: React.FC<Props> = ({
    label,
    variant = "primary",
    className,
    style = "rounded",
}) => {
    const rootClassName = classNames(
        `w-auto text-sm font-medium mr-2 px-4 py-2 text-center ${className}`,
        {
            "bg-blue-100 text-blue-700": variant === "primary",
            "bg-emerald-100 text-emerald-700": variant === "success",
            "bg-red-100 text-red-700": variant === "danger",
            "bg-orange-100 text-orange-700": variant === "warning",
            "bg-purple-100 text-purple-700": variant === "initial",
            "bg-gray-100 text-gray-700": variant === "gray",
            "rounded-full ": style === "rounded",
            "rounded-md ": style === "default",
        }
    );
    return (
        <div className={rootClassName}>
            <span className="font-bold"> {label} </span>
        </div>
    );
};

export default TextBadge;
