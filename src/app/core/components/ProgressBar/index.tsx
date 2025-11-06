import classNames from "classnames";

type Props = {
    className?: string;
    variant?: "primary" | "secondary";
    heightClassName?: string;
    progress: string;
};

const ProgressBar: React.FC<Props> = ({
    className,
    variant = "primary",
    heightClassName,
    progress,
}) => {
    const rootClassName = classNames(
        `w-full relative bg-grey rounded-full h-2.5  ${className}`
    );

    const progressClassNames = classNames(
        `rounded-full h-2.5 ${heightClassName}`,
        {
            "bg-primary": variant === "primary",
            "bg-secondary": variant === "secondary",
        }
    );

    return (
        <div className={rootClassName}>
            <div
                className={progressClassNames}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
