import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { IBoard } from "../../interfaces/boards.interface";
import Slide from "../Slide";
import {
    TRANSITION_ROTATION_CLASSES,
    transitionRotationClasses,
} from "../../constants/rotation-styles";
import {
    ICoachedClientCombinedProgress,
    IEightWeekProgress,
} from "../../interfaces/reports.interface";

interface Props {
    orientation: number;
    delay: number;
    selectedBoard?: IBoard;
    classNames?: string;
    isFullScreen: boolean;
    slideType: string;
    setSlideType: React.Dispatch<React.SetStateAction<string>>;
    combinedProgress?: ICoachedClientCombinedProgress | undefined;
    eightWeekProgress?: IEightWeekProgress | undefined;
}

const Slideshow: React.FC<Props> = ({
    delay,
    selectedBoard,
    classNames,
    orientation,
    isFullScreen,
    slideType,
    setSlideType,
    combinedProgress,
    eightWeekProgress,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const orientationClass: Record<string, string> = {
        "16:9 horizontal": "aspect-[16/9]",
        "16:9 vertical": "aspect-[9/16]",
        "21:9 horizontal": "aspect-[21/9]",
        "21:9 vertical": "aspect-[9/21]",
    };

    const photos = [];

    if (
        selectedBoard?.attributes?.photos &&
        selectedBoard?.attributes?.types?.includes("Photos")
    ) {
        photos.push(
            ...selectedBoard.attributes.photos.map((photo) => ({
                type: "Photos",
                data: photo,
            }))
        );
    }

    const dynamicSlides = [];

    if (selectedBoard?.attributes?.types) {
        dynamicSlides.push(
            ...selectedBoard.attributes.types
                .filter((type) => type !== "Photos")
                .map((type) => ({ type, data: {} }))
        );
    }

    const photos_in_between = selectedBoard?.attributes?.photos_in_between ?? 0;

    const slides: any[] = [];
    if (photos_in_between && photos.length > photos_in_between) {
        let dynamicIndex = 0;

        for (let i = 0; i < photos.length; i++) {
            slides.push(photos[i]);

            if (
                (i + 1) % photos_in_between === 0 &&
                dynamicIndex < dynamicSlides.length
            ) {
                slides.push(dynamicSlides[dynamicIndex]);
                dynamicIndex = (dynamicIndex + 1) % dynamicSlides.length;
            }
        }

        if (
            photos.length > 0 &&
            slides[slides.length - 1].type === "Photos" &&
            dynamicIndex < dynamicSlides.length
        ) {
            slides.push(dynamicSlides[dynamicIndex]);
        }
    } else {
        slides.push(...photos);
        slides.push(...dynamicSlides);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % (slides.length ?? 0));
        }, delay);

        return () => clearInterval(interval);
    }, [currentSlide, delay, slides.length ?? 0]);

    const transitionStyles: {
        [key: string]: {
            initial: { [key: string]: string | number };
            animate: { [key: string]: string | number };
            exit: { [key: string]: string | number };
        };
    } = {
        None: { initial: {}, animate: {}, exit: {} },
        Fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
        "Slide Up": {
            initial: {
                y: "100%",
                opacity: 0,
            },
            animate: { y: "0%", opacity: 1 },
            exit: { y: "-100%", opacity: 0 },
        },
        "Slide Down": {
            initial: { y: "-100%", opacity: 0 },
            animate: { y: "0%", opacity: 1 },
            exit: { y: "100%", opacity: 0 },
        },
        "Slide Left": {
            initial: { x: "100%", opacity: 0 },
            animate: { x: "0%", opacity: 1 },
            exit: { x: "-100%", opacity: 0 },
        },
        "Slide Right": {
            initial: { x: "-100%", opacity: 0 },
            animate: { x: "0%", opacity: 1 },
            exit: { x: "100%", opacity: 0 },
        },
    };

    useEffect(() => {
        setSlideType(slides[currentSlide]?.type);
    }, [currentSlide]);

    return (
        <div
            className={`relative ${
                orientationClass[
                    selectedBoard?.attributes?.ratio_format ??
                        ("16:9 horizontal" as string)
                ]
            } ${classNames}`}
        >
            {slides.map((slide, index) => (
                <Transition
                    show={index === currentSlide}
                    key={index}
                    as={motion.div}
                    initial={
                        transitionStyles[
                            selectedBoard?.attributes?.slide_transition ??
                                "None"
                        ].initial
                    }
                    animate={
                        transitionStyles[
                            selectedBoard?.attributes?.slide_transition ??
                                "None"
                        ].animate
                    }
                    exit={
                        transitionStyles[
                            selectedBoard?.attributes?.slide_transition ??
                                "None"
                        ].exit
                    }
                    className={
                        transitionRotationClasses(slide?.type === "Photos")[
                            orientation
                        ]
                    }
                >
                    <Slide
                        isFullScreen={isFullScreen}
                        orientation={orientation}
                        data={slide}
                        type={slide?.type}
                        combinedProgress={combinedProgress}
                        eightWeekProgress={eightWeekProgress}
                    />
                </Transition>
            ))}
        </div>
    );
};

export default Slideshow;
