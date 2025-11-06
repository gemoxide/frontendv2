import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../core/state/reducer/forms";
import { RootState } from "../../../../../core/state/reducer";
import Select from "../../../../../core/components/Forms/Select";

interface Props {
    form_id?: number;
    handleSelectForm: (form_id: number) => void;
}

const SlideForm: React.FC<Props> = ({ form_id, handleSelectForm }) => {
    const { getForms } = mapDispatchToProps();

    const { data: getFormsData, loading: getFormsLoading } = useSelector(
        (state: RootState) => state.forms.getForms
    );

    const fetch = async () => {
        getForms({
            page: 1,
            per_page: 100,
            is_active: true,
        });
    };

    useEffect(() => {
        fetch();
    }, []);

    const formOptions = useMemo(() => {
        return (
            getFormsData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []
        );
    }, [getFormsData]);

    return (
        <div className="mt-4 w-80">
            <Select
                placeHolder="Select Form"
                label="Select Form"
                inputClassName="w-full"
                name="form_id"
                variant="primary"
                isNotFormHook
                options={formOptions}
                value={form_id}
                onChange={(e) => {
                    const val = Number(e.currentTarget.value);
                    handleSelectForm(val);
                }}
            />
        </div>
    );
};

export default SlideForm;
