import React, { useEffect, useState } from 'react';

import aircraftService from '../../../services/aircraftService';
import useDebounce from '../../../hooks/useDebounce';
import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import { FilterSearch } from '../../../types/Aircraft/Filter';
import { AircraftSearchOptions } from '../../../types/Aircraft/AircraftEnums';
import { PaginationInfo } from '../../../types/Pagination';

import {LinkButton} from '../../Generics/Buttons/Button';
import Searchbar from '../../Generics/Filters/Searchbar';
import DropdownAircraftOptions from '../../Generics/Filters/DropdownAircraftOptions';
import AircraftCard from '../../Generics/Cards/AircraftCard';
import PaginationControls from '../../Generics/Pagination/PaginationControls';
import AdvancedFilter from './AdvancedFilter';

import Style from "./Aircrafts.module.scss";

interface Props {
  user: UserPublic | null;
  aircraftsSaved: AircraftWithSocials[] | null;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const Aircrafts: React.FC<Props> = ({
  user,
  aircraftsSaved,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAircraftSelection,
}) => {
  const [aircrafts, setAircrafts] = useState<AircraftWithSocials[] | undefined>([]);
  const [filters, setFilters] = useState<FilterSearch>({
    set: "all",
    searchField: AircraftSearchOptions.Model,
    search: ""
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    pageSize: 5,
    currentPage: 1,
    totalCount: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  const debouncedFilter = useDebounce(filters, 500);

  // TODO: const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>([]);

  useEffect(() => {
    console.debug("EFFECT - filter: ", debouncedFilter);

    aircraftService.searchAircraftsPaged(
        debouncedFilter,
        { currentPage: pagination.currentPage, pageSize: pagination.pageSize }
    ).then((result) => {
      if (result) {
        setPagination(result.pagination);
        setAircrafts(result.data);
      }
    });

    return () => {
      setAircrafts([]);
    };
  },[debouncedFilter]); // FIXME

  const handleAircraftsFilters = (filters: FilterSearch) => {
    setFilters({...filters});
  };

  const handlePagination = (pagination: PaginationInfo) => {
    setPagination({...pagination});
  };

  return (
    <div className={Style.AircraftsView}>

      <div className={Style.SubHeader}>
        <h1 className={Style.Title}>Browse Aircrafts</h1>

        <div className={Style.Searchbar}>
          <Searchbar
            filters={filters}
            handleFilter={handleAircraftsFilters}
            placeholder={"Search aircrafts"}
          />
        </div>
        
        <div className={Style.Dropdown}>
          <DropdownAircraftOptions 
            placeholder={"Search By"} 
            filters={filters}
            handleFilter={handleAircraftsFilters}
            enumerator={AircraftSearchOptions}
          />
        </div>

        <div className={Style.CreateNew}>
          <LinkButton path="/aircrafts/create" style={"primary"}>
            Create Aircraft
          </LinkButton>
        </div>
      </div>

      <div className={Style.Content}>
        <div className={Style.Filters}>
          {/* TODO: advanced filter */}
          <AdvancedFilter
            user={user}
            filters={filters}
            handleAircraftsFilters={handleAircraftsFilters}
          />
        </div>
        {
          !aircrafts || aircrafts.length === 0
          ? <div className={Style.AircraftsLoading}>
              <p>Loading aircrafts...</p> {/* TODO: spinner */}
            </div>
          : <div className={Style.Cards}>
              {aircrafts.map((aircraft) => {
                return <AircraftCard
                    key={aircraft.id}
                    user={user}
                    aircraft={aircraft}
                    aircraftsSaved={aircraftsSaved}
                    handleAircraftSelection={handleAircraftSelection}
                    handleAircraftSave={handleAircraftSave}
                    handleAircraftUnsave={handleAircraftUnsave} 
                />;
              })}
            </div>
        }
      </div>

      <div className={Style.Pagination}>
        <PaginationControls pagination={pagination} handlePagination={handlePagination}/>
      </div>
    </div>
  );
};

export default Aircrafts;
