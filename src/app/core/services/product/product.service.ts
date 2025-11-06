import type { AxiosResponse } from "axios";
import httpClient from "../../clients/httpClient";
import type { IProductCreate } from "../../interfaces/products.interface";
import type { IMetaQuery } from "../../interfaces/common.interface";

export const getProductsRequest = (
  filter: IMetaQuery
): Promise<AxiosResponse> => {
  return httpClient.get(`/api/v1/products`, { params: filter });
};

export const getProductRequest = (id: number): Promise<AxiosResponse> => {
  return httpClient.get(`/api/v1/products/${id}`);
};

export const createProductRequest = (
  payload: IProductCreate
): Promise<AxiosResponse> => {
  return httpClient.post(`/api/v1/products`, payload);
};

export const updateProductRequest = (
  id: number,
  payload: IProductCreate
): Promise<AxiosResponse> => {
  return httpClient.put(`/api/v1/products/${id}`, payload);
};

export const deleteProductRequest = (id: number): Promise<AxiosResponse> => {
  return httpClient.delete(`/api/v1/products/${id}`);
};

export const exportProductsInPdfRequest = (): Promise<AxiosResponse> => {
  return httpClient.get(`/api/v1/products/export/pdf`);
};

export const exportProductsInExcelRequest = (): Promise<AxiosResponse> => {
  return httpClient.get(`/api/v1/products/export/excel`);
};
