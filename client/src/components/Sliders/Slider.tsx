import "./Slider.scss";

interface Props {
  name: string,
  min: number,
  max: number,
  value: number
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Slider: React.FC<Props> = ({name, min, max, value, handler }) => {
  return (
    <div className="SliderContainer">
      <input 
        type="range"
        className="slider" 
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={(e) => handler(e)}
      />
    </div>
  );
};

export default Slider;