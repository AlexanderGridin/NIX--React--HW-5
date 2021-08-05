import styles from "./Button.module.css";

const PRIMARY = "primary";
const DANGER = "danger";

const Button = ({ text, type, visualStyle = PRIMARY, onClick }) => {
  return (
    <button
      className={ `
        ${styles.Button} 
        ${visualStyle === PRIMARY && styles.ButtonPrimary}
        ${visualStyle === DANGER && styles.ButtonDanger}
      ` }
      type={ type }
      onClick={ onClick }
    >
      { text }
    </button>
  );
};

export default Button;
