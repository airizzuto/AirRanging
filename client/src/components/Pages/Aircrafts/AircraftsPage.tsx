import React from 'react';

import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import { Filters } from '../../../types/Aircraft/Filter';
import { AircraftSearchOptions } from '../../../types/Aircraft/AircraftEnums';

import AircraftsTable from '../../Table/AircraftsTable';
import {LinkButton} from '../../Generics/Buttons/Button';
import AircraftsListButtons from './AircraftsListButtons';

import Style from "./Aircrafts.module.scss";
import Dropdown from "../../Generics/Filters/Dropdown.module.scss";
import EnumToOptions from '../../Generics/Filters/EnumToOptions';
import ToggleDataSet from '../../Generics/Filters/ToggleDataSet';
import Searchbar from '../../Generics/Filters/Searchbar';

interface Props {
  user: UserPublic | null;
  aircrafts: AircraftWithSocials[];
  aircraftsSaved: AircraftWithSocials[] | null;
  aircraftsOwned: AircraftWithSocials[] | null;
  filters: Filters;
  handleAircraftsFilters: (filter: Filters) => void;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAircraftDelete: (aircraftId: string) => Promise<void>;
}

const Aircrafts: React.FC<Props> = ({
  user,
  aircrafts,
  aircraftsSaved,
  filters,
  handleAircraftsFilters,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAircraftSelection,
}) => {

  const handleFieldChange = (value: string) => {
    handleAircraftsFilters({
      ...filters,
      field: AircraftSearchOptions[value as keyof typeof AircraftSearchOptions] as keyof AircraftWithSocials
    });
  };

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

        <select className={Dropdown.Container}
          onChange={(e) => handleFieldChange(e.target.value)}
        >
          <EnumToOptions enumerator={AircraftSearchOptions} />
        </select>

        <div className={Style.FilterOptions}>
          <ToggleDataSet
            label={"Show saved"}
            set={"saved"}
            handleFilter={handleAircraftsFilters}
            filters={filters}
          />
  
          <ToggleDataSet
            label={"Show owned"}
            set={"owned"}
            handleFilter={handleAircraftsFilters}
            filters={filters}
          />
        </div>
       
        <div className={Style.CreateNew}>
          <LinkButton path="/aircrafts/create" style={"primary"}>
            Create Aircraft
          </LinkButton>
        </div>
      </div>

      <hr />

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
