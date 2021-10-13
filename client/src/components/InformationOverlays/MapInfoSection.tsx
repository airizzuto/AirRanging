
import Style from "./Section.module.scss";

// TODO: interface

const MapInfoSection = () => {
  return (
    <>
      <div className={Style.Header}>
        <h1>NO POIs SELECTED</h1>
      </div>
      <div className={Style.Main}>
        <span>NOT AVAILABLE</span>
      </div>
    </>
  );
};

export default MapInfoSection;
