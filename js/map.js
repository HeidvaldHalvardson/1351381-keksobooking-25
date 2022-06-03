import {activateForm} from './form-page.js';
import {fillPopup} from './bind-popup.js';
import {compareAds} from './form-filters.js';
import {debounce} from './util.js';

const SIMILAR_AD_COUNT = 10;
const RERENDER_DELAY = 500;
const MAIN_POSITION_LAT = 35.6817;
const MAIN_POSITION_LNG = 139.7539;

const filters = document.querySelector('.map__filters');

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: MAIN_POSITION_LAT,
    lng: MAIN_POSITION_LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarketIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const address = document.querySelector('#address');
address.value = `${MAIN_POSITION_LAT}, ${MAIN_POSITION_LNG}`;

let mainMarker;

const renderMainMarker = () => {
  mainMarker = L.marker(
    {
      lat: MAIN_POSITION_LAT,
      lng: MAIN_POSITION_LNG,
    },
    {
      draggable: true,
      icon: mainMarketIcon,
    },
  );

  mainMarker.on('move ', (evt) => {
    const coordinates = evt.target.getLatLng();
    address.value = `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
  });

  mainMarker.addTo(map);
};

const removeMainMarker = () => {
  mainMarker.remove();
};

const similarMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderMarkers = (arraySimilarAds) => {
  const markerGroup = L.layerGroup().addTo(map);
  arraySimilarAds
    .slice()
    .filter((elem) => compareAds(elem))
    .slice(0, SIMILAR_AD_COUNT)
    .forEach((point) => {
      const lat = point.location.lat;
      const lng = point.location.lng;
      const similarMarker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: similarMarkerIcon,
        },
      );
      similarMarker
        .addTo(markerGroup)
        .bindPopup(fillPopup(point));
    });
  filters.addEventListener('change', debounce(
    () => {
      markerGroup.clearLayers();
    },
    RERENDER_DELAY,
  ));
};


export {map, removeMainMarker, renderMainMarker, renderMarkers};


