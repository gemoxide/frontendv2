import { ISettings } from "../../interfaces/settings.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Settings {
    getSettings: GetSettings;
}

export type GetSettings = LoadingResult & {
    data?: ISettings;
};
