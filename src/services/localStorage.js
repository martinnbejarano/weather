export const getLocationFromLocalStorage = () => {
  const item = localStorage.getItem("default");
  return item ? JSON.parse(item) : "Tokyo";
};

export const isFavourite = (locationQuery) => {
  const locations = localStorage.getItem("savedLocations");
  if (locations) {
    return JSON.parse(locations).includes(locationQuery);
  }
  return false;
};

export const getFavourites = () => {
  const locations = localStorage.getItem("savedLocations");
  if (locations) {
    return JSON.parse(locations);
  }
};
