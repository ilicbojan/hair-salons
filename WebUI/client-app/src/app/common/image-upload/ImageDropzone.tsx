import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';
import { COLOR } from '../../../variables';

interface IProps {
  setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
  border: 'dashed 5px',
  borderColor: COLOR.primary,
  borderRadius: '5px',
  paddingTop: '15px',
  marginBottom: '10px',
  textAlign: 'center' as 'center',
  height: '140px',
};

const dropzoneActive = {
  borderColor: COLOR.secondary,
};

const ImageDropzone: React.FC<IProps> = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <FaUpload size='50' color={COLOR.secondary} />
      <div>Klikni da izabereš ili prevuci sliku</div>
    </div>
  );
};

export default ImageDropzone;
