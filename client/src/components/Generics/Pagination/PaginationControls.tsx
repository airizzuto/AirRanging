import React from 'react';

import { PaginationInfo, PaginationOptions } from '../../../types/Pagination';
import { Button } from '../Buttons/Button';

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

const PAGE_SIZE = [5, 10, 15, 20];

const PaginationControls: React.FC<Props> = ({handlePagination, paginationOptions, paginationInfo}) => {
  const nextPage = () => {
    const page = paginationOptions.currentPage += 1;
    handlePagination({ ...paginationOptions, currentPage: page });
  };

  const lastPage = () => {
    const page = paginationInfo.totalPages;
    handlePagination({...paginationOptions, currentPage: page});
  };

  const previousPage = () => {
    const page = paginationOptions.currentPage -= 1;
    handlePagination({ ...paginationOptions, currentPage: page });
  };

  const firstPage = () => {
    handlePagination({ ...paginationOptions, currentPage: 1 });
  };

  // const selectPage = (page: number) => {
  //   handlePagination({ ...paginationOptions, currentPage: page }); 
  // };

  const selectSize = (size: number) => {
    handlePagination({ ...paginationOptions, pageSize: size }); 
  };

  return (
    <div className={"pagination"}>
      {/* TODO: controls */}
      <div className={"control_buttons"}>
        <Button style={'primary'} disabled={!paginationInfo.hasPrevious} handleClick={firstPage}>
          {"<<"}
        </Button>
        <Button style={'primary'} disabled={!paginationInfo.hasPrevious} handleClick={previousPage}>
          {"<"}
        </Button>
        <Button style={'primary'} disabled={!paginationInfo.hasNext} handleClick={nextPage}>
          {">"}
        </Button>
        <Button style={'primary'} disabled={!paginationInfo.hasNext} handleClick={lastPage}>
          {">>"}
        </Button>
      </div>

      {/* <Dropdown name={"pageSize"}
        options={PAGE_SIZE}
        defaultValue={paginationOptions.pageSize}
        placeholder='Limit'
        handleSelect={() => selectSize}
      /> */}
      <select 
        name="pageSizeList"
        id="pageSizeList"
        onChange={(e) => selectSize(Number.parseInt(e.target.value))}
        defaultValue={paginationOptions.pageSize}
        placeholder='Limit'
        >
        {PAGE_SIZE.map(size => {
          return <option value={size}>{size}</option>;
        })}
      </select>

      <p>Page: <span>{paginationOptions.currentPage}/{paginationInfo.totalPages}</span></p>
    </div>
  );
};

export default PaginationControls;
