import draggableIcon from "../../../../../../assets/icons/draggable-icon.svg";
import { IPermissions } from "../../../../core/interfaces/permissions.interface";
import Checkbox from "../../../../core/components/Forms/CheckBox";

interface Props {
    permission: IPermissions;
    index: number;
    isChecked: boolean;
    handleOnChange: (id: number) => void;
}

const PermissionRow: React.FC<Props> = ({
    permission,
    isChecked,
    handleOnChange,
}) => {
    return (
        <>
            <div className="col-span-1 flex">
                <img src={draggableIcon} />
            </div>
            <div className="col-span-11">
                <Checkbox
                    containerClassName="flex items-center my-2 gap-x-2"
                    name="permissions"
                    label={permission.attributes?.description}
                    onChange={() => handleOnChange(permission?.id)}
                    checked={isChecked}
                    isNotFormHook
                />
            </div>
        </>
    );
};

export default PermissionRow;
