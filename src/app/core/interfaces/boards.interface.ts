import { IMeta } from "./common.interface";
import { IMedia } from "./media.interface";

export interface IBoard {
    type: string;
    id: number;
    attributes: {
        name: string;
        slide_delay: number;
        photos_in_between: number;
        slide_transition: string;
        types: string[];
        ratio_format: string;
        photos?: IMedia[];
    };
    relationships: any;
}

export interface IBoardResponse {
    data: IBoard[];
    meta: IMeta;
}

export type CreateBoardParam = {
    id?: number;
    name: string;
    slide_delay?: number;
    photos_in_between?: number;
    slide_transition: string;
    types: string[];
    ratio_format: string;
    // photos?: File[];
};
