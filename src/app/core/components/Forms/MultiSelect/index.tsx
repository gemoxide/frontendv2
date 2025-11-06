import { ErrorMessage } from "formik";
import { MultiSelect } from "react-multi-select-component";
import { useFormikContext } from "formik";
import "./MultiSelect.scss";

type Options = {
    label: string;
    value: any;
    disabled?: boolean;
};
type Props = {
    label: string;
    hasSelectAll?: boolean;
    name: string;
    options?: Options[];
    disableSearch?: boolean;
    disabled?: boolean;
    loading?: boolean;
};

const Input: React.FC<Props> = ({
    label,
    hasSelectAll = false,
    name,
    options = [],
    disableSearch = false,
    disabled = false,
    loading = false,
}) => {
    const { setFieldValue, values } = useFormikContext<any>();

    return (
        <div className="space-y-1">
            <label className="text-sm text-secondary pl-4 font-bold">
                {label}
            </label>
            <MultiSelect
                isLoading={loading}
                disabled={disabled}
                disableSearch={disableSearch}
                hasSelectAll={hasSelectAll}
                value={values?.[name] || []}
                labelledBy="Select"
                onChange={(e: any) => setFieldValue(name, e)}
                options={options}
            />
            <ErrorMessage
                name={name}
                component={"div"}
                className="text-error text-xs ml-4"
            />
        </div>
    );
};

export default Input;
