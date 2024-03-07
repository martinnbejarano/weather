import { FaRegHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Icon } from "../components/Icon";

export const Header = () => {
  const dateNow = new Date().toLocaleDateString();

  return (
    <header className="flex min-h-20 justify-between items-center mx-4">
      <div className="flex flex-col">
        <h2 className="text-xl">Weather</h2>
        <h5 className="text-stone-100/70">Today, {dateNow}</h5>
      </div>
      <div className="flex gap-6 md:mr-12">
        <Icon icon={<FaSearch />} textOnHover={"Search"} />
        <Icon icon={<FaRegHeart />} textOnHover={"Saved"} />
        <Icon icon={<IoLocationSharp />} textOnHover={"Geolocation"} />
      </div>
    </header>
  );
};
