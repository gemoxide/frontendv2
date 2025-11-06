import { useMemo } from "react";
import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../core/state/reducer/groups";
import { RootState } from "../../../../../core/state/reducer";
import { useEffect, useState } from "react";
import CustomDataTable from "../../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import CreateGymForm from "./CreateGroupForm";
import Modal from "../../../../../core/components/Modal";
import { IGroup } from "../../../../../core/interfaces/groups.interface";
import { confirmDelete } from "../../../../../core/helpers/prompt";
import { PermissionType } from "../../../../../core/interfaces/routes.interface";

const Groups = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateGroupModal, setIsOpenCreateGroupModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<any>();

    const { getGroups, deleteGroup } = mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: getGroupsData, loading: getGroupsLoading } = useSelector(
        (state: RootState) => state.groups.getGroups
    );

    const { success: createGroupSuccess, loading: createGroupLoading } =
        useSelector((state: RootState) => state.groups.createGroup);

    const { success: deleteGroupSuccess, loading: deleteGroupLoading } =
        useSelector((state: RootState) => state.groups.deleteGroup);

    const { success: updateGroupSuccess, loading: updateGroupLoading } =
        useSelector((state: RootState) => state.groups.updateGroup);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        getGroups({
            page,
            per_page: perPage,
        });
    };

    useEffect(() => {
        const getGroups = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getGroups);
    }, [page, perPage]);

    const loading = getGroupsLoading;

    const hasCreateGroup = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GROUP_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasUpdateGroup = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GROUP_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteGroup = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GROUP_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const columns: TableColumn<IGroup>[] = [
        {
            name: "Name",
            selector: (group) => group?.attributes?.name,
        },
        {
            name: "Location",
            cell: (group) => (
                <>
                    <div className="w-full ">
                        {group?.relationships?.gyms?.map((gym) => {
                            return <p>{`${gym?.attributes?.name}`}</p>;
                        })}
                    </div>
                </>
            ),
        },
        {
            name: "User",
            cell: (group) => (
                <>
                    <div className="w-full ">
                        {group?.relationships?.users?.map((user) => {
                            return (
                                <p>{`${user?.attributes?.first_name} ${user?.attributes?.last_name}`}</p>
                            );
                        })}
                    </div>
                </>
            ),
        },
        {
            name: "",
            width: "15%",
            sortable: false,
            cell: (group: any) => (
                <>
                    <div className="w-full flex justify-end">
                        {(hasDeleteGroup || hasUpdateGroup) && (
                            <KebabDropdown
                                placement="top"
                                lists={[
                                    ...(hasUpdateGroup
                                        ? [
                                              {
                                                  label: "Edit",
                                                  action: () => {
                                                      setSelectedGroup(group);
                                                      setIsOpenCreateGroupModal(
                                                          true
                                                      );
                                                  },
                                              },
                                          ]
                                        : []),
                                    ...(hasDeleteGroup
                                        ? [
                                              {
                                                  label: "Delete",
                                                  action: async () => {
                                                      const { isConfirmed } =
                                                          await confirmDelete(
                                                              "Group"
                                                          );
                                                      if (isConfirmed) {
                                                          deleteGroup(group.id);
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
        if (!createGroupLoading && createGroupSuccess) {
            setIsOpenCreateGroupModal(false);
            fetch();
        }
    }, [createGroupLoading]);

    useEffect(() => {
        if (!deleteGroupLoading && deleteGroupSuccess) {
            fetch();
        }
    }, [deleteGroupLoading]);

    useEffect(() => {
        if (!updateGroupLoading && updateGroupSuccess) {
            fetch();
            setIsOpenCreateGroupModal(false);
            setSelectedGroup(undefined);
        }
    }, [updateGroupLoading]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-secondary">
                    Groups
                </h1>
                {hasCreateGroup && (
                    <Button
                        label="+ Add Group"
                        onClick={() => {
                            setIsOpenCreateGroupModal(true);
                            setSelectedGroup(undefined);
                        }}
                    />
                )}
            </div>
            <Modal
                isOpen={isOpenCreateGroupModal}
                onClose={() => setIsOpenCreateGroupModal(false)}
            >
                <CreateGymForm selectedGroup={selectedGroup} />
            </Modal>
            <div className="mt-8">
                <CustomDataTable
                    loading={loading}
                    columns={columns}
                    data={getGroupsData?.data || []}
                    pagination
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={getGroupsData?.meta?.total}
                    sortServer
                />
            </div>
        </div>
    );
};

export default Groups;
