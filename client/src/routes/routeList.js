import { useRoutes } from "react-router";
import ClickerPage from "../pages/ClickerPage";
import HomePage from "../pages/HomePage";

const routeList = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/click",
    element: <ClickerPage />,
  },
];

const AppRoutes = () => {
  return useRoutes(routeList);
};

export default AppRoutes;
