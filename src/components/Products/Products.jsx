import axios from "axios";
import React, { useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { baseUrl } from "./../../utils/baseUrl";
import emptyProducts from "../../assets/images/empty-products.jpg";
import EmptyContent from "../EmptyContent/EmptyContent";
import { Helmet } from "react-helmet";
import Pagination from "../Pagination/Pagination";
import { useEffect } from "react";
export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [limitItems] = useState(12);
  const [productList, setProductList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [paginationData, setpaginationData] = useState({});
  async function getProducts(limit, page) {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `${baseUrl}/products?limit=${limit}&page=${page}`
      );
      if (data) {
        setProductList(data?.data);
        setpaginationData(data?.metadata);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  const filteredProducts = productList?.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  useEffect(() => {
    getProducts(limitItems, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <meta name="keywords" content="Ecommerce-Products" />
      </Helmet>
      <div className="container my-5 pt-5">
        <div className="d-flex justify-content-between align-items-center my-3  overflow-hidden">
          
        </div>
        <div className="relative my-3 max-w-md ml-auto">
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <i className="fas fa-search text-gray-400" />
          </button>
          <input
            type="text"
            className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Search Products"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row">
            {filteredProducts?.length > 0 ? (
              <>
                {filteredProducts?.map((item) => (
                  <Product key={item._id} item={item} />
                ))}
              </>
            ) : (
              <EmptyContent
                imageSrc={emptyProducts}
              />
            )}
          </div>
        )}
        <Pagination
          paginationData={paginationData}
          getProducts={getProducts}
          limitItems={limitItems}
        />
      </div>
    </>
  );
}