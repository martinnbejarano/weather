import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LocationProvider } from "./context/location.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <LocationProvider>
      <App />
    </LocationProvider>
  </QueryClientProvider>
);
