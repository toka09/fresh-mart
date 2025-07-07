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

export default function ProductsByBrand() {
  let { brandName, brandId } = useParams();
  const [productsList, setProductsList] = useState([]);
  const [productsCount, setProductsListCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  async function getProductsByBrandId() {
    try {
      let { data } = await axios.get(`${baseUrl}/products?brand=${brandId}`);
      setIsLoading(false);
      setProductsList(data?.data);
      setProductsListCount(data?.results);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      
    }
  }
  
  useEffect(() => {
    getProductsByBrandId();
  }, []);
  if (isLoading) return <Loading />;
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${brandName}-Products`}</title>
        <meta name="keywords" content={`${brandName}-Products`} />
      </Helmet>
      <div className="container mx-auto my-5 py-5 px-4">
        <p className="font-semibold my-3 text-gray-700">
          Products found:
          <span className="text-green-600 mx-1">{productsCount}</span>
        </p>
        
        <div className="flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsCount > 0 ? (
            productsList.map((item) => (
              <Product key={item._id} item={item} />
            ))
          ) : (
            <EmptyContent
              imageSrc={emptyProducts}
            />
          )}
        </div>
      </div>
    </>
  );
}
