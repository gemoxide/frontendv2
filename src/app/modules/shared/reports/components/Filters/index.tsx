import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchableSelect from "../../../../../core/components/SearchableSelect";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps as mapDispatchToOrganizationProps } from "../../../../../core/state/reducer/admin-organizations";
import { mapDispatchToProps as mapDispatchToGymProps } from "../../../../../core/state/reducer/gyms";
import { mapDispatchToProps as mapDispatchToUserProps } from "../../../../../core/state/reducer/users";
import { Option } from "../../../../../core/interfaces/utils";
import Input from "../../../../../core/components/Forms/Input";
import {
    formatDateObjectToObjectString,
    getCurrentDate,
} from "../../../../../core/services/utils/utils.service";
import Select from "../../../../../core/components/Forms/Select";
import { DATE_RANGE_OPTIONS } from "../../../../../core/constants/date-range-options";
import { ReportsQuery } from "../../../../../core/interfaces/reports.interface";
import {
    endOfMonth,
    endOfWeek,
    endOfYear,
    startOfMonth,
    startOfWeek,
    startOfYear,
} from "date-fns";
import { getUniqueListBy } from "../../../../../core/helpers/getUniqueListBy";

interface Props {
    dateFilters?: "range" | "month";
    isRange?: boolean;
    query: ReportsQuery;
    setQuery: (query: ReportsQuery) => void;
}

interface UserProps {
    label: string;
    value: number | string;
}

