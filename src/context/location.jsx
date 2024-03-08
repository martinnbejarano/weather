/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetch";
import { weatherUrl } from "../services/rapidapi";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const item = localStorage.getItem("default");
    return item ? JSON.parse(item) : "Tokyo";
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => fetcher(`${weatherUrl}${location}`),
    retry: false,
  });

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
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
