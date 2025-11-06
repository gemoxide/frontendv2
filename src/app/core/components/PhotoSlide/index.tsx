import React from "react";
import { IMedia } from "../../interfaces/media.interface";

interface PhotoSlideProps {
    photo: IMedia;
    isFullScreen: boolean;
}

const PhotoSlide: React.FC<PhotoSlideProps> = ({ photo, isFullScreen }) => {
    const bgStyle: React.CSSProperties = {
        backgroundImage: `url(${photo.attributes.url})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vh",
        height: "140vh",
    };

    return (
        <div className={`relative block h-full w-full`} style={bgStyle}></div>
    );
};

export default PhotoSlide;
