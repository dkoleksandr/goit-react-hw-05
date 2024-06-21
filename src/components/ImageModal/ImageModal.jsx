import style from './ImageModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, photoForModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <button className={style.closeButton} onClick={onRequestClose}>x
      </button>
      <img
        src={photoForModal?.urls.regular}
        alt={photoForModal?.alt_description}
        className={style.image}
      />
    </Modal>
  );
};

export default ImageModal;