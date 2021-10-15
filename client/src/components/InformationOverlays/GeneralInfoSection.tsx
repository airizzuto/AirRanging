import React from "react";

import Style from "./Section.module.scss";

const GeneralInfoSection: React.FC = () => {
  return (
    <div className={Style.Section}>
      <div className={Style.Header}>
        <h1>MODE:</h1>
        <h2>WIP</h2>
      </div>
      <div className={Style.Main}>
        <span>NOT AVAILABLE</span>
      </div>
    </div>
  );
};

export default GeneralInfoSection;
