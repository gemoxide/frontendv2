import { IPermissions } from "../../../../core/interfaces/permissions.interface";
import PermissionRow from "./PermissionRow";

interface Props {
    permissions: IPermissions[];
    selectedPermissions: number[];
    handleOnChange: (id: number) => void;
}

const PermissionList: React.FC<Props> = ({
    permissions,
    selectedPermissions,
    handleOnChange,
}) => {
    return (
        <>
            <div className="w-full">
                {permissions?.map((permission, index: number) => (
                    <PermissionRow
                        permission={permission}
                        index={index}
                        isChecked={selectedPermissions.includes(permission.id)}
                        handleOnChange={handleOnChange}
                        key={permission.id}
                    />
                ))}
            </div>
        </>
    );
};

export default PermissionList;
