import { useState, useMemo, useCallback } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  defaultPage?: number;
}

const usePagination = ({
  totalItems,
  itemsPerPage = 5,
  defaultPage = 1,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { startIndex, endIndex } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    return { startIndex, endIndex };
  }, [currentPage, itemsPerPage, totalItems]);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const goToFirstPage = useCallback(() => setCurrentPage(1), []);
  const goToLastPage = useCallback(
    () => setCurrentPage(totalPages),
    [totalPages]
  );

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};

export default usePagination;
