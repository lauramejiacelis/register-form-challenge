import { ReactNode } from 'react';
import styles from '../styles/Modal.module.css';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

const Modal = (props: ModalType) => {
  return (
    <>
      {props.isOpen && (
        <div className={styles.modalOverlay} onClick={props.toggle}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
