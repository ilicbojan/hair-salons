import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Button from '../../../app/common/button/Button';
import ImageUpload from '../../../app/common/image-upload/ImageUpload';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImageListItem from '../list-item/ImageListItem';
import { S } from './ImageList.style';

const ImageList = () => {
  const rootStore = useContext(RootStoreContext);
  const { myHairSalon } = rootStore.hairSalonStore;
  const { openModal } = rootStore.modalStore;

  const handleUploadImage = () => {
    openModal('Dodaj sliku', <ImageUpload />);
  };

  return (
    <S.ImageList>
      <S.Header>
        <h2>Slike</h2>
        <Button type='button' color='primary' onClick={handleUploadImage}>
          Dodaj sliku
        </Button>
      </S.Header>
      <S.Images>
        {myHairSalon?.images &&
          myHairSalon?.images.length > 0 &&
          myHairSalon?.images.map((image) => (
            <ImageListItem key={image.id} image={image} />
          ))}
      </S.Images>
    </S.ImageList>
  );
};

export default observer(ImageList);
