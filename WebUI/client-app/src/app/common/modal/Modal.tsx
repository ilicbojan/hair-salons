import { observer } from 'mobx-react-lite';
import React, { useContext, useRef } from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import { S } from './Modal.style';
import { FaTimes } from 'react-icons/fa';

interface IProps {
  show: boolean;
}

const Modal: React.FC<IProps> = ({ show }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal, modal } = rootStore.modalStore;

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (e: any) => {
    e.preventDefault();
    closeModal();
    show = false;
  };

  const handleCloseModalOutsideClick = (e: any) => {
    if (e.target === modalRef.current) {
      e.preventDefault();
      closeModal();
      show = false;
    }
  };

  return (
    <S.Modal onClick={handleCloseModalOutsideClick} show={show} ref={modalRef}>
      <S.Content>
        <S.Header>
          <h2>{modal.header}</h2>
          <S.CloseBtn onClick={handleCloseModal}>
            <FaTimes size='25' />
          </S.CloseBtn>
        </S.Header>

        <S.Body>{modal.body}</S.Body>
      </S.Content>
    </S.Modal>
  );
};

export default observer(Modal);

// *********** HOW TO OPEN MODAL **************
// const HairSalonList = () => {
//   const rootStore = useContext(RootStoreContext);
//   const { modal, openModal } = rootStore.modalStore;

//   const handleOnClick = (e: any) => {
//     e.preventDefault();
//     openModal();
//   };

//   return (
//     <S.HairSalonList>
//       <h1>Tereni</h1>
//       <HairSalonListItem />
//       <button onClick={handleOnClick}>Open Modal</button>
//       <Modal show={modal.open} header='Prijava'>
//         <div>Hello</div>
//       </Modal>
//     </S.HairSalonList>
//   );
// };
