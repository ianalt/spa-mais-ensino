import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Input, InputLabel, TextField } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useRef } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUploader() {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    hiddenFileInput.current?.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
  };
  return (
    <>
      <Button onClick={handleClick}>Adicionar videoaula</Button>
      <Input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }}
      />
    </>
  );
}
