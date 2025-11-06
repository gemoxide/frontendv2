import { useSelector } from "react-redux";
import Input from "../../../../core/components/Forms/Input";
import { mapDispatchToProps } from "../../../../core/state/reducer/users";
import { RootState } from "../../../../core/state/reducer";
import { stat } from "fs";
import { useEffect, useMemo } from "react";
import Select from "../../../../core/components/Forms/Select";
import { ptAgreementTypes } from "../../../../core/constants/agreement-types";

interface Props {
    filters: Record<string, any>;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const CoachedClientFilters: React.FC<Props> = ({ filters, setFilters }) => {
    const { getUsers, getGymUsers } = mapDispatchToProps();

    const { data: usersData } = useSelector(
        (state: RootState) => state.users.getUsers
    );

    const { data: gymUsersData } = useSelector(
        (state: RootState) => state.users.getGymUsers
    );

    const {
        data: currentUserData,
        loading,
        success,
    } = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!success) return;
        if (currentUserData?.relationships.user_gyms?.length) {
            getGymUsers({
                gym_id: currentUserData?.relationships.user_gyms[0]?.id,
                per_page: 100,
                page: 1,
            });
        } else {
            getUsers({ per_page: 100, page: 1 });
        }
    }, [currentUserData, success]);

    const userOptions = useMemo(() => {
        if (currentUserData?.relationships.user_gyms?.length) {
            return gymUsersData?.data?.map((user) => {
                return {
                    label: `${user?.attributes?.first_name} ${user?.attributes?.last_name}`,
                    value: user?.id,
                };
            });
        }

        return usersData?.data?.map((user) => {
            return {
                label: `${user?.attributes?.first_name} ${user?.attributes?.last_name}`,
                value: user?.id,
            };
        });
    }, [usersData, gymUsersData, currentUserData]);

    return (
        <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:space-x-3">
            <Select
                isNotFormHook
                label="PT Agreements"
                placeHolder="All"
                name="agreement_type"
                options={ptAgreementTypes}
                value={filters.agreement_type}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        agreement_type: e.target.value,
                    })
                }
            />
            <Select
                isNotFormHook
                label="Assigned to Coach"
                placeHolder="Select Coach"
                name="coach"
                options={userOptions}
                value={filters.user}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        user: e.target.value,
                    })
                }
            />
            <Input
                label="Membership Expiration"
                isNotFormHook
                name="membership_expiration"
                type="month"
                value={filters.membership_expiration}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        membership_expiration: e.target.value,
                    })
                }
            />
            <Input
                label="PT Agreement Expiration"
                isNotFormHook
                name="pt_agreement_expiration"
                type="month"
                value={filters.pt_agreement_expiration}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        pt_agreement_expiration: e.target.value,
                    })
                }
            />
        </div>
    );
};

export default CoachedClientFilters;
