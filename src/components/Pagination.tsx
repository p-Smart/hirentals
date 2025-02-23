import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(currentPage + 2, totalPages);

      if (currentPage <= 3) {
        endPage = maxPagesToShow;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (startPage > 1) {
        pageNumbers.unshift(1, "...");
      }

      if (endPage < totalPages) {
        pageNumbers.push("...", totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex rounded-md shadow-sm -space-x-px">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-l-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 ${
                currentPage === page ? "bg-gray-200" : ""
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              {page}
            </span>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-r-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
