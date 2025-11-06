import classNames from "classnames";
import { useEffect, useState } from "react";

type Props = {
    type?: "submit" | "button" | "reset";
    className?: string;
    label?: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
    link?: string;
};

const ButtonLink: React.FC<Props> = ({
    label = "",
    className = "",
    type = "button",
    variant = "primary",
    link = '#',
}) => {
    const buttonClassName = classNames(`text-secondary`, {
        "btn-primary text-secondary": variant === "primary",
        "bg-white text-primary border-primary hover:bg-primary hover:text-white":
            variant === "secondary",
        "bg-red-100 text-black hover:bg-red-700 hover:text-white":
            variant === "danger",
    });

    return (
        <a
            type={type}
            className={`btn rounded-full  ${buttonClassName} ${className} `}
            href={link}
        >
            {label}
        </a>
    );
};

export default ButtonLink;
