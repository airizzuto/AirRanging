import React from 'react';

import { PaginationInfo, PaginationOptions } from '../../../types/Pagination';
import { Button } from '../Buttons/Button';
import Dropdown from '../Filters/Dropdown';

import "./Pagination.scss";

/*
  1- Dropdown select page
  2- Page size with options [5, 10, 15, 20]
  3- Previous page
  4- Next page
*/

interface Props {
  handlePagination: (pagination: PaginationOptions) => void;
  paginationOptions: PaginationOptions;
  paginationInfo: PaginationInfo;
}

const PaginationControls: React.FC<Props> = ({handlePagination, paginationOptions, paginationInfo}) => {
  const nextPage = () => {
    const page = paginationOptions.currentPage += 1;
    handlePagination({ ...paginationOptions, currentPage: page });
  };

  const previousPage = () => {
    const page = paginationOptions.currentPage -= 1;
    handlePagination({ ...paginationOptions, currentPage: page });
  };

  const selectPage = (page: number) => {
    handlePagination({ ...paginationOptions, currentPage: page }); 
  };

  return (
    <div className={"pagination"}>
      {/* TODO: controls */}
      <Button style={'primary'} disabled={!paginationInfo.hasPrevious} handleClick={previousPage}>
        {"<"}
      </Button>
      <Button style={'primary'} disabled={!paginationInfo.hasNext} handleClick={nextPage}>
        {">"}
      </Button>
      <Dropdown name={"currentPage"}
        options={Array.from(Array(paginationOptions.currentPage).keys())}
        defaultValue={paginationOptions.currentPage}
        handleSelect={selectPage}
        isDisabled={paginationInfo.totalPages == 1}
      />
    </div>
  );
};

export default PaginationControls;
