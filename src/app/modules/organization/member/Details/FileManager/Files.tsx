import { useEffect, useState } from "react";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import Modal from "../../../../../core/components/Modal";
import CreateFileForm from "./CreateFileForm";
import { mapDispatchToProps } from "../../../../../core/state/reducer/members";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import File from "../components/File";
import Skeleton from "react-loading-skeleton";

const Files = () => {
    const { id } = useParams();
    const [isOpenCreateMemberMediaModal, setIsOpenCreateMemberMediaModal] =
        useState(false);

    const { getMemberFile } = mapDispatchToProps();

    const { loading: getMemberMediaLoading, data: getMemberMediaData } =
        useSelector((state: RootState) => state.members.getMemberMedia);

    const {
        loading: createMemberMediaLoading,
        success: createMemberMediaSuccess,
    } = useSelector((state: RootState) => state.members.createMemberMedia);

    const fetch = async () => {
        if (id) getMemberFile(parseInt(id));
    };

    useEffect(() => {
        if (!createMemberMediaLoading && createMemberMediaSuccess) {
            setIsOpenCreateMemberMediaModal(false);
        }
    }, [createMemberMediaLoading, createMemberMediaSuccess]);

    useEffect(() => {
        fetch();
    }, []);

    const loading = createMemberMediaLoading || getMemberMediaLoading;
    return (
        <div className="bg-white shadow-md rounded-md p-6 mt-4 h-2/6">
            <Modal
                isOpen={isOpenCreateMemberMediaModal}
                onClose={() => setIsOpenCreateMemberMediaModal(false)}
            >
                <CreateFileForm />
            </Modal>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">File Manager</h1>
                <KebabDropdown
                    orientation="horizontal"
                    lists={[
                        {
                            label: "Upload File",
                            action: () => {
                                setIsOpenCreateMemberMediaModal(true);
                            },
                        },
                    ]}
                />
            </div>
            <hr />
            {loading && <Skeleton className="my-2" count={2} />}
            {!loading && getMemberMediaData && getMemberMediaData.length > 0 ? (
                <div className="overflow-auto h-5/6">
                    {getMemberMediaData?.map((file, idx) => {
                        return (
                            <File
                                key={idx}
                                name={file?.attributes?.name}
                                fileSize={
                                    (file?.attributes?.size / 1000).toString() +
                                        " MB" || ""
                                }
                                url={file?.attributes?.url}
                            />
                        );
                    })}
                </div>
            ) : (
                <>
                    {getMemberMediaData?.length === 0 && (
                        <div className="bg-tertiary p-4 mt-2 text-center">
                            No files yet
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Files;
