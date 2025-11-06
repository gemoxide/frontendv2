import DataTable, {
    TableProps,
    ExpanderComponentProps,
    TableColumn,
} from "react-data-table-component";
import { FC, useMemo } from "react";
import Skeleton from "react-loading-skeleton";

type Props = TableProps<any> & {
    loading?: boolean;
    isHideRowPerPage?: boolean;
    isExpandable?: boolean;
    subColumns?: TableColumn<any>[];
    defaultSortFieldId?: string;
    defaultSortAsc?: boolean;
};

type DataRow = {
    relationships: any;
};
const CustomDataTable: FC<Props> = ({
    isHideRowPerPage = false,
    defaultSortFieldId,
    defaultSortAsc,
    ...props
}) => {
    const columnsLoading = useMemo(
        () =>
            props.loading
                ? props.columns.map((column) => ({
                      ...column,
                      sortable: false,
                      sortFunction: undefined,
                      cell: () => <Skeleton width={100} />,
                  }))
                : props.columns,
        [props.loading, props.columns]
    );

    let ExpandedComponent:
        | React.FC<ExpanderComponentProps<DataRow>>
        | undefined;
    if (props.isExpandable) {
        ExpandedComponent = ({ data }) => {
            const tasks = data?.relationships?.tasks || [];
            const dataArray = Array.isArray(tasks) ? tasks : [];
            if (props.subColumns && props.subColumns.length > 0) {
                return (
                    <div className="px-10 py-5 border border-gray-300">
                        <DataTable
                            // columns={
                            //     props.loading
                            //         ? columnsLoading
                            //         : props.subColumns
                            // }
                            columns={props.subColumns}
                            // responsive
                            data={dataArray}
                            customStyles={{
                                headCells: {
                                    style: {
                                        fontWeight: "bold",
                                        backgroundColor: "#99E6FF",
                                    },
                                },
                            }}
                            defaultSortFieldId={defaultSortFieldId}
                            defaultSortAsc={defaultSortAsc}
                        />
                    </div>
                );
            } else {
                return <p>No columns available for DataTable</p>;
            }
        };
    }

    return (
        <DataTable
            customStyles={{
                headCells: {
                    style: {
                        fontWeight: "bold",
                        backgroundColor: "#F4F9FF",
                    },
                },
            }}
            {...props}
            columns={props.loading ? columnsLoading : props.columns}
            data={props.loading ? Array(8).fill({}) : props?.data || []}
            className="pb-20"
            // paginationRowsPerPageOptions={
            //     isHideRowPerPage ? [] : props?.paginationRowsPerPageOptions
            // }
            paginationRowsPerPageOptions={[10, 20, 30]}
            responsive
            expandableRows={props.isExpandable}
            expandableRowsComponent={ExpandedComponent}
            defaultSortFieldId={defaultSortFieldId}
            defaultSortAsc={defaultSortAsc}
            paginationPerPage={
                parseInt(localStorage.getItem("perPage") ?? "10") ?? 10
            }
        />
    );
};

export default CustomDataTable;
