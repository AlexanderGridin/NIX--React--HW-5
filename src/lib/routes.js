import HomePage from "../pages/HomePage/HomePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import SearchResultsPage from "../pages/SearchResultsPage/SearchResultsPage";

export const ROUTES = [
  {
    title: "Home",
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    title: "About",
    path: "/about",
    component: AboutPage,
  },
  {
    title: "Search results",
    path: "/search-results",
    component: SearchResultsPage,
  },
];
