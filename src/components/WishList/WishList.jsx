/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../../Context/WishlistContext";
import Loading from "../Loading/Loading";
import WishListItem from "../WishListItem/WishListItem";
import emptywishlist from "../../assets/images/empty-wishlist.jpg";
import EmptyContent from "../EmptyContent/EmptyContent";
import { Helmet } from "react-helmet";

export default function WishList() {
  let { getWishlist } = useContext(wishlistContext);
  const [isloading, setIsLoading] = useState(true);
  const [wishList, setwishList] = useState({});
  useEffect(() => {
    (async () => {
      let { data } = await getWishlist();
      if (data?.status === "success") {
        setwishList(data?.data);
      }
      setIsLoading(false);
    })();
  }, []);
  if (isloading) return <Loading />;
  if (!wishList || wishList?.length === 0)
    return (
      <EmptyContent
        imageSrc={emptywishlist}
      />
    );
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WishList</title>
        <meta name="keywords" content="Ecommerce-WishList" />
      </Helmet>
      <section className=" my-5 px-3 px-md-0">
        <div className="container bg-main-light rounded-2 py-5 px-3 my-5">
          <h2 className="title-main text-center fw-bold mb-4">You liked</h2>
          <p className="fw-semibold my-2">
            Products in wishlist:
            <span className="text-main mx-1">{wishList?.length}</span>
          </p>
          {wishList?.map((item) => {
            return (
              <WishListItem
                key={item.id}
                item={item}
                setwishList={setwishList}
                wishList={wishList}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
