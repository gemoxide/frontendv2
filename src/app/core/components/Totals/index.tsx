import React from "react";
import TotalItem from "../TotalItem";

interface Props {
    title?: string;
    total?: number;
}

const Totals: React.FC<Props> = ({ title, total }) => {
    return <TotalItem title={title} total={total} />;
};

export default Totals;
