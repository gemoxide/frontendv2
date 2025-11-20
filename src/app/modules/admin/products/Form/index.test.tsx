import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { mockAnimationsApi } from "jsdom-testing-mocks";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import Form from "./index";
import { createFakeProduct } from "../../../../core/fakers/product.faker";
import * as productService from "../../../../core/services/product/product.service";
import { toast } from "react-toastify";

// Mock dependencies
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../../../core/services/product/product.service");

describe("Product Form", () => {
  const mockHandleSuccess = vi.fn();
  const mockCreateProduct = vi.fn();
  const mockUpdateProduct = vi.fn();

  beforeEach(() => {
    mockAnimationsApi();

    // Setup mocks
    vi.mocked(productService.createProductRequest).mockImplementation(
      mockCreateProduct
    );
    vi.mocked(productService.updateProductRequest).mockImplementation(
      mockUpdateProduct
    );

    // Default successful responses
    mockCreateProduct.mockResolvedValue({ data: {} });
    mockUpdateProduct.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render the form for creating a product", async () => {
    const Wrapper = () => {
      return (
        <BrowserRouter>
          <Form isEdit={false} loading={false} onSuccess={mockHandleSuccess} />
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should render the form for editing a product", async () => {
    const product = createFakeProduct({
      id: 1,
      attributes: {
        name: "Test Product",
        description: "Test Description",
      },
    });

    const Wrapper = () => {
      return (
        <BrowserRouter>
          <Form
            isEdit={true}
            loading={false}
            product={product}
            onSuccess={mockHandleSuccess}
          />
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText(
      "Enter name"
    ) as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe("Test Product");

    const descriptionInput = screen.getByPlaceholderText(
      "Enter description"
    ) as HTMLTextAreaElement;
    expect(descriptionInput.value).toBe("Test Description");
  });

  it("should fill and submit the form for creating a product", async () => {
    const Wrapper = () => {
      return (
        <BrowserRouter>
          <Form isEdit={false} loading={false} onSuccess={mockHandleSuccess} />
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    // Fill the form
    const nameInput = screen.getByPlaceholderText("Enter name");
    const descriptionInput = screen.getByPlaceholderText("Enter description");
    const submitButton = screen.getByText("Save");

    fireEvent.change(nameInput, {
      target: { value: "New Product" },
    });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalledWith({
        name: "New Product",
        description: "New Description",
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Product created successfully"
      );
    });

    await waitFor(() => {
      expect(mockHandleSuccess).toHaveBeenCalled();
    });
  });

  it("should fill and submit the form for updating a product", async () => {
    const product = createFakeProduct({
      id: 1,
      attributes: {
        name: "Original Product",
        description: "Original Description",
      },
    });

    const Wrapper = () => {
      return (
        <BrowserRouter>
          <Form
            isEdit={true}
            loading={false}
            product={product}
            onSuccess={mockHandleSuccess}
          />
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    // Update the form
    const nameInput = screen.getByPlaceholderText("Enter name");
    const submitButton = screen.getByText("Save");

    fireEvent.change(nameInput, {
      target: { value: "Updated Product" },
    });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          name: "Updated Product",
        })
      );
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Product updated successfully"
      );
    });

    await waitFor(() => {
      expect(mockHandleSuccess).toHaveBeenCalled();
    });
  });

  it("should show error toast when form submission fails", async () => {
    mockCreateProduct.mockRejectedValue(new Error("API Error"));

    const Wrapper = () => {
      return (
        <BrowserRouter>
          <Form isEdit={false} loading={false} onSuccess={mockHandleSuccess} />
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    // Fill and submit the form
    const nameInput = screen.getByPlaceholderText("Enter name");
    const submitButton = screen.getByText("Save");

    fireEvent.change(nameInput, {
      target: { value: "New Product" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to create product");
    });
  });

  it("should disable inputs when loading is true", async () => {
    const Wrapper = () => {
      return (
        <BrowserRouter>
          <Form isEdit={false} loading={true} onSuccess={mockHandleSuccess} />
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText("Enter name");
    expect(nameInput).toBeDisabled();
  });
});
