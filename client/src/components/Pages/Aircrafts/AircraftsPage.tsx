import React from 'react';

import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';

import AircraftsTable from '../../Table/AircraftsTable';
import LinkedButton from '../../Buttons/LinkedButton';
import SaveOptions from './SaveOptions';

import Style from "./Aircrafts.module.scss";

interface Props {
  aircrafts: AircraftData[];
  user: UserPublic | null;
  aircraftsSaved: AircraftData[] | null;
  aircraftsOwned: AircraftData[] | null;
  handleAircraftsFilter: (filter: string) => Promise<void>;
  handleAircraftSelection: (selected: AircraftData | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const Aircrafts: React.FC<Props> = ({
  user,
  aircrafts,
  aircraftsSaved,
  aircraftsOwned,
  handleAircraftsFilter,
  handleAircraftSave,
  handleAircraftUnsave
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
          <div>
            <SaveOptions 
              user={user} 
              aircraft={cell.row.original}
              aircraftsSaved={aircraftsSaved}
              aircraftsOwned={aircraftsOwned}
              handleAircraftSave={handleAircraftSave}
              handleAircraftUnsave={handleAircraftUnsave}
            />
          </div>
        )
      },
    ],
    []
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

        {/* TODO: Dropdown filter */}

        <div> {/* TODO: filter saved */}
          <label>Show saved</label>
          <input className={Style.Checkbox} type="checkbox" />
        </div>

        <div className={Style.CreateNew}>
          <LinkedButton path="/aircrafts/create">Create Aircraft</LinkedButton>
        </div>
      </div>

      <hr />

      {
        aircrafts
          ? <div className={Style.AircraftsTable}>
              <AircraftsTable 
                data={aircrafts}
                columns={columns}
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
