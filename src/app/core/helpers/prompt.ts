import Swal from "sweetalert2";

export const confirmDelete = (entity: string, onDelete?: () => void) => {
    return Swal.fire({
        title: `Delete ${entity}`,
        text: `Are you sure you want to delete this ${entity}?`,
        showConfirmButton: true,
        confirmButtonText: "Delete",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonColor: "#FF5151",
        preConfirm: onDelete,
    });
};

export const confirmDeactivate = (
    entity: string,
    onDeactivate?: () => void
) => {
    return Swal.fire({
        title: `Deactivate ${entity}`,
        text: `Are you sure you want to deactivate this ${entity}?`,
        showConfirmButton: true,
        confirmButtonText: "Deactivate",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonColor: "#FF5151",
        preConfirm: onDeactivate,
    });
};

export const deleteDecline = (entity: string) => {
    return Swal.fire({
        title: `Delete ${entity}`,
        text: `You have members with this ${entity} attached. You cannot delete it. You can set it to inactive to remove it as an available option.`,
        showConfirmButton: true,
        confirmButtonText: "Okay",
        confirmButtonColor: "#FF5151",
    });
};

export const confirmCancel = (entity: string, onCancel?: () => void) => {
    return Swal.fire({
        title: `Cancel ${entity}`,
        text: `Are you sure you want to cancel ${entity} agreement?`,
        showConfirmButton: true,
        confirmButtonText: "Yes",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#FF5151",
        preConfirm: onCancel,
        icon: "question",
    });
};
