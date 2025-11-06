import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../core/state/reducer/gym-revenue";
import { RootState } from "../../../../../core/state/reducer";
import { useEffect, useMemo, useState } from "react";
import CustomDataTable from "../../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import CreateGymRevenueFrom from "./CreateGymRevenueForm";
import Modal from "../../../../../core/components/Modal";
import { IUser } from "../../../../../core/interfaces/user.interface";
import { useParams } from "react-router-dom";
import { confirmDelete } from "../../../../../core/helpers/prompt";
import { PermissionType } from "../../../../../core/interfaces/routes.interface";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../core/constants/routes";
import { IGymRevenue } from "../../../../../core/interfaces/gym-revenue.interface";
import { convertToCurrency } from "../../../../../core/services/utils/utils.service";

const Users = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateGymRevenueModal, setIsOpenCreateGymRevenueModal] =
        useState(false);
    const [selectedGymRevenue, setSelectedGymRevenue] = useState<any>();
    const { getGymRevenues, deleteGymRevenue } = mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: getGymRevenuesData, loading: getGymRevenuesLoading } =
        useSelector((state: RootState) => state.gymRevenue.getGymRevenues);
    const { id } = useParams();

    const {
        success: createGymRevenueSuccess,
        loading: createGymRevenueLoading,
    } = useSelector((state: RootState) => state.gymRevenue.createGymRevenue);

    const {
        success: deleteGymRevenueSuccess,
        loading: deleteGymRevenueLoading,
    } = useSelector((state: RootState) => state.gymRevenue.deleteGymRevenue);

    const { success: updateSuccess, loading: updateGymRevenueLoading } =
        useSelector((state: RootState) => state.gymRevenue.updateGymRevenue);

    const navigate = useNavigate();

    useEffect(() => {
        fetch();
    }, []);

    const gymId = id ? id : currentUser?.relationships?.user_gyms?.[0]?.id;

    const fetch = async () => {
        getGymRevenues({
            gym_id: gymId,
            page,
            per_page: perPage,
        });
    };

    useEffect(() => {
        const getAdminRoles = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getAdminRoles);
    }, [page, perPage]);

    const loading = getGymRevenuesLoading;

    const handEditGymRevenue = (gymRevenue: any) => {
        setSelectedGymRevenue(gymRevenue);
        setIsOpenCreateGymRevenueModal(true);
    };

    const columns: TableColumn<IGymRevenue>[] = [
        {
            name: "Year",
            selector: (revenue) => revenue?.attributes?.year,
        },
        {
            name: "Month",
            cell: (revenue) => revenue?.attributes?.month,
        },
        {
            name: "Membership Revenue",
            cell: (revenue) =>
                convertToCurrency(revenue?.attributes?.membership_revenue),
            right: true,
        },
        {
            name: "Membership Count",
            cell: (revenue) => revenue?.attributes?.membership_count,
            right: true,
        },
        {
            name: "PT Revenue",
            cell: (revenue) =>
                convertToCurrency(revenue?.attributes?.pt_revenue),
            right: true,
        },
        {
            name: "PT Count",
            cell: (revenue) => revenue?.attributes?.pt_count,
            right: true,
        },
        {
            name: "",
            width: "15%",
            sortable: false,
            cell: (revenue: any) => (
                <div className="w-full flex justify-end">
                    <KebabDropdown
                        placement="top"
                        lists={[
                            {
                                label: "Update Revenue",
                                action: () => handEditGymRevenue(revenue),
                            },
                            {
                                label: "Delete",
                                action: async () => {
                                    const { isConfirmed } = await confirmDelete(
                                        "Revenue"
                                    );
                                    if (isConfirmed) {
                                        deleteGymRevenue({
                                            id: revenue?.id,
                                            gym_id: gymId,
                                        });
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

    useEffect(() => {
        if (!createGymRevenueLoading && createGymRevenueSuccess) {
            setIsOpenCreateGymRevenueModal(false);
            fetch();
        }
    }, [createGymRevenueLoading]);

    useEffect(() => {
        if (!deleteGymRevenueLoading && deleteGymRevenueSuccess) {
            fetch();
        }
    }, [deleteGymRevenueLoading]);

    useEffect(() => {
        if (!updateGymRevenueLoading && updateSuccess) {
            fetch();
            setIsOpenCreateGymRevenueModal(false);
            setSelectedGymRevenue(undefined);
        }
    }, [updateGymRevenueLoading]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-secondary">
                    Monthly Revenue
                </h1>
                <Button
                    label="Record Monthly Revenue"
                    onClick={() => {
                        setIsOpenCreateGymRevenueModal(true);
                        setSelectedGymRevenue(undefined);
                    }}
                />
            </div>
            <Modal
                isOpen={isOpenCreateGymRevenueModal}
                onClose={() => setIsOpenCreateGymRevenueModal(false)}
            >
                <CreateGymRevenueFrom
                    selectedGymRevenue={selectedGymRevenue}
                    gym={gymId}
                />
            </Modal>

            <div className="mt-8">
                <CustomDataTable
                    loading={loading}
                    columns={columns}
                    data={getGymRevenuesData?.data || []}
                    pagination
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={getGymRevenuesData?.meta?.total}
                    sortServer
                />
            </div>
        </div>
    );
};

export default Users;
