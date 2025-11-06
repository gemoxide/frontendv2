import { useState, useEffect, useCallback } from "react";
import Button from "../../../../core/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../core/state/reducer/member-sales-agreements";
import { mapDispatchToProps as mapDispatchToSalesAgreementsProps } from "../../../../core/state/reducer/sales-agreements";
import { TableColumn } from "react-data-table-component";
import CustomDataTable from "../../../../core/components/DataTable";
import KebabDropdown from "../../../../core/components/KebabDropdown";
import { IMemberSalesAgreement } from "../../../../core/interfaces/member-sales-agreement.interface";
import { confirmCancel, confirmDelete } from "../../../../core/helpers/prompt";
import Modal from "../../../../core/components/Modal";
import CreateMemberSalesAgreementForm from "./CreateMemberSalesAgreementForm";
import TextBadge from "../../../../core/components/TextBadge";
import CreateMemberSalesAgreementFreezeForm from "./CreateMemberSalesAgreementFreezeForm";
import { formatDateUseBrowserTZ } from "../../../../core/services/utils/utils.service";
import moment from "moment";
import { cancelMemberSalesAgreementRequest } from "../../../../core/services/member-sales-agreements/member-sales-agreements.services";
import { toast } from "react-toastify";
import CancelMemberSalesAgreementForm from "./CancelMemberSalesAgreementForm";

interface Props {
    memberId: number;
    memberGymId: number;
    refreshMemberData: () => void;
}

