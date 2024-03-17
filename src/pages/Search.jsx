/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchLocations } from "../services/fetch";
import { IoLocationOutline } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import { LocationContext } from "../context/location";

export const Search = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchDebounced = useDebounce(search, 500);
  const { setNewLocation } = useContext(LocationContext)

  useEffect(() => {
    const loadLoactions = async () => {
      setIsLoading(true);

      const data = await searchLocations(searchDebounced);
      setResults(data);
      
      setIsLoading(false);
    };
    if (search.length > 3) {
      loadLoactions();
    }
  }, [searchDebounced]);

  return (
    <main>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Enter a city, country"
        className="rounded-md w-[100%] p-2 bg-transparent border border-zinc-600/70 mt-2 outline-zinc-600"
      />
      <section className={`flex flex-col space-y-2 px-2 py-2 mt-4 justify-center`}>
      {isLoading && <ClipLoader size={32} color="#fff" className="mx-auto"/>}
      {results.length > 0 && !isLoading &&
        results.map((location) =>( 
        <article
          onClick={() => setNewLocation(`${location.lat}, ${location.lon}`)}
          key={`${location.lat}, ${location.lon}`}
          className="w-[100%] cursor-pointer border border-zinc-600/75 rounded-md px-3 py-2 flex justify-between hover:border-zinc-500 transition z-10"
        >
          <div>
            <div className="flex flex-row items-center justify-start space-x-2">
              <IoLocationOutline/>
              <p className="text-base font-bold">{location.name}</p>
            </div>
            <p className="text-sm font-extralight">{location.region} - {location.country}</p> 
          </div>
        </article>
        )
      )} 
      </section>
    </main>
  );
};
