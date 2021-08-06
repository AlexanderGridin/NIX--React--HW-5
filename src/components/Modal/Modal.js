import styles from "./Modal.module.css";

const Modal = ({ children, onCLose }) => {
  return (
    <div className={ styles.Modal }>
      <div className={ styles.ModalBackgroundClosure } onClick={ onCLose }></div>
      <div className={ styles.ModalInner }>
        <button className={ styles.ModalCloseButton } onClick={ onCLose }>
          &times;
        </button>
        <div className={ styles.ModalContent }>
          <div className={ styles.ModalContentOverflowController }>{ children }</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
