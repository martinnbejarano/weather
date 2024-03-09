/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetch";
import { weatherUrl } from "../services/rapidapi";
import {
  getLocationFromLocalStorage,
  isFavourite,
} from "../services/localStorage";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(getLocationFromLocalStorage);
  const [favourite, setFavourite] = useState(false);

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => fetcher(`${weatherUrl}${location}`),
    retry: false,
  });

  useEffect(() => {
    setFavourite(isFavourite(location));
  }, [location]);

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

  const setGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`);
        refetch();
      });
    }
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
        isRefetching,
        refetch,
        favourite,
        setFavourite,
        addFavourite,
        removeFavourite,
        setGeolocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
