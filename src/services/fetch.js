import { fetchOptions } from "./rapidapi";

export const fetchWeather = async (url) => {
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const error = new Error("An error ocurred while fetching the data");
    throw error;
  }

  return response;
};
