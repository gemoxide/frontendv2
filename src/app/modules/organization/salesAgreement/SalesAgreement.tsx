import Button from "../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../core/state/reducer/sales-agreements";
import { RootState } from "../../../core/state/reducer";
import { useEffect, useState } from "react";
import CustomDataTable from "../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../core/components/KebabDropdown";
import Modal from "../../../core/components/Modal";
import { useParams } from "react-router-dom";
import CreateGymSalesAgreementForm from "./CreateSalesAgreementForm";
import {
    ISalesAgreement,
    ISalesAgreementResponse,
} from "../../../core/interfaces/sales-agreements.interface";
import { confirmDelete, deleteDecline } from "../../../core/helpers/prompt";
import AutomaticFileUpload from "../../../core/components/AutomaticFileUpload";

interface Props {
    salesAgreements?: ISalesAgreementResponse;
    isLoading: boolean;
    perPage: number;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasDelete?: boolean;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
}

const GymSalesAgreement: React.FC<Props> = ({
    perPage,
    isLoading,
    salesAgreements,
    hasCreate,
    hasDelete,
    hasEdit,
    setPage,
    setPerPage,
}) => {
    const [isOpenCreateGymModal, setIsOpenCreateGymModal] =
        useState<boolean>(false);
    const [selectedSalesAgreement, setSelectedSalesAgreement] = useState<any>();

    const { id } = useParams();

    const { deleteSalesAgreement, getGymSalesAgreements } =
        mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: organizationData } = useSelector(
        (state: RootState) => state.organizations.getOrganization
    );

    const { success: deleteGymSuccess, loading: deleteGymLoading } =
        useSelector(
            (state: RootState) => state.salesAgreements.deleteSalesAgreement
        );

    const { success: createGymSuccess, loading: createGymLoading } =
        useSelector(
            (state: RootState) => state.salesAgreements.createSalesAgreement
        );

    const { success: updateGymSuccess, loading: updateGymLoading } =
        useSelector(
            (state: RootState) => state.salesAgreements.updateSalesAgreement
        );

    const { data: gymSalesAgreements } = useSelector(
        (state: RootState) => state.salesAgreements.getGymSalesAgreements
    );

    const fetchGymSalesAgreements = async (gymId: number) => {
        await getGymSalesAgreements({
            id: gymId,
            page: 1,
            per_page: perPage,
        });
    };

    useEffect(() => {
        const newGymId = id
            ? Number(id)
            : currentUser?.relationships?.user_gyms?.[0]?.id;
        if (newGymId) {
            fetchGymSalesAgreements(newGymId);
        }
    }, [id, currentUser?.relationships?.user_gyms?.[0]?.id]);

    const loading = isLoading;

    const columns: TableColumn<ISalesAgreement>[] = [
        {
            name: "Name",
            selector: (salesAgreement) => salesAgreement?.attributes?.name,
            sortable: true,
        },
        {
            name: "Price",
            selector: (salesAgreement) => salesAgreement?.attributes?.price,
        },
        {
            name: "Type",
            selector: (salesAgreement) => salesAgreement?.attributes?.type,
        },
        {
            name: "Duration",
            selector: (salesAgreement) =>
                `${salesAgreement?.attributes?.duration} ${salesAgreement?.attributes?.duration_frequency}`,
        },
        {
            name: "Billing Type",
            cell: (salesAgreement) => salesAgreement?.attributes?.billing_type,
        },
        {
            name: "",
            width: "15%",
            sortable: false,
            cell: (salesAgreement) => (
                <>
                    <div className="w-full flex justify-end">
                        {(!salesAgreement?.attributes?.organization_id ||
                            salesAgreement?.attributes?.organization_id ===
                                organizationData?.id) &&
                            (hasEdit || hasDelete) && (
                                <KebabDropdown
                                    placement="top"
                                    lists={[
                                        ...(hasEdit
                                            ? [
                                                  {
                                                      label: "Edit",
                                                      action: () => {
                                                          setSelectedSalesAgreement(
                                                              salesAgreement
                                                          );
                                                          setIsOpenCreateGymModal(
                                                              true
                                                          );
                                                      },
                                                  },
                                              ]
                                            : []),
                                        ...(hasDelete
                                            ? [
                                                  {
                                                      label: "Delete",
                                                      action: async () => {
                                                          const {
                                                              isConfirmed,
                                                          } =
                                                              await confirmDelete(
                                                                  "Sales Agreement"
                                                              );
                                                          if (isConfirmed) {
                                                              if (
                                                                  salesAgreement
                                                                      ?.attributes
                                                                      ?.member_sales_agreements_count ??
                                                                  0 > 0
                                                              ) {
                                                                  return deleteDecline(
                                                                      "Sales Agreement"
                                                                  );
                                                              }
                                                              deleteSalesAgreement(
                                                                  {
                                                                      sales_agreement_id:
                                                                          salesAgreement.id,
                                                                  }
                                                              );
                                                          }
                                                      },
                                                      isDanger: true,
                                                  },
                                              ]
                                            : []),
                                    ]}
                                />
                            )}
                    </div>
                </>
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

    useEffect(() => {
        if (!createGymLoading && createGymSuccess) {
            setIsOpenCreateGymModal(false);
        }
    }, [createGymLoading]);

    useEffect(() => {
        if (!updateGymLoading && updateGymSuccess) {
            setIsOpenCreateGymModal(false);
            setSelectedSalesAgreement(undefined);
        }
    }, [updateGymLoading]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-secondary">
                    Sales Agreement
                </h1>
                <div className="flex items-center gap-2">
                    {hasCreate && (
                        <Button
                            label="Create Sales Agreement"
                            onClick={() => {
                                setIsOpenCreateGymModal(true);
                                setSelectedSalesAgreement(undefined);
                            }}
                        />
                    )}
                </div>
            </div>
            <Modal
                isOpen={isOpenCreateGymModal}
                onClose={() => setIsOpenCreateGymModal(false)}
            >
                <CreateGymSalesAgreementForm
                    gymId={
                        id
                            ? Number(id)
                            : currentUser?.relationships.user_gyms?.length
                            ? currentUser?.relationships.user_gyms[0].id
                            : undefined
                    }
                    organizationId={organizationData?.id}
                    selectedSalesAgreement={selectedSalesAgreement}
                />
            </Modal>

            <div className="mt-8">
                <CustomDataTable
                    loading={loading}
                    columns={columns}
                    data={salesAgreements?.data || []}
                    pagination
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={salesAgreements?.meta?.total}
                    paginationPerPage={perPage}
                />
            </div>
        </div>
    );
};

export default GymSalesAgreement;
