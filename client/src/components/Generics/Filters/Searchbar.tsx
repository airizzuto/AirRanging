import React from 'react';
import { Filters } from '../../../types/Aircraft/Filter';

import Style from "./Searchbar.module.scss";

interface Props {
  filters: Filters;
  handleFilter: (filter: Filters) => void;
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
