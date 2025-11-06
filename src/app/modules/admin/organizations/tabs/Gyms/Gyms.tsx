import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../core/state/reducer/gyms";
import { RootState } from "../../../../../core/state/reducer";
import { useEffect, useState } from "react";
import CustomDataTable from "../../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import CreateGymForm from "./CreateGymForm";
import Modal from "../../../../../core/components/Modal";
import { IGym } from "../../../../../core/interfaces/gyms.interface";
import { useNavigate, useParams } from "react-router-dom";
import { confirmDelete } from "../../../../../core/helpers/prompt";

const Gyms = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const { getOrganizationGyms, deleteGym } = mapDispatchToProps();
    const [isOpenCreateGymModal, setIsOpenCreateGymModal] = useState(false);
    const [selectedGym, setSelectedGym] = useState<any>();

    const { data: getGymsData, loading: getGymsLoading } = useSelector(
        (state: RootState) => state.gyms.getOrganizationGyms
    );

    const { success: deleteGymSuccess, loading: deleteGymLoading } =
        useSelector((state: RootState) => state.gyms.deleteGym);

    const { success: createGymSuccess, loading: createGymLoading } =
        useSelector((state: RootState) => state.gyms.createOrganizationGym);

    const { success: updateGymSuccess, loading: updateGymLoading } =
        useSelector((state: RootState) => state.gyms.updateGym);

    useEffect(() => {
        fetch();
    }, []);

    const { id } = useParams();

    const navigate = useNavigate();
    const fetch = async () => {
        getOrganizationGyms({
            id: id,
            page,
            per_page: perPage,
        });
    };

    useEffect(() => {
        const getGyms = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getGyms);
    }, [page, perPage]);

    const loading = getGymsLoading;

    const columns: TableColumn<IGym>[] = [
        {
            name: "Name",
            selector: (gym) => gym?.attributes?.name,
        },
        {
            name: "Address",
            selector: (gym) => gym?.attributes?.address,
        },
        {
            name: "",
            width: "15%",
            sortable: false,
            cell: (gym: any) => (
                <>
                    <div className="w-full flex justify-end">
                        <KebabDropdown
                            placement="top"
                            lists={[
                                // {
                                //     label: "View",
                                //     action: () => {
                                //         navigate(
                                //             ROUTES.USER.gymSettings.parse(
                                //                 gym.id
                                //             )
                                //         );
                                //     },
                                // },
                                {
                                    label: "Edit",
                                    action: () => {
                                        setSelectedGym(gym);
                                        setIsOpenCreateGymModal(true);
                                    },
                                },
                                {
                                    label: "Delete",
                                    action: async () => {
                                        const { isConfirmed } =
                                            await confirmDelete("Gym");
                                        if (isConfirmed) {
                                            deleteGym(gym.id);
                                        }
                                    },
                                    isDanger: true,
                                },
                            ]}
                        />
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
            fetch();
        }
    }, [createGymLoading]);

    useEffect(() => {
        if (!deleteGymLoading && deleteGymSuccess) {
            fetch();
        }
    }, [deleteGymLoading]);

    useEffect(() => {
        if (!updateGymLoading && updateGymSuccess) {
            fetch();
            setIsOpenCreateGymModal(false);
            setSelectedGym(undefined);
        }
    }, [updateGymLoading]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-secondary">
                    Locations
                </h1>
                <Button
                    label="+ Add Gym"
                    onClick={() => {
                        setIsOpenCreateGymModal(true);
                        setSelectedGym(undefined);
                    }}
                />
            </div>
            <Modal
                isOpen={isOpenCreateGymModal}
                onClose={() => setIsOpenCreateGymModal(false)}
            >
                <CreateGymForm selectedGym={selectedGym} organizationId={id} />
            </Modal>
            <div className="mt-8">
                <CustomDataTable
                    loading={loading}
                    columns={columns}
                    data={getGymsData?.data || []}
                    pagination
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={getGymsData?.meta?.total}
                    sortServer
                />
            </div>
        </div>
    );
};

export default Gyms;
