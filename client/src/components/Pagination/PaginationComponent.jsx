import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

export const PaginationComponent = (props) => {
  let pageCount = Math.ceil(props.itemsCount / 9);
  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === props.currentPage}
        onClick={props.getItemsByBrand}
      >
        {number}
      </Pagination.Item>
    );
  }
  if (pageCount > 1 && pageCount < 20) {
    return (
      <>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {items}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </>
    );
  }
  if (pageCount >= 20) {
    return (
      <>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {items}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </>
    );
  }
  return <></>;
};
