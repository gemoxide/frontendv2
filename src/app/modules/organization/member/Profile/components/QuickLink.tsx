import KebabDropdown from "../../../../../core/components/KebabDropdown";
import QuickLinkIcon from "../../../../../../../assets/icons/quick-link.svg";
import { formatDateUseBrowserTZ } from "../../../../../core/services/utils/utils.service";

type Props = {
    title?: string;
    description?: string;
    url?: string;
    createdAt?: string;
    name?: string;
    isShowOptions?: boolean;
    handleEdit?: VoidFunction;
    handleDelete?: VoidFunction;
};

const QuickLink: React.FC<Props> = ({
    title,
    description,
    url,
    createdAt,
    name,
    isShowOptions,
    handleEdit,
    handleDelete,
}) => {
    return (
        <div className="my-4">
            <div className="flex justify-between">
                <a className="flex items-center" href={url} target="_blank">
                    <img
                        src={QuickLinkIcon}
                        alt="Quick Link icon"
                        className="w-16 h-16 rounded-md"
                    />
                    <div className="ml-4">
                        <p className="mb-2 font-bold text-md">{title}</p>
                        <p className="text-grey-secondary font-bold text-xs">
                            {description}
                        </p>
                    </div>
                </a>
                {isShowOptions && (
                    <KebabDropdown
                        lists={[
                            // {
                            //     label: "Edit",
                            //     action: () => handleEdit && handleEdit(),
                            // },

                            {
                                label: "Delete",
                                action: () => handleDelete && handleDelete(),
                                isDanger: true,
                            },
                        ]}
                    />
                )}
            </div>
        </div>
    );
};

export default QuickLink;
