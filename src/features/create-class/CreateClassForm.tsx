import { Grid, Input, TextField, InputLabel } from '@mui/material';
import InputClassVideoUpload from './UploadFileButton';
import FileUploader from './UploadFileButton';

export default function CreateClassForm() {
  //TODO titulo
  //TODO categoria
  //TODO videoaula
  //TODO material de estudo
  //TODO preview??? URL.createObjectURL(this.files[0]);
  return (
    <Grid item xs={12} container mt={2}>
      <Grid item xs={8} container>
        <Grid item xs={12}>
          <TextField label="Título" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <FileUploader />
        </Grid>
      </Grid>
    </Grid>
  );
}
