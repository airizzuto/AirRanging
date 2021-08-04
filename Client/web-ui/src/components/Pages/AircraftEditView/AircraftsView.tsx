import React from 'react';
import aircrafts from '../../../data/aircrafts-mock';
import { Aircraft } from '../../../types/Aircraft/Aircraft';
import AircraftsTable from '../../Table/AircraftsTable';

import Style from "./AircraftsView.module.scss";
import LinkedButton from '../../Buttons/LinkedButton';



const mockAircrafts: Aircraft[] = aircrafts;

const AircraftsView = (): JSX.Element => {

  // Data search filter in this level
  const data = React.useMemo(
    () => mockAircrafts,
    []
  );

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
    ],
    []
  );

  return (
    <div className={Style.AircraftsView}>

      <div className={Style.SubHeader}>
        <h1 className={Style.Title}>Browse Aircrafts</h1>
  
        <input className={Style.SearchBar}></input>

        <div className={Style.CreateNew}>
          <LinkedButton path="/aircrafts/create">Create Aircraft</LinkedButton>
        </div>
      </div>

      <hr />

      <div className={Style.AircraftsTable}>
        <AircraftsTable columns={columns} data={data} />
      </div>

    </div>
  );
};

export default AircraftsView;
