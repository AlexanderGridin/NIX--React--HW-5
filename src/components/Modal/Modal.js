import { useDispatch } from "react-redux";

import { setModalIsActive } from "../../store/modalSlice";

import { MODAL } from "../../lib/constants";

import styles from "./Modal.module.css";

const Modal = ({ children, onCLose }) => {
  const dispatch = useDispatch();

  const handleClosing = () => {
    onCLose();
    dispatch(setModalIsActive({ isActive: MODAL.IS_DISABLED }));
  };

  return (
    <div className={styles.Modal}>
      <div
        className={styles.ModalBackgroundClosure}
        onClick={handleClosing}
      ></div>
      <div className={styles.ModalInner}>
        <button className={styles.ModalCloseButton} onClick={handleClosing}>
          &times;
        </button>
        <div className={styles.ModalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
