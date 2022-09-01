import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import "./App.scss";

import ErrorFallback from "./components/ErrorFallback";
import AppRoutes from "./routes/routeList";
import { fetcher } from "./utils/fetcher.js";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SWRConfig value={{ fetcher }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SWRConfig>
    </ErrorBoundary>
  );
}

export default App;
