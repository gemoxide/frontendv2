import { Link as ReactLink } from "react-router-dom";

type Props = {
    to?: string;
    label: string;
    variant?: "primary" | "secondary";
};
const Link: React.FC<Props> = ({ to, label, variant = "primary" }) => {
    const rootClassName =
        variant === "primary"
            ? "text-primary hover:text-grey-secondary hover:border-b border-grey-secondary"
            : "text-grey-secondary hover:text-primary hover:border-b border-primary";

    return (
        <ReactLink to={to || ""} className={`text-xs ${rootClassName}`}>
            {label}
        </ReactLink>
    );
};

export default Link;
