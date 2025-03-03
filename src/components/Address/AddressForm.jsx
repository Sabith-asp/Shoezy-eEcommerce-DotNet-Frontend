import React from "react";
import "./AddressForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAddress } from "../../Redux/UserSlice/userSlice";

const AddressForm = ({close}) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    houseName: Yup.string().required("House Name is required"),
    place: Yup.string().required("Place is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  });

  const handleAddresSubmit = (values) => {
    console.log("address is", values);

    dispatch(addAddress(values));
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        houseName: "",
        place: "",
        pincode: "",
        city: "",
        state: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form submitted", values);
        handleAddresSubmit(values);
        close();
      }}
    >
      <Form className="address-form mt-4 px-1">
        <h3>Add address</h3>
        <div>
          <label>Name:</label>
          <Field type="text" name="name" className="form-control" />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </div>
        <div>
          <label>Email:</label>
          <Field type="email" name="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>
        <div>
          <label>Phone:</label>
          <Field type="text" name="phone" className="form-control" />
          <ErrorMessage name="phone" component="div" className="text-danger" />
        </div>
        <div>
          <label>House Name:</label>
          <Field type="text" name="houseName" className="form-control" />
          <ErrorMessage
            name="houseName"
            component="div"
            className="text-danger"
          />
        </div>
        <div>
          <label>Place:</label>
          <Field type="text" name="place" className="form-control" />
          <ErrorMessage name="place" component="div" className="text-danger" />
        </div>
        <div>
          <label>Pincode:</label>
          <Field type="text" name="pincode" className="form-control" />
          <ErrorMessage
            name="pincode"
            component="div"
            className="text-danger"
          />
        </div>
        <div>
          <label>City:</label>
          <Field type="text" name="city" className="form-control" />
          <ErrorMessage name="city" component="div" className="text-danger" />
        </div>
        <div>
          <label>State:</label>
          <Field type="text" name="state" className="form-control" />
          <ErrorMessage name="state" component="div" className="text-danger" />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default AddressForm;
