import Button from "../../../core/components/Button";

export type Buttons = {
    onClick?: () => void;
    label: string;
    variant: "primary" | "secondary";
};

interface Props {
    rightButtonLabel?: string;
    rightButtonOnclick?: () => void;
    title?: string;
    className?: string;
    children?: React.ReactNode;

    buttons?: Buttons[];
}

const Section: React.FC<Props> = ({
    title,
    rightButtonLabel,
    rightButtonOnclick,
    children,
    className = "",
    buttons,
}) => {
    return (
        <section className={`p-2 ${className}`}>
            <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-lg w-full">
                <h1 className="text-2xl font-extrabold text-secondary">
                    {title && title}
                </h1>
                <div className="flex">
                    {buttons?.map((val, i) => {
                        return (
                            <Button
                                label={val.label}
                                className="capitalize mr-4"
                                onClick={() => val?.onClick && val?.onClick()}
                                variant={val?.variant}
                                key={i}
                            />
                        );
                    })}
                    {rightButtonLabel && (
                        <Button
                            label={rightButtonLabel}
                            className="capitalize"
                            onClick={rightButtonOnclick && rightButtonOnclick}
                        />
                    )}
                </div>
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
};

export default Section;
