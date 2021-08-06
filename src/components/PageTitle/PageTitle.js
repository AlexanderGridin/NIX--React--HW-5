import styles from "./PageTitle.module.css";

const PageTitle = ({ title }) => {
  return <h1 className={styles.PageTitle}>{title}</h1>;
};

export default PageTitle;
