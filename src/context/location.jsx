/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetch";
import { weatherUrl } from "../services/rapidapi";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const item = localStorage.getItem("default");
    return item ? JSON.parse(item) : "Tokyo";
  });
  const [favourite, setFavourite] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => fetcher(`${weatherUrl}${location}`),
    retry: false,
  });

  useEffect(() => {
    setFavourite(isFavourite(location));
  }, [location]);

  function isFavourite(locationQuery) {
    const locations = localStorage.getItem("savedLocations");
    if (locations) {
      return JSON.parse(locations).includes(locationQuery);
    }
    return false;
  }

  const addFavourite = (locationQuery) => {
    const locations = localStorage.getItem("savedLocations");

    if (locations) {
      const existingLocations = JSON.parse(locations);
      localStorage.setItem(
        "savedLocations",
        JSON.stringify([...existingLocations, locationQuery])
      );
    } else {
      localStorage.setItem("savedLocations", JSON.stringify([locationQuery]));
    }

    setFavourite(true);
  };

  const removeFavourite = (locationToRemove) => {
    const locations = JSON.parse(localStorage.getItem("savedLocations"));

    if (locations) {
      const updatedLocations = locations.filter(
        (location) => location != locationToRemove
      );
      localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
    }

    setFavourite(false);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        data,
        isLoading,
        isError,
        error,
        refetch,
        favourite,
        setFavourite,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
