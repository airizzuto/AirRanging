import React from 'react';

import { PaginationInfo } from '../../../types/Pagination';
import { Button } from '../Buttons/Button';

import "./Pagination.scss";

/*
  1- Dropdown select page
  2- Page size with options [5, 10, 15, 20]
  3- Previous page
  4- Next page
*/

interface Props {
  handlePagination: (pagination: PaginationInfo) => void;
  pagination: PaginationInfo;
}

const PaginationControls: React.FC<Props> = ({handlePagination, pagination}) => {
  const nextPage = () => {
    const page = pagination.currentPage += 1;
    handlePagination({ ...pagination, currentPage: page });
  };

  const previousPage = () => {
    const page = pagination.currentPage -= 1;
    handlePagination({ ...pagination, currentPage: page });
  };

  return (
    <div className={"pagination"}>
      {/* TODO: controls */}
      <Button style={'primary'} disabled={!pagination.hasPrevious} handleClick={previousPage}>
        {"<"}
      </Button>
      <Button style={'primary'} disabled={!pagination.hasNext} handleClick={nextPage}>
        {">"}
      </Button>
    </div>
  );
};

export default PaginationControls;