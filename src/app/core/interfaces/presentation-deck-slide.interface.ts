import { IForm } from "./forms.interface";

export type PresentationDeckSlideType = "form" | "free_text" | "image" | "yes_no"

export interface IPresentationDeckSlide {
	type: string;
	id: any;
	attributes: {
		order: number;
		content: string;
		slide_image: string;
		no_option_slide?: number;
		yes_option_slide?: number;
		type: PresentationDeckSlideType;
	}
	relationships: {
		form?: IForm;
	}
}

export interface PresentationDeckSlide {
	id?: number;
	order: number;
	content?: string;
	slide_image?: string;
	form_id?: number;
	no_option_slide?: number;
	yes_option_slide?: number;
	type: PresentationDeckSlideType;
}

export interface CreatePresentationDeckSlidesParam {
	id?: any;
	slides: PresentationDeckSlide[];
}