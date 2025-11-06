import Select from "../../../../../../../core/components/Forms/Select";
import { rolesDropdown } from "../../../../../../../core/constants/roles";
import { perPageDropdown } from "../../../../../../../core/constants/per-page";
import Input from "../../../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../../../core/state/reducer/roles";
import { useEffect, useMemo } from "react";

type Props = {
    setRole: React.Dispatch<React.SetStateAction<string>>;
    role: string;
    setGymId: React.Dispatch<React.SetStateAction<string>>;
    gymId: string;
    perPage: number;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
    gymOptions: {
        label: string;
        value: any;
    }[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Filters: React.FC<Props> = ({
    setRole,
    role,
    gymId,
    setGymId,
    gymOptions,
    search,
    setSearch,
}) => {
    const { getUserRoles } = mapDispatchToProps();

    const { loading: getUserRolesLoading, data: getUserRolesData } =
        useSelector((state: RootState) => state.roles.getUserRoles);

    useEffect(() => {
        getUserRoles({ per_page: 100 });
    }, []);

    const rolesOptions = useMemo(() => {
        return (
            getUserRolesData?.data?.map((val) => {
                return {
                    label: val?.attributes?.name,
                    value: val?.attributes?.name,
                };
            }) || []
        );
    }, [getUserRolesData]);

    return (
        <div className="w-full flex mt-8">
            <div className="w-4/12 mr-4">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    placeHolder={"Search..."}
                    isNotFormHook
                    variant="secondary"
                    icon="search"
                />
            </div>
            <div className="w-4/12 mr-4">
                <Select
                    placeHolder="Select Role"
                    inputClassName="w-full"
                    name="Role"
                    variant="secondary"
                    isNotFormHook
                    options={rolesOptions}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>
            <div className="w-4/12">
                <Select
                    placeHolder="Select Gym"
                    inputClassName="w-full"
                    name="Gym"
                    variant="secondary"
                    isNotFormHook
                    value={gymId}
                    onChange={(e) => setGymId(e.target.value)}
                    options={gymOptions}
                />
            </div>
        </div>
    );
};

export default Filters;
