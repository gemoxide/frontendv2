import { SLIDE_TYPES } from "../../constants/slide-types";

import PhotoSlide from "../PhotoSlide";
import EightWeeks from "../EightWeeks";
import CombinedCoached from "../CombinedCoached";
import {
    ROTATION_CLASSES,
    rotationClasses,
} from "../../constants/rotation-styles";
import {
    ICoachedClientCombinedProgress,
    IEightWeekProgress,
} from "../../interfaces/reports.interface";

interface Props {
    orientation: number;
    data: any;
    type: (typeof SLIDE_TYPES)[number];
    isFullScreen: boolean;
    combinedProgress?: ICoachedClientCombinedProgress;
    eightWeekProgress?: IEightWeekProgress;
}

const Slide: React.FC<Props> = ({
    orientation,
    data,
    type,
    isFullScreen,
    combinedProgress,
    eightWeekProgress,
}) => {
    let content;
    switch (type) {
        case "Photos":
            content = (
                <PhotoSlide
                    key={data.id}
                    photo={data.data}
                    isFullScreen={isFullScreen}
                />
            );
            break;

        case "In Just 8 Weeks":
            content = <EightWeeks eightWeekProgress={eightWeekProgress} />;
            break;
        case "Combined Coached Clients Data":
            content = <CombinedCoached combinedProgress={combinedProgress} />;
            break;
    }

    return (
        <div
            className={`${
                rotationClasses(
                    isFullScreen,
                    type === "Combined Coached Clients Data"
                )[orientation]
            } flex justify-center items-center h-screen w-screen bg-black`}
        >
            {content}
        </div>
    );
};

export default Slide;
