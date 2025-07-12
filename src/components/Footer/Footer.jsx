import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-cart-shopping text-2xl text-main dark:text-main-light"></i>
              <span className="text-xl font-bold text-gray-800 dark:text-white">FreshCart</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Discover the latest fashion trends and cutting-edge electronics delivered to your doorstep. 
              We partner directly with brands to bring you premium products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500  hover:text-white dark:hover:text-main-light footer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500  hover:text-white dark:hover:text-main-light footer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500  hover:text-white dark:hover:text-main-light footer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-500  hover:text-white dark:hover:text-main-light footer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="footer text-gray-600  hover:text-white dark:text-gray-400 dark:hover:text-main-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer text-gray-600  hover:text-white dark:text-gray-400 dark:hover:text-main-light transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="footer text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-main-light transition-colors">
                  categories
                </Link>
              </li>
              <li>
                <Link to="/brands" className="footer text-gray-600  hover:text-white dark:text-gray-400 dark:hover:text-main-light transition-colors">
                  brands
                </Link>
                <li>
                <Link to="/allorders" className="footer text-gray-600  hover:text-white dark:text-gray-400 dark:hover:text-main-light transition-colors">
                  allorders
                </Link>
                </li>
              </li>
            </ul>
          </div>
          {/* Get App */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Get Our App</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Download our app for better shopping experience
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-start p-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6 text-gray-800 dark:text-gray-200" viewBox="0 0 512 512">
                    <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                  </svg>
                  <div className="ml-3 text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400">GET IT ON</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Google Play</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full flex items-center justify-start p-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6 text-gray-800 dark:text-gray-200" viewBox="0 0 305 305">
                    <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                    <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                  </svg>
                  <div className="ml-3 text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Download on the</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">App Store</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Subscribe to get updates on new products and special offers.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Your email address"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-main hover:bg-main-dark text-white py-2 px-4 rounded transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 FreshCart. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="footer text-gray-100  hover:text-white dark:text-gray-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer text-gray-100  hover:text-white  dark:text-gray-400">
                Terms of Service
              </Link>
              <Link to="/cookies" className="footer text-gray-100  hover:text-white dark:text-gray-400">
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}