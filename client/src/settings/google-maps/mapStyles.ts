
const mapStyles = [
  {
    "featureType": "administrative",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
      "featureType": "transit.station.airport",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  
  {
      "featureType": "transit.station.airport",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000c48"
          }
      ]
  },
  {
      "featureType": "transit.station.airport",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "weight": "1.00"
          }
      ]
  },
];

export default mapStyles;
