import type { IMeta } from "./common.interface";

export interface IProduct {
  id: number;
  type: string;
  attributes: IProductAttributes;
  relationships: IProductRelationships;
}

export interface IProductAttributes {
  name: string;
  description: string;
}

export interface IProductRelationships {
  categories: unknown;
}

export interface IProductList {
  data: IProduct[];
  meta: IMeta;
}

export interface IProductCreate {
  name: string;
  description: string;
}

export interface IProductExportResponse {
  data: {
    download_url: string;
    filename: string;
  };
}
