import React from "react";

/**
 * @description Pagination component
 * @param {number} currentPage Value of the current page into the table
 * @param {Function} setCurrentPage Function that change the current page
 * @param {number} total Total number of rows
 * @returns {JSX}
 */
export const Pagination = ({currentPage, setCurrentPage, total}) => {
  // Array of the pages
  const pageSize = total < 4 ? 1 : Math.ceil(total / 4);
  const pageControls = [...Array(pageSize).keys()];
  /**
   * @description Function that show the page control
   * @returns {jsx}
   */
  const showPageControls = () => {
    return pageControls.map((page) => {
      return (
        <div
          className={`pagination-page ${currentPage === page ? 'current' : ''}`}
          key={`page-${page}`}
          onClick={() => setCurrentPage(page)}
        >
          {page + 1}
        </div>
      );
    });
  };
  /**
   * @description function that show the previous control
   * @returns {jsx}
   */
  const showPreviousControl = () => {
    if (pageControls.length > 1 && currentPage > 0) {
      return (
        <div
          className="pagination-control"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <img
            alt="arrow-left"
            src={require("../../assets/img/arrow-left.png")}
          />
          Previous
        </div>
      );
    }
  };

  /**
   * @description Function that show the next control
   * @returns {JSX}
   */
  const showNextControl = () => {
    if (
      pageControls.length > 1 &&
      currentPage < pageControls[pageControls.length - 1]
    ) {
      return (
        <div className="pagination-control" onClick={() => setCurrentPage(currentPage + 1)}>
          Next
          <img
            alt="arrow-right"
            src={require("../../assets/img/arrow-right.png")}
          />
        </div>
      );
    }
  };

  return (
    <div className="pagination">
      {showPreviousControl()}
      <div className="pagination-pages">{showPageControls()}</div>
      {showNextControl()}
    </div>
  );
};
