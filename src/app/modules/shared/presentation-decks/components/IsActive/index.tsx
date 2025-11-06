import { useMemo, useState } from "react";
import Switch from "../../../../../core/components/Switch";
import { mapDispatchToProps } from "../../../../../core/state/reducer/presentation-decks";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { PermissionType } from "../../../../../core/interfaces/routes.interface";
import { IPresentationDeck } from "../../../../../core/interfaces/presentation-decks.interface";

interface Props {
    deck: IPresentationDeck;
}

const IsActive: React.FC<Props> = ({ deck }) => {
    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const [isActive, setIsActive] = useState(
        deck?.attributes?.is_active || false
    );
    const [isAdminActive, setIsAdminActive] = useState(
        deck?.attributes?.is_admin_active || false
    );

    const { updatePresentationDeckStatus, updateAdminPresentationDeckStatus } =
        mapDispatchToProps();

    const hasUpdateStatusPresentationDeck = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.PRESENTATION_DECK_UPDATE_STATUS
            );
        }
        return false;
    }, [currentUser]);

    const handleChangeStatus = () => {
        if (!hasUpdateStatusPresentationDeck && currentUser?.attributes?.type !== "admin") {
            return;
        }
        if (
            currentUser?.relationships?.user_gyms?.length &&
            deck?.attributes?.type !== "gym"
        ) {
            return;
        }
        if (
            deck?.attributes?.type === "admin" &&
            currentUser?.attributes?.type !== "admin"
        ) {
            updateAdminPresentationDeckStatus({
                id: deck.id,
                is_active: !isAdminActive,
            });
            setIsAdminActive(!isAdminActive);
        } else {
            updatePresentationDeckStatus({
                id: deck.id,
                is_active: !isActive,
            });
            setIsActive(!isActive);
        }
    };

    return (
        <Switch
            checked={
                deck?.attributes?.type === "admin" &&
                currentUser?.attributes.type !== "admin"
                    ? isAdminActive
                    : isActive
            }
            handleChange={handleChangeStatus}
        />
    );
};

export default IsActive;
