import { useContext, useEffect, useState } from "react";
import { getFavourites } from "../services/localStorage";
import { PiSmileySadFill } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";
import { searchLocations } from "../services/fetch";
import { Icon } from "../components/Icon";
import { LocationContext } from "../context/location";


export const Saved = () => {
  const [locations, setLocations] = useState([]);
  const { setNewLocation, removeFavourite } = useContext(LocationContext)

  useEffect(() => {
    const getLocations = async () => {
      const favourites = getFavourites();
      favourites.forEach(async (favourite) => {
        const response = await searchLocations(favourite);
        setLocations((prev) => [...prev, response[0]]);
      });
    };
    getLocations();
  }, []);


  const handleDelete = (location) => {
    removeFavourite(location)
  };

  if (locations)
    return (
      <section className="flex flex-col space-y-2 px-2 py-2 justify-center">
        {locations?.map((location) => (
          <article
            onClick={() => setNewLocation(`${location.lat}, ${location.lon}`)}
            key={location.name}
            className="w-[100%] cursor-pointer border border-zinc-600/75 rounded-md px-3 py-2 flex justify-between hover:border-zinc-500 transition z-10"
          >
          <div>
              <p className="text-base font-bold">{location.name}</p>
              <p className="text-sm font-extralight">{location.region} - {location.country}</p> 
          </div>
            <button onClick={() => handleDelete(`${location.lat}, ${location.lon}`)} className="z-20">
              <Icon icon={<FaTrashAlt />} />
            </button>
          </article>
        ))}
      </section>
    );
  return (
    <div className="flex flex-col space-y-2">
      <PiSmileySadFill />
      <p className="text-xl font-bold">There is not saved locations</p>
    </div>
  );
};
