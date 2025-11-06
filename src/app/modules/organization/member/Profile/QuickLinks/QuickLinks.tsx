import { useEffect, useState } from "react";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import QuickLink from "../components/QuickLink";
import Modal from "../../../../../core/components/Modal";
import CreateQuickLinkForm from "./CreateQuickLinksForm";
import { mapDispatchToProps } from "../../../../../core/state/reducer/quick-links";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { IQuickLink } from "../../../../../core/interfaces/quick-links.interface";

const QuickLinks = () => {
    const { id } = useParams();

    const [isOpenCreateQuickLinkModal, setIsOpenCreateQuickLinkModal] =
        useState(false);
    const [selectedQuickLink, setSelectedQuickLink] = useState<any>();
    const [page, setPage] = useState(1);

    const { getQuickLinks, deleteQuickLink } = mapDispatchToProps();
    const { loading: createQuickLinkLoading, success: createQuickLinkSuccess } =
        useSelector((state: RootState) => state.quickLinks.createQuickLink);
    const { loading: updateQuickLinkLoading, success: updateQuickLinkSuccess } =
        useSelector((state: RootState) => state.quickLinks.updateQuickLink);

    const { loading: getQuickLinksLoading, data: getQuickLinksData } =
        useSelector((state: RootState) => state.quickLinks.getQuickLinks);

    const { data } = useSelector((state: RootState) => state.auth.user);

    const fetch = async () => {
        if (data?.relationships?.organization?.id) {
            getQuickLinks({
                organization_id: data?.relationships?.organization?.id,
                query: {
                    page,
                },
            });
        }
    };

    useEffect(() => {
        if (!createQuickLinkLoading && createQuickLinkSuccess) {
            setIsOpenCreateQuickLinkModal(false);
        }
    }, [createQuickLinkLoading]);

    useEffect(() => {
        if (!updateQuickLinkLoading && updateQuickLinkSuccess) {
            setIsOpenCreateQuickLinkModal(false);
        }
    }, [updateQuickLinkLoading]);

    useEffect(() => {
        fetch();
    }, []);

    const handleEdit = (quickLink: IQuickLink) => {
        setSelectedQuickLink(quickLink);
        setIsOpenCreateQuickLinkModal(true);
    };

    const handleDelete = (quickLink: IQuickLink) => {
        if (id)
            deleteQuickLink({
                organization_id: data?.relationships?.organization?.id,
                id: quickLink.id,
            });
    };

    return (
        <div className="bg-white shadow-md rounded-md p-6 mt-4 h-1/6">
            <Modal
                isOpen={isOpenCreateQuickLinkModal}
                onClose={() => setIsOpenCreateQuickLinkModal(false)}
            >
                <CreateQuickLinkForm
                    organizationId={data?.relationships?.organization?.id}
                    selectedQuickLink={selectedQuickLink}
                />
            </Modal>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">Quick Links </h1>
                <KebabDropdown
                    orientation="horizontal"
                    lists={[
                        {
                            label: "Create quick link",
                            action: () => {
                                setSelectedQuickLink(undefined);
                                setIsOpenCreateQuickLinkModal(true);
                            },
                        },
                    ]}
                />
            </div>
            <hr />
            {getQuickLinksLoading && <Skeleton className="my-2" count={2} />}
            {!getQuickLinksLoading &&
            getQuickLinksData?.data &&
            getQuickLinksData?.data?.length > 0 ? (
                <div className=" overflow-auto h-4/5">
                    {getQuickLinksData?.data?.map((quickLink, idx) => {
                        const id = data?.id;
                        const isShowOptions = true;
                        // const isShowOptions =
                        //     quickLink?.relationships?.user?.id == id;

                        return (
                            <QuickLink
                                key={idx}
                                handleEdit={() => handleEdit(quickLink)}
                                handleDelete={() => handleDelete(quickLink)}
                                isShowOptions={isShowOptions}
                                title={quickLink?.attributes?.title}
                                description={quickLink?.attributes?.description}
                                url={quickLink?.attributes?.url}
                                createdAt={quickLink?.attributes?.created_at}
                            />
                        );
                    })}
                </div>
            ) : (
                <>
                    {getQuickLinksData?.data?.length === 0 && (
                        <div className="bg-tertiary p-4 mt-2 text-center">
                            No quick links yet
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuickLinks;
