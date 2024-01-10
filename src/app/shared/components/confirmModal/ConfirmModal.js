import Modal from "react-responsive-modal";
import Button from "../button/Button";
import "./ConfirmModal.scss";

const ConfirmModal = ({ isConfirmOpen, setIsConfirmOpen, deleteItem }) => {
  return (
    <Modal
      open={isConfirmOpen}
      onClose={() => {
        setIsConfirmOpen(false);
      }}
      center
    >
      <div className="modal-container">
        <h3>Sigurno želiš obrisati ovaj unos?</h3>
      </div>
      <div className={`modal-action`}>
        <Button
          type="secondary"
          text="Odustani"
          onClick={() => setIsConfirmOpen(false)}
        />
        <Button type="danger" text="Obriši" onClick={deleteItem} />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
