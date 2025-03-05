import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  addProduct,
  editProduct,
  fetchCategory,
  setIsAddModalOpen,
  setIsEditModalOpen,
} from "../../../Redux/AdminSlice/adminSlice";
import "./ProductForm.css";
import api from "../../../api/api";

const ProductForm = ({ productId }) => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const { categories } = useSelector((state) => state.admin);
  const [addCategory, setAddCategory] = useState(false);
  const [category, setCategory] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const { data } = await api.get(`/api/Product/${productId}`);
        setEditData(data?.data);
      } catch (error) {
        toast.error("Error fetching product data");
      }
    };
    fetchProduct();
    dispatch(fetchCategory());
  }, [productId]);
  console.log(productId);
  console.log(categories);

  const AddCategory = (category) => {
    dispatch(addCategories(category));
    setAddCategory(false);
  };

  const initialValues = {
    title: editData.title || "",
    price: editData.price || "",
    description: editData.description || "",
    brand: editData.brand || "",
    model: editData.model || "",
    color: editData.color || "",
    category: editData.category || "",
    discount: editData.discount || "",
    quantity: editData.quantity || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    brand: Yup.string().required("Brand is required"),
    model: Yup.string().required("Model is required"),
    color: Yup.string().required("Color is required"),
    category: Yup.string().required("Category is required"),
    discount: Yup.number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%")
      .required("Discount is required"),
    quantity: Yup.number()
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Save selected file
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("brand", values.brand);
    formData.append("model", values.model);
    formData.append("color", values.color);
    formData.append("categoryId", values.category); // Ensure category ID matches backend
    formData.append("discount", values.discount);
    formData.append("quantity", values.quantity);

    if (selectedFile) {
      formData.append("image", selectedFile); // Attach image file
    }

    try {
      if (!productId) {
        dispatch(addProduct(formData));
        dispatch(setIsAddModalOpen(false));
      } else {
        // Edit existing product

        dispatch(editProduct({ id: productId, values: formData }));
        dispatch(setIsEditModalOpen(false));
        toast.success("Product updated successfully");
      }
    } catch (error) {
      toast.error("Error submitting product");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="edit-form">
            <div className="edit-input">
              <label htmlFor="title">Title</label>
              <Field type="text" id="title" name="title" />
              <ErrorMessage className="error" name="title" component="div" />
            </div>

            <div className="edit-input">
              <label htmlFor="image">Image File</label>
              <input
                className=""
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
            </div>

            <div className="edit-input">
              <label htmlFor="price">Price</label>
              <Field type="number" id="price" name="price" />
              <ErrorMessage className="error" name="price" component="div" />
            </div>

            <div className="edit-input">
              <label htmlFor="description">Description</label>
              <Field as="textarea" id="description" name="description" />
              <ErrorMessage
                className="error"
                name="description"
                component="div"
              />
            </div>

            <div className="edit-input">
              <label htmlFor="brand">Brand</label>
              <Field type="text" id="brand" name="brand" />
              <ErrorMessage className="error" name="brand" component="div" />
            </div>

            <div className="edit-input">
              <label htmlFor="model">Model</label>
              <Field type="text" id="model" name="model" />
              <ErrorMessage className="error" name="model" component="div" />
            </div>

            <div className="edit-input">
              <label htmlFor="color">Color</label>
              <Field type="text" id="color" name="color" />
              <ErrorMessage className="error" name="color" component="div" />
            </div>

            <div className="edit-input">
              <label htmlFor="category">Category</label>
              <Field
                as="select"
                id="category"
                name="category"
                className="rounded-3 py-1"
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage className="error" name="category" component="div" />
              <div className="d-flex flex-column">
                <span>
                  {!addCategory && (
                    <button
                      onClick={() => setAddCategory(true)}
                      className=" border-0 rounded-2 bg-warning mt-2 px-2 float-end p-1"
                    >
                      Add category
                    </button>
                  )}
                </span>

                {addCategory && (
                  <>
                    <input
                      className="mt-2 p-1 rounded-3 border-1 border-primary"
                      type="text"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <span>
                      <button
                        onClick={() => AddCategory(category)}
                        className="mt-2 border-0 rounded-2 float-end p-1 px-2 bg-success text-white"
                      >
                        submit
                      </button>
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="edit-input">
              <label htmlFor="discount">Discount (%)</label>
              <Field type="number" id="discount" name="discount" />
              <ErrorMessage className="error" name="discount" component="div" />
            </div>

            <div className="edit-input">
              <label htmlFor="quantity">Quantity</label>
              <Field type="number" id="quantity" name="quantity" />
              <ErrorMessage className="error" name="quantity" component="div" />
            </div>
          </div>
          <button
            className="edit-submit mt-2 p-2 w-100 rounded border-0"
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
