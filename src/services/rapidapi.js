export const weatherUrl =
  "https://weatherapi-com.p.rapidapi.com/forecast.json?q=";

export const searchWeatherUrl =
  "https://weatherapi-com.p.rapidapi.com/search.json?q=";

export const fetchOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};
