import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import "./ProductForm.css";
import { AdminContext } from "../../../context/AdminProvider";

const ProductForm = ({ productId }) => {
  const [editData, setEditData] = useState({});

  const { editProduct, addProduct } = useContext(AdminContext);

  const fetchProduct = async () => {
    if (!productId) return;
    try {
      const { data } = await axios.get(
        `http://localhost:5000/products/${productId}`
      );
      setEditData(data);
    } catch (error) {
      toast.error("error in editing product");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const initialValues = {
    title: editData.title || "",
    image: editData.image || "",
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
    image: Yup.string()
      .url("Enter a valid URL")
      .required("Image URL is required"),
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

  const handleSubmit = (values) => {
    if (!productId) {
      addProduct(values);
      return;
    }
    editProduct(productId, values);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="edit-form">
          <div className="edit-input">
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage className="error" name="title" component="div" />
          </div>

          <div className="edit-input">
            <label htmlFor="image">Image URL</label>
            <Field type="text" id="image" name="image" />
            <ErrorMessage className="error" name="image" component="div" />
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
            <Field type="text" id="category" name="category" />
            <ErrorMessage className="error" name="category" component="div" />
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
    </Formik>
  );
};

export default ProductForm;
