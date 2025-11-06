import { useEffect, useMemo, useState } from "react";
import { mapDispatchToProps } from "../../../core/state/reducer/boards";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import Section from "../../../core/components/Section";
import { PermissionType } from "../../../core/interfaces/routes.interface";
import Input from "../../../core/components/Forms/Input";
import Filter from "../../../core/components/Filter";
import KebabDropdown from "../../../core/components/KebabDropdown";
import Modal from "../../../core/components/Modal";
import { IBoard } from "../../../core/interfaces/boards.interface";
import CustomDataTable from "../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component";
import { confirmDelete } from "../../../core/helpers/prompt";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import BoardForm from "./BoardForm";
import Slideshow from "../../../core/components/Slideshow";

import { mapDispatchToProps as mapDispatchToReportProps } from "../../../core/state/reducer/reports";

const Boards: React.FC = () => {
    const [slideType, setSlideType] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
    const [isSlideShowOpen, setIsSlideShowOpen] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState<IBoard>();
    const [sortDirection, setSortDirection] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [hasPhotos, setHasPhotos] = useState(false);
    const [orientation, setOrientation] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const { getBoards, deleteBoard } = mapDispatchToProps();
    const { getCoachedClientCombinedProgress, getEightWeekProgress } =
        mapDispatchToReportProps();

    const { data: coachedClientCombinedProgressData } = useSelector(
        (state: RootState) => state.reports.getCoachedClientCombinedProgress
    );

    const { data: eightWeekProgressData } = useSelector(
        (state: RootState) => state.reports.getEightWeekProgress
    );

    const { data, loading } = useSelector(
        (state: RootState) => state.boards.getBoards
    );

    const { loading: createLoading, success: createSuccess } = useSelector(
        (state: RootState) => state.boards.createBoard
    );

    const { loading: updateLoading, success: updateSuccess } = useSelector(
        (state: RootState) => state.boards.updateBoard
    );

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    useEffect(() => {
        if (!updateLoading && updateSuccess) {
            setIsCreateBoardModalOpen(false);
            fetch();

        }
    }, [updateLoading, updateSuccess]);

    useEffect(() => {
        if (!createLoading && createSuccess) {
            setIsCreateBoardModalOpen(false);
            fetch();
        }
    }, [createLoading, createSuccess]);

    const updateOrientation = () => {
        if (orientation === 3) {
            setOrientation(0);
        } else {
            setOrientation(orientation + 1);
        }
    };

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const handleSort = async (column: any, sortDirection: string) => {
        if (column?.sortField) setOrderBy(column?.sortField?.toLowerCase());
        if (sortDirection) setSortDirection(sortDirection);
    };

    const fetch = async () => {
        getBoards({
            page,
            per_page: perPage,
            search,
            order_by: orderBy,
            direction: sortDirection,
        });
    };

    useEffect(() => {
        const getBoardsDebounce = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getBoardsDebounce);
    }, [page, perPage, search, orderBy, sortDirection, search]);

    const hasUpdateBoard = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.BOARD_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteBoard = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.BOARD_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const hasCreateBoard = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.BOARD_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const handlePlayBoard = (board: IBoard) => () => {
        setSelectedBoard(board);
        setIsSlideShowOpen(true);
    };

    const handleFullScreen = () => {
        const test = document.querySelector(".custom-fullscreen");
        if (test) {
            test.requestFullscreen();
        }
    };

    //detect if in full screen
    useEffect(() => {
        const handler = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handler);

        return () => {
            document.removeEventListener("fullscreenchange", handler);
        };
    }, []);

    useEffect(() => {
        getCoachedClientCombinedProgress();
        getEightWeekProgress();

        //1 day in milliseconds
        const day = 24 * 60 * 60 * 1000;

        const intervalId = setInterval(() => {
            getCoachedClientCombinedProgress();
            getEightWeekProgress();
        }, day);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const columns: TableColumn<IBoard>[] = [
        {
            name: "Name",
            cell: (board) => <span>{board?.attributes?.name}</span>,
            sortable: true,
            sortField: "name",
        },
        {
            name: "Boards",
            cell: (board) => (
                <div className="flex gap-x-2">
                    {board?.attributes?.types?.map((type, i) => (
                        <span
                            className="bg-[#C7EDFA] text-[#3A98B7] font-bold rounded-[100px] py-2 px-3"
                            key={i}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            ),
            minWidth: "40%",
            maxWidth: "-webkit-fill-available",
        },
        {
            name: "Ratio",
            sortable: true,
            cell: (board) => board?.attributes?.ratio_format,
        },
        {
            name: "Actions",
            sortable: true,
            cell: (board) => (
                <span role="button" onClick={handlePlayBoard(board)}>
                    <PlayCircleIcon className="w-10" />
                </span>
            ),
            width: "100px",
        },
        {
            name: "",
            sortable: false,
            maxWidth: "100px",
            cell: (board) => (
                <div className="w-full flex justify-end">
                    {(hasUpdateBoard || hasDeleteBoard) && (
                        <KebabDropdown
                            placement="top"
                            lists={[
                                ...(hasUpdateBoard
                                    ? [
                                          {
                                              label: "Edit Deck",
                                              action: () => {
                                                  setSelectedBoard(board);
                                                  setIsCreateBoardModalOpen(
                                                      true
                                                  );
                                              },
                                          },
                                      ]
                                    : []),
                                ...(hasDeleteBoard
                                    ? [
                                          {
                                              label: "Delete",
                                              action: async () => {
                                                  const { isConfirmed } =
                                                      await confirmDelete(
                                                          "Digital Board"
                                                      );
                                                  if (isConfirmed)
                                                      deleteBoard(board?.id);
                                              },
                                              isDanger: true,
                                          },
                                      ]
                                    : []),
                            ]}
                        />
                    )}
                </div>
            ),
        },
    ];

    return (
        <Section
            title="Digital Boards"
            {...(hasCreateBoard
                ? {
                      rightButtonLabel: "Create Digital Board",
                      rightButtonOnclick: () => {
                          setSelectedBoard(undefined);
                          setIsCreateBoardModalOpen(true);
                      },
                  }
                : {})}
        >
            <div className="shadow-lg rounded-md bg-white h-full p-8 mt-4">
                <div className="w-full flex gap-x-2">
                    <div className="flex-grow">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            name="search"
                            isNotFormHook
                            placeHolder={"Search here..."}
                            variant="secondary"
                            icon="search"
                        />
                    </div>
                    <div>
                        <Filter lists={[]} onFilter={() => {}} />
                    </div>
                    <div>
                        <KebabDropdown lists={[]} />
                    </div>
                </div>
                <Modal
                    modalContainerClassName={`${hasPhotos ? "w-3/4" : ""}`}
                    isOpen={isCreateBoardModalOpen}
                    onClose={() => {
                        setIsCreateBoardModalOpen(false);
                    }}
                >
                    <BoardForm
                        hasPhotos={hasPhotos}
                        selectedBoard={selectedBoard}
                        setHasPhotos={setHasPhotos}
                    />
                </Modal>

                <Modal
                    modalContainerClassName={`w-full max-h-screen h-auto ${
                        [
                            "Combined Coached Clients Data",
                            "In Just 8 Weeks",
                        ].includes(slideType) && "!bg-black"
                    }`}
                    isOpen={isSlideShowOpen}
                    onClose={() => {
                        setIsSlideShowOpen(false);
                    }}
                >
                    <div className="relative flex flex-col gap-y-2">
                        <div className="flex gap-x-2 self-end">
                            <span
                                role="button"
                                className="z-50 bg-gray-400 bg-opacity-900 text-white px-2 py-1 rounded-lg cursor-pointer font-bold"
                                onClick={updateOrientation}
                            >
                                Rotate
                            </span>
                            <span
                                role="button"
                                className="z-50 bg-gray-400 bg-opacity-900 text-white px-2 py-1 rounded-lg cursor-pointer font-bold"
                                onClick={handleFullScreen}
                            >
                                Enter Full Screen
                            </span>
                        </div>

                        <Slideshow
                            delay={
                                (selectedBoard?.attributes?.slide_delay ?? 5) *
                                1000
                            }
                            selectedBoard={selectedBoard}
                            orientation={orientation}
                            isFullScreen={isFullScreen}
                            slideType={slideType}
                            setSlideType={setSlideType}
                            classNames={`custom-fullscreen ${
                                isFullScreen ? "max-h-screen" : "max-h-[90vh]"
                            }`}
                            combinedProgress={
                                coachedClientCombinedProgressData?.data
                            }
                            eightWeekProgress={eightWeekProgressData?.data}
                        />
                    </div>
                </Modal>

                <div className="mt-8">
                    <CustomDataTable
                        loading={loading}
                        columns={columns}
                        data={data?.data || []}
                        pagination
                        paginationServer
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        paginationTotalRows={data?.meta?.total}
                        paginationPerPage={perPage}
                        onSort={handleSort}
                        isHideRowPerPage
                        sortServer
                    />
                </div>
            </div>
        </Section>
    );
};

export default Boards;
