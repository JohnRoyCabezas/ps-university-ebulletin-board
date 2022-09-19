import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "./components/button/Button";
import { registrationValidationSchema } from "../utilities/validation";
import { useRegisterUserMutation } from "../store/authSlice";
import withAuth from "../utilities/withAuth";

const RegistrationPage = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleFormSubmit = async () => {
    try {
      const res = await registerUser(values).unwrap();
      toast.success(res.message);
      resetForm();
    } catch (error) {
      if (error && error.status === 500) {
        setFieldError("email", error.data.message);
      } else {
        toast.success(error);
      }
    }
  };
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    setFieldError,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    initialValues: { email: "", password: "", name: "", repeatPassword: "" },
    enableReinitialize: true,
    validationSchema: registrationValidationSchema,
    onSubmit: handleFormSubmit,
  });
  return (
    <div className="container vh-100">
      <main className="m-auto d-flex justify-content-center align-items-center w-100 h-100">
        <form>
          <h1 className="h3 mb-3 fw-normal text-center ">
            Sign Up to E-Learning
          </h1>
          <div className="form-floating">
            <input
              type="text"
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              className={`form-control ${
                errors.name && touched.name ? "border-danger" : ""
              }`}
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Name</label>
            {errors.name && touched.name && (
              <span className="error small text-danger">{errors.name}</span>
            )}
          </div>
          <div className="form-floating mt-1">
            <input
              type="email"
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              className={`form-control ${
                errors.email && touched.email ? "border-danger" : ""
              }`}
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
            {errors.email && touched.email && (
              <span className="error small text-danger">{errors.email}</span>
            )}
          </div>
          <div className="form-floating mt-1">
            <input
              type="password"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              className={`form-control ${
                errors.password && touched.password ? "border-danger" : ""
              }`}
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingInput">Password</label>
            {errors.password && touched.password && (
              <span className="error text-danger small">{errors.password}</span>
            )}
          </div>
          <div className="form-floating mt-1">
            <input
              type="password"
              onChange={handleChange("repeatPassword")}
              onBlur={handleBlur("repeatPassword")}
              value={values.repeatPassword}
              className={`form-control ${
                errors.repeatPassword && touched.repeatPassword
                  ? "border-danger"
                  : ""
              }`}
              id="floatingrepeatPassword"
              placeholder="repeatPassword"
            />
            <label htmlFor="floatingInput">Repeat Password</label>
            {errors.repeatPassword && touched.repeatPassword && (
              <span className="error text-danger small">
                {errors.repeatPassword}
              </span>
            )}
          </div>
          <Button
            className={"w-100 mt-3 btn btn-lg btn-primary"}
            isValid={isValid}
            isLoading={isLoading}
            handleClick={handleSubmit}
            label={"Register"}
          />
          <Link className="w-100 mt-2 btn btn-lg btn-success" to={"/"} replace>
            Login
          </Link>
          <p className="mt-5 mb-3 text-muted text-center">
            &copy; ELearning | Oliverio 2022
          </p>
        </form>
      </main>
    </div>
  );
};

export default withAuth(RegistrationPage);
