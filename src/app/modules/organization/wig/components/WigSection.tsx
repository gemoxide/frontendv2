import React from "react";
import DataTable, { ConditionalStyles } from "react-data-table-component";
import { IGymMonthlyWigTableProperties } from "../../../../core/interfaces/gym-revenue.interface";
import { IGym } from "../../../../core/interfaces/gyms.interface";
type Props = {
    wigData?: IGymMonthlyWigTableProperties;
    loading: boolean;
    gymData?: IGym;
};

const WigSection: React.FC<Props> = ({ wigData, loading, gymData }) => {
    const columns = [
        {
            name: "Measurement",
            selector: (row: any) => row.measurements,
            fixed: true,
            width: "300px",
        },
        ...(
            wigData?.columns.filter((col: string) => col !== "Measurements") ||
            []
        ).map((col: string) => ({
            name: col,
            selector: (row: any) => row[col],
            right: true,
            width: "150px",
        })),
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 900,
                color: "#00004D",
            },
        },
    };

    const conditionalRowStyles: ConditionalStyles<any>[] = [
        {
            when: (row: any & { index?: number }) =>
                row.index !== undefined && row.index % 2 === 0,
            style: {
                borderTop: "10px solid #E6E6E6",
            },
        },
    ];

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const rows = wigData?.wig_table.map((item: any, index: number) => {
        const newItem = { ...item, index };

        if (index === 0 || index === 2 || index === 4) {
            Object.keys(newItem).forEach((key) => {
                if (key !== "measurements" && key !== "index") {
                    newItem[key] = formatter.format(Number(newItem[key]));
                }
            });
        } else {
            Object.keys(newItem).forEach((key) => {
                if (key !== "measurements" && key !== "index") {
                    newItem[key] = Number(newItem[key]).toLocaleString("en-US");
                }
            });
        }

        return newItem;
    });

    return (
        <div>
            <div className="bg-white p-4 rounded-md shadow-lg w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-extrabold text-secondary">
                        WIG
                    </h1>
                </div>
                <DataTable
                    columns={columns}
                    data={rows}
                    customStyles={customStyles}
                    conditionalRowStyles={conditionalRowStyles}
                    progressPending={loading}
                />
                <div className="flex justify-between w-full px-4 text-xs mt-2 font-semibold border-t border-gray-200 pt-4">
                    <div>
                        Total {gymData?.attributes.wig_duration || 0} Mo Draft
                        Revenue
                    </div>
                    <div>${wigData?.total_draft_revenue.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
};

export default WigSection;
