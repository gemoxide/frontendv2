import { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";

import Image from "../../../../../../../assets/icons/image.svg";
import Text from "../../../../../../../assets/icons/text.svg";
import Form from "../../../../../../../assets/icons/form.svg";
import YesNo from "../../../../../../../assets/icons/yes-no.svg";

interface Props {
    index: number;
    id: number;
    isSelected: boolean;
    type: string;
    handleSelectSlide: () => void;
    handleRemoveSlide: () => void;
    moveSlide: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const typeToImage: { [key: string]: JSX.Element } = {
    form: <img src={Form} alt="Form" />,
    free_text: <img src={Text} alt="Text" />,
    image: <img src={Image} alt="Image" />,
    yes_no: <img src={YesNo} alt="Yes/No" />,
};

const SlideCard: React.FC<Props> = ({
    id,
    index,
    isSelected,
    type,
    handleSelectSlide,
    handleRemoveSlide,
    moveSlide,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "slide",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            //     return;
            // }

            // Time to actually perform the action
            moveSlide(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "slide",
        item: () => {
            return { id, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? "opacity-0" : "opacity-100";
    drag(drop(ref));

    return (
        <div
            className={`relative min-h-[6rem] flex items-center ${opacity}`}
            ref={ref}
            data-handler-id={handlerId}
        >
            <div
                className={`min-w-[5rem] w-20 min-h-[5rem] h-20 rounded-md bg-white flex items-center justify-center drop-shadow-sm hover:border-4 hover:border-primary hover:border-solid ${
                    isSelected ? "border-4 border-primary border-solid " : ""
                }`}
                onClick={handleSelectSlide}
            >
                <div className="w-16 h-16 rounded-md bg-tertiary flex items-center justify-center relative">
                    {typeToImage[type]}
                    <span
                        id="counter-index"
                        className="absolute bottom-0 left-1 text-base font-semibold"
                    >
                        {index + 1}
                    </span>
                </div>
            </div>
            <div
                className="absolute bg-red-800 h-4 w-4 p-0.5 rounded-full right-[-6px] top-1 cursor-pointer"
                onClick={handleRemoveSlide}
            >
                <XMarkIcon fill="white" />
            </div>
        </div>
    );
};

export default SlideCard;
