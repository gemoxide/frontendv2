import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

type Props = {
    src: string;
    onRemove: VoidFunction;
    imageAlt?: string;
};

export const ImagePreview: FC<Props> = ({ src, onRemove, imageAlt = "" }) => {
    return (
        <div className="mt-2">
            <LazyLoadImage alt={imageAlt} effect="opacity" src={src} />
            <div className="relative">
                <a
                    href="#"
                    onClick={onRemove}
                    className="h-10 w-10 absolute right-0 bottom-0 bg-blue-600 text-white rounded-full p-2 mr-2 mb-2"
                >
                    <TrashIcon />
                </a>
            </div>
        </div>
    );
};
