import React from 'react';
import { AircraftsFilterSearch } from '../../../types/Aircraft/Aircraft';

import Style from "./Searchbar.module.scss";

interface Props {
  filters: AircraftsFilterSearch;
  handleFilter: (filter: AircraftsFilterSearch) => void;
  placeholder: string;
}

// TODO: make generic
const AircraftsSearchbar: React.FC<Props> = ({filters, handleFilter, placeholder}) => {

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

export default AircraftsSearchbar;
