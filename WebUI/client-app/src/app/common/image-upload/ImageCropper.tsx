import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
  setImage: (file: Blob) => void;
  imagePreview: string;
}

const ImageCropper: React.FC<IProps> = ({ setImage, imagePreview }) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob: any) => {
      setImage(blob);
    }, 'image/jpeg');
  };

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: '100%', marginBottom: '10px' }}
      // Cropper.js options
      aspectRatio={10 / 7}
      preview='.img-preview'
      guides={false}
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={onCrop}
      ref={cropperRef}
    />
  );
};

export default ImageCropper;
