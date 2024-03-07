import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => (
  <div className="background_pattern">
    <Header />
    <Outlet />
  </div>
);
