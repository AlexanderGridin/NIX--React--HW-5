import { useState, useEffect } from "react";

import { PAGINATION } from "../../lib/constants";

import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, activePageProp, onPageChange }) => {
  const [activePage, setActivePage] = useState(PAGINATION.INITIAL_PAGE);
  let visiblePages = getVisiblePages(activePage, totalPages);

  const setFirstPage = () => {
    if (activePage !== 1) {
      setActivePage(1);
      onPageChange(1);
    }
  };

  const setPrevPage = () => {
    const selectedPage = activePage - 1;

    if (selectedPage >= 1) {
      setActivePage(selectedPage);
      onPageChange(selectedPage);
    }
  };

  const setPage = (e) => {
    const selectedPageNumber = +e.target.textContent;

    if (selectedPageNumber !== activePage) {
      setActivePage(selectedPageNumber);
      onPageChange(selectedPageNumber);
    }
  }

  const setNextPage = () => {
    const selectedPage = activePage + 1;

    if (selectedPage <= totalPages) {
      setActivePage(selectedPage);
      onPageChange(selectedPage);
    }
  }

  const setLastPage = () => {
    if (activePage !== totalPages) {
      setActivePage(totalPages);
      onPageChange(totalPages);
    }
  }

  useEffect(() => {
    if (activePageProp) {
      setActivePage(activePageProp);
    }
  }, [activePageProp]);

  return (
    <div className={ styles.Pagination }>
      <button className={ `${styles.PaginationFirst} ${styles.PaginationButton}` } onClick={ setFirstPage }>{ '<<' }</button>
      <button className={ `${styles.PaginationPrev} ${styles.PaginationButton}` } onClick={ setPrevPage }>Prev</button>

      <ul className={ styles.PaginationPages } onClick={ setPage }>
        { visiblePages && visiblePages.map((pageNumber) => {
          return (
            <li className={ styles.PaginationPagesItem } key={ pageNumber }>
              { pageNumber === activePage ?
                <button className={ `${styles.PaginationPage} ${styles.PaginationButton} ${styles.PaginationPageActive}` } disabled={ true }>{ pageNumber }</button> :
                <button className={ `${styles.PaginationPage} ${styles.PaginationButton}` }>{ pageNumber }</button> }
            </li>
          )
        }) }
      </ul>

      <button className={ `${styles.PaginationNext} ${styles.PaginationButton}` } onClick={ setNextPage }>Next</button>
      <button className={ `${styles.PaginationLast} ${styles.PaginationButton}` } onClick={ setLastPage }>{ '>>' }</button>
    </div>
  );
};

// TODO: РЕФАКТОРИНГ!
function getVisiblePages (activePage, totalPages) {
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