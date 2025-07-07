import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../../Context/TokenContext";
import { Helmet } from "react-helmet";

export default function SignIn() {
  let { updateToken } = useContext(tokenContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);

  let navigate = useNavigate();
  const SignupSchema = Yup.object({
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
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  async function login(values) {
    setIsloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((data) => {
        setIsloading(false);
        if (data.data.message === "success") {
          localStorage.setItem("token", data.data.token);
          updateToken(data.data.token);
          navigate("/");
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
        <title>FreshCart-signin</title>
        <meta name="keywords" content="FreshCart-Ecommerce-signin-login" />
      </Helmet>
      <section className="flex flex-col items-center pt-3">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-sm  text-gray-700 font-bold text-center">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400"
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
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400"
                    value={formik.values.password}
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
                <label htmlFor="rePassword" className="block mb-2 ">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showRePassword ? "text" : "password"}
                    name="rePassword"
                    id="rePassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400"
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50  "
                    />
                  </div>
                  <div className="ml-3 text-sm  text-gray-700 font-bold">
                    <label htmlFor="remember" className="">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm  text-gray-700 font-bold"
                >
                  Forgot password?
                </Link>
              </div>
              {errorMsg && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center">
                  {errorMsg}
                </div>
              )}
              {isLodaing ? (
                <button
                  type="submit"
                  className="w-full text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled
                >
                  <span
                    className="inline-block mr-2 w-4 h-4 border-2 border-green-400 border-t-transparent rounded animate-spin  bg-[#0aad0a]"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-[#0ad10a] font-medium rounded text-sm px-5 py-2.5 text-center"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Sign in
                </button>
              )}
              <p className="pt-2 text-sm text-gray-700 font-bold">
                Don't have an account yet ? {" "}
                <Link
                  to="/auth/signup"
                  className="text-sm  text-gray-700 font-bold"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}