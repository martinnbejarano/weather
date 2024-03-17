import { FaRegHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Icon } from "../components/Icon";
import { useContext } from "react";
import { LocationContext } from "../context/location";
import { SideBar } from "./SideBar";
import { Saved } from "./Saved";
import { Search } from "./Search";

export const Header = () => {
  const { setGeolocation } = useContext(LocationContext);
  const dateNow = new Date().toLocaleDateString();

  return (
    <header className="flex min-h-20 justify-between items-center mx-4">
      <div className="flex flex-col">
        <h2 className="text-xl">Weather</h2>
        <h5 className="text-stone-100/70">Today, {dateNow}</h5>
      </div>
      <div className="flex gap-6 md:mr-12">
        <SideBar
          icon={<Icon icon={<FaSearch />} textOnHover={"Search"} />}
          content={<Search />}
          title={"Search"}
        />
        <SideBar
          content={<Saved />}
          title={"Saved"}
          icon={<Icon icon={<FaRegHeart />} textOnHover={"Saved"} />}
        />
        <button onClick={setGeolocation}>
          <Icon icon={<IoLocationSharp />} textOnHover={"Geolocation"} />
        </button>
      </div>
    </header>
  );
};
