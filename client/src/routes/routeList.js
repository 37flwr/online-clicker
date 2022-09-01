import ClickerPage from "../pages/ClickerPage";
import HomePage from "../pages/HomePage";

const routeList = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/click",
    exact: false,
    component: ClickerPage,
  },
];

export default routeList;
