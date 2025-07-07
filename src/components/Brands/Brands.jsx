import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { baseUrl } from "./../../utils/baseUrl";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getBrands() {
    return axios.get(`${baseUrl}/brands`);
  }
  let { data, isLoading } = useQuery("getBrands", getBrands);
  if (isLoading) return <Loading />;
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Brands-Products" />
      </Helmet>
      
      <div className="container mx-auto my-5 py-5 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data?.data?.data.map((item) => (
            <div key={item._id} className="p-2">
              <Link 
                to={`/products/brand/${item.name}/${item._id}`}
                className="block border border-transparent hover:border-green-500 hover:shadow-md rounded-lg p-3 transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <h5 className="font-bold text-gray-700 my-3 text-center">
                  {item.name}
                </h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}