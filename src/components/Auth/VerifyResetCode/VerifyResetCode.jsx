import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function VerifyResetCode() {
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);
  let navigate = useNavigate();
  const verifyResetCodeSchema = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: verifyResetCodeSchema,
    onSubmit: (values) => {
      verifyResetCode(values);
    },
  });
  async function verifyResetCode(values) {
    setIsloading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((data) => {
        setIsloading(false);
        if (data.data.status === "Success") {
          navigate("/auth/reset-password");
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
        <title>FreshCart-Verify Reset Code</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Verify-Reset-Code" />
      </Helmet>
      <section className="flex flex-col items-center pt-6">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify Reset Code
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please enter the reset code sent to your email
            </p>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="resetCode" className="block mb-2 text-gray-700 font-bold">
                  Reset Code
                </label>
                <input
                  type="text"
                  name="resetCode"
                  id="resetCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  value={formik.values.resetCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.resetCode && formik.touched.resetCode && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.resetCode}
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
                  className="w-full text-white bg-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled
                >
                  <span
                    className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded animate-spin"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Verifying...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white  bg-[#0aad0a]  font-medium rounded text-sm px-5 py-2.5 text-center"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Verify Code
                </button>
              )}
              <p className="text-sm font-light pt-2 text-gray-800 dark:text-gray-700">
                Didn't receive a code?{" "}
                <a
                  href="/auth/forgot-password"
                  className=" text-gray-700 font-bold"
                >
                  Request a new one
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}