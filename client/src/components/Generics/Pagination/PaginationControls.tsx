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
    const page = paginationOptions.CurrentPage += 1;
    handlePagination({ ...paginationOptions, CurrentPage: page });
  };

  const lastPage = () => {
    const page = paginationInfo.TotalPages;
    handlePagination({...paginationOptions, CurrentPage: page});
  };

  const previousPage = () => {
    const page = paginationOptions.CurrentPage -= 1;
    handlePagination({ ...paginationOptions, CurrentPage: page });
  };

  const firstPage = () => {
    handlePagination({ ...paginationOptions, CurrentPage: 1 });
  };

  // const selectPage = (page: number) => {
  //   handlePagination({ ...paginationOptions, currentPage: page }); 
  // };

  const selectSize = (size: number) => {
    handlePagination({ ...paginationOptions, PageSize: size }); 
  };

  return (
    <div className={"pagination"}>
      {/* TODO: controls */}
      <div className={"control_buttons"}>
        <Button style={'primary'} disabled={!paginationInfo.HasPrevious} handleClick={firstPage}>
          {"<<"}
        </Button>
        <Button style={'primary'} disabled={!paginationInfo.HasPrevious} handleClick={previousPage}>
          {"<"}
        </Button>
        <Button style={'primary'} disabled={!paginationInfo.HasNext} handleClick={nextPage}>
          {">"}
        </Button>
        <Button style={'primary'} disabled={!paginationInfo.HasNext} handleClick={lastPage}>
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
        defaultValue={paginationOptions.PageSize}
        onChange={(e) => selectSize(Number.parseInt(e.target.value))}
        placeholder='Limit'
        >
        {PAGE_SIZE.map(size => {
          return <option key={`pageSize-${size}`} value={size}>{size}</option>;
        })}
      </select>

      <p>Page: {paginationOptions.CurrentPage}/{paginationInfo.TotalPages}</p>
    </div>
  );
};

export default PaginationControls;
