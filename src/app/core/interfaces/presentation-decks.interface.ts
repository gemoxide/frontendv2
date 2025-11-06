import { IMeta, IMetaQuery } from "./common.interface";
import { IPresentationDeckSlide } from "./presentation-deck-slide.interface";

export interface IPresentationDeck {
    type: string;
    id: any;
    attributes: {
        name: string;
        description?: string;
        is_active: boolean;
        deck_type?: string;
        type: "admin" | "org" | "gym";
        is_admin_active: boolean;
        presentation_deck_slides_count: number;
    };
    relationships: {
        presentation_deck_slides?: IPresentationDeckSlide[];
    };
}

export interface IPresentationDeckResponse {
    data: IPresentationDeck[];
    meta: IMeta;
}

export interface CreatePresentationDeckParam {
    id?: any;
    name: string;
    description?: string;
    is_active?: boolean;
    deck_type?: string;
}

export interface GetPresentationDeckParam {
    id: string;
    params?: {
        include?: string;
    };
}

export interface UpdatePresentationDeckStatusParam {
    id?: any;
    is_active: boolean;
}

export interface GetPresentationDecksQuery extends IMetaQuery {
    is_active?: boolean;
    include?: string;
}
