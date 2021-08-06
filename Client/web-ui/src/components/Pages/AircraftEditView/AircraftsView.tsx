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
        <AircraftsTable data={aircrafts} />
      </div>

    </div>
  );
};

export default AircraftsView;
