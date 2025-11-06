import BreadCrumbs from "../../../core/components/BreadCrumbs";
import CustomDataTable from "../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component";
import {
  IProduct,
  IProductExportResponse,
  IProductList,
} from "../../../core/interfaces/products.interface";
import { useEffect, useState } from "react";
import {
  deleteProductRequest,
  exportProductsInExcelRequest,
  exportProductsInPdfRequest,
  getProductsRequest,
} from "../../../core/services/product/product.service";
import KebabDropdown from "../../../core/components/KebabDropdown";
import { confirmDelete } from "../../../core/helpers/prompt";
import { toast } from "react-toastify";
import Input from "../../../core/components/Forms/Input";
import Button from "../../../core/components/Button";
import Modal from "../../../core/components/Modal";
import Form from "./Form";
import {
  downloadFile,
  downloadFileFromUrl,
} from "../../../core/helpers/download-file";
const AdminDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [data, setData] = useState<IProductList>();
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [exportLoading, setExportLoading] = useState<boolean>(false);

  const handleDeleteProduct = async (product: IProduct) => {
    try {
      const { isConfirmed } = await confirmDelete("Product");
      if (isConfirmed) {
        await deleteProductRequest(product.id);
        toast.success("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  const handleShowModal = (isEdit: boolean) => {
    setShowModal(true);
    setIsEdit(isEdit);
  };

  const columns: TableColumn<IProduct>[] = [
    {
      name: "ID",
      cell: (product) => product?.id,
    },
    {
      name: "Name",
      cell: (product) => product?.attributes?.name,
      sortable: true,
    },
    {
      name: "Description",
      cell: (product) => product?.attributes?.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (product) => (
        <div className="flex items-center gap-2">
          <KebabDropdown
            placement="top"
            orientation="horizontal"
            lists={[
              {
                label: "Edit",
                action: () => {
                  setShowModal(true);
                  setIsEdit(true);
                  setSelectedProduct(product);
                },
              },
              {
                label: "Delete",
                action: () => handleDeleteProduct(product),
                isDanger: true,
              },
            ]}
          />
        </div>
      ),
      right: true,
    },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsRequest({
        page,
        per_page: perPage,
        search,
      });

      setData(response as unknown as IProductList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportProducts = async () => {
    try {
      setExportLoading(true);
      const { data } =
        (await exportProductsInPdfRequest()) as unknown as IProductExportResponse;
      if (data?.download_url) {
        downloadFileFromUrl(data.download_url, data.filename);
        toast.success("Products exported successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to export products");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportProductsExcel = async () => {
    try {
      setExportLoading(true);
      const { data } =
        (await exportProductsInExcelRequest()) as unknown as IProductExportResponse;
      if (data?.download_url) {
        downloadFileFromUrl(data.download_url, data.filename);
        toast.success("Products exported successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to export products excel");
    } finally {
      setExportLoading(false);
    }
  };

  useEffect(() => {
    const getProductsDebounce = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(getProductsDebounce);
  }, [page, perPage, search]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEdit ? "Edit Product" : "Create Product"}
      >
        <div className="w-full max-w-2xl mx-auto mt-4">
          <Form
            isEdit={isEdit}
            onClose={() => setShowModal(false)}
            loading={loading}
            product={selectedProduct}
            onSuccess={() => {
              fetchProducts();
              setShowModal(false);
              setSelectedProduct(undefined);
            }}
          />
        </div>
      </Modal>
      <BreadCrumbs keys={["Admin", "Dashboard"]} />
      <div className="p-4 card bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="flex items-center gap-2">
            <Button
              label="Add Product"
              onClick={() => {
                handleShowModal(false);
              }}
              className="mr-2"
              type="button"
              variant="primary"
            />
            <Button
              label="Export Products"
              onClick={() => {
                handleExportProducts();
              }}
              className="mr-2"
              type="button"
              variant="primary"
              isSubmitting={exportLoading}
            />
            <Button
              label="Export Products Excel"
              onClick={() => {
                handleExportProductsExcel();
              }}
              className="mr-2"
              type="button"
              variant="primary"
              isSubmitting={exportLoading}
            />
          </div>
          <Input
            placeHolder="Search"
            onChange={(e) => setSearch(e.target.value)}
            isNotFormHook
            name="search"
            icon="search"
            className="w-1/4"
          />
        </div>
        <CustomDataTable
          columns={columns}
          data={data?.data ?? []}
          pagination
          paginationServer
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          paginationTotalRows={data?.meta?.total || 0}
          paginationPerPage={perPage}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
