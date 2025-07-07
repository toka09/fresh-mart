import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { baseUrl } from "./../../utils/baseUrl";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getCategories() {
    return axios.get(`${baseUrl}/categories`);
  }
  let { data, isLoading } = useQuery("getCategories", getCategories);
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
        <meta name="keywords" content="Ecommerce-Categories" />
      </Helmet>
      <div className="container mx-auto my-5 py-5 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-6">All Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data?.data?.data.map((item) => (
            <div key={item._id} className="group">
              <div className="cursor-pointer rounded-xl p-2 overflow-hidden transition-all duration-300 border border-transparent hover:shadow-lg hover:border-green-600">
                <Link 
                  to={`/products/category/${item.name}/${item._id}`}
                  className="block"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <h5 className="font-bold text-gray-800 my-3 text-center group-hover:text-green-600">
                    {item.name}
                  </h5>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}