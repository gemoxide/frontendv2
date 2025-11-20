import { IProduct, IProductList } from "../interfaces/products.interface";
import { IMeta } from "../interfaces/common.interface";

/**
 * Creates a fake product for testing
 */
export const createFakeProduct = (overrides?: Partial<IProduct>): IProduct => {
  return {
    id: overrides?.id ?? Math.floor(Math.random() * 1000),
    type: overrides?.type ?? "product",
    attributes: {
      name:
        overrides?.attributes?.name ??
        `Test Product ${Math.floor(Math.random() * 1000)}`,
      description:
        overrides?.attributes?.description ??
        `Test Description ${Math.floor(Math.random() * 1000)}`,
    },
    relationships: overrides?.relationships ?? {
      categories: null,
    },
  };
};

/**
 * Creates multiple fake products for testing
 */
export const createMultipleFakeProducts = (count: number): IProduct[] => {
  return Array.from({ length: count }, (_, index) =>
    createFakeProduct({ id: index + 1 })
  );
};

/**
 * Creates a fake product list with pagination metadata
 */
export const createFakeProductList = (
  products?: IProduct[],
  meta?: Partial<IMeta>
): IProductList => {
  const defaultProducts = products ?? createMultipleFakeProducts(3);
  const defaultMeta: IMeta = {
    current_page: meta?.current_page ?? 1,
    from: meta?.from ?? 1,
    last_page: meta?.last_page ?? 1,
    per_page: meta?.per_page ?? 10,
    to: meta?.to ?? defaultProducts.length,
    total: meta?.total ?? defaultProducts.length,
  };

  return {
    data: defaultProducts,
    meta: defaultMeta,
  };
};
