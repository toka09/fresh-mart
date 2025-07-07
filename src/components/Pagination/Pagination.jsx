import React, { useEffect, useState } from "react";
export default function Pagination({
  paginationData,
  getProducts,
  limitItems,
}) {
  const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
    setCurrentPage(paginationData.currentPage);
}, [paginationData]);

function getNextPage() {
    if (paginationData.nextPage != null) {
    setCurrentPage(paginationData.nextPage);
    getProducts(limitItems, paginationData.nextPage);
    }
}
function getPrevPage() {
    if (paginationData.prevPage != null) {
    setCurrentPage(paginationData.prevPage);
    getProducts(limitItems, paginationData.prevPage);
    }
}
    return (
    <div className="flex justify-center mt-5 mb-2">
    <nav aria-label="Page navigation">
        <ul className="flex items-center space-x-1">
          {/* Previous Button */}
        <li className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <button
            onClick={getPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none transition-colors duration-200"
            >
            Previous
            </button>
        </li>
          {/* Current Page Indicator */}
        <li className="mx-2">
            <span className="px-4 py-2 font-bold text-green-600">
            {currentPage}
            </span>
        </li>
          {/* Next Button */}
        <li className={`${!paginationData.nextPage ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <button
            onClick={getNextPage}
            disabled={!paginationData.nextPage}
            className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none transition-colors duration-200"
            >
            Next
            </button>
        </li>
        </ul>
    </nav>
    </div>
);
}