import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/TokenContext";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  let { token, setToken } = useContext(tokenContext);
  let { cartCounter, setCartCounter, getCart } = useContext(cartContext);
  let {
    wishlistCounter,
    setWishlistCounter,
    getWishlist,
    setWishlistProductsId,
  } = useContext(wishlistContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    setToken(null);
    navigate("/auth/signin");
  }
  useEffect(() => {
    if (token) {
      (async () => {
        let cartResponse = await getCart();
        if (cartResponse?.response?.data?.statusMsg === "fail") {
          setCartCounter(0);
        } else {
          setCartCounter(cartResponse?.data?.numOfCartItems);
        }
        let wishlistResponse = await getWishlist();
        if (wishlistResponse?.data?.status === "success") {
          setWishlistCounter(wishlistResponse?.data?.count);
          const wishlistIds = wishlistResponse?.data?.data.map(
            (item) => item.id
          );
          setWishlistProductsId(wishlistIds);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="-top-4 -py-5 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
      <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4 bg-slate-200">
        <div className="flex items-center justify-between">
          <NavLink 
            to="/home" 
            className="focus:outline-none focus:ring-0"
          >
            <div className="flex items-center space-x-2 pb-4.5">
              <img src={logo} alt="feshCart"/>
            </div>
          </NavLink>
          <div className="hidden lg:block">
            {token && (
              <ul className="flex space-x-10 dark:text-white">
                <li className="group relative">
                  <NavLink
                    to="/home"
                    className={({ isActive }) => 
                      `hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear${
                        isActive ?  "": ''
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="group relative ">
                  <NavLink
                    to="/products"
                    className={({ isActive }) => 
                      `hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear ${
                        isActive ? "" : ""
                      }`
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li className="group relative">
                  <NavLink
                    to="/categories"
                    className={({ isActive }) => 
                      `hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear ${
                        isActive ? "" : ""
                      }`
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="group relative">
                  <NavLink
                    to="/brands"
                    className={({ isActive }) => 
                      `hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear ${
                        isActive ? "" : ""
                      }`
                    }
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className="hidden lg:flex lg:items-center gap-x-2">
            {token ? (
              <>
                <div className="flex items-center space-x-6">
                  <NavLink 
                    to="/cart" 
                    className="relative focus:outline-none focus:ring-0"
                  >
                    <i className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"></i>
                    {cartCounter > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#ad0a0a] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCounter}
                      </span>
                    )}
                  </NavLink>
                  <NavLink 
                    to="/wishlist" 
                    className="relative focus:outline-none focus:ring-0"
                  >
                    <i className="fa-solid fa-heart text-xl dark:text-white"></i>
                    {wishlistCounter > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#ad0a0a] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCounter}
                      </span>
                    )}
                  </NavLink>
                </div>
                <div className="relative ml-4">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none focus:ring-0"
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <i className="fa-solid fa-user text-xl text-black dark:text-white"></i>
                    
                  </button>
                  <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ${dropdownVisible ? "block" : "hidden"}`}>
                    <Link
                      to="/allorders"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownVisible(false)}
                    >
                      All Orders
                    </Link>
                    <button
                      onClick={logOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/auth/signup"
                  className="flex items-center text-black dark:text-white justify-center px-6 py-2.5 font-semibold focus:outline-none focus:ring-0"
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="/auth/signin"
                  className="flex items-center justify-center rounded-md bg-[#0aad0a] text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#0c0c0c] focus:ring-opacity-50"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
          <div className="flex items-center justify-center lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-slate-800 dark:text-white"
            >
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 20 20" 
                aria-hidden="true" 
                className="text-2xl focus:outline-none active:scale-110 active:text-black" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" 
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            {token && (
              <ul className="flex flex-col space-y-4 text-base font-bold text-black/60 dark:text-white">
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) => 
                      `block py-2 hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear ${
                        isActive ? "text-[#d8d8d8] dark:text-[#0aad0a]" : ""
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) => 
                      `block py-2 hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear ${
                        isActive ? "text-[#0aad0a] dark:text-[#0aad0a]" : ""
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) => 
                      `block py-2 hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear ${
                        isActive ? "text-[#0aad0a] dark:text-[#0aad0a]" : ""
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className={({ isActive }) => 
                      `block py-2 hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear ${
                        isActive ? "text-[#0aad0a] dark:text-[#0aad0a]" : ""
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {token ? (
                <div className="flex items-center justify-between">
                  <div className="flex space-x-6">
                    <NavLink 
                      to="/cart" 
                      className="relative focus:outline-none focus:ring-0"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"></i>
                      {cartCounter > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCounter}
                        </span>
                      )}
                    </NavLink>
                    <NavLink 
                      to="/wishlist" 
                      className="relative focus:outline-none focus:ring-0"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fa-solid fa-heart text-xl text-black dark:text-white"></i>
                      {wishlistCounter > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlistCounter}
                        </span>
                      )}
                    </NavLink>
                  </div>
                  <button
                    onClick={() => {
                      logOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-black dark:text-white font-semibold"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <NavLink
                    to="/auth/signup"
                    className="flex items-center justify-center text-black dark:text-white py-2.5 font-semibold focus:outline-none focus:ring-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </NavLink>
                  <NavLink
                    to="/auth/signin"
                    className="flex items-center justify-center rounded-md bg-[#0aad0a] text-white py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#090909] focus:ring-opacity-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}