import closeIcon from "../../../../../assets/icons/close-light-icon.svg";
import React from "react";

type Props = {
    fileName: string;
    onClickRemove?: () => void;
};
const File: React.FC<Props> = ({ fileName, onClickRemove }) => {
    return (
        <div
            className={
                "flex justify-between border rounded-md mb-2 px-4 py-2 bg-zinc-50  items-center"
            }
        >
            <div className="flex items-center">
                <span className="text-sm">{fileName}</span>
            </div>
            <a>
                {onClickRemove && (
                    <div className="cursor-pointer" onClick={onClickRemove}>
                        <img src={closeIcon} width="25" />
                    </div>
                )}
            </a>
        </div>
    );
};

export default File;
