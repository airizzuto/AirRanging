import Style from "./InfoSection.module.scss";

const PointsInfoSection = () => {
  return (
    <>
      <div className={Style.Header}>
        <h1>MODE:</h1>
        <h2>WIP</h2>
      </div>
      <div className={Style.Main}>
        <span>NOT AVAILABLE</span>
      </div>
    </>
  );
};

export default PointsInfoSection;
