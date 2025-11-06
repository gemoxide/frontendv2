import httpClient from "../../clients/httpClient";

export const getSettingsRequest = () => {
    return httpClient.get("/api/v1/settings");
};
