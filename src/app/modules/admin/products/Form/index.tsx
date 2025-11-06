import React from "react";
import { IProduct } from "../../../../core/interfaces/products.interface";
import { FormikProvider, Form as FormikForm, useFormik } from "formik";
import { CreateProductSchema } from "../../../../core/services/product/products.schema";
import {
  createProductRequest,
  updateProductRequest,
} from "../../../../core/services/product/product.service";
import { toast } from "react-toastify";
import Button from "../../../../core/components/Button";
import Textarea from "../../../../core/components/Forms/TextArea";
import Input from "../../../../core/components/Forms/Input";
import { useState } from "react";

type Props = {
  isEdit: boolean;
  onClose?: () => void;
  loading: boolean;
  product?: IProduct;
  onSuccess?: () => void;
};

const Form: React.FC<Props> = ({
  isEdit,
  onClose,
  loading,
  product,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      name: product?.attributes?.name || "",
      description: product?.attributes?.description || "",
    },
    validationSchema: CreateProductSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        if (isEdit) {
          if (!product) return;
          const { data } = await updateProductRequest(product.id, values);
          toast.success("Product updated successfully");
          onSuccess?.();
        } else {
          const { data } = await createProductRequest(values);
          toast.success("Product created successfully");
          onSuccess?.();
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to create product");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full md:w-96 h-full flex items-center justify-center">
      <FormikProvider value={formik}>
        <FormikForm className="space-y-4 w-full">
          <Input
            label="Name"
            name="name"
            placeHolder="Enter name"
            autoComplete
            disabled={loading}
            variant="default"
          />
          <Textarea
            label="Description"
            name="description"
            placeHolder="Enter description"
            autoComplete
            disabled={loading}
            variant="default"
          />
          <Button
            type="submit"
            label="Save"
            className="w-full btn-md"
            onClick={formik?.submitForm}
            isSubmitting={isSubmitting}
          />
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default Form;
