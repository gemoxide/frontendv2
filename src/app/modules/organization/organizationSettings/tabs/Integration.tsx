import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/organization-import-history";
import { RootState } from "../../../../core/state/reducer";
import { useCallback, useEffect, useState } from "react";
import CustomDataTable from "../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import { formatDateTime } from "../../../../core/services/utils/utils.service";
import { IGymImportHistory } from "../../../../core/interfaces/gym-import-history.interface";
import AutomaticFileUpload from "../../../../core/components/AutomaticFileUpload";
import { toast } from "react-toastify";

const Integration = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const { getOrganizationImportHistory, createOrganizationImportHistory } =
        mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const {
        data: getOrganizationImportHistoryData,
        loading: getOrganizationImportHistoryLoading,
    } = useSelector(
        (state: RootState) =>
            state.organizationImportHistory.getOrganizationImportHistory
    );

    const {
        success: createOrganizationImportHistorySuccess,
        loading: createOrganizationImportHistoryLoading,
    } = useSelector(
        (state: RootState) =>
            state.organizationImportHistory.createOrganizationImportHistory
    );

    const organizationId = currentUser?.relationships?.organization?.id;

    const fetch = async () => {
        getOrganizationImportHistory({
            organization_id: organizationId,
            page,
            per_page: perPage,
        });
    };

    useEffect(() => {
        const getOrganizationImportHistory = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getOrganizationImportHistory);
    }, [page, perPage]);

    const loading = getOrganizationImportHistoryLoading;

    const columns: TableColumn<IGymImportHistory>[] = [
        {
            name: "File",
            cell: (history) => history?.attributes?.file_name,
        },
        {
            name: "Uploaded By",
            cell: (history) =>
                `${history?.relationships?.user?.attributes?.first_name} ${history?.relationships?.user?.attributes?.last_name}`,
        },
        {
            name: "Total Created",
            cell: (history) => history?.attributes?.total_created,
            right: true,
        },
        {
            name: "Total Updated",
            cell: (history) => history?.attributes?.total_updated,
            right: true,
        },
        {
            name: "Type",
            cell: (history) => history?.attributes?.type_formatted,
            right: true,
        },
        {
            name: "Uploaded At",
            cell: (history) =>
                formatDateTime(history?.attributes?.date_uploaded),
            right: true,
        },
    ];

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    // const onDropMembers = useCallback(async (acceptedFiles: File[]) => {
    //     const file = acceptedFiles?.[0];
    //     if (file) {
    //         setIsUploading(true);
    //         createGymImportHistory({
    //             gym_id: parseInt(gymId),
    //             type: "members",
    //             file: file,
    //         });
    //         setIsUploading(false);
    //         fetch();
    //     } else {
    //         toast.error("Invalid file. Please upload an .xlsx file.");
    //     }
    // }, []);
    // const onDropMemberSalesAgreements = useCallback(
    //     async (acceptedFiles: File[]) => {
    //         const file = acceptedFiles?.[0];
    //         if (file) {
    //             setIsUploading(true);
    //             createGymImportHistory({
    //                 gym_id: parseInt(gymId),
    //                 type: "member_sales_agreements",
    //                 file: file,
    //             });
    //             setIsUploading(false);
    //             fetch();
    //         } else {
    //             toast.error("Invalid file. Please upload an .xlsx file.");
    //         }
    //     },
    //     []
    // );

    const onDropSalesAgreement = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles?.[0];
        if (file) {
            setIsUploading(true);
            createOrganizationImportHistory({
                organization_id: organizationId,
                type: "sales_agreements",
                file: file,
            });
            setIsUploading(false);
            fetch();
        } else {
            toast.error("Invalid file. Please upload an .xlsx file.");
        }
    }, []);

    useEffect(() => {
        if (
            !createOrganizationImportHistoryLoading &&
            createOrganizationImportHistorySuccess
        ) {
            fetch();
            toast.success("File uploaded successfully.");
        }
    }, [createOrganizationImportHistorySuccess]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            {/* 
            <div>
                <h3 className="text-lg font-extrabold text-secondary mt-4">
                    Members
                </h3>
                <AutomaticFileUpload
                    onDrop={onDropMembers}
                    isUploading={isUploading}
                    text="Upload .XLXS file by dragging and dropping"
                />
            </div> */}
            <div>
                <h3 className="text-lg font-extrabold text-secondary mt-4">
                    Sales Agreements
                </h3>
                <AutomaticFileUpload
                    onDrop={onDropSalesAgreement}
                    isUploading={isUploading}
                    text="Upload .XLXS file by dragging and dropping"
                />
            </div>
            {/* <div>
                <h3 className="text-lg font-extrabold text-secondary mt-4">
                    Members To Sales Agreements
                </h3>
                <AutomaticFileUpload
                    onDrop={onDropMemberSalesAgreements}
                    isUploading={isUploading}
                    text="Upload .XLXS file by dragging and dropping"
                />
            </div> */}

            <div className="mt-8">
                <CustomDataTable
                    loading={loading}
                    columns={columns}
                    data={getOrganizationImportHistoryData?.data || []}
                    pagination
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={
                        getOrganizationImportHistoryData?.meta?.total
                    }
                    sortServer
                />
            </div>
        </div>
    );
};

export default Integration;
