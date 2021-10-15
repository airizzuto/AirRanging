
import Style from "./OverlaySection.module.scss";

// TODO: interface

const MapInfoSection = () => {
  return (
    <div className={Style.Section} style={{
      borderLeft:"1px solid #FFFFFF55",
      borderRight:"1px solid #FFFFFF55"
    }}>
      <div className={Style.Header}>
        <h1>NO POIs SELECTED</h1>
      </div>
      <div className={Style.Main}>
        <span>NOT AVAILABLE</span>
      </div>
    </div>
  );
};

export default MapInfoSection;
