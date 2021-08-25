import React from 'react';

// import aircraftService from '../../../services/aircraftService';
// import { isAircraftSavedByUser, isUserOwner } from '../../../helpers/userHelper';

import { AircraftData } from '../../../types/Aircraft/Aircraft';

import AircraftsTable from '../../Table/AircraftsTable';
import LinkedButton from '../../Buttons/LinkedButton';
// import DecoratedButton from '../../Buttons/DecoratedButton';

import Style from "./Aircrafts.module.scss";
// import bookmarkService from '../../../services/bookmarkService';

interface Props {
  aircrafts: AircraftData[];
  handleAircraftsFilter: (filter: string) => Promise<void>;
  handleAircraftSelection: (selected: AircraftData | null) => void;
}

const Aircrafts: React.FC<Props> = ({
  aircrafts,
  handleAircraftsFilter,
}) => {
  const [filterInput, setFilterInput] = React.useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilterInput(value);
    handleAircraftsFilter(value);
  };

  // const saveAircraftToUser = (aircraftId: string) => {
  //   aircraftService.saveAircraft(aircraftId);
  // };

  // const unsaveAircraft = (aircraftId: string) => {
  //   bookmarkService.unsaveAircraft(aircraftId);
  // };

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
            { 
              // TODO: save functionality
            }
            <LinkedButton path={`/aircrafts/details/${cell.row.original.id}`}>
              Details {/* TODO: Clone */}
            </LinkedButton>
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

        <div className={Style.CreateNew}>
          <LinkedButton path="/aircrafts/create">Create Aircraft</LinkedButton>
        </div>
      </div>

      <hr />

      <div className={Style.AircraftsTable}>
        <AircraftsTable 
          data={aircrafts}
          columns={columns}
        />
      </div>

    </div>
  );
};

export default Aircrafts;
