import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../core/state/reducer/gyms";
import { RootState } from "../../../../../core/state/reducer";
import { useEffect, useMemo, useState } from "react";
import CustomDataTable from "../../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import CreateGymForm from "./CreateGymForm";
import Modal from "../../../../../core/components/Modal";
import { IGym } from "../../../../../core/interfaces/gyms.interface";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../core/constants/routes";
import { confirmDelete } from "../../../../../core/helpers/prompt";
import { PermissionType } from "../../../../../core/interfaces/routes.interface";

const Gyms = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const { getGyms, deleteGym } = mapDispatchToProps();
    const [isOpenCreateGymModal, setIsOpenCreateGymModal] = useState(false);
    const [selectedGym, setSelectedGym] = useState<any>();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: getGymsData, loading: getGymsLoading } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const { success: deleteGymSuccess, loading: deleteGymLoading } =
        useSelector((state: RootState) => state.gyms.deleteGym);

    const { success: createGymSuccess, loading: createGymLoading } =
        useSelector((state: RootState) => state.gyms.createGym);

    const { success: updateGymSuccess, loading: updateGymLoading } =
        useSelector((state: RootState) => state.gyms.updateGym);

    useEffect(() => {
        fetch();
    }, []);

    const navigate = useNavigate();
    const fetch = async () => {
        getGyms({
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

    const hasViewGym = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GYM_VIEW
            );
        }
        return false;
    }, [currentUser]);

    const hasAddGym = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GYM_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasUpdateGym = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GYM_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteGym = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GYM_DELETE
            );
        }
        return false;
    }, [currentUser]);

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
                        {(hasViewGym || hasUpdateGym || hasDeleteGym) && (
                            <KebabDropdown
                                placement="top"
                                lists={[
                                    ...(hasViewGym || hasUpdateGym
                                        ? [
                                              {
                                                  label: "View",
                                                  action: () => {
                                                      navigate(
                                                          ROUTES.USER.organizationGymSettings.parse(
                                                              gym.id
                                                          )
                                                      );
                                                  },
                                              },
                                          ]
                                        : []),
                                    ...(hasUpdateGym
                                        ? [
                                              {
                                                  label: "Edit",
                                                  action: () => {
                                                      setSelectedGym(gym);
                                                      setIsOpenCreateGymModal(
                                                          true
                                                      );
                                                  },
                                              },
                                          ]
                                        : []),
                                    ...(hasDeleteGym
                                        ? [
                                              {
                                                  label: "Delete",
                                                  action: async () => {
                                                      const { isConfirmed } =
                                                          await confirmDelete(
                                                              "Gym"
                                                          );
                                                      if (isConfirmed) {
                                                          deleteGym(gym.id);
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
                {hasAddGym && (
                    <Button
                        label="+ Add Location"
                        onClick={() => {
                            setIsOpenCreateGymModal(true);
                            setSelectedGym(undefined);
                        }}
                    />
                )}
            </div>
            <Modal
                isOpen={isOpenCreateGymModal}
                onClose={() => setIsOpenCreateGymModal(false)}
            >
                <CreateGymForm selectedGym={selectedGym} />
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
