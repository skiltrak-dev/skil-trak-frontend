import React from "react";

interface PageNumbersProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PageNumbers = ({
  currentPage,
  totalPages,
  onPageChange,
}: PageNumbersProps) => {
  const getPageNumbers = () => {
    let pageNumbers: (number | string)[] = [];

    if (totalPages <= 5) {
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage < 3) {
      pageNumbers = [1, 2, 3, "...", totalPages];
    } else if (currentPage === 3) {
      pageNumbers = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= 4 && currentPage <= totalPages - 3) {
      pageNumbers = [
        1,
        2,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    } else {
      pageNumbers = [
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return pageNumbers;
  };

  return (
    <>
      {getPageNumbers().map((pageNum, index) => (
        <React.Fragment key={index}>
          {pageNum === "..." ? (
            <span className="px-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(Number(pageNum))}
              className={`w-8 h-8 rounded-lg transition-colors ${
                currentPage === pageNum
                  ? "text-[#1436B0] border border-[#1436B0] border-opacity-20"
                  : "text-[#9A9A9A]"
              }`}
            >
              {pageNum}
            </button>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

