import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FaImage } from 'react-icons/fa';
import Button from '../../../app/common/button/Button';
import { IImage } from '../../../app/models/image';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImageConfirmDelete from '../confirm-delete/ImageConfirmDelete';
import { S } from './ImageListItem.style';

interface IProps {
  image: IImage;
}

const ImageListItem: React.FC<IProps> = ({ image }) => {
  const rootStore = useContext(RootStoreContext);
  const { setMainImage, submitting, target } = rootStore.imageStore;
  const { openModal } = rootStore.modalStore;

  const handleDelete = (image: IImage) => {
    openModal('Potvrda', <ImageConfirmDelete image={image} />);
  };

  return (
    <S.ImageListItem>
      <S.Image>
        <img src={image.url} alt='Slika terena' />
      </S.Image>
      {image.isMain ? (
        <S.Buttons>
          <FaImage />
        </S.Buttons>
      ) : (
        <S.Buttons>
          <Button
            name={image.id}
            type='button'
            color='secondary'
            onClick={(e) => setMainImage(image, e)}
            loading={submitting && target === image.id}
          >
            Profilna
          </Button>
          <Button
            type='button'
            color='red'
            onClick={(e) => handleDelete(image)}
          >
            Izbriši
          </Button>
        </S.Buttons>
      )}
    </S.ImageListItem>
  );
};

export default observer(ImageListItem);
