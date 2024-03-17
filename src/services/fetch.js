import { fetchOptions } from "./rapidapi";
import { searchWeatherUrl } from "./rapidapi";

export const fetcher = async (url) => {
  const response = await fetch(url, fetchOptions);
  const result = await response.json();
  return result;
};

export const searchLocations = async (query) => {
  const response = await fetch(`${searchWeatherUrl}${query}`, fetchOptions);
  const result = await response.json();
  return result
};
