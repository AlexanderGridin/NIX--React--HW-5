import styles from "./Button.module.css";

const PRIMARY = "primary";
const DANGER = "danger";

const Button = ({ type, visualStyle = PRIMARY, children, onClick }) => {
  return (
    <button
      className={`
        ${styles.Button} 
        ${visualStyle === PRIMARY && styles.ButtonPrimary}
        ${visualStyle === DANGER && styles.ButtonDanger}
      `}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
