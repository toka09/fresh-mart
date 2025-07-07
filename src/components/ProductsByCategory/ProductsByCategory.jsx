/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import emptyProducts from "../../assets/images/empty-products.jpg";
import EmptyContent from "../EmptyContent/EmptyContent";
import { Helmet } from "react-helmet";

export default function ProductsByCategory() {
  let { categoryName, categoryId } = useParams();
  const [productsList, setProductsList] = useState([]);
  const [productsCount, setProductsListCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function getProductsByCategoryId() {
    try {
      let { data } = await axios.get(
        `${baseUrl}/products?category[in]=${categoryId}`
      );
      setIsLoading(false);
      setProductsList(data?.data);
      setProductsListCount(data?.results);
    } catch (err) {
      setIsLoading(false);
      toast.error("Failed to get products");
      console.error("Error fetching products:", err);
    }
  }
  useEffect(() => {
    getProductsByCategoryId();
  }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${categoryName}-Products`}</title>
        <meta name="keywords" content={`${categoryName}-Products`} />
      </Helmet>
      
      <div className="container mx-auto my-5 py-5 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {categoryName} Products
          </h1>
          <p className="font-semibold text-gray-700">
            Products found: 
            <span className="text-green-600 ml-2">{productsCount}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {productsCount > 0 ? (
            productsList.map((item) => (
              <Product key={item._id} item={item} />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyContent
                imageSrc={emptyProducts}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}