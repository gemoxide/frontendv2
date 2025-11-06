import httpClient from "../../clients/httpClient";

export const getAssessmentsRequest = () => {
	return httpClient.get(`/api/v1/assessments`);
};

