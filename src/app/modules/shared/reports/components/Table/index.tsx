import { TableColumn } from "react-data-table-component";
import CustomDataTable from "../../../../../core/components/DataTable";
import Button from "../../../../../core/components/Button";
import CoachedClientFilters from "../../../../organization/dashboard/filters/CoachedClientFilters";

interface Props {
    columns: TableColumn<any>[];
    data: any[];
    report: string;
    dateRange?: string;
    totalRows: number;
    perPage: number;
    setPerPage: (perPage: number) => void;
    page: number;
    setPage: (page: number) => void;
    handleExport?: () => void;
    loading: boolean;
    isExpandable?: boolean;
    subColumns?: TableColumn<any>[];
    filters?: Record<string, any>;
    setFilters?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const Table: React.FC<Props> = ({
    columns,
    data,
    dateRange,
    report,
    page,
    perPage,
    setPage,
    setPerPage,
    totalRows,
    handleExport,
    loading,
    isExpandable,
    subColumns,
    filters,
    setFilters,
}) => {
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePerRowsChange = async (newPerPage: number, newPage: number) => {
        setPerPage(newPerPage);
        setPage(newPage);
    };

    let selectedFilter;

    switch (report) {
        case "Coached Client Audit":
            if (filters && setFilters)
                selectedFilter = (
                    <CoachedClientFilters
                        filters={filters}
                        setFilters={setFilters}
                    />
                );
            break;
        default:
            break;
    }

    return (
        <div className="shadow-lg rounded-md bg-white p-6 h-fit">
            <div className="flex flex-col lg:flex-row justify-between mb-4 space-y-5 lg:space-y-0">
                <div>
                    <h3 className="text-secondary cursor-pointer font-bold">
                        {report}
                    </h3>
                    {dateRange && report !== "Member Enrollment" && (
                        <span className="text-secondary text-xs">
                            {dateRange}
                        </span>
                    )}
                </div>
                {handleExport ? (
                    <Button label="Export Results" onClick={handleExport} />
                ) : (
                    selectedFilter
                )}
            </div>

            <CustomDataTable
                columns={columns}
                data={data}
                pagination
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationTotalRows={totalRows}
                paginationPerPage={perPage}
                isHideRowPerPage
                sortServer
                loading={loading}
                isExpandable={isExpandable}
                subColumns={subColumns}
            />
        </div>
    );
};

export default Table;
