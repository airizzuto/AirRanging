import React, { useEffect, useState } from 'react';

import aircraftService from '../../../services/aircraftService';
import useDebounce from '../../../hooks/useDebounce';
import { getUserData } from '../../../helpers/userHelper';
import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import { Filters } from '../../../types/Aircraft/Filter';
import { AircraftSearchOptions } from '../../../types/Aircraft/AircraftEnums';

import AircraftsTable from '../../Table/AircraftsTable';
import AircraftsListButtons from './AircraftsListButtons';
import {LinkButton} from '../../Generics/Buttons/Button';
import ToggleDataSet from '../../Generics/Filters/ToggleDataSet';
import Searchbar from '../../Generics/Filters/Searchbar';
import DropdownSelect from '../../Generics/Filters/DropdownSelect';

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
  const [aircrafts, setAircrafts] = useState<AircraftWithSocials[]>([]);
  const [filters, setFilters] = useState<Filters>({
    set: "all",
    field: AircraftSearchOptions.Model,
    search: ""
  });
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

  const handleAircraftsFilters = (filters: Filters) => {
    setFilters({...filters});
  };

  // TODO: mapper function
  const columns = React.useMemo(
    () => [
      {
        Header: 'Manufacturer',
        accessor: 'manufacturer',
      },
      {
        Header: 'Model',
        accessor: 'model',
      },
      {
        Header: 'Variant',
        accessor: 'variant',
      },
      {
        Header: 'Registration',
        accessor: 'registration',
      },
      {
        Header: 'Aircraft Type',
        accessor: 'aircraftType',
      },
      {
        Header: 'Engine Count',
        accessor: 'engineCount',
      },
      {
        Header: 'Engine Type',
        accessor: 'engineType',
      },
      {
        Header: 'Fuel Type',
        accessor: 'fuelType',
      },
      {
        Header: 'MTOW',
        accessor: 'maxTakeoffWeight',
      },
      {
        Header: 'Max Range',
        accessor: 'maxRange',
      },
      {
        Header: 'Service Ceiling',
        accessor: 'serviceCeiling',
      },
      {
        Header: 'Author',
        accessor: 'authorUsername',
      },
      {
        Header: 'Saved Times',
        accessor: 'savesCount',
      },
      {
        Header: " ",
        // accessor: "aircraftDetails",
        Cell: ({ cell }: any) => (
          <div className={Style.SaveOptions}>
            <AircraftsListButtons 
              user={user} 
              aircraft={cell.row.original}
              aircraftsSaved={aircraftsSaved}
              handleAircraftSave={handleAircraftSave}
              handleAircraftUnsave={handleAircraftUnsave}
            />
            <LinkButton
              style={"primary"}
              path={`/aircrafts/details/${cell.row.original.id}`}
            >
              VIEW
            </LinkButton>
          </div>
        )
      },
    ],
    [user, aircraftsSaved, handleAircraftSave, handleAircraftUnsave]
  );


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

        <div className={Style.FilterOptions}>
          <ToggleDataSet
            id={"checkboxShowSaved"}
            description={"Show saved"}
            set={"saved"}
            unset={"all"}
            handleFilter={handleAircraftsFilters}
            filters={filters}
            disabled={getUserData() === null}
          />

          <ToggleDataSet
            id={"checkboxShowOwned"}
            description={"Show owned"}
            set={"owned"}
            unset={"all"}
            handleFilter={handleAircraftsFilters}
            filters={filters}
            disabled={getUserData() === null}
          />
        </div>

        <div className={Style.CreateNew}>
          <LinkButton path="/aircrafts/create" style={"primary"}>
            Create Aircraft
          </LinkButton>
        </div>
      </div>

      {/* TODO: advanced filter */}
      {/* TODO: refactor to cards */}
      {
        aircrafts.length > 0
          ? <div className={Style.AircraftsTable}>
              <AircraftsTable 
                data={aircrafts}
                columns={columns}
                handleAircraftSelection={handleAircraftSelection}
                handleAircraftSave={handleAircraftSave}
                handleAircraftUnsave={handleAircraftUnsave}
              />
            </div>
          : <div className={Style.AircraftsLoading}>
              <p>Loading aircrafts...</p> {/* TODO: spinner */}
            </div>
      }
    </div>
  );
};

export default Aircrafts;
