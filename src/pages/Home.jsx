import { useContext } from "react";
import { Icon } from "../components/Icon";
import { FaHeart } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MainDataBox } from "../components/MainDataBox";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { HourlyForecastBox } from "../components/HourlyForecastBox";
import { LocationContext } from "../context/location.jsx";
import ClipLoader from "react-spinners/ClipLoader";

export const Home = () => {
  const {
    location,
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    favourite,
    addFavourite,
    removeFavourite,
  } = useContext(LocationContext);

  const handleDefault = (e) => {
    e.preventDefault();
    localStorage.setItem("default", JSON.stringify(location));
  };

  const handleFavourite = (e) => {
    e.preventDefault();
    favourite ? removeFavourite(location) : addFavourite(location);
  };


  return (
    <main className="flex flex-col mt-4 items-center gap-1">
      {(isLoading || isRefetching) && <ClipLoader size={64} color="#fff" />}
      {isError && <p>Something went wrong {error.message} </p>}
      {!isLoading && !isRefetching && !isError &&
      <>
        <h1 className="text-3xl font-bold">{data.location.name}</h1>
        <h3 className="text-2xl">{data.location.country}</h3>
        <div className="flex space-x-2">
          <button onClick={handleFavourite}>
            <Icon
              icon={
                <FaHeart
                  className={`${favourite ? "text-red-600" : "text-stone-100"}`}
                />
              }
              textOnHover={"Save"}
            />
          </button>
          <button
            className="hover:bg-zinc-600 active:bg-zinc-500 rounded-md transition flex items-center space-x-1 p-2"
            onClick={handleDefault}
          >
            <IoLocationSharp />
            <p>Save as Default</p>
          </button>
        </div>
        <article className="my-8 mx-1 flex flex-wrap justify-center gap-4">
          <MainDataBox
            icon={
              <img
                src={data.current.condition.icon}
                className="size-8"
                alt="condition"
              />
            }
            info={data.current.temp_c}
            text={`°C - ${data.current.condition.text}`}
          />

          <MainDataBox
            icon={<FaTemperatureThreeQuarters className="size-5" />}
            info={`${data.forecast.forecastday[0].day.mintemp_c} / ${data.forecast.forecastday[0].day.maxtemp_c}`}
            text={`°C - Min/Max`}
          />

          <MainDataBox
            icon={<WiHumidity className="size-8" />}
            info={`${data.current.humidity}`}
            text={"% - Humidity"}
          />

          <MainDataBox
            icon={<FaWind className="size-6" />}
            info={data.current.wind_kph}
            text={"km/h - Wind speed"}
          />
        </article>

        <article className="flex overflow-x-scroll gap-2 w-screen md:w-[835px] mx-1 my-4">
          {data.forecast.forecastday[0].hour.map((data) => (
            <HourlyForecastBox
              temp_c={data.temp_c}
              condition={data.condition.icon}
              hour={data.time.split(" ")[1]}
              key={data.time}
            />
          ))}
        </article>
      </>
      }
    </main>
  );
};
