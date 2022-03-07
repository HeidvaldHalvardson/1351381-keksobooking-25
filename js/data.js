import {getRandomInt, getRandomFloat} from './util.js';

const REVIEW_COUNT = 10;

const getRandomAvatar = () => {
  const indexAvatarArray = [];
  for (let i = 1; i <= REVIEW_COUNT; i++) {
    let indexAvatar = i;
    if (indexAvatar < 10) {
      indexAvatar = `0${indexAvatar}`;
    }
    indexAvatarArray.push(`img/avatars/user${indexAvatar}.png`);
  }
  return indexAvatarArray;
};

const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const check = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomEement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomElement = array[randomIndex];
  return randomElement;
};

const getRandomArray = (array) => {
  const arrayLength  = getRandomInt(0, array.length);
  const randomArray = [];
  for (let i = 0; i < arrayLength; i++) {
    const randomElement = getRandomEement(array);
    randomArray.push(randomElement);
  }
  const uniqueRandomArray = Array.from(new Set(randomArray));
  return uniqueRandomArray;
};

const getLocation = () => {
  const LOCATION = {
    lat: getRandomFloat(35.65000, 35.70000, 4),
    lng: getRandomFloat(139.70000, 139.80000, 4)
  };
  return LOCATION;
};

const getMockData = (count) => {
  const objectIndex = getRandomAvatar();
  const mockArray = [];
  let i = 0;
  while (i < count) {
    const location = getLocation();
    const someObject = {
      author: {
        avatar: objectIndex[i],
      },
      offer: {
        title: 'Милая, уютная квартирка в центре',
        address: `${location.lat}, ${location.lng}`,
        price: getRandomInt(),
        type: getRandomEement(type),
        rooms: getRandomInt(),
        guests: getRandomInt(),
        checkin: getRandomEement(check),
        checkout: getRandomEement(check),
        features: getRandomArray(features),
        description: 'Замечательно и вообще просто прекрасно.',
        photos: getRandomArray(photos),
      },
      location: location,
    };
    mockArray.push(someObject);
    i++;
  }
  return mockArray;
};

const MOCK_DATA = getMockData(REVIEW_COUNT);

export {MOCK_DATA};