const Filters: React.FC<Props> = ({
    dateFilters = "range",
    query,
    setQuery,
    isRange = true,
}) => {
    const { getAdminOrganizations } = mapDispatchToOrganizationProps();
    const { getOrganizationGyms, getGyms } = mapDispatchToGymProps();
    const { getGymUsers } = mapDispatchToUserProps();
    const [organizationOptions, setOrganizationOptions] = useState<Option[]>(
        []
    );

    const [gymOptions, setGymOptions] = useState<Option[]>([]);
    const [userOptions, setUserOptions] = useState<UserProps[]>([]);

    const [selectedOrganization, setSelectedOrganization] = useState<Option>({
        label: "All",
    });
    const [selectedGym, setSelectedGym] = useState<Option | undefined>();
    const [selectedUser, setSelectedUser] = useState<undefined>();

    const [startDate, setStartDate] = useState(getCurrentDate());
    const [endDate, setEndDate] = useState(getCurrentDate());
    const [month, setMonth] = useState(getCurrentDate("month"));
    const [dateRange, setDateRange] = useState("today");
    const [comboboxDisabled, setComboboxDisabled] = useState<boolean>(false);

    useEffect(() => {
        let start = startDate;
        let end = endDate;
        const today = new Date();
        switch (dateRange) {
            case "today":
                start = formatDateObjectToObjectString(today);
                end = formatDateObjectToObjectString(today);
                break;
            case "week":
                start = formatDateObjectToObjectString(startOfWeek(today));
                end = formatDateObjectToObjectString(endOfWeek(today));
                break;
            case "month":
                start = formatDateObjectToObjectString(startOfMonth(today));
                end = formatDateObjectToObjectString(endOfMonth(today));
                break;
            case "year":
                start = formatDateObjectToObjectString(startOfYear(today));
                end = formatDateObjectToObjectString(endOfYear(today));
                break;
            default:
                break;
        }
        setStartDate(start);
        setEndDate(end);
        setQuery({
            ...query,
            start_date: start,
            end_date: end,
        });
    }, [dateRange]);

    const fetchOrganizations = async () => {
        getAdminOrganizations({
            per_page: 200,
            order_by: "name",
            direction: "asc",
        });
    };

    const fetchOrganizationGyms = async () => {
        getOrganizationGyms({
            id: selectedOrganization?.value,
            per_page: 200,
            order_by: "name",
            direction: "asc",
        });
    };

    const fetchGymUsers = async () => {
        getGymUsers({
            gym_id: selectedGym?.value?.toString(),
            per_page: 200,
            order_by: "name",
            direction: "asc",
        });
    };

    const fetchGyms = async () => {
        getGyms({
            per_page: 200,
            order_by: "name",
            direction: "asc",
        });
    };

    useEffect(() => {
        if (currentUser?.attributes.type === "admin") {
            fetchOrganizations();
        } else if (
            !currentUser?.relationships.groups?.length &&
            !currentUser?.relationships.user_gyms?.length
        ) {
            fetchGyms();
        } else if (
            currentUser?.relationships.groups?.length &&
            !currentUser?.relationships.user_gyms?.length
        ) {
            const groupGyms = currentUser.relationships.groups.map((group) => {
                return group.relationships.gyms?.map((gym) => ({
                    label: gym.attributes.name,
                    value: gym.id,
                }));
            });

            setGymOptions([
                { label: "All" },
                ...getUniqueListBy(groupGyms.flat(), "value"),
            ]);
        } else if (
            !currentUser?.relationships.groups?.length &&
            currentUser?.relationships.user_gyms?.length
        ) {
            const userGyms = currentUser.relationships.user_gyms.map((gym) => ({
                label: gym.attributes.name,
                value: gym.id,
            }));

            setGymOptions([
                { label: "All" },
                ...getUniqueListBy(userGyms, "value"),
            ]);

            setSelectedGym({
                label: currentUser?.relationships?.user_gyms[0].id,
                value: currentUser?.relationships?.user_gyms[0].attributes
                    ?.name,
            });
        }
    }, []);

    useEffect(() => {
        if (selectedOrganization.value) {
            fetchOrganizationGyms();
            setSelectedGym({ label: "All" });
        } else {
            setSelectedGym(undefined);
        }
    }, [selectedOrganization]);

    useEffect(() => {
        if (selectedGym?.value) {
            fetchGymUsers();
        }
    }, [selectedGym]);

    const {
        data: organizationsData,
        loading: organizationsLoading,
        success: organizationsSuccess,
    } = useSelector(
        (state: RootState) => state.adminOrganizations.getAdminOrganizations
    );

    const {
        data: organizationGymsData,
        loading: organizationGymsLoading,
        success: organizationGymsSuccess,
    } = useSelector((state: RootState) => state.gyms.getOrganizationGyms);

    const {
        data: gymsData,
        loading: gymsLoading,
        success: gymsSuccess,
    } = useSelector((state: RootState) => state.gyms.getGyms);

    const {
        data: currentUser,
        loading: currentUserLoading,
        success: currentUserSuccess,
    } = useSelector((state: RootState) => state.auth.user);

    const {
        data: gymUserData,
        loading: gymUserLoading,
        success: gymUserSuccess,
    } = useSelector((state: RootState) => state.users.getGymUsers);

    useEffect(() => {
        if (!currentUserLoading && currentUserSuccess) {
            if (currentUser?.relationships?.user_gyms?.length) {
                setSelectedGym({
                    label: currentUser?.relationships?.user_gyms[0].attributes
                        ?.name,
                    value: currentUser?.relationships?.user_gyms[0]?.id,
                });
                setQuery({
                    ...query,
                    gym: currentUser?.relationships?.user_gyms[0]?.id,
                    user: undefined,
                });
                setComboboxDisabled(true);
            } else {
                setSelectedGym({ label: "All" });
            }
        }
    }, [currentUserLoading, currentUserSuccess]);

    useEffect(() => {
        if (!organizationsLoading && organizationsSuccess) {
            setOrganizationOptions([
                { label: "All" },
                ...(organizationsData?.data.map((organization) => ({
                    label: organization.attributes.name,
                    value: organization.id,
                })) || []),
            ]);
        }
    }, [organizationsLoading, organizationsSuccess]);

    useEffect(() => {
        if (!organizationGymsLoading && organizationGymsSuccess) {
            setGymOptions([
                { label: "All" },
                ...(organizationGymsData?.data.map((gym) => ({
                    label: gym.attributes.name,
                    value: gym.id,
                })) || []),
            ]);
        }
    }, [organizationGymsLoading, organizationGymsSuccess]);

    useEffect(() => {
        if (!gymsLoading && gymsSuccess) {
            setGymOptions([
                { label: "All" },
                ...(gymsData?.data.map((gym) => ({
                    label: gym.attributes.name,
                    value: gym.id,
                })) || []),
            ]);
        }
    }, [gymsLoading, gymsSuccess]);

    useEffect(() => {
        if (!gymUserLoading && gymUserSuccess) {
            setUserOptions([
                ...(gymUserData?.data.map((user) => ({
                    label: `${user.attributes.first_name} ${user.attributes.last_name}`,
                    value: user.id,
                })) || []),
            ]);
        }
    }, [gymUserLoading, gymUserSuccess]);

    return (
        <div className="flex flex-col p-6 gap-y-3 shadow-lg rounded-md bg-white">
            <div className="flex gap-x-2 z-50">
                {currentUser?.attributes.type === "admin" && (
                    <div className="w-1/3">
                        <SearchableSelect
                            value={selectedOrganization}
                            onChange={(e: Option) => {
                                setSelectedOrganization(e);
                                setQuery({
                                    ...query,
                                    organization: e.value,
                                });
                            }}
                            options={organizationOptions}
                            label="Organization"
                        />
                    </div>
                )}

                <div className="flex gap-x-2 z-0 w-full">
                    {(selectedOrganization.value ||
                        currentUser?.attributes.type === "user") && (
                        <div className="w-1/3">
                            <SearchableSelect
                                value={selectedGym}
                                onChange={(e: Option) => {
                                    setSelectedGym(e);
                                    setQuery({
                                        ...query,
                                        gym: e.value,
                                        user: undefined,
                                    });
                                }}
                                options={gymOptions}
                                label="Gym"
                                isDisabled={comboboxDisabled}
                            />
                        </div>
                    )}
                    {selectedGym?.value && (
                        <div className="w-1/3">
                            <Select
                                className="w-full"
                                name="user_id"
                                label="Assigned to"
                                value={selectedUser}
                                options={userOptions}
                                isNotFormHook
                                onChange={(e) => {
                                    setQuery({
                                        ...query,
                                        user: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            {isRange ? (
                <div className="flex gap-x-2 z-0">
                    {dateFilters === "range" ? (
                        <>
                            <Select
                                className="w-1/3"
                                name="date_range"
                                label="Date Range"
                                value={dateRange}
                                options={DATE_RANGE_OPTIONS}
                                isNotFormHook
                                onChange={(e) => setDateRange(e.target.value)}
                            />
                            <Input
                                className="w-1/3"
                                type="date"
                                isNotFormHook
                                name="start_date"
                                label="Start Date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    setQuery({
                                        ...query,
                                        start_date: e.target.value,
                                    });
                                }}
                                disabled={dateRange !== "custom"}
                            />
                            <Input
                                className="w-1/3"
                                type="date"
                                isNotFormHook
                                name="end_date"
                                label="End Date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                    setQuery({
                                        ...query,
                                        end_date: e.target.value,
                                    });
                                }}
                                disabled={dateRange !== "custom"}
                            />
                        </>
                    ) : (
                        <Input
                            className="w-1/3"
                            type="month"
                            isNotFormHook
                            name="month"
                            label="Month"
                            value={month}
                            onChange={(e) => {
                                setMonth(e.target.value);
                                setQuery({
                                    ...query,
                                    month: e.target.value,
                                });
                            }}
                        />
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Filters;
