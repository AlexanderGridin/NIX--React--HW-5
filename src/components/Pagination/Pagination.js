import { useState, useEffect } from "react";

import { PAGINATION } from "../../lib/constants";

import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, pageNumberForActivation, onPageChange }) => {
  const [activePageNumber, setActivePageNumber] = useState(
    PAGINATION.INITIAL_PAGE
  );
  let visiblePages = getVisiblePages(activePageNumber, totalPages);

  const gotoFirstPage = () => {
    if (activePageNumber !== 1) {
      setActivePageNumber(1);
      onPageChange && onPageChange(1);
    }
  };

  const gotoPrevPage = () => {
    const targetPageNumber = activePageNumber - 1;

    if (targetPageNumber >= 1) {
      setActivePageNumber(targetPageNumber);
      onPageChange && onPageChange(targetPageNumber);
    }
  };

  const gotoPage = (e) => {
    const targetPageNumber = +e.target.textContent;

    if (targetPageNumber !== activePageNumber) {
      setActivePageNumber(targetPageNumber);
      onPageChange && onPageChange(targetPageNumber);
    }
  };

  const gotoNextPage = () => {
    const targetPageNumber = activePageNumber + 1;

    if (targetPageNumber <= totalPages) {
      setActivePageNumber(targetPageNumber);
      onPageChange && onPageChange(targetPageNumber);
    }
  };

  const gotoLastPage = () => {
    if (activePageNumber !== totalPages) {
      setActivePageNumber(totalPages);
      onPageChange && onPageChange(totalPages);
    }
  };

  useEffect(() => {
    if (pageNumberForActivation) {
      setActivePageNumber(pageNumberForActivation);
    }
  }, [pageNumberForActivation]);

  return (
    <div className={styles.Pagination}>
      <button
        className={`${styles.PaginationFirst} ${styles.PaginationButton}`}
        onClick={gotoFirstPage}
      >
        {"<<"}
      </button>
      <button
        className={`${styles.PaginationPrev} ${styles.PaginationButton}`}
        onClick={gotoPrevPage}
      >
        Prev
      </button>

      <ul className={styles.PaginationPages} onClick={gotoPage}>
        {visiblePages &&
          visiblePages.map((pageNumber) => {
            return (
              <li className={styles.PaginationPagesItem} key={pageNumber}>
                {pageNumber === activePageNumber ? (
                  <button
                    className={`${styles.PaginationPage} ${styles.PaginationButton} ${styles.PaginationPageActive}`}
                    disabled={true}
                  >
                    {pageNumber}
                  </button>
                ) : (
                  <button
                    className={`${styles.PaginationPage} ${styles.PaginationButton}`}
                  >
                    {pageNumber}
                  </button>
                )}
              </li>
            );
          })}
      </ul>

      <button
        className={`${styles.PaginationNext} ${styles.PaginationButton}`}
        onClick={gotoNextPage}
      >
        Next
      </button>
      <button
        className={`${styles.PaginationLast} ${styles.PaginationButton}`}
        onClick={gotoLastPage}
      >
        {">>"}
      </button>
    </div>
  );
};

function getVisiblePages(activePageNumber, totalPages) {
  let visiblePages = [];

  const NUMBER_OF_VISIBLE_PAGES = 5;
  const halfOfVisiblePages = Math.floor(NUMBER_OF_VISIBLE_PAGES / 2);
  const firstVisiblePage = activePageNumber - halfOfVisiblePages;
  const lastVisiblePage = activePageNumber + halfOfVisiblePages;

  if (totalPages < NUMBER_OF_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }

  if (lastVisiblePage >= totalPages) {
    let firstVisiblePage = totalPages - NUMBER_OF_VISIBLE_PAGES + 1;

    for (let i = firstVisiblePage; i <= totalPages; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }

  if (firstVisiblePage > 1) {
    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      visiblePages.push(i);
    }
  }

  if (firstVisiblePage <= 1) {
    for (let i = 1; i <= NUMBER_OF_VISIBLE_PAGES; i++) {
      visiblePages.push(i);
    }
  }

  return visiblePages;
}

export default Pagination;
