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
        Header: 'AircraftType',
        accessor: 'aircraftType',
      },
      {
        Header: 'EngineType',
        accessor: 'engineType',
      },
      {
        Header: 'EngineCount',
        accessor: 'engineCount',
      },
      {
        Header: 'MaxRange',
        accessor: 'maxRange',
      },
    ],
    []
  );

  return (
    <div className={Style.AircraftEditView}>
      {/*TODO: Search bar*/}
      <h1 className={Style.AircraftEditTitle}>Browse Aircrafts</h1>

      <hr className={Style.Separator} />

      <div className={Style.AircraftsTable}>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AircraftEditView;
