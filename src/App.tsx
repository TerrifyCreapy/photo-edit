import {FC} from "react";
import { Routes } from "react-router-dom";
import { mapRoutes } from "./utils/mapRoutes";
import { routes } from "./routes";

const App: FC = () => {
  return (
      <Routes>
        {mapRoutes(routes)}
      </Routes>
  );
}

export default App;
