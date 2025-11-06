import { InformationCircleIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

interface Props {
    children: React.ReactNode;
    position?: "left" | "right";
}

const Tooltip: React.FC<Props> = ({ position = "right", children }) => {
    return (
        <div className="group relative">
            <InformationCircleIcon className="w-5 fill-primary peer" />
            <div
                className={classNames(
                    "absolute w-max shadow-lg hidden group-hover:block bg-white z-50 rounded-md p-3",
                    {
						"left-7 -top-7": position === 'right',
						"right-7 -top-7": position === 'left'
					}
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default Tooltip;
