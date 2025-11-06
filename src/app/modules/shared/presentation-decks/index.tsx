import { useEffect, useMemo, useState } from "react";
import truncate from "lodash/truncate";
import Input from "../../../core/components/Forms/Input";
import Section from "../../../core/components/Section";
import Filter from "../../../core/components/Filter";
import { TableColumn } from "react-data-table-component";
import { IPresentationDeck } from "../../../core/interfaces/presentation-decks.interface";
import KebabDropdown from "../../../core/components/KebabDropdown";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/presentation-decks";
import CustomDataTable from "../../../core/components/DataTable";
import IsActive from "./components/IsActive";
import Modal from "../../../core/components/Modal";
import CreatePresentationDeckForm from "./components/CreatePresentationDeckForm/CreatePresentationDeckForm";
import { confirmDelete } from "../../../core/helpers/prompt";
import { PermissionType } from "../../../core/interfaces/routes.interface";

const PresentationDecks: React.FC = () => {
    const [search, setSearch] = useState("");
    const [isActive, setIsActive] = useState<undefined | boolean>();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [
        isOpenCreatePresentationDeckModal,
        setIsOpenCreatePresentationDeckModal,
    ] = useState(false);
    const [sortDirection, setSortDirection] = useState<string | undefined>();
    const [selectedPresentationDeck, setSelectedPresentationDeck] =
        useState<IPresentationDeck>({} as IPresentationDeck);
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const navigate = useNavigate();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data, loading } = useSelector(
        (state: RootState) => state.presentationDecks.getPresentationDecks
    );

    const {
        getPresentationDecks,
        deletePresentationDeck,
        resetCreatePresentationDeck,
        clonePresentationDeck,
    } = mapDispatchToProps();

    const {
        loading: deletePresentationDeckLoading,
        success: deletePresentationDeckSuccess,
    } = useSelector(
        (state: RootState) => state.presentationDecks.deletePresentationDeck
    );

    const {
        loading: clonePresentationDeckLoading,
        success: clonePresentationDeckSuccess,
    } = useSelector(
        (state: RootState) => state.presentationDecks.clonePresentationDeck
    );

    const {
        data: createPresentationDeckData,
        loading: createPresentationDeckLoading,
        success: createPresentationDeckSuccess,
    } = useSelector(
        (state: RootState) => state.presentationDecks.createPresentationDeck
    );

    const {
        loading: updatePresentationDeckLoading,
        success: updatePresentationDeckSuccess,
    } = useSelector(
        (state: RootState) => state.presentationDecks.updatePresentationDeck
    );

    const fetch = async () => {
        getPresentationDecks({
            page,
            search,
            per_page: perPage,
            order_by: orderBy,
            direction: sortDirection,
            is_active: isActive,
        });
    };

    useEffect(() => {
        const getPresentationDecks = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getPresentationDecks);
    }, [page, perPage, orderBy, sortDirection, search, isActive]);

    useEffect(() => {
        if (!deletePresentationDeckLoading && deletePresentationDeckSuccess) {
            fetch();
        }
    }, [deletePresentationDeckLoading]);

    useEffect(() => {
        if (!updatePresentationDeckLoading && updatePresentationDeckSuccess) {
            setIsOpenCreatePresentationDeckModal(false);
            fetch();
        }
    }, [updatePresentationDeckLoading]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const handleFilter = (values: { is_active: "all" | number | "" }) => {
        setIsActive(
            values.is_active === "all" || values.is_active === ""
                ? undefined
                : !!Number(values.is_active)
        );
    };

    const handleSort = async (column: any, sortDirection: string) => {
        if (column?.sortField) setOrderBy(column?.sortField?.toLowerCase());
        if (sortDirection) setSortDirection(sortDirection);
    };

    const hasCreatePresentationDeck = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.PRESENTATION_DECK_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasUpdatePresentationDeck = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.PRESENTATION_DECK_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeletePresentationDeck = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.PRESENTATION_DECK_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const hasCreatePresentationDeckSlides = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.PRESENTATION_DECK_SLIDE_CREATE
            );
        }
        return false;
    }, [currentUser]);

    useEffect(() => {
        if (!createPresentationDeckLoading && createPresentationDeckSuccess) {
            resetCreatePresentationDeck();
            setIsOpenCreatePresentationDeckModal(false);
            if (hasCreatePresentationDeckSlides) {
                navigate(
                    currentUser?.attributes.type === "admin"
                        ? ROUTES.ADMIN.deckSlides.parse(
                              createPresentationDeckData?.id
                          )
                        : ROUTES.USER.deckSlides.parse(
                              createPresentationDeckData?.id
                          )
                );
            }

            fetch();
        }
    }, [createPresentationDeckLoading]);

    const columns: TableColumn<IPresentationDeck>[] = [
        {
            name: "Name",
            cell: (deck) => <span>{deck?.attributes?.name}</span>,
            width: "30%",
            sortable: true,
            sortField: "name",
        },
        {
            name: "Description",
            sortable: true,
            sortField: "description",
            cell: (deck) =>
                truncate(deck?.attributes?.description, { length: 30 }),
        },
        {
            name: "# Slides",
            sortable: true,
            cell: (deck) => deck?.attributes?.presentation_deck_slides_count,
        },
        {
            name:
                currentUser?.attributes.type === "admin"
                    ? "Add to Global Library"
                    : "Active",
            sortable: true,
            cell: (deck) => deck && <IsActive deck={deck} />,
        },
        {
            name: "",
            sortable: false,
            cell: (deck) => {
                if (
                    currentUser?.relationships?.user_gyms?.length &&
                    deck?.attributes?.type !== "gym"
                ) {
                    return (
                        <div className="w-full flex justify-end">
                            {hasCreatePresentationDeck && (
                                <KebabDropdown
                                    placement="top"
                                    lists={[
                                        {
                                            label: "Clone Deck",
                                            action: () =>
                                                clonePresentationDeck(deck.id),
                                        },
                                    ]}
                                />
                            )}
                        </div>
                    );
                }
                if (
                    !currentUser?.relationships?.user_gyms?.length &&
                    currentUser?.attributes?.type !== "admin" &&
                    deck?.attributes?.type !== "org"
                ) {
                    return (
                        <div className="w-full flex justify-end">
                            {hasCreatePresentationDeck && (
                                <KebabDropdown
                                    placement="top"
                                    lists={[
                                        {
                                            label: "Clone Deck",
                                            action: () =>
                                                clonePresentationDeck(deck.id),
                                        },
                                    ]}
                                />
                            )}
                        </div>
                    );
                }
                return (
                    <div className="w-full flex justify-end">
                        {(hasCreatePresentationDeck ||
                            hasCreatePresentationDeckSlides ||
                            hasUpdatePresentationDeck ||
                            hasDeletePresentationDeck) && (
                            <KebabDropdown
                                placement="top"
                                lists={[
                                    ...(hasCreatePresentationDeck
                                        ? [
                                              {
                                                  label: "Clone Deck",
                                                  action: () =>
                                                      clonePresentationDeck(
                                                          deck.id
                                                      ),
                                              },
                                          ]
                                        : []),
                                    ...(hasCreatePresentationDeckSlides
                                        ? [
                                              {
                                                  label: "Manage Deck",
                                                  action: () => {
                                                      navigate(
                                                          currentUser
                                                              ?.attributes
                                                              .type === "admin"
                                                              ? ROUTES.ADMIN.deckSlides.parse(
                                                                    deck.id
                                                                )
                                                              : ROUTES.USER.deckSlides.parse(
                                                                    deck.id
                                                                )
                                                      );
                                                  },
                                              },
                                          ]
                                        : []),
                                    ...(hasUpdatePresentationDeck
                                        ? [
                                              {
                                                  label: "Edit Deck",
                                                  action: () => {
                                                      setSelectedPresentationDeck(
                                                          deck
                                                      );
                                                      setIsOpenCreatePresentationDeckModal(
                                                          true
                                                      );
                                                  },
                                              },
                                          ]
                                        : []),
                                    ...(hasDeletePresentationDeck
                                        ? [
                                              {
                                                  label: "Delete",
                                                  action: async () => {
                                                      const { isConfirmed } =
                                                          await confirmDelete(
                                                              "Presentation Deck"
                                                          );
                                                      if (isConfirmed)
                                                          deletePresentationDeck(
                                                              deck?.id
                                                          );
                                                  },
                                                  isDanger: true,
                                              },
                                          ]
                                        : []),
                                ]}
                            />
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <Section
            title="Presentation Decks"
            {...(hasCreatePresentationDeck
                ? {
                      rightButtonLabel: "Create Presentation Deck",
                      rightButtonOnclick: () => {
                          setSelectedPresentationDeck({} as IPresentationDeck);
                          setIsOpenCreatePresentationDeckModal(true);
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
                        <Filter
                            lists={[
                                {
                                    label: "Active Status",
                                    key: "is_active",
                                    options: [
                                        { label: "All", value: "all" },
                                        { label: "Active", value: 1 },
                                        { label: "Inactive", value: 0 },
                                    ],
                                },
                            ]}
                            onFilter={handleFilter}
                        />
                    </div>
                    <div>
                        <KebabDropdown lists={[]} />
                    </div>
                </div>
                <Modal
                    isOpen={isOpenCreatePresentationDeckModal}
                    onClose={() => setIsOpenCreatePresentationDeckModal(false)}
                >
                    <CreatePresentationDeckForm
                        selectedPresentationDeck={selectedPresentationDeck}
                    />
                </Modal>

                <div className="mt-8">
                    <CustomDataTable
                        loading={
                            loading ||
                            clonePresentationDeckLoading ||
                            updatePresentationDeckLoading
                        }
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

export default PresentationDecks;
