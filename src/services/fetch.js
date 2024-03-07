import { fetchOptions } from "./rapidapi";

export const fetcher = async (url) => {
  const response = await fetch(url, fetchOptions);
  const result = await response.json();

  return result;
};
