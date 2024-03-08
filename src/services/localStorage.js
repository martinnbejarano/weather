export const addFavourite = (locationQuery) => {
  const locations = localStorage.getItem("savedLocations");
  locations
    ? localStorage.setItem(
        "savedLocations",
        JSON.stringify([...JSON.parse(locations), locationQuery])
      )
    : localStorage.setItem("savedLocations", JSON.stringify(locationQuery));
};

export const isFavourite = (locationQuery) => {
  const locations = localStorage.getItem("savedLocations");

  if (locations) {
    return JSON.parse(locations).includes(locationQuery);
  }

  return false;
};
