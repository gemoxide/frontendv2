import { TableColumn } from "react-data-table-component";
import Section from "../../../core/components/Section";
import { ITask } from "../../../core/interfaces/tasks.interface";
import { mapDispatchToProps } from "../../../core/state/reducer/tasks";
import { mapDispatchToProps as mapDispatchToPropsGyms } from "../../../core/state/reducer/gyms";
import { useEffect, useState } from "react";
import { RootState } from "../../../core/state/reducer";
import { useSelector } from "react-redux";
import CustomDataTable from "../../../core/components/DataTable";
import CreateTask from "./CreateTask";
import CompleteTask from "./CompleteTask";
import Modal from "../../../core/components/Modal";
import KebabDropdown from "../../../core/components/KebabDropdown";
// import { confirmDelete } from "../../../core/helpers/prompt";
import TextBadge from "../../../core/components/TextBadge";
import {
    dateWithDot,
    isDueDate,
} from "../../../core/services/utils/utils.service";
import Filters from "./components/Filters";
import CustomIcon from "../../../core/components/CustomIcon";

const Tasks: React.FC = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("open");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const [selectedTask, setSelectedTask] = useState<any>();
    const [isOpenCreateTaskModal, setIsOpenCreateTaskModal] = useState(false);
    const [selectedToCompleteTask, setSelectedToCompleteTask] = useState<any>();
    const [isOpenToCompleteTaskModal, setIsOpenToCompleteTaskModal] =
        useState(false);
    const [orderBy, setOrderBy] = useState<string | undefined>("due_at");
    const [sortDirection, setSortDirection] = useState<string | undefined>(
        "asc"
    );
    const { getTasks, deleteTask } = mapDispatchToProps();
    const { getMembersByGym } = mapDispatchToPropsGyms();

    const { data: getTasksData, loading: getTasksLoading } = useSelector(
        (state: RootState) => state.tasks.getTasks
    );

    const { loading: createTaskLoading, success: createTaskSuccess } =
        useSelector((state: RootState) => state.tasks.createTask);

    const { loading: updateTaskLoading, success: updateTaskSuccess } =
        useSelector((state: RootState) => state.tasks.updateTask);

    const {
        loading: updateCompleteTaskLoading,
        success: updateCompleteTaskSuccess,
    } = useSelector((state: RootState) => state.tasks.updateCompleteTask);

    const { loading: deleteTaskLoading } = useSelector(
        (state: RootState) => state.tasks.deleteTask
    );

    const { loading: getMembersByGymLoading, data: getMembersByGymData } =
        useSelector((state: RootState) => state.gyms.getMembersByGym);

    const loading =
        getTasksLoading ||
        deleteTaskLoading ||
        updateCompleteTaskLoading ||
        createTaskLoading ||
        updateTaskLoading;

    const fetch = async () => {
        getTasks({
            page,
            search,
            per_page: perPage,
            order_by: orderBy,
            direction: sortDirection,
            priority: selectedPriority,
            user: selectedUser,
            type: selectedType,
            status: selectedStatus,
        });
        getMembersByGym();
    };

    useEffect(() => {
        const getTasks = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getTasks);
    }, [
        page,
        perPage,
        orderBy,
        sortDirection,
        search,
        selectedPriority,
        selectedUser,
        selectedType,
        selectedStatus,
    ]);

    useEffect(() => {
        if (!createTaskLoading && createTaskSuccess) {
            setIsOpenCreateTaskModal(false);
        }
    }, [createTaskLoading, createTaskSuccess]);

    useEffect(() => {
        if (!updateTaskLoading && updateTaskSuccess) {
            setIsOpenCreateTaskModal(false);
        }
    }, [updateTaskLoading, updateTaskSuccess]);

    useEffect(() => {
        if (!updateCompleteTaskLoading && updateCompleteTaskSuccess) {
            setIsOpenToCompleteTaskModal(false);
        }
    }, [updateCompleteTaskLoading, updateCompleteTaskSuccess]);

    const columns: TableColumn<ITask>[] = [
        {
            name: "Task",
            width: "20%",
            cell: (task) => (
                <div className="flex flex-col my-4">
                    <text className="text-xl text-secondary my-2 capitalize">
                        {task?.attributes?.name}
                    </text>
                    <text className="text-grey-secondary">
                        {`${task?.relationships?.member?.attributes?.first_name} ${task?.relationships?.member?.attributes?.last_name}`}
                    </text>
                </div>
            ),
        },
        {
            name: "Due",
            sortable: true,
            sortField: "due_at",
            id: "due_at",
            width: "15%",
            cell: (task) => (
                <span className="font-bold">
                    {task?.attributes?.due_at
                        ? dateWithDot(task?.attributes?.due_at)
                        : ""}
                </span>
            ),
            center: true,
        },
        {
            name: "Priority",
            width: "10%",
            cell: (task) => {
                if (task?.attributes?.priority) {
                    const { priority } = task?.attributes;
                    const variant =
                        priority === "low"
                            ? "priorityLow"
                            : priority === "medium"
                            ? "priorityMedium"
                            : "priorityHigh";
                    return <CustomIcon icon={variant} className="w-10 h-10" />;
                }
            },
            center: true,
        },
        {
            name: "Assigned",
            width: "15%",
            cell: (task) => (
                <div>
                    <p className="text-secondary capitalize">
                        {`${task?.relationships?.user?.attributes?.first_name} ${task?.relationships?.user?.attributes?.last_name}`}
                    </p>
                </div>
            ),
        },
        {
            name: "Type",
            width: "15%",
            cell: (task) => {
                if (task?.attributes?.type) {
                    const { type } = task?.attributes;
                    const variant =
                        type === "New Client Onboarding"
                            ? "newClientOnboarding"
                            : type === "Assessment"
                            ? "assessment"
                            : type === "Lead"
                            ? "leads"
                            : type === "Office Staff"
                            ? "officeStaff"
                            : "";
                    return <CustomIcon icon={variant} className="w-10 h-10" />;
                }
            },
            center: true,
        },
        {
            name: "Status",
            width: "15%",
            cell: (task) => {
                if (task?.attributes?.completed_at) {
                    return (
                        <div className="flex flex-col items-center gap-y-2">
                            <TextBadge label="Closed" variant="success" />
                            <span className="font-bold">
                                {dateWithDot(task?.attributes?.completed_at)}
                            </span>
                        </div>
                    );
                }

                return <TextBadge label="Open" variant="primary" />;
            },
            center: true,
        },
        {
            name: "",
            sortable: false,
            cell: (task) => {
                const list = [
                    {
                        label: "View",
                        action: async () => {
                            setIsOpenToCompleteTaskModal(true);
                            setSelectedToCompleteTask(task);
                        },
                    },
                    {
                        label: "Edit",
                        action: async () => {
                            setIsOpenCreateTaskModal(true);
                            setSelectedTask(task);
                        },
                    },
                    // {
                    //     label: "Delete",
                    //     action: async () => {
                    //         const { isConfirmed } = await confirmDelete("Task");
                    //         if (isConfirmed) {
                    //             deleteTask(task?.id);
                    //         }
                    //     },
                    //     isDanger: true,
                    // },
                ];

                return (
                    <div className="w-full flex justify-end">
                        <KebabDropdown lists={list} />
                    </div>
                );
            },
        },
    ];

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const handleSort = async (column: any, sortDirection: string) => {
        if (column?.sortField) setOrderBy(column?.sortField?.toLowerCase());
        if (sortDirection) setSortDirection(sortDirection);
    };

    return (
        <Section
            title="Tasks"
            rightButtonLabel="Add New +"
            rightButtonOnclick={() => {
                setSelectedTask(undefined);
                setIsOpenCreateTaskModal(true);
            }}
        >
            <Filters
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                setSelectedPriority={setSelectedPriority}
                selectedPriority={selectedPriority}
                search={search}
                setSearch={setSearch}
            />

            <div className="w-full bg-white rounded-lg p-8 shadow-lg mt-4">
                <Modal
                    isOpen={isOpenCreateTaskModal}
                    onClose={() => setIsOpenCreateTaskModal(false)}
                >
                    <CreateTask
                        selectedTask={selectedTask}
                        gymMembers={getMembersByGymData || []}
                        gymMembersLoading={getMembersByGymLoading}
                    />
                </Modal>
                <Modal
                    isOpen={isOpenToCompleteTaskModal}
                    onClose={() => setIsOpenToCompleteTaskModal(false)}
                >
                    <CompleteTask selectedTask={selectedToCompleteTask} />
                </Modal>
                <div className="mt-8">
                    <CustomDataTable
                        loading={loading}
                        columns={columns}
                        data={getTasksData?.data || []}
                        pagination
                        paginationServer
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        paginationTotalRows={getTasksData?.meta?.total}
                        sortServer
                        isHideRowPerPage
                        onSort={handleSort}
                        defaultSortFieldId="due_at"
                    />
                </div>
            </div>
        </Section>
    );
};

export default Tasks;
