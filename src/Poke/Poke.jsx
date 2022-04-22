import React, { useState, useEffect } from "react";
import Pagination from "./Pagination.jsx";
import "./styles.css";

// https://pokeapi.co/docs/v2
// 1. https://pokeapi.co/api/v2/pokemon/?limit=60&offset=60

const Poke = () => {
  const [pagination, setPagination] = useState({
    limit: 60,
    offset: 0,
    count: 0,
    page: 1,
    results: {},
  });

  const fetchPokeapi = async (url) => {
    let response = await fetch(
      url ||
        `https://pokeapi.co/api/v2/pokemon/?limit=${pagination.limit}&offset=${pagination.offset}`
    );
    response = await response.json();

    setPagination({
      ...pagination,
      ...response,
      results: {
        ...pagination.results,
        [pagination.page]: response.results,
      },
    });
  };

  const onPageClick = (page) => {
    let offset = page * 60 - 60;
    setPagination((prevPagination) => {
      return {
        ...prevPagination,
        offset,
        page,
      };
    });
  };

  const onPrevClick = () => {
    let page = pagination.page - 1;
    if (page < 1) return;
    setPagination((prevPagination) => {
      let offset = page * 60 - 60;
      return {
        ...prevPagination,
        offset,
        page,
      };
    });
  };

  const onNextClick = () => {
    let page = pagination.page + 1;
    if (page > Math.ceil(pagination.count / 60)) return;
    setPagination((prevPagination) => {
      let offset = page * 60 - 60;
      return {
        ...prevPagination,
        offset,
        page,
      };
    });
  };

  useEffect(() => {
    if (!pagination.results[pagination.page]) {
      fetchPokeapi();
    }
  }, [pagination.page]);

  if (!pagination.results[pagination.page]) return null;

  return (
    <div>
      <ul>
        {pagination.results[pagination.page].map((res) => (
          <li key={res.name}>{res.name}</li>
        ))}
      </ul>
      <div className="poke">
        <button onClick={() => onPrevClick()}>Previous</button>
        <Pagination
          count={pagination.count}
          onPageClick={onPageClick}
          selectedPage={pagination.page}
        />
        <button onClick={() => onNextClick()}>Next</button>
      </div>
    </div>
  );
};

export default Poke;
