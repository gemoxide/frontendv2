import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Select from "../../../../../core/components/Forms/Select";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps as mapDispatchToPropsUsers } from "../../../../../core/state/reducer/users";
import Input from "../../../../../core/components/Forms/Input";
import { typeDropdown } from "../../../../../core/constants/tasks-type";
import { priorityDropdown } from "../../../../../core/constants/tasks-priority";

type Props = {
    selectedStatus: string;
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    search: string;
    setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
    selectedUser: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    selectedType: string;
    setSelectedPriority: React.Dispatch<React.SetStateAction<string>>;
    selectedPriority: string;
};

const Filters: React.FC<Props> = ({
    selectedStatus,
    setSelectedStatus,
    setSelectedUser,
    selectedUser,
    search,
    setSearch,
    setSelectedType,
    selectedType,
    setSelectedPriority,
    selectedPriority,
}) => {
    const { loading: getUsersLoading, data: getUsersData } = useSelector(
        (state: RootState) => state.users.getUsers
    );
    const { getUsers } = mapDispatchToPropsUsers();

    useEffect(() => {
        getUsers({ per_page: 100, page: 1 });
    }, []);

    const assignedToOptions = useMemo(() => {
        return getUsersData?.data?.map((user) => {
            return {
                label: `${user?.attributes?.first_name} ${user?.attributes?.last_name}`,
                value: user?.id,
            };
        });
    }, [getUsersLoading]);

    return (
        <div className="shadow-lg rounded-md bg-white h-full p-6 flex items-center">
            <div className="w-full grid grid-cols-3 lg:grid-cols-12 items-center justify-start lg:justify-evenly flex-wrap lg:flex-nowrap">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    isNotFormHook
                    placeHolder={"Search by name"}
                    variant="secondary"
                    icon="search"
                    className="lg:col-span-4"
                />
                <Select
                    className="col-span-1"
                    name="status"
                    placeHolder="Select status"
                    variant="default"
                    options={[
                        {
                            label: "All",
                            value: "all",
                        },
                        {
                            label: "Open",
                            value: "open",
                        },
                        {
                            label: "Closed",
                            value: "closed",
                        },
                    ]}
                    isNotFormHook
                    value={selectedStatus}
                    onChange={(e) => {
                        setSelectedStatus(e.target.value);
                    }}
                />
                <Select
                    className="lg:col-span-3"
                    name="user_id"
                    placeHolder="Select assigned to"
                    disabled={getUsersLoading}
                    variant="default"
                    options={assignedToOptions}
                    isNotFormHook
                    value={selectedUser}
                    onChange={(e) => {
                        setSelectedUser(e.target.value);
                    }}
                />
                <Select
                    className="lg:col-span-2"
                    name="type"
                    placeHolder="Select type"
                    variant="default"
                    isNotFormHook
                    options={typeDropdown}
                    value={selectedType}
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                    }}
                />
                <Select
                    className="lg:col-span-2"
                    name="priority"
                    placeHolder="Select priority"
                    variant="default"
                    isNotFormHook
                    options={priorityDropdown}
                    value={selectedPriority}
                    onChange={(e) => {
                        setSelectedPriority(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default Filters;
