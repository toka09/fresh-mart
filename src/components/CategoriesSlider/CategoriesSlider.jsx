import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { baseUrl } from "./../../utils/baseUrl";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get(`${baseUrl}/categories`);
  }
  let { data } = useQuery("getCategories", getCategories);
  var settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 400,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
      <h2 className="text-xl md:text-2xl mb-3 font-medium">Shop Popular Categories</h2>
      <Slider {...settings}>
        {data?.data?.data.map((item) => (
          <div key={item._id} className="px-1">
            <div className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 rounded-lg object-cover"
              />
              <h5 className="mt-2 text-center">
                <Link
                  className="text-sm md:text-base font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  to={`/products/category/${item.name}/${item._id}`}
                >
                  {item.name}
                </Link>
              </h5>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}