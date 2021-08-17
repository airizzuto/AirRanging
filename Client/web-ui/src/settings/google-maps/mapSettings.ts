import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import mapStyles from "./mapStyles";

export const containerStyle = {
  width: "100%",
  height: "100%"
};

export const DEFAULT_MAP_OPTIONS = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
};

export const LIBRARIES: Libraries | undefined = ["places", "drawing"];
