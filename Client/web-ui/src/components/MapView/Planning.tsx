import Style from "./Planning.module.scss";

export default function Planning() {
  return (
    <div className={Style.Planning}>
      <div className={Style.PropertiesGroup}>
        <div className={Style.Selected}>
          <label>Selected Aircraft:</label>
        </div>
        <div className={Style.Fuel}>
          <label>Fuel Loaded</label>
          PLACEHOLDER
        </div>
      </div>

      <hr className={Style.Separator} />

      <div className={Style.ResultsGroup}>
        PLACEHOLDER
      </div>
    </div>
  );
}
