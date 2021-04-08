import React from 'react';
import ReactPaginate from 'react-paginate';

export const PaginationComponent = (props) => {
  let pageCount = Math.ceil(props.itemsCount / 9);
  if (pageCount > 1) {
    return (
      <>
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={props.getItems}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </>
    );
  } else {
    return <></>;
  }
};
