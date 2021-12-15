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

export const DEFAULT_MAP_CENTER = {
  london: { lat: 51.507351, lng: -0.127758 },
  buenosAires: { lat: -34.603683, lng: -58.381557 },
  washington: { lat: 47.751076, lng: -120.740135 }
};

export const LIBRARIES: any | undefined = ["places", "drawing"];
