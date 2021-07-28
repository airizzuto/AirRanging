import React from 'react';
import aircrafts from '../../data/aircrafts-mock';
import { Aircraft } from '../../models/Aircraft';

// import { AircraftType, EngineType } from "../../models/enums/AircraftEnums";
import Table from '../Table/Table';
import Style from "./AircraftEditView.module.scss";

// interface IAircraftDetails {
//   icaoId: string;
//   manufacturer: string;
//   model: string;
//   variant: string;
//   aircraftType: AircraftType;
//   engineType: EngineType;
//   engineCount: number;
//   maxRange: number;
// }

const mockData: Aircraft[] = aircrafts;

const AircraftEditView = (): JSX.Element => {

  const data = React.useMemo(
    () => mockData,
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
    <div className={Style.AircraftEditView}>
      {/*TODO: Search bar*/}
      <h1 className={Style.AircraftEditTitle}>Browse Aircrafts</h1>

      <div className={Style.AircraftsTable}>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AircraftEditView;
