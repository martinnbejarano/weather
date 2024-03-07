import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search/:location" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
