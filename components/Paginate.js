import { useState } from "react";
import React from "react";
import { Icon } from "@iconify/react";

const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  currentPage,
  total,
  maxPageNumberLimit,
  minPageNumberLimit,
  lastPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  let pageIncrementBtn = null;
  if (totalPosts.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        onClick={nextPage}
        className="page-number
      "
      >
        {" "}
        ...{" "}
      </li>
    );
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number}>
          <button
            onClick={() => paginate(number)}
            className={`${
              "page-number " +
              (number === currentPage ? "page-number-active" : null)
            }`}
          >
            {number}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div className="pagination-container w-full flex items-center justify-center flex-wrap my-[30px]">
      <ul className="pagination">
        <li className="arrow-button hover:bg-indigo-600 hover:text-white mb-[8px]">
          <button
            onClick={previousPage}
            disabled={currentPage == pageNumbers[0] ? true : false}
          >
            <Icon icon="ep:arrow-left" color="#a2a0b3" width="20" height="25" />
          </button>
        </li>
        {renderPageNumbers}
        <li className="arrow-button hover:bg-indigo-600 hover:text-white">
          <button
            onClick={nextPage}
            disabled={
              currentPage == pageNumbers[pageNumbers.length - 1] ? true : false
            }
          >
            <Icon
              icon="ep:arrow-right"
              color="#a2a0b3"
              width="20"
              height="25"
            />
          </button>
        </li>
        {total >= 5 ? <li className="px-[5px] text-[#A2A0B3]">...</li> : ""}
        {total >= 5 ? (
          <li className="page-number" onClick={() => lastPage(total)}>
            {total}
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Paginate;
