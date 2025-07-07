import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function ForgotPassword() {
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);
  let navigate = useNavigate();
  const ForgotPasswordSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      fotgotPassword(values);
    },
  });
  async function fotgotPassword(values) {
    setIsloading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((data) => {
        setIsloading(false);
        console.log(data);
        if (data.data.statusMsg === "success") {
          navigate("/auth/verify-reset-code");
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
        <title>FreshCart-Forgot Password</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Forgot-Password" />
      </Helmet>
      <section className="flex flex-col items-center pt-6">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Reset Password
            </h1>
            <p className="text-xsm text-gray-500 dark:text-gray-400">
              you will get email to reset your password.
            </p>       
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
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
              {errorMsg && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center">
                  {errorMsg}
                </div>
              )}
              {isLodaing ? (
                <button
                  type="submit"
                  className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#8BD88B]"
                  disabled
                >
                  <span
                    className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded animate-spin"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
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
            </form>
          </div>
        </div>
      </section>
    </>
  );
}