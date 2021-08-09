import AircraftsTable from '../../Table/AircraftsTable';

import Style from "./AircraftsView.module.scss";
import LinkedButton from '../../Buttons/LinkedButton';
import { Aircraft } from '../../../types/Aircraft/Aircraft';
import React from 'react';

interface Props {
  aircrafts: Aircraft[];
}

const AircraftsView = ({aircrafts}: Props): JSX.Element => {

  const [filterInput, setFilterInput] = React.useState("");
  
  const handleFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilterInput(value);
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
        Header: 'Author',
        accessor: 'authorUsername',
      },
      {
        Header: 'Saved Times',
        accessor: 'savesCount',
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
          {/* TODO: User logged verify */}
          <LinkedButton path="/aircrafts/create">Create Aircraft</LinkedButton>
        </div>
      </div>

      <hr />

      <div className={Style.AircraftsTable}>
        <AircraftsTable data={aircrafts} columns={columns}/>
      </div>

    </div>
  );
};

export default AircraftsView;
