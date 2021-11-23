import React, { useEffect, useState } from 'react';

import aircraftService from '../../../services/aircraftService';
import useDebounce from '../../../hooks/useDebounce';
import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import { FilterSearch } from '../../../types/Aircraft/Filter';
import { AircraftSearchOptions } from '../../../types/Aircraft/AircraftEnums';

import {LinkButton} from '../../Generics/Buttons/Button';
import Searchbar from '../../Generics/Filters/Searchbar';
import DropdownSelect from '../../Generics/Filters/DropdownSelect';

import Style from "./Aircrafts.module.scss";
import AircraftCard from '../../Generics/Cards/AircraftCard';
import AdvancedFilter from './AdvancedFilter';

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
  const [aircrafts, setAircrafts] = useState<AircraftWithSocials[]>([]);
  const [filters, setFilters] = useState<FilterSearch>({
    set: "all",
    searchField: AircraftSearchOptions.Model,
    search: ""
  });
  // const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>([]);

  const debouncedFilter = useDebounce(filters, 500);

  // TODO: pagination data from response
  // ex: res.headers.get("X-WP-TotalPages") or res.headers.get("X-WP-Total")
  useEffect(() => {
    console.debug("EFFECT - filter: ", debouncedFilter);
    
    aircraftService.searchAircrafts(debouncedFilter)
      .then((response) => setAircrafts([...response.data]))
      .catch(error => console.error("Filtering aicrafts - ", error));

    return () => {
      setAircrafts([]);
    };
  },[debouncedFilter]);

  const handleAircraftsFilters = (filters: FilterSearch) => {
    setFilters({...filters});
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

        <DropdownSelect 
          placeholder={"Search By"} 
          filters={filters}
          handleFilter={handleAircraftsFilters}
          enumerator={AircraftSearchOptions}
        />

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
          aircrafts.length > 0
            ? <div className={Style.Cards}>
                {aircrafts.map((aircraft) => {
                  return <AircraftCard 
                    user={user} 
                    aircraft={aircraft} 
                    aircraftsSaved={aircraftsSaved}
                    handleAircraftSelection={handleAircraftSelection}
                    handleAircraftSave={handleAircraftSave}
                    handleAircraftUnsave={handleAircraftUnsave} 
                  />;
                })}
              </div>
            : <div className={Style.AircraftsLoading}>
                <p>Loading aircrafts...</p> {/* TODO: spinner */}
              </div>
        }
      </div>
    </div>
  );
};

export default Aircrafts;
