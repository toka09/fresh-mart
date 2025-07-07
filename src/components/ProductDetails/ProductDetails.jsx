import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { baseUrl } from "../../utils/baseUrl";
import { cartContext } from "./../../Context/CartContext";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function ProductDetails({ productId, setCategoryId }) {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  let { setCartCounter, addToCart } = useContext(cartContext);
  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(`${baseUrl}/products/${productId}`);
    setProduct(data.data);
    setCategoryId(data.data.category._id);
    setIsLoading(false);
  }
  async function addProductToCart(productId) {
    setIsLoadingAdd(true);
    let { data } = await addToCart(productId);
    if (data.status === "success") {
      setIsLoadingAdd(false);
      toast.success("Product added successfully");
      setCartCounter(data.numOfCartItems);
    }
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product.title}</title>
        <meta name="keywords" content={product.slug} />
      </Helmet>
      <div className="my-5 pt-5 flex justify-center items-center">
        <div className="container pt-5">
          <div className="flex flex-col md:flex-row justify-center items-center mb-5">
            <div className="w-full md:w-1/3 mb-5 md:mb-0 md:pr-4">
              <Slider {...settings}>
                {product?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product?.name}
                    className="block w-full rounded-lg"
                  />
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-2/3">
              <h4 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">{product?.title}</h4>
              <p className="text-gray-600 mb-4">{product?.description}</p>
              <p className="text-sm my-1 text-green-600">{product?.category?.name}</p>
              <div className="flex justify-between my-3">
                <div className="text-lg font-semibold">{product?.price} EGP</div>
                <div className="flex items-center">
                  <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                  {product?.ratingsAverage}
                </div>
              </div>
              <button
                className={`w-full py-2 px-4 rounded-md font-medium text-white bg-green-600 hover:bg-green-700 transition-colors ${isLoadingAdd ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={() => addProductToCart(product?._id)}
                disabled={isLoadingAdd}
              >
                {isLoadingAdd ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fa-solid fa-cart-plus mr-2"></i> 
                    Add To Cart
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}