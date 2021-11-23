import React from 'react';
import { FilterSearch } from '../../../types/Aircraft/Filter';

import Style from "./Searchbar.module.scss";

interface Props {
  filters: FilterSearch;
  handleFilter: (filter: FilterSearch) => void;
  placeholder: string;
}

const Searchbar: React.FC<Props> = ({filters, handleFilter, placeholder}) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    handleFilter({...filters, search: e.target.value});
  };

  return (
    <>
      <input className={Style.Searchbar}
        type="search"
        value={filters.search}
        onChange={event => handleSearchChange(event)}
        placeholder={placeholder}
      />
    </>
  );
};

export default Searchbar;
