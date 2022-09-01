import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import routeList from "./routes/routeList";

function App() {
  return (
    <Router>
      <Routes>
        {routeList.map(({ path, exact, component: Component }, idx) => (
          <Route path={path} exact={exact} element={<Component />} key={idx} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
