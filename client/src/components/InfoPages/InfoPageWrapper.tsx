import { ReactElement } from 'react';

import Style from "./InfoPage.module.scss";

interface Props {
  children: ReactElement[]
}

const InfoPageWrapper: React.FC<Props> = ({children}) => {
  return (
    <div className={Style.Container}>
      <div className={Style.Content}>
        {children}
      </div>
    </div>
  );
};

export default InfoPageWrapper;
