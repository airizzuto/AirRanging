import React from 'react';

import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';

import AircraftsTable from '../../Table/AircraftsTable';
import AircraftsListButtons from './AircraftsListButtons';

import Style from "./Aircrafts.module.scss";
import {LinkButton} from '../../Generics/Buttons/Button';
import DropdownOptions from '../../Generics/Filters/DropdownOptions';

interface Props {
  aircrafts: AircraftData[];
  user: UserPublic | null;
  aircraftsSaved: AircraftData[] | null;
  aircraftsOwned: AircraftData[] | null;
  handleAircraftsFilter: (filter: string) => Promise<void>;
  handleAircraftSelection: (selected: AircraftData | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAircraftDelete: (aircraftId: string) => Promise<void>;
}

const Aircrafts: React.FC<Props> = ({
  user,
  aircrafts,
  aircraftsSaved,
  handleAircraftsFilter,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAircraftSelection,
}) => {
  const [filterInput, setFilterInput] = React.useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilterInput(value);
    handleAircraftsFilter(value);
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
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Search aircraft model"}
        />

        {/* TODO: Grouped Select Dropdown filter */}
        <div className={Style.Dropdown}>
          <DropdownOptions />
        </div>

        <div className={Style.FilterOptions}>
          <div className={Style.CheckboxItem}> {/* TODO: filter owned */}
            <label>Show owned</label>
            <input type="checkbox" />
          </div>

          <div className={Style.CheckboxItem}> {/* TODO: filter saved */}
            <label>Show saved</label>
            <input type="checkbox" />
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
