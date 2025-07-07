import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import Products from "./../Products/Products";
import { Helmet } from "react-helmet";
import ProductsSlider from "../ProductsSlider/ProductsSlider";
export default function HomePage() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <Products />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <meta name="keywords" content="Ecommerce"/>
      </Helmet>
    </>
  );
}
