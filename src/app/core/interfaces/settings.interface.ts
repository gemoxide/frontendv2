interface LooseObject {
    [key: string]: any;
}
export interface ISettings {
    lead_management_actions: LooseObject;
    coaching_assessment_data_options: LooseObject;
}

export interface ISettingsResponse {
    data: ISettings;
}
