import { useState, useEffect, Fragment } from "react";
import _ from "lodash";
import update from "immutability-helper";
import { useParams } from "react-router-dom";
import Section from "../../../../core/components/Section";
import SlideCard from "../components/SlideCard";
import AddSlide from "../components/AddSlide";
import { mapDispatchToProps } from "../../../../core/state/reducer/presentation-decks";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import { PresentationDeckSlide } from "../../../../core/interfaces/presentation-deck-slide.interface";
import PresentationSlideContent from "../components/PresentationSlideContent";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

import { toast } from "react-toastify";

const CreatePresentationDeckSlides: React.FC = () => {
    const params = useParams();
    const [slides, setSlides] = useState<PresentationDeckSlide[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const {
        data,
        loading: getPresentationDeckLoading,
        success: getPresentationDeckSuccess,
    } = useSelector(
        (state: RootState) => state.presentationDecks.getPresentationDeck
    );

    const {
        loading: createPresentationDeckSlidesLoading,
        success: createPresentationDeckSlidesSuccess,
    } = useSelector(
        (state: RootState) =>
            state.presentationDecks.createPresentationDeckSlides
    );

    const { getPresentationDeck, createPresentationDeckSlides } =
        mapDispatchToProps();

    const fetch = async () => {
        getPresentationDeck({
            id: params?.id || "",
            params: {
                include: "presentationDeckSlides,form",
            },
        });
    };

    const handleSaveSlides = (
        source: string,
        newSlides?: PresentationDeckSlide[]
    ) => {
        createPresentationDeckSlides({
            id: data?.id,
            slides: newSlides ?? slides,
        });
        if (source === "save") toast.success("Slide saved successfully");
    };

    useEffect(() => {
        if (!getPresentationDeckLoading && getPresentationDeckSuccess && data) {
            const deckSlides =
                data?.relationships?.presentation_deck_slides || [];

            const tempSlides = deckSlides?.length
                ? deckSlides.map((slide, i) => {
                      const mappedSlide = {
                          id: slide?.id || "",
                          content: slide?.attributes?.content || undefined,
                          slide_image:
                              slide?.attributes?.slide_image || undefined,
                          form_id: slide?.relationships?.form?.id || undefined,
                          order: slide?.attributes?.order || "",
                          no_option_slide:
                              slide?.attributes?.no_option_slide || undefined,
                          yes_option_slide:
                              slide?.attributes?.yes_option_slide || undefined,
                          type: slide?.attributes?.type || "free_text",
                      } as PresentationDeckSlide;

                      return mappedSlide;
                  })
                : [{ type: "free_text", order: 1 } as PresentationDeckSlide];

            setSlides(tempSlides);
        }
    }, [getPresentationDeckLoading, getPresentationDeckSuccess, data]);

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if (
            !createPresentationDeckSlidesLoading &&
            createPresentationDeckSlidesSuccess
        ) {
            fetch();
        }
    }, [createPresentationDeckSlidesLoading]);

    const updateSlideOrders = (newSlides: PresentationDeckSlide[]) => {
        const tempSlides: PresentationDeckSlide[] = newSlides.map(
            (slide, i) => ({
                ...slide,
                order: i + 1,
            })
        );
        setSlides(tempSlides);
        handleSaveSlides("update", tempSlides);
    };

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        const tempSlides: PresentationDeckSlide[] = update(slides, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, slides[dragIndex]],
            ],
        });

        updateSlideOrders(tempSlides);
    };

    const addNewSlide = (index: number) => {
        const tempSlides = [
            ...slides.slice(0, index),
            { type: "free_text" } as PresentationDeckSlide,
            ...slides.slice(index),
        ];
        updateSlideOrders(tempSlides);
    };

    const handleSelectSlide = (index: number) => {
        const tempSlides = slides.map((slide, i) => {
            if (i === index) {
                return {
                    ...slide,
                };
            }
            return {
                ...slide,
            };
        });
        setSelectedIndex(index);
        setSlides(tempSlides);
        handleSaveSlides("select", tempSlides);
    };

    const handleUpdateSelectedSlide = (
        newSlide: Partial<PresentationDeckSlide>
    ) => {
        const tempSlides = slides.map((slide, i) => {
            if (i === selectedIndex) {
                const updatedSlide = {
                    id: slide.id,
                    content: newSlide.content ?? slide.content,
                    slide_image: newSlide.slide_image ?? slide.slide_image,
                    form_id: newSlide.form_id ?? slide.form_id,
                    order: slide.order,
                    no_option_slide:
                        newSlide.no_option_slide ?? slide.no_option_slide,
                    yes_option_slide:
                        newSlide.yes_option_slide ?? slide.yes_option_slide,
                    type: newSlide.type ?? slide.type,
                } as PresentationDeckSlide;
                return updatedSlide;
            }
            return slide;
        });

        setSlides(tempSlides);
    };

    const handleRemoveSlide = (index: number) => {
        const tempSlides = slides.filter((slide, i) => i !== index);
        const slide = tempSlides[index];
        setSelectedIndex(slide ? index : index - 1);
        updateSlideOrders(tempSlides);
    };

    return (
        <Section
            title={data?.attributes.name}
            rightButtonLabel="Save"
            rightButtonOnclick={() => {
                handleSaveSlides("save");
            }}
        >
            <div className="flex overflow-x-auto slide-card-container">
                <DndProvider options={HTML5toTouch}>
                    {slides.map((slide, i) => {
                        return (
                            <Fragment key={i}>
                                <SlideCard
                                    index={i}
                                    id={slide.id || 0}
                                    isSelected={i === selectedIndex}
                                    type={slide.type}
                                    handleSelectSlide={() =>
                                        handleSelectSlide(i)
                                    }
                                    handleRemoveSlide={() =>
                                        handleRemoveSlide(i)
                                    }
                                    moveSlide={moveSlide}
                                />
                                <AddSlide
                                    isLast={i === slides.length - 1}
                                    onClick={() => addNewSlide(i + 1)}
                                />
                            </Fragment>
                        );
                    })}
                </DndProvider>
            </div>
            {slides.map((slide, i) => {
                return (
                    <PresentationSlideContent
                        isSelected={i === selectedIndex}
                        slide={slide}
                        handleUpdateSelectedSlide={handleUpdateSelectedSlide}
                        key={i}
                        isLoading={getPresentationDeckLoading}
                    />
                );
            })}
        </Section>
    );
};

export default CreatePresentationDeckSlides;
