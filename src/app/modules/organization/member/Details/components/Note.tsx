import KebabDropdown from "../../../../../core/components/KebabDropdown";
import { formatDateUseBrowserTZ } from "../../../../../core/services/utils/utils.service";

type Props = {
    note?: string;
    createdAt?: string;
    name?: string;
    isShowOptions?: boolean;
    handleEdit?: VoidFunction;
    handleDelete?: VoidFunction;
};

const Note: React.FC<Props> = ({
    note,
    createdAt,
    name,
    isShowOptions,
    handleEdit,
    handleDelete,
}) => {
    return (
        <div className="my-4">
            <div className="flex justify-between">
                <p className="font-bold">{name}</p>
                {isShowOptions && (
                    <KebabDropdown
                        lists={[
                            {
                                label: "Edit",
                                action: () => handleEdit && handleEdit(),
                            },

                            {
                                label: "Delete",
                                action: () => handleDelete && handleDelete(),
                                isDanger: true,
                            },
                        ]}
                    />
                )}
            </div>

            <p className="text-grey-secondary break-all">
                {formatDateUseBrowserTZ(createdAt || "")}
            </p>
            <div className="bg-tertiary p-4 mt-2 break-all">{note}</div>
        </div>
    );
};

export default Note;