const MemberSalesAgreementsTable: React.FC<Props> = ({
    memberId,
    memberGymId,
    refreshMemberData,
}) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [memberStateId, setMemberStateId] = useState<number>(memberId);
    const [
        isOpenCreateMemberSalesAgreementModal,
        setIsOpenCreateSalesAgreementModal,
    ] = useState<boolean>(false);
    const [isOpenCreateFreezeModal, setIsOpenCreateFreezeModal] =
        useState<boolean>(false);
    const [
        isOpenCancelSalesAgreementModal,
        setIsOpenCancelSalesAgreementModal,
    ] = useState<boolean>(false);
    const [selectedSalesAgreement, setSelectedSalesAgreement] =
        useState<IMemberSalesAgreement>();
    const [isOpenCancelDetailsModal, setIsOpenCancelDetailsModal] =
        useState<boolean>(false);
    const [selectedCancelDetails, setSelectedCancelDetails] = useState<{
        date: string;
        reason: string;
    }>();

    const { data, loading } = useSelector(
        (state: RootState) =>
            state.memberSalesAgreements.getMemberSalesAgreements
    );

    const { getMemberSalesAgreements, deleteMemberSalesAgreement } =
        mapDispatchToProps();

    const { data: saleAgreementsData } = useSelector(
        (state: RootState) => state.salesAgreements.getSalesAgreements
    );

    const { getSalesAgreements } = mapDispatchToSalesAgreementsProps();

    const fetchSalesAgreements = async () => {
        getSalesAgreements(memberGymId);
    };

    useEffect(() => {
        fetchSalesAgreements();
    }, []);

    const { loading: createFreezeLoading, success: createFreezeSuccess } =
        useSelector(
            (state: RootState) =>
                state.memberSalesAgreementFreezes
                    .createMemberSalesAgreementFreeze
        );

    const { loading: deleteFreezeLoading, success: deleteFreezeSuccess } =
        useSelector(
            (state: RootState) =>
                state.memberSalesAgreementFreezes
                    .deleteMemberSalesAgreementFreeze
        );

    const {
        loading: createMemberSalesAgreementLoading,
        success: createMemberSalesAgreementSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberSalesAgreements.createMemberSalesAgreement
    );

    const {
        loading: deleteMemberSalesAgreementLoading,
        success: deleteMemberSalesAgreementSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberSalesAgreements.deleteMemberSalesAgreement
    );

    const {
        loading: updateMemberSalesAgreementLoading,
        success: updateMemberSalesAgreementSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberSalesAgreements.updateMemberSalesAgreement
    );

    const formatSalesAgreementDate = (date?: string) => {
        if (date) {
            return moment(date).format("MM.DD.YYYY");
        }
        return "N/A";
    };

    const columns: TableColumn<IMemberSalesAgreement>[] = [
        {
            name: "Name",
            sortable: true,
            sortField: "name",
            width: "30%",
            cell: (salesAgreement) => {
                return (
                    <div className="flex items-center">
                        <span>
                            {
                                salesAgreement?.relationships?.sales_agreement
                                    ?.attributes.name
                            }
                        </span>
                    </div>
                );
            },
        },
        {
            name: "Start Date",
            sortable: true,
            sortField: "start_date",
            width: "18%",
            cell: (salesAgreement) =>
                formatSalesAgreementDate(
                    salesAgreement?.attributes?.start_date
                ),
        },
        {
            name: "End Date",
            sortable: true,
            sortField: "end_date",
            width: "18%",
            cell: (salesAgreement) =>
                formatSalesAgreementDate(salesAgreement?.attributes?.end_date),
        },
        {
            name: "Status",
            sortable: true,
            sortField: "status",
            width: "150px",
            cell: (salesAgreement) => {
                let variant:
                    | "primary"
                    | "success"
                    | "warning"
                    | "danger"
                    | "initial"
                    | "gray" = "primary";

                if (salesAgreement?.attributes?.is_canceled) {
                    variant = "danger";
                    const canceledDate = formatSalesAgreementDate(
                        salesAgreement?.attributes?.canceled_at
                    );
                    return (
                        <>
                            <div
                                onClick={() => {
                                    setSelectedCancelDetails({
                                        date: canceledDate,
                                        reason:
                                            salesAgreement?.attributes
                                                ?.canceled_reason || "",
                                    });
                                    setIsOpenCancelDetailsModal(true);
                                }}
                                className="cursor-pointer"
                            >
                                <TextBadge
                                    label="Canceled"
                                    className="text-xs capitalize !w-24"
                                    variant={variant}
                                />
                            </div>
                            <Modal
                                isOpen={isOpenCancelDetailsModal}
                                onClose={() =>
                                    setIsOpenCancelDetailsModal(false)
                                }
                                title="Cancellation Details"
                                modalContainerClassName="!w-2/12"
                            >
                                <div className="mt-5">
                                    <div className="space-y-5">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-sm font-medium underline">
                                                Canceled on:
                                            </span>{" "}
                                            <span className="text-sm font-bold">
                                                {selectedCancelDetails?.date}
                                            </span>
                                        </div>
                                        {selectedCancelDetails?.reason && (
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm font-medium underline">
                                                    Reason:
                                                </span>{" "}
                                                <span className="text-sm font-bold">
                                                    {
                                                        selectedCancelDetails.reason
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <Button
                                            label="Close"
                                            onClick={() =>
                                                setIsOpenCancelDetailsModal(
                                                    false
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </Modal>
                        </>
                    );
                }

                switch (salesAgreement?.attributes?.status) {
                    case "Frozen":
                        variant = "primary";
                        break;
                    case "Active":
                        variant = "success";
                        break;
                    case "Expired":
                        variant = "danger";
                        break;
                    default:
                        break;
                }
                return (
                    salesAgreement?.attributes?.status && (
                        <TextBadge
                            label={salesAgreement?.attributes?.status}
                            className="text-xs capitalize !w-24"
                            variant={variant}
                        />
                    )
                );
            },
        },
        {
            name: "",
            sortable: false,
            cell: (salesAgreement) => (
                <div className="w-full flex justify-end">
                    <KebabDropdown
                        placement="top"
                        lists={[
                            {
                                label: "Edit",
                                action: () => {
                                    setSelectedSalesAgreement(salesAgreement);
                                    setIsOpenCreateSalesAgreementModal(true);
                                },
                            },
                            ...(salesAgreement?.attributes?.is_canceled ||
                            salesAgreement?.attributes?.status === "Expired"
                                ? []
                                : [
                                      {
                                          label: "Cancel",
                                          action: async () => {
                                              const { isConfirmed } =
                                                  await confirmCancel(
                                                      salesAgreement
                                                          ?.relationships
                                                          ?.sales_agreement
                                                          ?.attributes.name
                                                  );
                                              if (isConfirmed) {
                                                  setSelectedSalesAgreement(
                                                      salesAgreement
                                                  );
                                                  setIsOpenCancelSalesAgreementModal(
                                                      true
                                                  );
                                              }
                                          },
                                      },
                                  ]),
                            {
                                label: salesAgreement?.relationships
                                    ?.current_freeze
                                    ? "View Freeze"
                                    : "Freeze",
                                action: () => {
                                    setSelectedSalesAgreement(salesAgreement);
                                    setIsOpenCreateFreezeModal(true);
                                },
                            },
                            {
                                label: "Delete",
                                action: async () => {
                                    const { isConfirmed } = await confirmDelete(
                                        "Member Sales Agreement"
                                    );
                                    if (isConfirmed) {
                                        deleteMemberSalesAgreement({
                                            member_id: memberStateId,
                                            id: salesAgreement.id,
                                        });

                                        refreshMemberData();
                                    }
                                },
                                isDanger: true,
                            },
                        ]}
                    />
                </div>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const fetch = async () => {
        getMemberSalesAgreements({
            id: memberStateId,
            page,
            per_page: perPage,
            include: "salesAgreement,currentFreeze",
        });
    };

    const handleCancelSalesAgreement = () => {
        fetch();
        setIsOpenCancelSalesAgreementModal(false);
    };

    useEffect(() => {
        const getMemberSalesAgreements = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getMemberSalesAgreements);
    }, [page, perPage]);

    useEffect(() => {
        if (!createFreezeLoading && createFreezeSuccess) {
            fetch();
            setIsOpenCreateFreezeModal(false);
        }
    }, [createFreezeLoading]);

    useEffect(() => {
        if (!deleteFreezeLoading && deleteFreezeSuccess) {
            fetch();
            setIsOpenCreateFreezeModal(false);
        }
    }, [deleteFreezeLoading]);

    useEffect(() => {
        if (
            !createMemberSalesAgreementLoading &&
            createMemberSalesAgreementSuccess
        ) {
            fetch();
            setIsOpenCreateSalesAgreementModal(false);
        }
    }, [createMemberSalesAgreementLoading]);

    useEffect(() => {
        if (
            !deleteMemberSalesAgreementLoading &&
            deleteMemberSalesAgreementSuccess
        ) {
            fetch();
        }
    }, [deleteMemberSalesAgreementSuccess]);

    useEffect(() => {
        if (
            !updateMemberSalesAgreementLoading &&
            updateMemberSalesAgreementSuccess
        ) {
            fetch();
            setIsOpenCreateSalesAgreementModal(false);
            setSelectedSalesAgreement(undefined);
        }
    }, [updateMemberSalesAgreementLoading]);

    return (
        <div className="rounded-xl w-full bg-white shadow-lg py-4 px-2 mt-4">
            <div className="flex justify-between items-center p-4">
                <h3 className="text-secondary cursor-pointer font-bold">
                    Sales Agreements
                </h3>
                <Button
                    label="New Sales Agreement"
                    onClick={() => {
                        setSelectedSalesAgreement(undefined);
                        setIsOpenCreateSalesAgreementModal(true);
                    }}
                />
            </div>
            <Modal
                isOpen={isOpenCreateMemberSalesAgreementModal}
                onClose={() => setIsOpenCreateSalesAgreementModal(false)}
            >
                <CreateMemberSalesAgreementForm
                    memberId={memberId}
                    selectedSalesAgreement={selectedSalesAgreement}
                    salesAgreements={saleAgreementsData?.data || []}
                    refreshData={refreshMemberData}
                />
            </Modal>
            <Modal
                isOpen={isOpenCreateFreezeModal}
                onClose={() => setIsOpenCreateFreezeModal(false)}
            >
                <CreateMemberSalesAgreementFreezeForm
                    memberId={memberId}
                    selectedSalesAgreement={selectedSalesAgreement}
                />
            </Modal>
            <Modal
                isOpen={isOpenCancelSalesAgreementModal}
                onClose={() => setIsOpenCancelSalesAgreementModal(false)}
            >
                <CancelMemberSalesAgreementForm
                    memberId={memberId}
                    selectedSalesAgreement={selectedSalesAgreement}
                    refreshData={handleCancelSalesAgreement}
                />
            </Modal>
            <CustomDataTable
                loading={loading}
                columns={columns}
                data={data?.data || []}
                pagination
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationTotalRows={data?.meta?.total || 0}
                paginationPerPage={perPage}
                isHideRowPerPage
                sortServer
            />
        </div>
    );
};

export default MemberSalesAgreementsTable;
