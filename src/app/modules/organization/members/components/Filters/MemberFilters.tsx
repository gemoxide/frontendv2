import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Select from "../../../../../core/components/Forms/Select";
import { perPageDropdown } from "../../../../../core/constants/per-page";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/sales-agreements";
import { mapDispatchToProps as mapDispatchToGyms } from "../../../../../core/state/reducer/gyms";

type GymOption = {
    label: string;
    value: number;
};

type Props = {
    setJsStatus: React.Dispatch<React.SetStateAction<string>>;
    jsStatus: string;
    salesAgreement?: number;
    setSalesAgreement: React.Dispatch<React.SetStateAction<number | undefined>>;
    gymOptions?: GymOption[];
    setGym: React.Dispatch<React.SetStateAction<number | undefined>>;
    gym?: number;
};

const MemberFilters: React.FC<Props> = ({
    jsStatus,
    setJsStatus,
    salesAgreement,
    setSalesAgreement,
    gymOptions,
    setGym,
    gym,
}) => {
    const { data: saleAgreementsData, loading: salesAgreementsLoading } =
        useSelector(
            (state: RootState) => state.salesAgreements.getSalesAgreements
        );
    const { loading: getGymsLoading, data: getGymsData } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const { getSalesAgreements } = mapDispatchToProps();

    const fetchSalesAgreements = async () => {
        getSalesAgreements();
    };

    useEffect(() => {
        fetchSalesAgreements();
    }, []);

    const salesAgreementsOptions = useMemo(() => {
        return saleAgreementsData?.data?.map((agreement) => {
            return {
                label: agreement.attributes.name,
                value: agreement.id,
            };
        });
    }, [salesAgreementsLoading]);

    return (
        <div className="shadow-lg rounded-md bg-white h-full p-6 flex items-center">
            <div className="w-1/4">
                <p className="font-bold text-xl"> Filters</p>
            </div>
            <div className="w-full flex justify-end gap-x-2">
                <Select
                    placeHolder="Location"
                    inputClassName="w-full"
                    name="location"
                    variant="default"
                    isNotFormHook
                    options={gymOptions}
                    value={gym}
                    onChange={(e) => {
                        const val = Number(e.currentTarget.value);
                        setGym(val > 0 ? val : undefined);
                    }}
                />
                <Select
                    placeHolder="JS Status"
                    inputClassName="w-full"
                    name="Member type"
                    variant="default"
                    isNotFormHook
                    options={[]}
                    value={jsStatus}
                    onChange={(e) => setJsStatus(e.target.value)}
                />
                <Select
                    placeHolder="Sales Agreement"
                    inputClassName="w-full"
                    name="sales_agreement"
                    variant="default"
                    isNotFormHook
                    value={salesAgreement}
                    onChange={(e) => {
                        const val = Number(e.currentTarget.value);
                        setSalesAgreement(val > 0 ? val : undefined);
                    }}
                    options={salesAgreementsOptions}
                />
            </div>
        </div>
    );
};

export default MemberFilters;
