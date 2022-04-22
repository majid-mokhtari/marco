import React from "react";
import { getPageNumber } from "./util.js";

const Pagination = (props) => {
  const { count, onPageClick, selectedPage } = props;

  return (
    <div>
      {getPageNumber(count).map((page) => (
        <button
          style={{ background: page === selectedPage ? "orange" : "white" }}
          key={page}
          onClick={() => onPageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
