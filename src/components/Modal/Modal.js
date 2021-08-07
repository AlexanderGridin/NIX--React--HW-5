import { useDispatch } from "react-redux";

import { setModalIsActive } from "../../store/modalSlice";

import { MODAL } from "../../lib/constants";

import styles from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    onClose();
    dispatch(setModalIsActive({ isActive: MODAL.IS_DISABLED }));
  };

  return (
    <div className={styles.Modal}>
      <div className={styles.ModalBackgroundClosure} onClick={closeModal}></div>
      <div className={styles.ModalInner}>
        <button className={styles.ModalCloseButton} onClick={closeModal}>
          &times;
        </button>
        <div className={styles.ModalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
