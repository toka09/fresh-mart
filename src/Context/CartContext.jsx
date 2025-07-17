import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../utils/baseUrl";

export let cartContext = createContext();

async function addToCart(productId) {
  return axios
    .post(
      `${baseUrl}/cart`,
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((data) => data)
    .catch((err) => err);
}

async function getCart() {
  return axios
    .get(`${baseUrl}/cart`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((data) => data)
    .catch((err) => err);
}

async function deleteItem(productId) {
  return axios
    .delete(`${baseUrl}/cart/${productId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((data) => data)
    .catch((err) => err);
}

async function updateQty(productId, count) {
  return axios
    .put(
      `${baseUrl}/cart/${productId}`,
      { count },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((data) => data)
    .catch((err) => err);
}

async function clearCart() {
  return axios
    .delete(`${baseUrl}/cart`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((data) => data)
    .catch((err) => err);
}

async function payByCash(cartId, shippingAddress) {
  return axios
    .post(
      `${baseUrl}/orders/${cartId}`,
      { shippingAddress },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((data) => data)
    .catch((err) => err.message);
}

async function payByCreditCard(cartId, shippingAddress) {
  const redirectUrl = `${window.location.origin}/order-success`;
  
  try {
    const response = await axios.post(
      `${baseUrl}/orders/checkout-session/${cartId}?url=${encodeURIComponent(redirectUrl)}`,
      { shippingAddress },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    if (response.data.sessionUrl) {
      window.location.href = response.data.sessionUrl;
    }
    
    return response;
  } catch (err) {
    console.error("Payment error:", err);
    throw err;
  }
}

export default function CartContextProvider({ children }) {
  const [cartCounter, setCartCounter] = useState(0);
  
  return (
    <cartContext.Provider
      value={{
        cartCounter,
        setCartCounter,
        addToCart,
        getCart,
        deleteItem,
        updateQty,
        clearCart,
        payByCash,
        payByCreditCard,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}