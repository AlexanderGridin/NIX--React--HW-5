import HomePage from "../pages/HomePage/HomePage";
import AboutPage from "../pages/AboutPage/AboutPage";

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
];
