import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetch";
import { weatherUrl } from "../services/rapidapi";
import { Icon } from "../components/Icon";
import { FaRegHeart } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MainDataBox } from "../components/MainDataBox";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

export const Home = () => {
  const [location, setLocation] = useState(() => {
    const item = localStorage.getItem("default");
    return item ? JSON.parse(item) : "Tokyo";
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => fetcher(`${weatherUrl}${location}`),
    retry: false,
  });

  const handleDefault = (e) => {
    e.preventDefault();

    localStorage.setItem("default", JSON.stringify(location));
  };

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Something went wrong {error.message}</p>;

  return (
    <main className="flex flex-col mt-4 items-center gap-1">
      <h1 className="text-3xl font-bold">{data.location.name}</h1>
      <h3 className="text-2xl">{data.location.country}</h3>
      <div className="flex space-x-2">
        <button>
          <Icon icon={<FaRegHeart />} textOnHover={"Saved"} />
        </button>
        <button className="hover:bg-zinc-600 rounded-md transition flex items-center space-x-1 p-2">
          <IoLocationSharp />
          <p onClick={handleDefault}>Save as Default</p>
        </button>
      </div>
      <article className="my-8 mx-1 flex flex-wrap justify-center gap-4">
        <MainDataBox
          icon={"☀️"}
          info={data.current.temp_c}
          text={`°C - ${data.current.condition.text}`}
        />

        <MainDataBox
          icon={<FaTemperatureThreeQuarters className="size-6" />}
          info={`${data.forecast.forecastday[0].day.mintemp_c} / ${data.forecast.forecastday[0].day.maxtemp_c}`}
          text={`°C - Min/Max`}
        />

        <MainDataBox
          icon={<WiHumidity className="size-8" />}
          info={`${data.current.humidity}`}
          text={"% - Humidity"}
        />

        <MainDataBox
          icon={<FaWind className="size-8" />}
          info={data.current.wind_kph}
          text={"km/h - Wind speed"}
        />
      </article>
    </main>
  );
};
