import { useState, useEffect } from "react";

import { PAGINATION } from "../../lib/constants";

import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [activePage, setActivePage] = useState(PAGINATION.INITIAL_PAGE);
  let visiblePages = getVisiblePages(activePage, totalPages);

  const gotoFirstPage = () => {
    if (activePage !== 1) {
      setActivePage(1);
      onPageChange && onPageChange(1);
    }
  };

  const gotoPrevPage = () => {
    const targetPage = activePage - 1;

    if (targetPage >= 1) {
      setActivePage(targetPage);
      onPageChange && onPageChange(targetPage);
    }
  };

  const gotoPage = (e) => {
    const targetPageNumber = +e.target.textContent;

    if (targetPageNumber !== activePage) {
      setActivePage(targetPageNumber);
      onPageChange && onPageChange(targetPageNumber);
    }
  };

  const gotoNextPage = () => {
    const targetPage = activePage + 1;

    if (targetPage <= totalPages) {
      setActivePage(targetPage);
      onPageChange && onPageChange(targetPage);
    }
  };

  const gotoLastPage = () => {
    if (activePage !== totalPages) {
      setActivePage(totalPages);
      onPageChange && onPageChange(totalPages);
    }
  };

  useEffect(() => {
    if (currentPage) {
      setActivePage(currentPage);
    }
  }, [currentPage]);

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
                {pageNumber === activePage ? (
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

// TODO: РЕФАКТОРИНГ!
function getVisiblePages(activePage, totalPages) {
  let pages = [];
  const NUMBER_OF_VISIBLE_PAGES = 5;
  const halfOfVisiblePages = Math.floor(NUMBER_OF_VISIBLE_PAGES / 2);
  const firstVisiblePage = activePage - halfOfVisiblePages;
  const lastVisiblePage = activePage + halfOfVisiblePages;

  if (totalPages < NUMBER_OF_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  if (lastVisiblePage >= totalPages) {
    let firstVisiblePage = totalPages - NUMBER_OF_VISIBLE_PAGES + 1;

    for (let i = firstVisiblePage; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  if (firstVisiblePage > 1) {
    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      pages.push(i);
    }
  }

  if (firstVisiblePage <= 1) {
    for (let i = 1; i <= NUMBER_OF_VISIBLE_PAGES; i++) {
      pages.push(i);
    }
  }

  return pages;
}

export default Pagination;
