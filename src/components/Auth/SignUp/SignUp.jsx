import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);

  let navigate = useNavigate();

  const SignupSchema = Yup.object({
    name: Yup.string()
      .min(5, "Name must be at least 5 characters")
      .max(60, "Name must not exceed 60 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z0-9]{7,}$/,
        "Password must start with an uppercase letter and be at least 8 characters long"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    phone: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "phone must match the following: 01xxxxxxxxx"
      )
      .required("Phone number is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  async function register(values) {
    setIsloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((data) => {
        setIsloading(false);
        if (data.data.message === "success") {
          navigate("/auth/signin");
        }
      })
      .catch((error) => {
        setIsloading(false);
        setErrorMsg(error.response.data.message);
      });
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-signup</title>
        <meta name="keywords" content="FreshCart-Ecommerce-signup-register" />
      </Helmet>
      <section className="flex flex-col items-center pt-6">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Your full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded  block w-full p-2.5"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded  block w-full p-2.5"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fa-regular ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showRePassword ? "text" : "password"}
                    name="rePassword"
                    id="rePassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    onClick={() => setShowRePassword(!showRePassword)}
                  >
                    <i
                      className={`fa-regular ${
                        showRePassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.rePassword}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              {errorMsg && (
                <div className="p-4 mb-1 text-sm text-red-700 bg-red-100 rounded dark:bg-red-200 dark:text-red-800 text-center">
                  {errorMsg}
                </div>
              )}
              {isLodaing ? (
                <button
                  type="submit"
                  className="w-full text-white"
                  disabled
                >
                  <span
                    className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full "
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-[#0aad0a]  font-medium rounded text-sm px-5 py-2.5 text-center"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Create an account
                </button>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 pt-2.5">
                Already have an account?{" "}
                <Link
                  to="/auth/signin"
                  className="font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}