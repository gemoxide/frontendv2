import classNames from "classnames";
import { useEffect, useState } from "react";

type Props = {
    type?: "submit" | "button" | "reset";
    className?: string;
    label?: React.ReactNode;
    isSubmitting?: boolean;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "default";
};

const Button: React.FC<Props> = ({
    label = "",
    isSubmitting = false,
    className = "",
    type = "button",
    onClick,
    variant = "primary",
}) => {
    const buttonClassName = classNames(`text-secondary`, {
        "btn-primary text-secondary": variant === "primary",
        "bg-grey text-secondary border-grey hover:bg-grey":
            variant === "default",
        "bg-white text-primary border-primary hover:bg-primary hover:text-white":
            variant === "secondary",
        "bg-red-100 text-black hover:bg-red-700 hover:text-white":
            variant === "danger",
    });

    return (
        <button
            type={type}
            disabled={isSubmitting}
            className={`btn rounded-full  ${buttonClassName} ${className} `}
            onClick={() => onClick && onClick()}
        >
            {label}
        </button>
    );
};

export default Button;
