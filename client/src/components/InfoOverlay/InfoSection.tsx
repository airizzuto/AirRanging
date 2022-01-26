import React from "react";

import Style from "./InfoSection.module.scss";

interface Props {
  children: React.ReactElement | Array<React.ReactElement>;
  selected: string;
  route: string;
}

const InfoSection: React.FC<Props> = ({ children, selected, route }) => {
  const isVisible = selected === route ? "block" : "none";

  return (
    <div className={Style.Section} style={{ display: isVisible }}>
      {children}
    </div>
  );
};

export default InfoSection;
