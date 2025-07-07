/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderContext } from "../../Context/OrderContext";
import Loading from "../Loading/Loading";
import EmptyContent from "../EmptyContent/EmptyContent";
import emptyOrders from "../../assets/images/empty-orders.jpg";
import { Helmet } from "react-helmet";

export default function OrderDetails() {
  let { orderId } = useParams();
  const [isloading, setIsLoading] = useState(true);
  let { getUserAllOrders, allOrders, setAllOrders } = useContext(orderContext);
  const [order, setOrder] = useState({});
  async function getSpecificOrder() {
    let { data } = await getUserAllOrders();
    if (data) {
      setAllOrders(data);
      let orderFounded = data.filter((order) => order._id === orderId);
      setOrder(...orderFounded);
    } else {
      setAllOrders([]);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getSpecificOrder();
  }, []);

  if (isloading) return <Loading />;
  if (!allOrders || allOrders?.length <= 0)
    return (
      <EmptyContent
        imageSrc={emptyOrders}
        message={`Please check back later.`}
      />
    );
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Order Details</title>
        <meta name="keywords" content="Ecommerce-Order-Details"/>
      </Helmet>
      <div className="py-14 px-4 md:px-6 2xl:container mx-auto">
        <div className="flex justify-start item-start flex-col">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 text-center">
            Order #{order?.id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600 text-center">
            {order?.createdAt && new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-1 flex flex-col xl:flex-row justify-center xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start  space-y-4 md:space-y-6 xl:space-y-8">
            <div className="bg-gray-100 px-4 py-3 md:py-6 md:p-6 xl:p-1 rounded">
              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer's Cart
              </p>
              {order?.cartItems?.map((el, index) => (
                <div key={index} className="mt-4 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-0 ">
                  <div className="w-full md:w-40">
                    <img
                      src={el.product.imageCover}
                      alt={el.product.title}
                      className=" h-40 object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-4">
                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                        {el.product.title}
                      </h3>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                        {el.price} EGP
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                        {el.count}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                        {el.price * el.count} EGP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6 rounded-lg">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                    <p className="text-base leading-4 text-gray-600">
                      {order?.totalOrderPrice} EGP
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                    <p className="text-base leading-4 text-gray-600">
                      {order?.shippingPrice || 0} EGP
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    {order?.totalOrderPrice + (order?.shippingPrice || 0)} EGP
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6 rounded-lg">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping Address</h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col justify-start items-start">
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-600">
                        <span className="font-medium">City :</span> {order?.shippingAddress?.city}
                      </p>
                      <p className="text-sm leading-5 text-gray-600">
                        <span className="font-medium"> Full Address :</span> {order?.shippingAddress?.details}
                      </p>
                      <p className="text-sm leading-5 text-gray-600">
                        <span className="font-medium">Phone :</span> {order?.shippingAddress?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col rounded-lg">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
            <div className="flex flex-col justify-start items-start flex-shrink-0 w-full">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    {order?.user?.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Payment Method
                    </p>
                    <p className="text-center md:text-left text-sm leading-5 text-gray-600">
                      {order?.paymentMethodType === 'cash' ? 'Cash on Delivery' : 'Credit Card'}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Order Status
                    </p>
                    <p className="text-center md:text-left text-sm leading-5 text-gray-600">
                      {order?.isPaid ? 'Paid' : 'Not Paid'} | {order?.isDelivered ? 'Delivered' : 'Processing'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}