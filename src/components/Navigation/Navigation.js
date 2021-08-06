import { NavLink } from "react-router-dom";
import { NAVIGATION } from "../../lib/NAVIGATION";

import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.Navigation}>{renderNavigationList(NAVIGATION)}</nav>
  );
};

export default Navigation;

function renderNavigationList(
  navigationItems,
  hasNestedNavigationList = false
) {
  return (
    <ul
      className={
        hasNestedNavigationList
          ? `${styles.NavigationSubList}`
          : `${styles.NavigationList}`
      }
    >
      {navigationItems.map((item, i) => {
        if (item.nested && item.nested.length > 0) {
          return (
            <li
              className={
                item.nested
                  ? `${styles.NavigationListItem} ${styles.hasSubList}`
                  : `${styles.NavigationListItem}`
              }
              key={i}
            >
              <NavLink
                className={styles.NavigationLink}
                activeClassName={styles.NavigationLinkActive}
                to={item.url}
                exact
              >
                {item.title}
              </NavLink>
              {renderNavigationList(item.nested, true)}
            </li>
          );
        }

        return (
          <li className={styles.NavigationListItem} key={i}>
            <NavLink
              className={styles.NavigationLink}
              activeClassName={styles.NavigationLinkActive}
              to={item.url}
              exact
            >
              {item.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
