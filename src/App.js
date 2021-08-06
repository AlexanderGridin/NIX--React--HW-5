import { BrowserRouter, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/index";

import Header from "./components/Header/Header";
// import HomePage from "./pages/HomePage/HomePage";
import { ROUTES } from "./lib/routes";
import renderRoutes from "./lib/renderRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header />
          <main>
            <Switch>{renderRoutes(ROUTES)}</Switch>
          </main>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
