import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={ styles.LoaderWrapper }>
      <div className={ styles.Loader }>
        <div className={ styles.LoaderSpinner }>
          <div className={ styles.LoaderSpinnerRolling }></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
