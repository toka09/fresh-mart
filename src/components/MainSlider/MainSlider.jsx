import React from "react";
import Slider from "react-slick";
import banner1 from "../../assets/slider/ad-banner-1.jpg";
import banner2 from "../../assets/slider/ad-banner-2.jpg";
import slid1 from "../../assets/slider/slider-image-1.jpg";
import slid2 from "../../assets/slider/slider-image-2.jpg";
import slid3 from "../../assets/slider/slider-image-3.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };
  return (
    <>
      <div className="max-w-7xl mx-auto my-5 py-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-0 md:gap-4">
          <div className="w-full md:w-2/3 mb-5 md:mb-0">
            <Slider {...settings}>
              <img src={slid1} className="h-[400px] w-full " />
              <img src={slid2} className="h-[400px] w-full " />
              <img src={slid3} className="h-[400px] w-full "/>
            </Slider>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <img src={banner1} className="h-[200px] w-full " alt="selfcare" />
            <img src={banner2} className="h-[200px] w-full  -mt-6" alt="frutis" />
          </div>
        </div>
      </div>
    </>
  );
}