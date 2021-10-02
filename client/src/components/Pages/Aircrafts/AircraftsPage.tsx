import React from 'react';

import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import { Filters } from '../../../types/Aircraft/Filter';
import { AircraftFieldsOptions } from '../../../types/Aircraft/AircraftEnums';

import AircraftsTable from '../../Table/AircraftsTable';
import {LinkButton} from '../../Generics/Buttons/Button';
import AircraftsListButtons from './AircraftsListButtons';

import Style from "./Aircrafts.module.scss";
import EnumToOptions from '../../Generics/Filters/EnumToOptions';

interface Props {
  user: UserPublic | null;
  aircrafts: AircraftWithSocials[];
  aircraftsSaved: AircraftWithSocials[] | null;
  aircraftsOwned: AircraftWithSocials[] | null;
  filter: Filters;
  handleAircraftsFilter: (filter: Filters) => Promise<void>;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAircraftDelete: (aircraftId: string) => Promise<void>;
}

const Aircrafts: React.FC<Props> = ({
  user,
  aircrafts,
  aircraftsSaved,
  filter,
  handleAircraftsFilter,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAircraftSelection,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    handleAircraftsFilter({...filter, search: e.target.value});
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    handleAircraftsFilter({...filter, field: e.target.value as keyof AircraftWithSocials});
  };

  const handleShowOwnedToggle = (isToggled: boolean) => {
    handleAircraftsFilter({...filter, owned: isToggled});
  };

  const handleShowSavedToggle = (isToggled: boolean) => {
    handleAircraftsFilter({...filter, saved: isToggled});
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'ICAO',
        accessor: 'icaoId',
      },
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
        Header: 'Aircraft Type',
        accessor: 'aircraftType',
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
        Header: 'Engine Count',
        accessor: 'engineCount',
      },
      {
        Header: 'Weight Category',
        accessor: 'weightCategory',
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
  
        <input className={Style.SearchBar}
          value={filter.search}
          onChange={event => handleSearchChange(event)}
          placeholder={"Search aircraft"}
        />

        <EnumToOptions
          enumerator={AircraftFieldsOptions}
          handleChange={() => handleFieldChange}
        />

        {/* TODO: abstract saved/owned filters to component */}
        <div className={Style.FilterOptions}>
          <div className={Style.CheckboxItem}> {/* TODO: filter owned */}
            <label>Show owned</label>
            <input type="checkbox" checked={filter.owned} onChange={() => handleShowOwnedToggle}/>
          </div>

          <div className={Style.CheckboxItem}> {/* TODO: filter saved */}
            <label>Show saved</label>
            <input type="checkbox" checked={filter.saved} onChange={() => handleShowSavedToggle}/>
          </div>
        </div>
       
        <div className={Style.CreateNew}>
          <LinkButton path="/aircrafts/create" style={"primary"}>
            Create Aircraft
          </LinkButton>
        </div>
      </div>

      <hr />

      {
        aircrafts
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
