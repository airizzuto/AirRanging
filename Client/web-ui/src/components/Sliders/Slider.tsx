import "./Slider.scss";

interface Props {
  name: string,
  min: number,
  max: number,
  value: number
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Slider({name, min, max, value, handler }:Props): JSX.Element {

  return (
    <div className="Slider">
      <input 
        type="range"
        className="slider" 
        name={name}
        min={min.toString()}
        max={max.toString()}
        value={value.toString()}
        onChange={(e) => handler(e)}
      />
    </div>
  );
}
