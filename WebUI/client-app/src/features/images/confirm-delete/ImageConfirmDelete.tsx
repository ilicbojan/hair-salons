import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Button from '../../../app/common/button/Button';
import { IImage } from '../../../app/models/image';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Style } from '../../../style';

interface IProps {
  image: IImage;
}

const ImageConfirmDelete: React.FC<IProps> = ({ image }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteImage, submittingDelete, target } = rootStore.imageStore;
  const { closeModal } = rootStore.modalStore;

  return (
    <Style.ConfirmModal>
      <div>Da li ste sigurni da zelite da izbrisete izabranu sliku?</div>
      <div className='buttons'>
        <Button
          name={image.id}
          type='button'
          color='red'
          onClick={(e) => deleteImage(image, e)}
          loading={submittingDelete && target === image.id}
        >
          Izbriši
        </Button>
        <Button type='button' color='primary' onClick={closeModal} block>
          Zatvori
        </Button>
      </div>
    </Style.ConfirmModal>
  );
};

export default observer(ImageConfirmDelete);
