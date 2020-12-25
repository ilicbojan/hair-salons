import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import Button from '../button/Button';
import ImageCropper from './ImageCropper';
import ImageDropzone from './ImageDropzone';
import { S } from './ImageUpload.style';

const ImageUpload = () => {
  const rootStore = useContext(RootStoreContext);
  const { uploadImage, uploading } = rootStore.imageStore;

  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <S.ImageUpload>
      <div>
        <div>
          <h3>1. Korak - Dodaj sliku</h3>
          <ImageDropzone setFiles={setFiles} />
        </div>
      </div>
      <div>
        <h3>2. Korak - Iseci sliku</h3>
        {files.length > 0 && (
          <ImageCropper setImage={setImage} imagePreview={files[0].preview} />
        )}
      </div>
      <div>
        <h3>3. Korak - Pregled</h3>
        {files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{
                minHeight: '150px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            />
            <S.Buttons>
              <Button
                type='button'
                color='primary'
                loading={uploading}
                onClick={() => uploadImage(image!)}
                block
              >
                Dodaj
              </Button>
              <Button
                type='button'
                color='secondary'
                onClick={() => setFiles([])}
                block
              >
                Reset
              </Button>
            </S.Buttons>
          </>
        )}
      </div>
    </S.ImageUpload>
  );
};

export default observer(ImageUpload);
