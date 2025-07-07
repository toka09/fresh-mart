import React from "react";
import notFound from "../../assets/images/404error.jpg";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <div className="container my-5 py-5 d-flex flex-column justify-content-center align-items-center">
        <img
          src={notFound}
          className="w-100"
          style={{ maxWidth: "450px" }}
          alt="404 not found img"
        />
        <Link className="btn fw-bold text-white bg-main" to="/home">
          Home
        </Link>
      </div>
    </>
  );
}
