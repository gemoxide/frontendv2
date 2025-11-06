import { useState, useEffect, useRef } from "react";
import kebabSvg from "../../../../../assets/icons/kebab.svg";
import kebabHorizontal from "../../../../../assets/icons/kebab-horizontal.svg";

type List = {
    label?: string;
    action: () => void;
    isDanger?: boolean;
};

type Props = {
    lists: List[];
    orientation?: "horizontal" | "vertical";
    placement?: "top" | "default";
};

const KebabDropdown: React.FC<Props> = ({
    lists,
    orientation = "vertical",
    placement = "default",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<any>(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: any) => {
        if (wrapperRef?.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    return (
        <div className="relative" ref={wrapperRef}>
            <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-red-50 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 "
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src={
                        orientation === "vertical" ? kebabSvg : kebabHorizontal
                    }
                    className="w-6 max-w-[24px]"
                    alt="kebab icon"
                />
            </button>
            <div
                className={`z-50 right-0 shadow-md bg-white rounded-lg w-44  ${
                    isOpen ? "absolute" : "hidden"
                } ${placement === "top" ? " -top-12 " : "top-0"}`}
            >
                <ul
                    className="py-2 px-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconButton"
                >
                    {lists?.map((list, idx) => (
                        <li key={idx}>
                            <a
                                onClick={() => {
                                    setIsOpen(false);
                                    list?.action();
                                }}
                                className={`cursor-pointer block px-2 py-2  hover:bg-primary hover:text-white ${
                                    list?.isDanger
                                        ? "text-error"
                                        : "text-secondary"
                                }`}
                            >
                                {list?.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default KebabDropdown;
