import React from 'react';
import { LandmarksFilterSearch } from '../../../types/Landmark/Landmark';

import Style from "./Searchbar.module.scss";

interface Props {
  filters: LandmarksFilterSearch;
  handleFilter: (filter: LandmarksFilterSearch) => void;
  placeholder: string;
}

// TODO: make generic
const LandmarksSearchbar: React.FC<Props> = ({filters, handleFilter, placeholder}) => {

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

export default LandmarksSearchbar;
