import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { tokenContext } from "../../../Context/TokenContext";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);
  let { updateToken } = useContext(tokenContext);
  let navigate = useNavigate();
  const ForgotPasswordSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z0-9]{7,}$/,
        "Password must start with an uppercase letter and be at least 8 characters long"
      )
      .required("Password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });
  async function resetPassword(values) {
    setIsloading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((data) => {
        setIsloading(false);
        if (data.data.token) {
          updateToken(data.data.token);
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
        <title>FreshCart-Reset Password</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Reset-Password" />
      </Helmet>
      <section className="flex flex-col items-center pt-6">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and new password to reset .
            </p>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2  text-gray-700 font-semibold">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5"
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
                <label htmlFor="newPassword" className="block mb-2  text-gray-700 font-semibold">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    value={formik.values.newPassword}
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
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>
              {errorMsg && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded dark:bg-red-200 dark:text-red-800 text-center">
                  {errorMsg}
                </div>
              )}
              {isLodaing ? (
                <button
                  type="submit"
                  className="w-full text-white bg-[#8BD88B] font-medium rounded text-sm px-5 py-2.5 text-center"
                  disabled
                >
                  <span
                    className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Resetting...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-[#0aad0a] font-medium rounded text-sm px-5 py-2.5 text-center"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Reset Password
                </button>
              )}
              <p className=" pt-2 text-sm font-light">
                Remember your password ? {" "}
                <a
                  href="/auth/signin"
                  className=" text-gray-700 font-bold"
                >
                  Sign in here
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}