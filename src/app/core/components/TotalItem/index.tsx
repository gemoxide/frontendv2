import React from "react";

interface Props {
    title?: string;
    total?: number;
}

const TotalItem: React.FC<Props> = ({ title, total }) => {
    return (
        <div className="lg:w-3/12 rounded-lg bg-primary px-6 pt-14 pb-4">
            <div className="text-base font-normal truncate">{title}</div>
            <div className="text-[40px] font-black">{total}</div>
        </div>
    );
};

export default TotalItem;
